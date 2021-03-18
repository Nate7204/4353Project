import React, {useState} from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import NavBar from "./NavBar"
import axios from "axios"
import "./Login.css"

function RegisterForm(Fullname, AddressOne, AddressTwo, City, ZipCode) {
    return axios.post("http://localhost:8080/api/auth/profileform", {
        Fullname, AddressOne, AddressTwo, City, ZipCode
    });
}


export default function ProfileCompletion(){
  const [FullName, setFullname] = useState("")
  const [AddressOne, setAddressOne] = useState("")
  const [AddressTwo, setAddressTwo] = useState("")
  const [City, setCity] = useState("")
  const [State, setState] = useState("")
  const [ZipCode, setZipCode] = useState("")

    var history = useHistory()

	function validLength(){
    return FullName.length > 0 && AddressOne.length > 0 && City.length > 0 && ZipCode.length > 0
  }
    
    function handleSubmit(event){
	    event.preventDefault()

        if(validLength()){
            RegisterForm(FullName, AddressOne, AddressTwo, City, ZipCode)
            const info = JSON.parse(localStorage.getItem('user'))
            info.newUser = false
            localStorage.setItem("user", JSON.stringify(info))
            history.push("/WelcomePage")
        }
        else{
            if(FullName.length === 0){
                alert("You must enter a Name")
            }
            else if(FullName.length > 50){
                alert("The name cannot exceed 50 Characters")
            }
            else if(AddressOne.length === 0){
                alert("You must enter an Address")
            }
            else if(AddressOne.length > 100){
                alert("The Address cannot exceed 100 Characters")
            }
            else if(AddressTwo.length > 100){
                alert("The Second Address cannot exceed 100 Characters")
            }
            else if(City.length === 0){
                alert("You must enter a city")
            }
            else if(City.length > 100){
                alert("The City name cannot exceed 100 Characters")
            }
            else if(ZipCode.length === 0){
                alert("You must enter a Zip Code")
            }
            else if(ZipCode.length > 9){
                alert("The Zip Code cannot exceed 9 Numbers")
            }
            else if(ZipCode.length < 5){
                alert("The Zip Code must be atleast 5 Numbers")
            }
        }
    }
    
    
    return(
        <div class="Login">
            <NavBar/>
                <h2>Profile Management</h2>
            <form class="form" id="forms" onSubmit={handleSubmit}>
                
                <label>Full Name</label>
                <input type="text" placeholder="John Smith" id="FullName" onChange={(e) => setFullname(e.target.value)}></input>
                
                <label>Address 1</label>
                <input type="text" placeholder="1234 Home Avenue" id="Adress1" onChange={(e) => setAddressOne(e.target.value)}></input>
                
                <label>Address 2</label>
                <input type="text" placeholder="1234 Home Avenue" id="Address2" onChange={(e) => setAddressTwo(e.target.value)}></input>
                
                <label>City</label>
                <input type="text" placeholder="Enter City Name" id="City" onChange={(e) => setCity(e.target.value)}></input>
                
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
                <input type="text" placeholder="Enter Zip Code" id="ZipCode" onChange={(e) => setZipCode(e.target.value)}></input>
                
                <button type="submit">Submit</button>
            </form>
        </div>
            )
}
