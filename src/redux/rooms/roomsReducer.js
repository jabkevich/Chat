import {ADD_ROOMS, GET_ROOMS} from "./types";

const initialState = {
    rooms: []
}

export const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROOMS:
            return{
                ...state,
                rooms: [...state.rooms, action.payload]
            }
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        default:
            return state

    }
}