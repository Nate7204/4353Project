import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"
import NavBar from "./NavBar"
import axios from "axios"
import './Fuel.css'
class PricingModule {
    
}
function fuelQuote(gallons, address, date, suggested, total, username) {
    return axios.post("http://localhost:8080/api/auth/fuelQuote", {
        gallons, address, date, suggested, total, username
    });
}

export default function Fuel(){
    const [gallons, setGallons] = useState("")
    const [date, setDate] = useState("")
    var suggested = 0
    var total = 0
    var history = useHistory();
    var username = JSON.parse(localStorage.getItem('user')).username
    var data = []; //user,pass,name,add1,add2,city,st,zip,new
    var mysql = require('mysql');

    //get data from DB, assiming its in an array for username in local storage
    var con = mysql.createConnection({
        host: "99.77.89.225",
        user: "root",
        password: "",
        database: "fuel"
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM profile WHERE username = '" + username + "'", function (err, result, fields) {
            if (err) throw err;
            data = result;
        });
    });
    

    function handleSubmit(event) {
        fuelQuote(gallons, data[3], date, suggested, total, username)
        alert("Quote Made")
        history.push("/History")
        window.location.reload();
    }
    function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
    function isValidDate(dateString) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    };
    return (
        <div className="Fuel">
            <NavBar/>
            <h1>Quote Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="gallons">
                    <Form.Label>Gallons</Form.Label>
                    <Form.Control
                        type="text"
                        autoFocus
                        value={gallons}
                        onChange={(e) => setGallons(e.target.value)}
                    />
                </Form.Group>
                <p>Your Address: {data[3]}</p>
                <p>Delivery Address: {data[3]}</p>
                    <Form.Group size="lg" controlId="date">
                        <Form.Label>Date (mm/dd/yyyy)</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                </Form.Group>
                <p>Suggested Price: NaN</p>
                <p>Total Due: Nan</p>
                <Button className="quote" block size="lg" type="submit" disabled={!isNumber(gallons) || !isValidDate(date)}>
                    Get Quote
                </Button>
            </Form>
        </div>
    );
}