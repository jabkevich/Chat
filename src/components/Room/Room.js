import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux'
import openSocket from "socket.io-client"
import {socket} from "../../socket"
import styles from "./styles.scss"
import {joinRoom, sendMessage, leaveRoom, getMessages, getUsersInChat, getNewMessage, getParticipants} from "../../redux/chat/chatActions";
import {tryLogin} from "../../redux/auth/authActions";

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
        console.log("загрузка")
        if(this.props.isAuthenticated){
            this.props.joinRoom(this.state.room, this.props.user)
            this.props.getMessages(this.state.room)
            this.props.getNewMessage()
            this.props.getParticipants(this.state.room)
            window.addEventListener('popstate', (event) => {
                this.props.leaveRoom(this.state.room, this.props.user)
            });
            // window.addEventListener('rel', (event) => {
            //     this.props.leaveRoom(this.state.room, this.props.user)
            // });
            // window.onbeforeunload = function() {
            //     this.props.leaveRoom(this.state.room, this.props.user)
            // };

        }

    }
    componentWillUnmount() {
            window.removeEventListener('progress', ev => {
            })
        // this.props.leaveRoom(this.state.room, this.props.user)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.sendMessage(this.state.message, this.state.room, this.props.user)
    };

    back (){
        this.props.leaveRoom(this.state.room, this.props.user)
    }

    render() {
        const message = this.state.message
        if(!this.props.tryedLogin){
            this.props.tryLogin()
        }
        if(!this.props.isAuthenticated){
            return <Redirect to={`/login/?room=${this.state.room}`}/>
        }
        else
            return (
            <div className={styles.Room}>
                <div className={styles.Header}>
                    <h1>Hello {this.props.user.username}</h1>
                    <div className={"logout"} onClick={this.back}>
                        <Link to={"/rooms/"}>Главная</Link>
                    </div>
                </div>
                <div className={styles.Content}>
                    <div className={styles.Users}>

                        {this.props.usersInChat.map((user, i) => (
                            <div key={i}>{user.user.username}</div>
                        ))}
                    </div>
                    <div className={styles.Chat}>
                        <div className={styles.Messages}>
                            {
                                this.props.messages.length > 0 ?
                                this.props.messages.map((message, i) => (
                                <div key={i}>{message.username.username}: {message.message}</div>
                                )) : <div>Сообщений пока нет</div>}
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

            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        rooms: state.rooms.rooms,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        tryedLogin: state.auth.tryedLogin,
        usersInChat: state.chat.usersInChat,
        messages: state.chat.messages
    }
}

export default connect(mapStateToProps,  {joinRoom, sendMessage, leaveRoom, getMessages, getUsersInChat, getNewMessage, getParticipants, tryLogin})(Room)