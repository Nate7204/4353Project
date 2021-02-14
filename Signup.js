import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import './Signup.css'

export default function Signup(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState()
    var history = useHistory()

    function validLength(){
        return username.length > 0 && password.length > 0 && password === confirmPassword
    }

    function handleSubmit(event){
        history.push("/")
    }

    return(
        <div className="Login">
        <h1>Signup Page</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
            type="text"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Group>
        <Form.Group size="lg" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </Form.Group>
        <Button className="register" block size="lg" type="submit" disabled={!validLength()}>
            Register
        </Button>
        </Form>
    </div>
    )
}