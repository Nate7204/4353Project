const db = require("../models/user.model")
const Users = db.Users

checkDuplicateUsername = (req, res, next) => {
    const usernames = Users.map(e1 => e1.username)

    if(usernames.indexOf(req.body.username) != -1){
        res.status(400).send({
            message: "Username already in use!"
        })
    }
}

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
}

module.exports = verifySignUp