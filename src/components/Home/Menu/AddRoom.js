import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {addRoom} from "../../../redux/rooms/roomsActions"
import  styles from "../styles/styles.scss"


export class AddRoom extends Component {

    state = {
        roomName: ''
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})


    addRoom = e =>{
        e.preventDefault()
        let id = this.props.user.username+(new Date().getTime()/1000)
        console.log(id)
        this.props.addRoom(this.state.roomName, this.props.user,id )
    }

    render() {
        const {roomName} = this.state
            return (
                <div >
                    <form  onSubmit={this.addRoom}>
                                <label id="label" htmlFor="roomName">Комната</label>
                                <input type="text" id="roomName" name={"roomName"} placeholder={"room name"}
                                       onChange={this.onChange} value={roomName} required/>

                                <button type="submit">добавить комнату</button>
                    </form>
                </div>
            )

    }
}
const mapStateToProps = state=>{
    return{
        user: state.auth.user
    }
}


export default connect(mapStateToProps, {addRoom})(AddRoom)