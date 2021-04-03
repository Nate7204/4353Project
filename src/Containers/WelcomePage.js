import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import NavBar from "./NavBar"

export default function Signup(){
    var history = useHistory()

    const token = JSON.parse(localStorage.getItem('user'))

    if(token.newUser === 1){
        history.push("/ProfileCompletion")
    }
    
    return(
    <div className="Login">
            <NavBar />
        <h1>Successfully logged in</h1>
    </div>
    )
}
