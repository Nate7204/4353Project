const db = require("../models/user.model")
const config = require("../auth/auth.config")

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

exports.signup = (req, res) => {
    var usernames = db.map((index) =>(
        index.username
    ))
    var passwords = db.map((index) =>(
        index.password
    ))
    var newUser = db.map((index) =>(
        index.newUser
    ))

    if(usernames.indexOf(req.body.username) != -1){
        res.status(400).send({
            message: "Username already in use!"
        })
    }
    else{
        db.push({
            username: req.body.username,
            password: req.body.password,
            newUser: true
        })
        //passwords.push(bcrypt.hashSync(req.body.password, 8))
    }
}

//this gets called when you loggin 
exports.signin = (req, res) => {
    var usernames = db.map((index) =>(
        index.username
    ))
    var passwords = db.map((index) =>(
        index.password
    ))
    var newUser = db.map((index) =>(
        index.newUser
    ))

    if(usernames.indexOf(req.body.username) == -1){
        res.status(404).send({message: "User not found"})
    }
    else{
        var passwordIsValid = req.body.password == passwords[usernames.indexOf(req.body.username)]

        /*  use this whenever passwords are encyrpted (currently "password1" is not encrypted)
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            passwords[usernames.indexOf(req.body.username)]
        )
        */

        if(!passwordIsValid) {
            res.status(401).send({
                accessToken: null,
                messssage: "Invalid Password!"
            })
        }
        else{
            var token = jwt.sign({ id: req.body.username }, config.secret, {
                expiresIn: 86400 // 24 hours
              })
            res.status(200).send({
                username: req.body.username,
                newUser: newUser[usernames.indexOf(req.body.username)],
                accessToken: token      
            })
            
        }
    }
}

/*          example of changing something in db array
            var index = usernames.indexOf(req.body.username)
            db[index].newUser = false
*/
