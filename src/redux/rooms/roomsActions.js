import {ADD_ROOMS, GET_ROOMS} from "./types";
import {socket} from "../../socket"



export const onSocket = () =>dispatch =>{
    socket.on("get_rooms", rooms => {
        dispatch({
            type: GET_ROOMS,
            payload: rooms
        })
    })
    socket.on("new_room", room => {
        dispatch({
            type: ADD_ROOMS,
            payload: room
        })
    })
}

//    const id = user.username+(time)
export const addRoom = (roomName, user, id) =>dispatch => {
    socket.emit("new_room", {roomName, user, id});
}

export const getRooms = () =>dispatch => {
    socket.emit("get_rooms");
}

export const getRoomsOff = () =>dispatch => {
    socket.off("get_rooms")
    socket.off("new_room")
}

