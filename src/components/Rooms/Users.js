import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {getUsers} from "../../redux/users/usersActions";
import styles from "./styles.scss"

export class Users extends Component {


    componentDidMount() {
        this.props.getUsers()
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

export default connect(mapStateToProps, {getUsers})(Users)