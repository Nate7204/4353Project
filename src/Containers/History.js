import React, {useState, useEffect} from "react"
import NavBar from "./NavBar"

export default function History(){
    var [values, setValues] = useState([])

    /*values are hard coded for now but will add functionality later(get data from api/database)
    //not 100% sure what useEffect does, it just prevents this page from having infinite re-render loop when setValues() is called
    //since setValues() updates the values state which makes the page rerender
    */
    useEffect(() => {   
        const addRow = async () =>{
            setValues(values => [{
                Gallons: 1,
                Address: 'Road rd',
                Date: 'Tomorrow',
                Price: 24,
                Due: 24,
            },
            {
                Gallons: 2,
                Address: 'Street rd',
                Date: 'Yesterday',
                Price: 10,
                Due: 20,
            }]);
        }

        addRow()
    }, [])

    //values.map() basically transforms values
    //in this case for every element in values, it returns a <tr> with index.Gallons inside the <tr>
    //so basically gallons is an array of <tr> 
    var gallons = values.map((index) =>(
        <tr>{index.Gallons}</tr>
    ))
    var address = values.map((index) =>(
        <tr>{index.Address}</tr>
    ))
    var dates = values.map((index) =>(
        <tr>{index.Date}</tr>
    ))
    var prices = values.map((index) =>(
        <tr>{index.Price}</tr>
    ))
    var amountDues = values.map((index) =>(
        <tr>{index.Due}</tr>
    ))

    return(
        <div className="Login">
            <NavBar />
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
