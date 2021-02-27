import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"
import './Fuel.css'

export default function Fuel(){
    const [gallons, setGallons] = useState("")
    const [date, setDate] = useState("")

    function handleSubmit(event) {
        history.push("/")
    }
        return (
            <div className="Login">
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
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={date}
                                onChage={(e) => setDate(e.target.value)}
                            />
                    </Form.Group>
                    <p>Suggested Price: NaN</p>
                    <p>Total Due: Nan</p>
                    <Button className="register" block size="lg" type="submit" disabled={!typeof gallons=='number'}>
                        Get Qutoe
                    </Button>
                </Form>
            </div>
        );
    }