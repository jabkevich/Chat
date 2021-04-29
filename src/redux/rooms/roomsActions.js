import {ADD_ROOMS, GET_ROOMS} from "./types";
import {socket} from "../../socket"


export const addRoom = (name, username) =>dispatch => {
    socket.emit("new_room", {name, username});
        dispatch({
            type: ADD_ROOMS,
            payload: {name, username}
        })
}

export const getRooms = () =>dispatch => {
    socket.emit("get_rooms");
    socket.on("get_rooms", rooms => {
        dispatch({
            type: GET_ROOMS,
            payload: rooms
        })
    })
}

export const getRoomsOff = () =>dispatch => {
    socket.off("get_rooms")
}

