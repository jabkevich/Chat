import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import {login} from '../../redux/auth/authActions'
import styles from "./styles.scss"
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
            <div className={styles.AuthContainer}>
                <div className={styles.container}>
                        <form  onSubmit={this.handleSubmit}>
                            <ul  className={styles.Login}>
                                <li>
                                    <label id="label" htmlFor="username">Your username</label>
                                        <input id="username" type="text" name={"username"} placeholder={"your username"} onChange={this.onChange} value={username} required/>
                                </li>
                                <li>
                                    <button type="submit">log in</button>
                                </li>
                            </ul>

                        </form>
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