import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {getRooms} from '../../redux/rooms/roomsActions'


export class AllRooms extends Component {

    componentDidMount() {
        this.props.getRooms()
    }

    render() {
        if (this.props.rooms.length > 0) {
            return (
                <div className={"Room"}>
                    {this.props.rooms.map((room, i) => (
                        <Link to={`/room/room/?room=${room.name}`} key={i}>{room.username} создал комнату {room.name}</Link>
                    ))}
                </div>
            )
        } else {
            return (
                <div className={"Room"}>
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

export default connect(mapStateToProps, {getRooms})(AllRooms)