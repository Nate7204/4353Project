import getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
export default function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}