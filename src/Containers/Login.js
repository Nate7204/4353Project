import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import axios from "axios"
import "./Login.css"

function login(username, password){
    return axios
        .post("http://localhost:8080/api/auth/signin", {
            username,
            password
        })
        .then(response => {
            if (response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data))
                localStorage.setItem("formData", "No Data")
                localStorage.setItem("address", "No Address")
            }

            return response.data
        })
}

export default function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    var history = useHistory()

    function validLength(){
        return username.length > 0 && password.length > 0
    }

    function handleSubmit(event){
        event.preventDefault()

        login(username,password).then(
            () => { 
                history.push("/WelcomePage")
            },
            error => {

                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString()

                alert("Wrong username or password")
            })
    }

    const registerSubmit = (e) =>{  //function that happens when Register button is pressed
        history.push("/Signup")     //links to Signup.js
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
