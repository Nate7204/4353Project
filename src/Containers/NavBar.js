import React, {useState} from "react"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import "./NavBar.css"

export default function NavBar(){
    var history = useHistory()

    const profileSubmit = (e) =>{
        history.push("/ProfileCompletion") 
        window.location.reload();
    }

    const formSubmit = (e) =>{          
        history.push("/Fuel")
        window.location.reload();
    }

    const historySubmit = (e) =>{     
        history.push("/History")
        window.location.reload();
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
