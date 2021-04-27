import {ADD_ROOMS, GET_ROOMS} from "./types";

import openSocket from "socket.io-client"



export const addRoom = (name, username) =>dispatch => {
    const socket = openSocket("http://localhost:6600");
    socket.emit("new_room", {name, username});
        dispatch({
            type: ADD_ROOMS,
            payload: {name, username}
        })
}

export const getRooms = () =>dispatch => {
    const socket = openSocket("http://localhost:6600");
    socket.emit("get_rooms");
    socket.on("get_rooms", rooms => {
        dispatch({
            type: GET_ROOMS,
            payload: rooms
        })
    })
}