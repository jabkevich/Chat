import React, {Component, Fragment} from "react";
import {Link, NavLink, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {addRoom, onSocket, getRooms, getRoomsOff} from "../../../redux/rooms/roomsActions"
import  styles from "../styles/styles.scss"


export class Room extends Component {
    componentDidMount(){
        this.props.onSocket()
        this.props.getRooms()
    }
    componentWillUnmount() {
        this.props.getRoomsOff()
    }

    render() {
            return (
                <div className={styles.Rooms}>
                    {
                        this.props.rooms.length >0 ?        this.props.rooms.map((room, i)=>(
                            <Link key = {i} to={{
                                pathname: "/rooms/change/",
                                propsSearch: `/rooms/${room.id}/`
                            }}>
                                {room.roomName}
                            </Link>
                        )) : <div>комнат нет</div>

                    }
                </div>
            )

    }
}
const mapStateToProps =state=>{
    return{
        rooms: state.rooms.rooms
    }
}

export default connect(mapStateToProps, {addRoom, onSocket, getRooms, getRoomsOff})(Room)