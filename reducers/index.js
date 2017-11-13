import { combineReducers } from "redux";
import navReducer from './nav';
import authReducer from './auth';
export default allReducer = combineReducers({
        nav: navReducer,
        auth: authReducer,
    });