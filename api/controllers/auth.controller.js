const config = require("../auth/auth.config")
const mysql = require('mysql')

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

let pool = mysql.createPool({
        connectionLimit: 100,
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
    let query = "SELECT username, password, newUser FROM profile WHERE username = '" + req.body.username + "'"
    
    console.log('Login function called')
    
    pool.getConnection( async function(err, connection) {
        if(err){
            res.status(401).send({
                message: "Failed to connect to database"
            })
            return console.error('error:' + err.message)
        }    
        console.log("got here")
        //must use await and promise to make the program wait for query to finish
        valid = await new Promise(function(resolve, reject) {
            setTimeout(function() {
                connection.query(query, function(err, result, fields){
                    if (err) throw err;
                    console.log("got here")
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
                                newUser: result[0].newUser,
                                accessToken: token,
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

exports.fuelInfo = (req, res) => {
    let valid = true;
    let query = "SELECT * FROM profile WHERE username = '" + req.body.username + "'"

    console.log("fuelinfo function called")
    pool.getConnection(async function (err, connection) {
        if (err) {
            res.status(401).send({
                message: "Failed to connect to database"
            })
            return console.error('error:' + err.message)
        }

        //must use await and promise to make the program wait for query to finish
        valid = await new Promise(function (resolve, reject) {
            setTimeout(function () {
                connection.query(query, function (err, result, fields) {
                    connection.release();
                    if (err) throw err;
                    res.status(200).send({
                        data: result[0]
                    })
                    console.log("fuelinfo sent")
                })
            }, 2000);
        })
        
    })
}
exports.fuelquote = (req, res) => {
    console.log("fuelquote is called")

    var values = "INSERT INTO fuel (`gallons`, `date`, `suggested`, `total`, `username`) VALUES('" + req.body.gallons + "', STR_TO_DATE('" + req.body.date + "','%m/%d/%Y'), '" + req.body.suggested + "', '" + req.body.total + "', '" + req.body.username + "')"
    
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(values, function (err, result, fields) {
            if (err) throw err;
            console.log("Query was made")
        });    
    });
    
}

//find out how to request the address
exports.profileform = (req, res) => {

    pool.getConnection( async function(err, connection) {
        if(err){
            return console.error('error:' + err.message)
        }    
        console.log('Profile Form function called')
        let update = "UPDATE profile SET name = '"+ req.body.Fullname + "', addressOne = '" + req.body.AddressOne + "', addressTwo = '" + req.body.AddressTwo + "', city = '" + req.body.City + "', state = '" + req.body.State + "', zip =  '" + req.body.ZipCode + "', newUser = 0 WHERE username = '" + req.body.username + "'";
        connection.query(update);
        connection.release();
    })
}

exports.getHistory = (req, res) =>{
    console.log("Get history function was called")

    let query = "SELECT * FROM fuel WHERE username = '" + req.body.username + "'"
    pool.getConnection( async function(err, connection) {
        if(err){
            console.log("error connecting to database")
            res.status(401).send({
                message: "Failed to connect to database"
            })
            return console.error('error:' + err.message)
        }    
        //must use await and promise to make the program wait for query to finish
        await new Promise(function(resolve, reject) {
            setTimeout(function() {
                connection.query(query, function(err, result, fields){
                    connection.release();
                    if (err) throw err;
                    res.status(200).send({
                        data: result
                    })
                    console.log("History was sent")
                    if(true){
                        resolve(true)
                    }
                    else{
                        resolve(false)
                    }
                })
                }, 2000);
        })

    })
}
