import {LOGIN_INDALID, LOGIN_USER, LOGOUT_USER, TRY_LOAD_USER} from "./types";
import {socket} from "../../socket"


export const login = (username) => dispatch =>{
    sessionStorage.setItem('username', username);
    socket.emit("login", username)

}

export const tryLogin = () => dispatch =>{
    console.log( sessionStorage.getItem('username'))
    let username = sessionStorage.getItem('username');
    if(username)
    {
        socket.emit("login", username);
        socket.on("login", visitors => {
            dispatch({
                type: TRY_LOAD_USER,
                payload: visitors
            })
        })

    }
    else{
        dispatch({
            type: LOGIN_INDALID,
        })
    }
}
export const on =()=>dispatch=>{
    socket.on("login", data=>{
        dispatch({
            type: LOGIN_USER,
            payload: data
        })
    })
}

export const off =()=>dispatch=>{
        socket.off("login")
}

export const logout = (socketId) => dispatch =>{
    socket.disconnect()
    dispatch({
        type: LOGOUT_USER
    })
    sessionStorage.removeItem('username');
    location.reload()
}