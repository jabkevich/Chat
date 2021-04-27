import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import openSocket from "socket.io-client"


export class Room extends Component {
    state = {
        message: '',
        socket: openSocket("http://localhost:6600")
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})


    componentDidMount() {
        console.log(new URLSearchParams(this.props.location.search).get("room"))
        let room = new URLSearchParams(this.props.location.search).get("room")

        // const socket = openSocket("http://localhost:6600");
        this.state.socket.emit("open_room", room);
        this.state.socket.on("open_room", () => {
          console.log("open_room")
        })
        this.state.socket.on("new_message", (data) => {
            console.log(data)
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            room:new URLSearchParams(this.props.location.search).get("room"),
            message:  this.state.message,
            username: this.props.username
        }
        this.state.socket.emit("new_message", data);
    };

    render() {
        const {message} = this.state
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name={"message"} placeholder={"введите сообщения"}
                               onChange={this.onChange} value={message} required/>
                        <button type={"submit"}>отправить</button>
                    </form>

                </div>
            )

    }
}

const mapStateToProps = state => {
    return {
        rooms: state.rooms.rooms,
        username: state.auth.username
    }
}

export default connect(mapStateToProps, null)(Room)