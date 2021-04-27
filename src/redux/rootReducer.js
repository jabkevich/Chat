import {combineReducers} from "redux";
import {authReducer} from "./auth/authReduser";
import {roomsReducer} from "./rooms/roomsReducer";
import {usersReducer} from "./users/usersReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    rooms:roomsReducer,
    users: usersReducer
})