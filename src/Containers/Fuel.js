import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Fuel.css'

export default class BasicConcepts extends React.Component {
    constructor(props) {
        const [gallons, setGallons] = useState("")
        const [date, setDate] = useState("")
        var history = useHistory()
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDay: undefined,
        };
    }

    handleSubmit(event) {
        history.push("/")
        }
    handleDayClick(day, { selected }) {
        if (selected) {
            // Unselect the day if already selected
            this.setState({ selectedDay: undefined });
            return;
        }
        this.setState({ selectedDay: day });
    }

    render() {
        return (
            <div className="Fuel">
                <h1>Fuel Quote Page</h1>
                <p>Your Address: N/A</p>
                <p>Suggested Price: N/A</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="gallons">
                        <Form.Label>Gallons</Form.Label>
                        <Form.Control
                            type="number"
                            pattern="[0-9]"
                            autoFocus
                            value={gallons}
                            onChange={(e) => setGallons(e.target.value)}
                        />
                    </Form.Group>
                    <div>
                        <DayPicker
                            onDayClick={this.handleDayClick}
                            selectedDays={this.state.selectedDay}
                        />
                        {this.state.selectedDay ? (
                            <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
                        ) : (
                                <p>Please select a day.</p>
                            )}
                    </div>);
                    <p>Suggested Price/Gallon: N/A</p>
                    <Button className="fuel" block size="lg" type="submit">
                        Get Quote
                    </Button>
                </Form>
            </div>
        )
    }}