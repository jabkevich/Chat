import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {getUsers} from "../../redux/users/usersActions";


export class Users extends Component {


    componentDidMount() {
        this.props.getUsers()
    }

    render() {
        if(this.props.users)
            return (
                <div className={"Users"}>
                    {this.props.users.map((user, i) =>(
                        <div key={i}>{user}</div>
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