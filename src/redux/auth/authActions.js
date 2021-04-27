import {LOGIN_INDALID, LOGIN_USER, LOGOUT_USER, TRY_LOAD_USER} from "./types";

import openSocket from "socket.io-client"


export const login = (username) => dispatch =>{
    sessionStorage.setItem('username', username);
    const socket = openSocket("http://localhost:6600");
    socket.emit("new_user", username);
    socket.on("helloNewUser", visitors => {
        console.log((visitors))
        username = visitors
    })
    dispatch({
        type: LOGIN_USER,
        payload: username
    })
}

export const tryLogin = () => dispatch =>{
    let username = sessionStorage.getItem('username');
    if(username)
    {
        const socket = openSocket("http://localhost:6600");
        socket.emit("new_user", username);
        socket.on("helloNewUser", visitors => {
            console.log((visitors))
            username = visitors
        })
        dispatch({
        type: TRY_LOAD_USER,
        payload: username
    })}

    else{
        dispatch({
            type: LOGIN_INDALID,
        })
    }
}

export const logout = () => dispatch =>{
    dispatch({
        type: LOGOUT_USER,
    })
}