import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import openSocket from "socket.io-client"
import {socket} from "../../socket"
import styles from "./styles.scss"
import {joinRoom, sendMessage, leaveRoom, getMessages, getUsersInChat, getNewMessage} from "../../redux/chat/chatActions";

export class Room extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        room: new URLSearchParams(this.props.location.search).get("room"),
        message: '',
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})


    componentDidMount() {
        this.props.joinRoom(this.state.room, this.props.username)
        this.props.getMessages(this.state.room)
        this.props.getNewMessage()
        window.addEventListener('popstate', (event) => {
            this.props.leaveRoom(this.state.room, this.props.username)
        });
    }
    componentWillUnmount() {
        window.removeEventListener('progress', ev => {})
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.sendMessage(this.state.message, this.state.room, this.props.username)
    };

    render() {
        const message = this.state.message
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

export default connect(mapStateToProps,  {joinRoom, sendMessage, leaveRoom, getMessages, getUsersInChat, getNewMessage})(Room)