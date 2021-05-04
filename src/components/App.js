import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route, Switch, Redirect, BrowserRouter} from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./login/Login"
import Home from "./Home/Home"
// import Menu from "./rooms/Menu"
// import Menu from "./Menu/Menu";
import "./App.scss"

import {connect} from "react-redux";
import Room from "./Home/MainScreen/Room";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute exact path={"/"}/>
                    {/*render={() => <AddPermissionView {...this.props}/>}*/}
                    <Route  path={"/login/"}  component={Login}/>
                    <Route  path={"/rooms"} render={()=>(<Home key={this.props.location}/>)}/>
                    {/*<Route  path={"/room/:room?"}  component={Menu}/>*/}
                </Switch>
            </Router>
        )
    }
}



export default App