const config = require("../auth/auth.config")
const mysql = require('mysql')

var usernames = ["user"]
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

let pool = mysql.createPool({
        connectionLimit: 10,
        host: '99.77.89.225',
        user: 'root',
        password: '',
        database: 'fuel'
})


exports.signup = (req, res) => {
    let valid = true   //used in duplicate email check
    let encryptedPass = bcrypt.hashSync(req.body.password,8)
    let query = "SELECT username FROM profile WHERE username = '" + req.body.username + "'"
    let insert = "INSERT INTO profile (username, password, newUser) VALUES ('" + req.body.username + "', '"+ encryptedPass + "', 1);"

    //must add async keyword to be able to use await
    pool.getConnection( async function(err, connection) {
        if(err){
            return console.error('error:' + err.message)
        }    
        console.log('Signup function called')
        
        //must use await and promise to make the program wait for query to finish
        valid = await new Promise(function(resolve, reject) {
            setTimeout(function() {
                connection.query(query, function(err, result, fields){
                    if (err) throw err;
                    if(result.length != 0){  //if result has something in it (ie the username is in the DB) then deny signup              
                        console.log("Duplicate username, denying signup")
                        res.status(400).send({
                            message: "Username already in use!"
                        })
                        resolve(false)  //sets valid to false, username is already in DB
                    }
                    else{
                        resolve(true)   //sets valid to true, username is not in DB
                    }
                })
                }, 2000);
        })
        //dont have to use a promise here since nothing depends on this query
        if(valid){
            connection.query(insert, function(err, result, fields){
                if (err) throw err;
                console.log("No duplicate username, signup success")
                res.status(200).send({
                    message: "Signup Successfully"
                })
            })
        }
        connection.release();
    })
}

//this gets called when you loggin 
exports.signin = (req, res) => {
    let valid = true;
    let query = "SELECT username, password FROM profile WHERE username = '" + req.body.username + "'"
    
    console.log('Login function called')
    
    pool.getConnection( async function(err, connection) {
        if(err){
            res.status(401).send({
                message: "Failed to connect to database"
            })
            return console.error('error:' + err.message)
        }    

        //must use await and promise to make the program wait for query to finish
        valid = await new Promise(function(resolve, reject) {
            setTimeout(function() {
                connection.query(query, function(err, result, fields){
                    if (err) throw err;

                    if(result.length != 0){  //if the username is in the DB
                        var passwordIsValid = bcrypt.compareSync(
                            req.body.password,
                            result[0].password  //here we can use result[0] since the query should only return one row
                        )
                            
                        if(!passwordIsValid) {
                            console.log("Invalid Password!")
                            res.status(401).send({
                                accessToken: null,
                                message: "Invalid Password!"
                            })
                        }
                        else{
                            console.log("Password was valid, login allowed")
                            var token = jwt.sign({ id: req.body.username }, config.secret, {
                                expiresIn: 86400 // 24 hours
                            })
                            res.status(200).send({
                                username: req.body.username,
                                newUser: newUser[usernames.indexOf(req.body.username)],
                                accessToken: token
                            })
                            
                        }
                        resolve(true)
                    }
                    else{
                        resolve(false)
                    }
                })
                }, 2000);
        })

        if(!valid){     //username not in database
            console.log("Username not found. Denying login.")
            res.status(404).send({message: "User not found"})
        }
        connection.release();
    })
}

exports.fuelquote = (req, res) => {
    var mysql = require('mysql');
    var values = "INSERT INTO 'fuel' (`gallons`, `date`, `suggested`, `total`, `username`) VALUES('" + req.body.gallons + "', '" + req.body.date + "', '" + req.body.suggestedPrice + "', '" + req.body.total + "', '" + req.body.username + "')"

    var con = mysql.createConnection({
        host: "99.77.89.225",
        user: "root",
        password: "",
        database: "fuel"
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query(values, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
/*
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
    totalDue[index].push(req.body.total)*/
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
