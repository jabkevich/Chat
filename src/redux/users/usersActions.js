import {GET_USERS} from "./types";

import openSocket from "socket.io-client"


export const getUsers = () =>dispatch=>{
    const socket = openSocket("http://localhost:6600");
    socket.emit("get_users");
    let users = []
    socket.on("get_users", visitors => {
        dispatch({
            type: GET_USERS,
            payload: visitors
        })
    })


}