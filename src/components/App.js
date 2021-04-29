import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route, Switch, Redirect, BrowserRouter} from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./login/Login"
import Rooms from "./rooms/Rooms"
import Room from "./Room/Room";
import "./App.scss"

import {connect} from "react-redux";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute exact path={"/"}/>
                    {/*render={() => <AddPermissionView {...this.props}/>}*/}
                    <Route  path={"/login"}  component={Login}/>
                    <Route  path={"/rooms"}component={Rooms}/>
                    <Route  path={"/room/:room?"}  component={Room}/>
                </Switch>
            </Router>
        )
    }
}



export default App