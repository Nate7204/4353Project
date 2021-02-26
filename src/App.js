import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Containers/Login'
import Signup from "./Containers/Signup"
import History from './Containers/History'
import WelcomePage from './Containers/WelcomePage'


class App extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/Signup" component={Signup}></Route>
                    <Route exact path="/History" component={History}></Route>
                    <Route exact path="/WelcomePage" component={WelcomePage}></Route>
                </Switch>
            </Router>
        )
    }
}

export default App