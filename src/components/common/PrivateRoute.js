import React, {Component, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {tryLogin} from '../../redux/auth/authActions'

const PrivateRoute = (auth) => (

    <Route

        render={props => {
            if(!auth.tryedLogin){
                console.log("1")
                auth.tryLogin()
                return <h2>Loadin...</h2>
            } else
            if (!auth.isAuthenticated){
                console.log("2")
                return <Redirect to={"/login"}/>
            } else if (auth.isAuthenticated && auth.tryedLogin){
                console.log("3")
                return <Redirect to={"/rooms"}/>
            }
        }
        }
    />
)
const mapStateToProps = state => {
    return {
        login: state.auth.login,
        isAuthenticated: state.auth.isAuthenticated,
        tryedLogin: state.auth.tryedLogin,

    }
}

export default connect(mapStateToProps, {tryLogin})(PrivateRoute)