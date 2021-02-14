"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phrases = void 0;
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const util = __importStar(require("../util"));
exports.phrases = {
    [experimental_utils_1.AST_NODE_TYPES.TSTypeLiteral]: 'Type literal',
    [experimental_utils_1.AST_NODE_TYPES.TSInterfaceDeclaration]: 'Interface',
};
exports.default = util.createRule({
    name: 'prefer-function-type',
    meta: {
        docs: {
            description: 'Use function types instead of interfaces with call signatures',
            category: 'Best Practices',
            recommended: false,
        },
        fixable: 'code',
        messages: {
            functionTypeOverCallableType: '{{ literalOrInterface }} only has a call signature, you should use a function type instead.',
            unexpectedThisOnFunctionOnlyInterface: "`this` refers to the function type '{{ interfaceName }}', did you intend to use a generic `this` parameter like `<Self>(this: Self, ...) => Self` instead?",
        },
        schema: [],
        type: 'suggestion',
    },
    defaultOptions: [],
    create(context) {
        const sourceCode = context.getSourceCode();
        /**
         * Checks if there the interface has exactly one supertype that isn't named 'Function'
         * @param node The node being checked
         */
        function hasOneSupertype(node) {
            if (!node.extends || node.extends.length === 0) {
                return false;
            }
            if (node.extends.length !== 1) {
                return true;
            }
            const expr = node.extends[0].expression;
            return (expr.type !== experimental_utils_1.AST_NODE_TYPES.Identifier || expr.name !== 'Function');
        }
        /**
         * @param parent The parent of the call signature causing the diagnostic
         */
        function shouldWrapSuggestion(parent) {
            if (!parent) {
                return false;
            }
            switch (parent.type) {
                case experimental_utils_1.AST_NODE_TYPES.TSUnionType:
                case experimental_utils_1.AST_NODE_TYPES.TSIntersectionType:
                case experimental_utils_1.AST_NODE_TYPES.TSArrayType:
                    return true;
                default:
                    return false;
            }
        }
        /**
         * @param call The call signature causing the diagnostic
         * @param parent The parent of the call
         * @returns The suggestion to report
         */
        function renderSuggestion(call, parent) {
            const start = call.range[0];
            const colonPos = call.returnType.range[0] - start;
            const text = sourceCode.getText().slice(start, call.range[1]);
            let suggestion = `${text.slice(0, colonPos)} =>${text.slice(colonPos + 1)}`;
            const lastChar = suggestion.endsWith(';') ? ';' : '';
            if (lastChar) {
                suggestion = suggestion.slice(0, -1);
            }
            if (shouldWrapSuggestion(parent.parent)) {
                suggestion = `(${suggestion})`;
            }
            if (parent.type === experimental_utils_1.AST_NODE_TYPES.TSInterfaceDeclaration) {
                if (typeof parent.typeParameters !== 'undefined') {
                    return `type ${sourceCode
                        .getText()
                        .slice(parent.id.range[0], parent.typeParameters.range[1])} = ${suggestion}${lastChar}`;
                }
                return `type ${parent.id.name} = ${suggestion}${lastChar}`;
            }
            return suggestion;
        }
        /**
         * @param member The TypeElement being checked
         * @param node The parent of member being checked
         * @param tsThisTypes
         */
        function checkMember(member, node, tsThisTypes = null) {
            if ((member.type === experimental_utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration ||
                member.type === experimental_utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration) &&
                typeof member.returnType !== 'undefined') {
                if (tsThisTypes !== null &&
                    tsThisTypes.length > 0 &&
                    node.type === experimental_utils_1.AST_NODE_TYPES.TSInterfaceDeclaration) {
                    // the message can be confusing if we don't point directly to the `this` node instead of the whole member
                    // and in favour of generating at most one error we'll only report the first occurrence of `this` if there are multiple
                    context.report({
                        node: tsThisTypes[0],
                        messageId: 'unexpectedThisOnFunctionOnlyInterface',
                        data: {
                            interfaceName: node.id.name,
                        },
                    });
                    return;
                }
                const suggestion = renderSuggestion(member, node);
                const fixStart = node.type === experimental_utils_1.AST_NODE_TYPES.TSTypeLiteral
                    ? node.range[0]
                    : sourceCode
                        .getTokens(node)
                        .filter(token => token.type === experimental_utils_1.AST_TOKEN_TYPES.Keyword &&
                        token.value === 'interface')[0].range[0];
                context.report({
                    node: member,
                    messageId: 'functionTypeOverCallableType',
                    data: {
                        literalOrInterface: exports.phrases[node.type],
                    },
                    fix(fixer) {
                        return fixer.replaceTextRange([fixStart, node.range[1]], suggestion);
                    },
                });
            }
        }
        let tsThisTypes = null;
        let literalNesting = 0;
        return {
            TSInterfaceDeclaration() {
                // when entering an interface reset the count of `this`s to empty.
                tsThisTypes = [];
            },
            'TSInterfaceDeclaration TSThisType'(node) {
                // inside an interface keep track of all ThisType references.
                // unless it's inside a nested type literal in which case it's invalid code anyway
                // we don't want to incorrectly say "it refers to name" while typescript says it's completely invalid.
                if (literalNesting === 0 && tsThisTypes !== null) {
                    tsThisTypes.push(node);
                }
            },
            'TSInterfaceDeclaration:exit'(node) {
                if (!hasOneSupertype(node) && node.body.body.length === 1) {
                    checkMember(node.body.body[0], node, tsThisTypes);
                }
                // on exit check member and reset the array to nothing.
                tsThisTypes = null;
            },
            // keep track of nested literals to avoid complaining about invalid `this` uses
            'TSInterfaceDeclaration TSTypeLiteral'() {
                literalNesting += 1;
            },
            'TSInterfaceDeclaration TSTypeLiteral:exit'() {
                literalNesting -= 1;
            },
            'TSTypeLiteral[members.length = 1]'(node) {
                checkMember(node.members[0], node);
            },
        };
    },
});
//# sourceMappingURL=prefer-function-type.js.map