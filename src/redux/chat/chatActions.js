import {GET_MESSAGES, GET_USERS_IN_CHAT, SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM, GET_NEW_MESSAGE, EXIT_GOT} from "./types"

import {socket} from "../../socket"
import {EXIST_ROOM} from "../rooms/types";


export const joinRoom = (room, user) =>dispatch=>{
    console.log(user)
    socket.emit("join_room", {room, user})
}

export const exitGot = () => dispatch =>{
    dispatch({
        type: EXIT_GOT,
    })
}

export const onChat=()=>dispatch=>{
    socket.on("join_room", data=>{
        dispatch({
            type: JOIN_ROOM,
            payload: data
        })
    })
    socket.on("leave_room", user=>{
        dispatch({
            type: LEAVE_ROOM,
            payload: user
        })
    })
    socket.on("send_message",(message)=>{
        dispatch({
            type: SEND_MESSAGE,
            payload:message
        })
    })

    socket.on("get_messages", messages=>{
        dispatch({
            type: GET_MESSAGES,
            payload: messages
        })
    })
    socket.on("exist_room", ()=>{
        dispatch({
            type: EXIST_ROOM,
        })
    })


}
export const sendMessage = (message, room, user)=>dispatch=>{
    socket.emit("send_message", ({message: message, room: room, user:user}))
}

export const getMessages = (room) => dispatch =>{
    socket.emit("get_messages", room)
}

export const getNewMessage = ()=>dispatch =>{
    socket.on("get_new_message", data => {
        dispatch({
            type: GET_NEW_MESSAGE,
            payload: data
        })
    })
}
export const getParticipants = (room) => dispatch =>{
    socket.emit("get_participants", room)

    socket.on("get_participants", data => {
        console.log(data)
        dispatch({
            type: GET_USERS_IN_CHAT,
            payload: data
        })
    })
}


export const leaveRoom = (room, user)=>dispatch=>{
    console.log("leave")
    socket.emit("leave_room", {room: room, user: user})
    socket.off("get_messages")
    socket.off("get_new_message")
    socket.off("get_users")
    socket.off("join_room")
    socket.off("send_message")
    socket.off("exist_room")
}


export const getUsersInChat = (room) => dispatch=>{
    socket.emit("get_users", room)
    socket.on("get_users", users=>{
        dispatch({
            type: GET_USERS_IN_CHAT,
            payload: users
        })
    })
    socket.on("leave_room", user=>{
        dispatch({
            type: LEAVE_ROOM,
            payload: user
        })
    })
}

