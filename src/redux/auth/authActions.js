import {LOGIN_INDALID, LOGIN_USER, LOGOUT_USER, TRY_LOAD_USER} from "./types";
import {socket} from "../../socket"


export const login = (username) => dispatch =>{
    console.log()
    sessionStorage.setItem('username', username);
    socket.emit("new_user", username);
    socket.on("helloNewUser", visitors => {
        sessionStorage.setItem('socket', socket.id);
        console.log(socket.id)
        dispatch({
            type: LOGIN_USER,
            payload: visitors
        })
    })

}

export const tryLogin = () => dispatch =>{
    console.log( sessionStorage.getItem('username'))
    let username = sessionStorage.getItem('username');
    if(username)
    {
        socket.emit("new_user", username);
        socket.on("helloNewUser", visitors => {
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

export const loginOff = () =>dispatch =>{
    socket.off("helloNewUser")
}

export const logout = (socketId) => dispatch =>{
    socket.disconnect()
    dispatch({
        type: LOGOUT_USER,
    })
    sessionStorage.removeItem('username');
    location.reload()
}