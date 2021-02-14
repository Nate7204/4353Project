import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Containers/Login'
import Signup from "./Containers/Signup"

class App extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/Signup" component={Signup}></Route>
                </Switch>
            </Router>
        )
    }
}

export default App