import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import axios from "axios"
import './Signup.css'

function register(username, password) {
    return axios.post("http://localhost:8080/api/auth/signup", {
      username,
      password
    })
    .then(response => {
        return response.data
    });
}

export default function Signup(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [noErrors, setNoErrors] = useState(true)
    var history = useHistory()

    function validLength(){
        return username.length > 0 && password.length > 0 && password === confirmPassword
    }

    function handleSubmit(event){
        event.preventDefault()
        setNoErrors(true)
        
        if(validLength()){
            register(username,password).then(
                () => {       
                    history.push("/")
                    alert("Registered successfully")
                },
                error => {    
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString()
    
                    alert(error.response.data.message)
                    setNoErrors(false)
                })
        }
        else{
            if(username.length === 0){
                alert("You must have a username")
            }
            else if(password.length === 0){
                alert("You must have a password")
            }
            else if(password !== confirmPassword){
                alert("Passwords must match")
            }
        }
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
        <Button className="register" block size="lg" type="submit">
            Register
        </Button>
        </Form>
    </div>
    )
}
