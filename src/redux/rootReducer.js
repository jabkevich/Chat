import {combineReducers} from "redux";
import {authReducer} from "./auth/authReduser";
import {roomsReducer} from "./rooms/roomsReducer";
import {usersReducer} from "./users/usersReducer";
import {chatReducer} from "./chat/chatReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    rooms:roomsReducer,
    users: usersReducer,
    chat: chatReducer
})