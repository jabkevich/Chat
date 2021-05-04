import {GET_MESSAGES, GET_USERS_IN_CHAT, SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM, GET_NEW_MESSAGE} from "./types"

const initialState = {
    usersInChat: [],
    messages: {}
}


export const chatReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_USERS_IN_CHAT:
            return{
                ...state,
                usersInChat: action.payload
            }
        case SEND_MESSAGE:
            let newMessages = state.messages
            if( action.payload.room in newMessages)
                newMessages[action.payload.room].push(action.payload.message)
            else{
                newMessages[action.payload.room] = []
                newMessages[action.payload.room].push(action.payload.message)
            }
            return {
                ...state,
                messages: {...action, ...newMessages}
            }
        case JOIN_ROOM:
            console.log(action.payload)
            return {
                ...state,
                usersInChat: [...state.usersInChat, action.payload]
            }
        case LEAVE_ROOM:
            return {
                ...state,
                usersInChat:  state.usersInChat.filter(userInChat=>userInChat.socketId !== action.payload.socketId)
            }
        default:
            return state
    }
}