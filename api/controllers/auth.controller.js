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

var gallonsRequested = [[0,1]]
var quoteAddress = [["address", "address two"]]
var deliveryDate = [["12/31/1999", "1/1/2000"]]
var suggestedPrice = [[0, 1]]
var totalDue = [[0, 1]]

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

exports.fuelquote = (req, res) => {
    const index = usernames.indexOf(req.body.username)

    //if statement is only for when first form is filled out
    if(!gallonsRequested[index]){
        gallonsRequested.push([])
        quoteAddress.push([])
        deliveryDate.push([])
        suggestedPrice.push([])
        totalDue.push([])
    }
    gallonsRequested[index].push(req.body.gallons)
    quoteAddress[index].push(req.body.address)
    deliveryDate[index].push(req.body.date)
    suggestedPrice[index].push(req.body.suggested)
    totalDue[index].push(req.body.total)
}

//find out how to request the address
exports.profileform = (req, res) => {
    var y = usernames.indexOf(req.body.username)

    if(newUser[y]===true){
        fullnames.push(req.body.FullName)
        addressones.push(req.body.AddressOne)
        addresstwos.push(req.body.AddressTwo)
        aStates.push(req.body.State)
        aCitys.push(req.body.City)
        zipcodes.push(req.body.ZipCode)
        newUser[y] = false
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

exports.getHistory = (req, res) =>{
    const index = usernames.indexOf(req.body.username)

    /*
    Here it is sending the form data that corresponds to the username
    so if the username is "theusername" index = 0 so all the quoteHIstory will be found
    in the array of index position 0 of the 2d arrays for each of the data
    */
    res.status(200).send({
        gallons: gallonsRequested[index],
        address: quoteAddress[index],
        date: deliveryDate[index],
        price: suggestedPrice[index],
        due: totalDue[index]
    })
}

exports.getAddress = (req, res) =>{
    const index = usernames.indexOf(req.body.username)

    res.status(200).send({
        address: addressones[index]
    })
}