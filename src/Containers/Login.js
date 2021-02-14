import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import "./Login.css"

export default function Login(){
    const [username, setUsername] = useState("")    //useState("") initializes username and setUsername
    const [password, setPassword] = useState("")
    var history = useHistory()

    function validLength(){
        return username.length > 0 && password.length > 0
    }

    function handleSubmit(event){

    }

    const registerSubmit = (e) =>{  //function that happens when Register button is pressed
        history.push("/Signup")     //links to Signup.js    must add the link to App.js
    }

    return (
        <div className="Login">
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
            <Button className="login" block size="lg" type="submit" disabled={!validLength()}>
                Login
            </Button>
            <Button className="register" block size="lg" type="submit" onClick={registerSubmit}>
                Register
            </Button>
            </Form>
        </div>
    )
}
