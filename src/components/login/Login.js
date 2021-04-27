import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {login} from '../../redux/auth/authActions'


export class Login extends Component {
    state = {
        username: ''
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username)
    };

    render() {
        const {username} = this.state
        if (this.props.isAuthenticated) {
            return <Redirect to='/'/>
        }
        return (
            <div className={"AuthContainer"}>
                <div className={"Auth"}>
                    <div className={"Login"}>
                        <h3>chat</h3>
                        <form className="form post" onSubmit={this.handleSubmit}>
                            <div id="account-name">
                                <input type="text" name={"username"} placeholder={"Введите ваш логин"}
                                       onChange={this.onChange} value={username} required/>
                            </div>
                            <button type="submit" className="effect effect-3" title="Learn More">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {login})(Login)