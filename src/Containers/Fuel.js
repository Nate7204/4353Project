import React, {useState, useEffect} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"
import NavBar from "./NavBar"
import axios from "axios"
import './Fuel.css'

class PricingModule {
    constructor(data, gallons, hasHistory) {
        this.data = data;
        this.gallons = gallons;
        this.hasHistory = hasHistory
    }
    suggested() {
        var location = this.data.state === 'TX' ? .02 : .04;
        var historyFactor = this.hasHistory === true ? .1 : 0;
        var gal = this.gallons >= 1000 ? .02 : .03;
        return (location - historyFactor + gal + .1) * 1.5;
    }
}
function fuelQuote(gallons, address, date, suggested, total, username) {
    return axios.post("http://localhost:8080/api/auth/fuelQuote", {
        gallons, address, date, suggested, total, username
    });
}
function fuelInfo(username) {
    return axios.post("http://localhost:8080/api/auth/fuelInfo", {
        username
    }).then(response => {
            localStorage.setItem("fuelInfo", JSON.stringify(response.data.data))
        return response.data
    });
}
function fuelHistory(username){
    return axios.post("http://localhost:8080/api/auth/gethistory", {
        username
    })
}

export default function Fuel(){
    const [gallons, setGallons] = useState("")
    const [date, setDate] = useState("")
    const [data, setData] = useState([])
    const [hasHistory, setHasHistory] = useState(false)
    const [suggested, setSuggested] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    var history = useHistory();
    var username = JSON.parse(localStorage.getItem('user')).username
    
    useEffect(() => {
        setData({addressOne: "Loading address.."})
        const afunct = async() =>{
            await fuelInfo(username).then(() => {
                setData(JSON.parse(localStorage.getItem("fuelInfo")))
            });
            await fuelHistory(username).then(response => {
                if(response.data.data.length !== 0)
                    setHasHistory(true)
                
            })   
            setLoading(false)  
        }
        afunct();
    },[]);

    function handleSubmit(event) {
        fuelQuote(gallons, data.address, date, suggested, total, username)
        alert("Quote Made")
        history.push("/History")
        window.location.reload();
    }
    async function getQuote(event){ 
        let temp = new PricingModule(data, gallons, hasHistory).suggested()

        setSuggested(1.5 + temp)
        setTotal((gallons * (1.5 + temp)).toFixed(2))    //im not using suggested here bc for some reason it wasnt working
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
                        onChange={(e) => {setGallons(e.target.value); setSuggested(0)}}
                    />
                </Form.Group>
                <p>Your Address: {data.addressOne}</p>
                <p>Delivery Address: {data.addressOne}</p>
                    <Form.Group size="lg" controlId="date">
                        <Form.Label>Date (mm/dd/yyyy)</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                </Form.Group>
                <p>Suggested Price: {suggested}</p>
                <p>Total Due: {total}</p>
                {loading && <p>Loading data please wait</p>}
                <Button className="quote" block size="lg" disabled={!isNumber(gallons) || !isValidDate(date) || loading} onClick={getQuote}>
                    Get Quote
                </Button>
                <Button className="quote" block size="lg" type="submit" disabled={!isNumber(gallons) || !isValidDate(date) || suggested === 0}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}