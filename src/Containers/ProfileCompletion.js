import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import NavBar from "./NavBar"
import "./Login.css"

export default function ProfileCompletion(){
    var history = useHistory()
    
    function handleSubmit(event){
        history.push("/WelcomePage")
    }
    
    return(
        <div class="Login">
            <NavBar/>
                <h2>Profile Management</h2>
            <form class="form" id="forms" onSubmit={handleSubmit}>
                
                <label>Full Name</label>
                <input type="text" placeholder="John Smith" id="FullName"></input>
                
                <label>Address 1</label>
                <input type="text" placeholder="1234 Home Avenue" id="Adress1"></input>
                
                <label>Address 2</label>
                <input type="text" placeholder="1234 Home Avenue" id="Address2"></input>
                
                <label>City</label>
                <input type="text" placeholder="Enter City Name" id="City"></input>
                
                <label>State</label>
                <select>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>		
                
                <label>Zip Code</label>
                <input type="text" placeholder="Enter Zip Code" id="ZipCode"></input>
                
                <button type="button">Submit</button>
            </form>
        </div>
            )
}
