import {GET_MESSAGES, GET_USERS_IN_CHAT, SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM} from "./types"

const initialState = {
    usersInChat: [],
    message: []
}


export const chatReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_USERS_IN_CHAT:
            return{
                ...state,
                usersInChat: action.payload
            }
        case GET_MESSAGES:
            return {
                ...state,
                message: action.payload
            }
        case SEND_MESSAGE:
            return {
                ...state,
                message: [...state.message, action.payload]
            }
        case JOIN_ROOM:
            return {
                ...state,
                message: action.payload
            }
        case LEAVE_ROOM:
            return {
                ...state,
                usersInChat: [],
                message: []
            }
    }
}