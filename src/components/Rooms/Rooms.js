import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {addRoom, getRooms} from '../../redux/rooms/roomsActions'
import {logout} from '../../redux/auth/authActions'
import {getUsers} from "../../redux/users/usersActions";
import AllRooms from "./AllRooms";
import Users from "./Users";


export class Rooms extends Component {
    state = {
        roomName: ''
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = e => {
        e.preventDefault();
        this.props.logout()
    };
    addRoom = e =>{
        e.preventDefault()
        this.props.addRoom(this.state.roomName, this.props.username)
    }
    componentDidMount() {
    }

    render() {
        if (!this.props.isAuthenticated) {
            console.log("h")
            return <Redirect push to='/'/>
        }
        const {roomName} = this.state
        return (
            <div className={"Room"}>
                <h1>Hello {this.props.username}</h1>
                <form className={"logout"} onSubmit={this.handleSubmit}>
                    <button type="submit">Logout</button>
                </form>
                <form className={"addRooms"} onSubmit={this.addRoom}>
                    <input type="text" name={"roomName"} placeholder={"room name"}
                           onChange={this.onChange} value={roomName} required/>
                    <button type="addRooms">добавить комнату</button>
                </form>
                <AllRooms/>
                <Users/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps, {logout, addRoom, getUsers})(Rooms)