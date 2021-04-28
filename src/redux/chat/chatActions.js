import {GET_MESSAGES, GET_USERS_IN_CHAT, SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM, GET_NEW_MESSAGE} from "./types"

import {socket} from "../../socket"

export const joinRoom = (room, username) =>dispatch=>{
    console.log("6")
    socket.emit("join_room", {room, username})
    // socket.on("join_room", (data) => {
    //     dispatch({
    //         type: JOIN_ROOM,
    //         payload: data
    //     })
    // })
}
export const sendMessage = (message, room, username)=>dispatch=>{
    console.log("5")
    socket.emit("send_message", ({message: message, room: room, username:username}))
    socket.on("get_message",(message)=>{
        console.log(message)
        dispatch({
            type: GET_NEW_MESSAGE,
            payload: {message: message.message, room: room, username:username}
        })
    })
}
export const getMessages = (room) => dispatch =>{
    console.log("4")
    socket.emit("get_messages", {room})
    socket.on("get_messages", messages=>{
        console.log("nu")
        dispatch({
            type: GET_MESSAGES,
            payload: messages
        })
    })
}

export const getNewMessage = ()=>dispatch =>{
    console.log("3")
    socket.on("get_new_message", data => {
        console.log("get_new_message")
        console.log(data)
        dispatch({
            type: GET_NEW_MESSAGE,
            payload: data
        })
    })
}

export const leaveRoom = (room, username)=>dispatch=>{
    console.log("2")
    socket.emit("leave_room", {room: room, username: username})
    socket.on("leave_room", ()=>{
        dispatch({
            type: LEAVE_ROOM
        })
    })
}


export const getUsersInChat = (room) => dispatch=>{
    console.log("1")
    socket.emit("get_users", room)
    socket.on("get_users", users=>{
        dispatch({
            type: GET_USERS_IN_CHAT,
            payload: users
        })
    })
}

