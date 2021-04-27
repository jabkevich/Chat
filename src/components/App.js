import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./login/Login"
import Rooms from "./rooms/Rooms"
import Room from "./Room/Room";
class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute exact path={"/"}/>
                    <Route exact path={"/login"} component={Login}/>
                    <Route exact path={"/rooms"} component={Rooms}/>
                    <Route exact path={"/room/:room?"} component={Room}/>
                </Switch>
            </Router>
        )
    }
}



export default App