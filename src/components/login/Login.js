import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import {login, off, on} from '../../redux/auth/authActions'
import styles from "./styles.scss"


export class Login extends Component {
    state = {
        username: '',
        // room: new URLSearchParams(this.props.location.search).get("room"),
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username)
    };
    componentDidMount() {
        this.props.on()
    }

    componentWillUnmount() {
        // this.props.off()
    }

    render() {
        const {username} = this.state
        if (this.props.isAuthenticated) {
            // if(this.state.room){
            //     return <Redirect to={'/room/?room='+this.state.room}/>
            // }
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
        isAuthenticated: state.auth.isAuthenticated,
        tryedLogin: state.auth.tryedLogin,
    }
}

export default connect(mapStateToProps, {login, off, on})(Login)