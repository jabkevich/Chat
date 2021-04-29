import {ADD_ROOMS, GET_ROOMS} from "./types";
import {socket} from "../../socket"


export const addRoom = (name, user, time) =>dispatch => {
    console.log(time)
    const id = user.username+(time)
    socket.emit("new_room", {name, user, id});
        dispatch({
            type: ADD_ROOMS,
            payload: {name, user, id}
        })
}

export const getRooms = () =>dispatch => {
    socket.emit("get_rooms");
    socket.on("get_rooms", rooms => {
        console.log(socket.id)
        dispatch({
            type: GET_ROOMS,
            payload: rooms
        })
    })
}

export const getRoomsOff = () =>dispatch => {
    socket.off("get_rooms")
}

