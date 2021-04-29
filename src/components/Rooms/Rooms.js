import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {addRoom, getRooms} from '../../redux/rooms/roomsActions'
import {logout} from '../../redux/auth/authActions'
import {getUsers} from "../../redux/users/usersActions";
import AllRooms from "./AllRooms";
import Users from "./Users";
import styles from "./styles.scss";
import {socket} from "../../socket";
import {GET_ROOMS} from "../../redux/rooms/types";

export class Rooms extends Component {
    constructor(props) {
        super(props);

    }
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
            return <Redirect push to='/'/>
        }
        const {roomName} = this.state
        return (
            <div className={styles.Room}>
                <div className={styles.Header}>
                    <h1>Hello {this.props.username}</h1>
                    <form className={"logout"} onSubmit={this.handleSubmit}>
                        <button type="submit">Logout</button>
                    </form>
                </div>
                <div className={styles.Content}>
                    <Users/>
                    <AllRooms/>
                    <div className={styles.addRooms}>
                        <form  onSubmit={this.addRoom}>
                            <ul  className={styles.Rooms}>
                                <li>
                                    <label id="label" htmlFor="roomName">Комната</label>
                                    <input type="text" id="roomName" name={"roomName"} placeholder={"room name"}
                                           onChange={this.onChange} value={roomName} required/>
                                </li>
                                <li>
                                    <button type="submit">добавить комнату</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
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