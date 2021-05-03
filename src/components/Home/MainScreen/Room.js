import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {joinRoom,leaveRoom, onChat} from "../../../redux/chat/chatActions"
import  styles from "../styles/styles.scss"
import { withRouter} from 'react-router-dom';

export class Room extends Component {
    constructor(props) {

        super(props);
        this.componentDidRerender = this.componentDidRerender.bind(this)
    }
    state = {
        room:this.props.match.params.room,
        message: this.props.match.params.room,
    }
    componentDidMount() {
        console.log(this.props.match.params.room)
        this.props.joinRoom(this.props.match.params.room, this.props.user)
        this.props.onChat()
    }
    componentWillUnmount() {
        this.props.leaveRoom(this.state.room, this.props.user)
    }


    componentDidRerender(room){
        console.log(this.state.room, this.props.user.username)

        this.props.onChat()
    }





    render() {
        const {roomName} = this.state
        return (
            <div >
                комната:
                {this.state.room}
            </div>
        )

    }
}
const mapStateToProps = state=>{
    return{
        user: state.auth.user
    }
}


export default withRouter(connect(mapStateToProps, {joinRoom,leaveRoom,onChat})(Room))