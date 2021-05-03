import {GET_USERS, NEW_USER,USER_DISCONNECTED} from "./types";

const initialState = {
    users: []
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return{
                ...state,
                users: action.payload
            }
            case NEW_USER:
            return{
                ...state,
                users: [...state.users, action.payload]
            }
            case USER_DISCONNECTED:
            return{
                ...state,
                users: state.users.filter(user => user.socketId !==action.payload)
            }
        default:
            return state

    }
}