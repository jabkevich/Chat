import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {joinRoom,leaveRoom, onChat, sendMessage, getMessages, exitGot} from "../../../redux/chat/chatActions"
import  styles from "../styles/styles.scss"
import { withRouter} from 'react-router-dom';

export class Room extends Component {
    state = {
        room: this.props.match.params.room,
        message: "",
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})

    componentDidMount() {
        console.log(this.props.match.params.room)
        this.props.joinRoom(this.props.match.params.room, this.props.user)
        this.props.onChat()
        this.props.getMessages(this.state.room)
    }
    componentWillUnmount() {
        this.props.leaveRoom(this.state.room, this.props.user)
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.sendMessage(this.state.message, this.state.room, this.props.user)
    };

    render() {
        if(this.props.exist_room){
            return <Redirect to={"/rooms/"}/>
        }
        const {roomName, message} = this.state
        return (
            <div >
                комната:{this.state.room}
                <div>
                    {
                        this.state.room in this.props.messages ?
                            this.props.messages[this.state.room].map((message, i) => (
                                <div key={i}>{message.user.username}: {message.message}</div>
                            )) : <div>{ this.state.room in this.props.messages}</div>
                    }
                </div>

                <form className={styles.Form} onSubmit={this.handleSubmit}>
                    <div>
                        <input  type="text" name={"message"} placeholder={"введите сообщения"}
                                onChange={this.onChange} value={message} required/>
                        <button type={"submit"}>отправить</button>
                    </div>
                </form>
            </div>
        )

    }
}
const mapStateToProps = state=>{
    return{
        user: state.auth.user,
        messages: state.chats.messages,
        exist_room: state.chats.exist_room,
    }
}


export default withRouter(connect(mapStateToProps, {joinRoom,leaveRoom,onChat, sendMessage, getMessages, exitGot})(Room))