//const db = require("../models/user.model")
const config = require("../auth/auth.config")

var usernames = ["theusername"]
var passwords = ["password1"]  //temporary variables, will be replaced with DB
var newUser = [false]

var fullnames = ["thefullname"]
var addressones = ["addressone"]
var addresstwos = ["addresstwo"]
var aCitys = ["thecity"]
var aStates = ["thestate"]
var zipcodes = ["zipcode"]

var gallonsRequested = [0]
var deliveryDate = ["12/31/1999"]
var suggestedPrice = [0]
var totalDue = [0]

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

exports.signup = (req, res) => {

    if(usernames.indexOf(req.body.username) != -1){
        res.status(400).send({
            message: "Username already in use!"
        })
    }
    else{
        usernames.push(req.body.username)
        passwords.push(req.body.password)
        newUser.push(true)
        //passwords.push(bcrypt.hashSync(req.body.password, 8))
    }
}

//this gets called when you loggin 
exports.signin = (req, res) => {

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
//find out how to request the address
exports.profileform = (req, res) => {
    var x = 0;
    var y = 0;
    for(x = 0; x < usernames.length; x++){
        if(usernames[x]==username){
            y++;
        }
    }
    if(newUser[y]==true){
        fullnames.push(req.body.FullName)
        addressones.push(req.body.AddressOne)
        addresstwos.push(req.body.AddressTwo)
        aStates.push(req.body.State)
        aCitys.push(req.body.City)
        zipcodes.push(req.body.ZipCode)
        newUser.push(false)
    }
    else{
        fullnames[y] = req.body.FullName
        addressones[y] = req.body.AddressOne
        addresstwos[y] = req.body.AddressTwo
        aStates[y] = req.body.State
        aCitys[y] = req.body.City
        zipcodes[y] = req.body.ZipCode
    }
}
