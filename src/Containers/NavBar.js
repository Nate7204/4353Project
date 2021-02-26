import React, {useState} from "react"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import "./NavBar.css"

export default function NavBar(){
    var history = useHistory()

    const profileSubmit = (e) =>{
        history.push("/WelcomePage")    //FIXME: change to profile management
    }

    const formSubmit = (e) =>{          //FIXME: change to form
        history.push("/WelcomePage")
    }

    const historySubmit = (e) =>{     
        history.push("/History")
    }

    return(
    <div className="NavBar">
        <header>
            <Button className="profile" block size="lg" type="submit" onClick={profileSubmit}>
                Profile
            </Button>
            <Button className="fuelForm" block size="lg" type="submit" onClick={formSubmit}>
                New Form
            </Button>
            <Button className="history" block size="lg" type="submit" onClick={historySubmit}>
                Order History
            </Button>
        </header>
    </div>
    )
}