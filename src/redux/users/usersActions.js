import {GET_USERS} from "./types";
import {socket} from "../../socket"
import openSocket from "socket.io-client"


export const getUsers = () =>dispatch=>{
    socket.emit("get_users");
    socket.on("get_users", visitors => {
        dispatch({
            type: GET_USERS,
            payload: visitors
        })
    })
}


export const getUsersOff = () =>dispatch=>{
    socket.on("getUsersFoo")
}