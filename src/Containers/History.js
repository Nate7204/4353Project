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
                localStorage.setItem("formData", JSON.stringify(response.data))
            return response.data
        })
}

export default function History(){
    getHistory().then(
        () => { 
            
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
    
    var values = JSON.parse(localStorage.getItem("formData"))
    var gallons;
    var address;
    var dates;
    var prices;
    var amountDues;

    //values.map() basically transforms values
    //in this case for every element in values, it returns a <tr> with index.Gallons inside the <tr>
    //so basically gallons is an array of <tr> 
    if(values.gallons){
    gallons = values.gallons.map((index) =>(
        <tr>{index}</tr>
    ))
    address = values.address.map((index) =>(
        <tr>{index}</tr>
    ))
    dates = values.date.map((index) =>(
        <tr>{index}</tr>
    ))
    prices = values.price.map((index) =>(
        <tr>{index}</tr>
    ))
    amountDues = values.due.map((index) =>(
        <tr>{index}</tr>
    ))
    }

    return(
        <div className="Login">
            <NavBar />
            {!values.gallons && <h2>No form history yet</h2>}
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
