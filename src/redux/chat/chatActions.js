import {GET_MESSAGES, GET_USERS_IN_CHAT, SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM} from "./types"

import {socket} from "../../socket"

export const joinRoom = (room, username) =>dispatch=>{
    socket.emit("join_room", {room, username})
    socket.on("join_room", (messages) => {
        dispatch({
            type: JOIN_ROOM,
            payload: messages
        })
    })
}
export const sendMessage = (message, room, username)=>dispatch=>{
    socket.emit("send_message", ({message: message, room: room, username:username}))
    socket.on("get_message",(message)=>{
        dispatch({
            types: SEND_MESSAGE,
            payload: {message: message, room: room, username:username}
        })
    })
}

export const leaveRoom = (room, username)=>dispatch=>{
    socket.emit("leave_room", {room: room, username: username})
    socket.on("leave_room", ()=>{
        dispatch({
            type: LEAVE_ROOM
        })
    })
}


export const getUsersInChat = (room) => dispatch=>{
    socket.emit("get_users", room)
    socket.on("get_users", users=>{
        dispatch({
            type: GET_USERS_IN_CHAT,
            payload: users
        })
    })
}

export const getMessages = (room) => dispatch =>{
    socket.emit("get_messages", room)
    socket.on("get_messages", messages=>{
        dispatch({
            type: GET_MESSAGES,
            payload: messages
        })
    })
}