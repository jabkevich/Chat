import {LOGIN_INDALID, LOGIN_USER, LOGOUT_USER, TRY_LOAD_USER} from "./types";

const initialState = {
    user: null,
    isAuthenticated: false,
    tryedLogin: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return{
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case LOGIN_INDALID:
        case LOGOUT_USER:
            return{
                ...state,
                user: null,
                isAuthenticated: false,
                tryedLogin: true
            }
        case TRY_LOAD_USER:
            return {
                ...state,
                tryedLogin: true,
                user: action.payload,
                isAuthenticated: true
            }
        default:
            return state

    }
}