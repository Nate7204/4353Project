import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Containers/Login'
import Signup from "./Containers/Signup"

class App extends Component{
    render(){
        return(
            <Router>        //router is used to link pages together,ex:if u want a button to link to a certain page you have to add the path 
                <Switch>
                    <Route exact path="/" component={Login}></Route>    //main page (login page)
                    <Route exact path="/Signup" component={Signup}></Route>
                </Switch>
            </Router>
        )
    }
}

export default App
