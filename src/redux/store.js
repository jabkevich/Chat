import {applyMiddleware, createStore} from "redux";

import {rootReducer} from "./rootReducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";


const middleware = [thunk]
import logger from "redux-logger"

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(...middleware, logger)))

export default store