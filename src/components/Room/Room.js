import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import openSocket from "socket.io-client"
import {socket} from "../../socket"
import styles from "./styles.scss"
export class Room extends Component {
    constructor(props) {
        super(props);
        this.Back = this.Back.bind(this)
    }
    state = {
        message: '',
        socket: socket
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})


    componentDidMount() {
        console.log(new URLSearchParams(this.props.location.search).get("room"))
        let room = new URLSearchParams(this.props.location.search).get("room")

        // const socket = openSocket("http://localhost:6600");
        this.state.socket.emit("open_room", {room: room, username: this.props.username});
        this.state.socket.on("open_room", () => {
          console.log("open_room")
        })
        this.state.socket.on("new_message", (data) => {
            console.log(data)
        })
        window.addEventListener('popstate', (event) => {
            this.state.socket.emit("close_room", {room: room, username: this.props.username});
        });
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
    Back(){
        let room = new URLSearchParams(this.props.location.search).get("room")
        this.state.socket.emit("close_room", {room: room, username: this.props.username})
        return <Redirect to={"/"}/>
    }

    render() {
        const {message} = this.state
            return (
                <div className={styles.Room}>
                    <div className={styles.Users}>
                        ты один
                    </div>
                    <div className={styles.Chat}>
                        <div className={styles.Messages}>
                            Messages
                        </div>
                        <form className={styles.Form} onSubmit={this.handleSubmit}>
                            <div>
                                <input  type="text" name={"message"} placeholder={"введите сообщения"}
                                        onChange={this.onChange} value={message} required/>
                                <button type={"submit"}>отправить</button>
                            </div>
                        </form>
                    </div>
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