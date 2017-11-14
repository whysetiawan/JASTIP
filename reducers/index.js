import { combineReducers } from "redux";
import navReducer from './nav';
import authReducer from './auth';
import userReducer from './user';

export default allReducer = combineReducers({
        nav: navReducer,
        auth: authReducer,
        user: userReducer,
    });