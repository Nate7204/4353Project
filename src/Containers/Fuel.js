import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"
import NavBar from "./NavBar"
import './Fuel.css'
class PricingModule {

}
export default function Fuel(){
    const [gallons, setGallons] = useState("")
    const [date, setDate] = useState("")

    var history = useHistory();

    function handleSubmit(event) {
        history.push("/WelcomePage")
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
            <div className="Login">
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
                    <p>Your Address: NaN</p>
                    <p>Delivery Address: NaN</p>
                        <Form.Group size="lg" controlId="date">
                            <Form.Label>Date (mm/dd/yyy)</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                    </Form.Group>
                    <p>Suggested Price: NaN</p>
                    <p>Total Due: Nan</p>
                    <Button className="register" block size="lg" type="submit" disabled={!isNumber(gallons) || !isValidDate(date)}>
                        Get Quote
                    </Button>
                </Form>
            </div>
        );
    }
