import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {getRooms, getRoomsOff} from '../../redux/rooms/roomsActions'
import styles from "./styles.scss"

export class AllRooms extends Component {

    componentDidMount() {
        this.props.getRooms()
    }

    componentWillUnmount() {
        this.props.getRoomsOff()
    }

    render() {
        if (this.props.rooms.length > 0) {
            return (
                <div className={styles.RoomList}>
                    {this.props.rooms.map((room, i) => (
                        <div key={i} className={styles.RoomLink}>
                            <Link to={`/room/room/?room=${room.name}`} >{room.name}</Link>
                            <div className={styles.RoomOwner} data-title={` . id: ${room.username}`}>owner: {room.username}</div>
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <div className={styles.RoomList}>
                    комнат нет
                </div>
            )
        }

    }
}

const mapStateToProps = state => {
    return {
        rooms: state.rooms.rooms
    }
}

export default connect(mapStateToProps, {getRooms, getRoomsOff})(AllRooms)