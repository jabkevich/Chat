import React, {Component, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {tryLogin} from '../../redux/auth/authActions'

const PrivateRoute = (auth) => (

    <Route
        render={props => {
            if (!auth.isAuthenticated){
                auth.tryLogin()
                return <Redirect to={"/login"}/>
            } else if (auth.isAuthenticated){
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