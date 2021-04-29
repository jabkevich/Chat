import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {getUsers, getUsersOff} from "../../redux/users/usersActions";
import styles from "./styles.scss"

export class Users extends Component {

    componentDidMount() {
        console.log("getUsers")
        this.props.getUsers()
    }
    componentWillUnmount() {
        this.props.getUsersOff()
    }

    render() {
        if(this.props.users)
            return (
                <div className={styles.UserList}>
                    {this.props.users.map((user, i) =>(
                        <div key={i} className={styles.User}>
                            <div>{user.username}</div>
                            <div>id: {user.username}</div>
                        </div>

                    ))}
                </div>
            )
        else {
            <div>Loading...</div>
        }
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.users
    }
}

export default connect(mapStateToProps, {getUsers, getUsersOff})(Users)