import {GET_USERS, NEW_USER, USER_DISCONNECTED} from "./types";
import {socket} from "../../socket"


export const getUsers = () =>dispatch=>{
    socket.emit("get_users");
}

export const on =()=>dispatch=>{
    socket.on("get_users", users => {
        dispatch({
            type: GET_USERS,
            payload: users
        })
    })
    socket.on("new_user", user => {
        dispatch({
            type: NEW_USER,
            payload: user
        })
    })
    socket.on("user_disconnected", socketID => {
        dispatch({
            type: USER_DISCONNECTED,
            payload: socketID
        })
    })
}

export const offUsers = () =>dispatch=>{
    socket.off("get_users")
    socket.off("new_user")
}