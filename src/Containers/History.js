import React, {useState, useEffect} from "react"
import NavBar from "./NavBar"
import axios from "axios"


function getHistory(){
    var username = JSON.parse(localStorage.getItem("user")).username
    return axios
        .post("http://localhost:8080/api/auth/getHistory", {
            username     
        })
        .then(response => {
                localStorage.setItem("formData", JSON.stringify(response.data.data))
            return response.data
        })
}

function fuelInfo() {
    var username = JSON.parse(localStorage.getItem("user")).username
    return axios.post("http://localhost:8080/api/auth/fuelInfo", {
        username
    }).then(response => {
            if(response.data){
                localStorage.setItem("address", response.data.address)
            }
            return response.data
        });
}

export default function History(){
    var [gallons, setGallons] = useState();
    var [address, setAddress] = useState();
    var [dates, setDates] = useState();
    var [prices, setPrices] = useState();
    var [amountDues, setAmountDues] = useState();

    //useEffect makes it so these functions only get called once even though the page rerenders a few times
    useEffect(() => {
        fuelInfo().then(
            () => { 
                setAddress(localStorage.getItem("address"))
            },
            error => {
                const resMessage = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString()

                alert(error.response.data.resMessage)
        })

        const afunct = async() =>{
            getHistory().then(
                () => { 
                    var values = JSON.parse(localStorage.getItem("formData"))
                    var gallons1 = values.map((index) =>(
                        <tr>{index.gallons}</tr>
                    ))
                    var dates1 = values.map((index) =>(
                        <tr>{index.date}</tr>
                    ))
                    var prices1 = values.map((index) =>(
                        <tr>{index.suggested}</tr>
                    ))
                    var amountDues1 = values.map((index) =>(
                        <tr>{index.total}</tr>
                    ))
                    //using temp to replicate address gallons.length and format address with <tr> 
                    var temp = [];
                    for(var i = 0; i < gallons1.length; i++){
                        temp[i] = address
                    }
                    temp = temp.map((index) =>(
                        <tr>{index}</tr>
                    ))
                    setAddress(temp)
                    setGallons(gallons1)
                    setDates(dates1)
                    setPrices(prices1)
                    setAmountDues(amountDues1)
                },
                error => {

                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString()

                    alert(error.response.data.resMessage)
            })
        }
        afunct();
    },[]);
    return(
        <div className="Login">
            <NavBar />
            {!gallons && <h2>Loading..</h2>}
            <table>
                    <tbody>
                    <tr>
                        <td>Gallons</td>
                        <td>Address</td>
                        <td>Delivery Date</td>
                        <td>Price per gallon</td>
                        <td>Amount Due</td>
                    </tr>
                    <td>{gallons}</td>
                    <td>{address}</td>
                    <td>{dates}</td>
                    <td>{prices}</td>
                    <td>{amountDues}</td>
                </tbody>
            </table>
        </div>
    )
}
