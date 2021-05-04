import {GET_MESSAGES, GET_USERS_IN_CHAT, SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM, GET_NEW_MESSAGE, EXIT_GOT} from "./types"
import {EXIST_ROOM} from "../rooms/types";

const initialState = {
    usersInChat: [],
    messages: {},
    exist_room: false
}


export const chatReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_USERS_IN_CHAT:
            return{
                ...state,
                usersInChat: action.payload
            }
        case SEND_MESSAGE:
            let newMessage = state.messages
            if( action.payload.room in newMessage)
                state.messages[action.payload.room].push(action.payload.message)
            else{
                state.messages[action.payload.room] = []
                state.messages[action.payload.room].push(action.payload.message)
            }
            return {
                ...state,
                messages: {...action.messages, ...newMessage}
            }
        case JOIN_ROOM:
            console.log(action.payload)
            return {
                ...state,
                usersInChat: [...state.usersInChat, action.payload]
            }
        case GET_MESSAGES:
            let messages = state.messages
            messages[action.payload.room] = action.payload.messages
            return {
                ...state,
                messages: {...action.messages, ...messages}
            }
        case LEAVE_ROOM:
            return {
                ...state,
                usersInChat: state.usersInChat.filter(userInChat => userInChat.socketId !== action.payload.socketId)
            }
        case EXIST_ROOM:
            return {
                ...state,
                exist_room: true
            }
        case EXIT_GOT:
            return {
                ...state,
                exist_room: false
            }
        default:
            return state
    }
}