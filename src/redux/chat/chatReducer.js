import {GET_MESSAGES, GET_USERS_IN_CHAT, SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM, GET_NEW_MESSAGE} from "./types"

const initialState = {
    usersInChat: [],
    messages: []
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
                messages: action.payload
            }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case GET_NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case JOIN_ROOM:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case LEAVE_ROOM:
            return {
                ...state,
                usersInChat: [],
                messages: []
            }
        default:
            return state
    }
}