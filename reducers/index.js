import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import navReducer from './nav';
import authReducer from './auth';
import userReducer from './user';
import postReducer from './post';
import connectReducer from './connect';
import chatroom from './chatroom';
import messages from'./messages';

export default allReducer = combineReducers({
        nav: navReducer,
        auth: authReducer,
        user: userReducer,
        form: formReducer,
        post: postReducer,
        connect: connectReducer,
        chatroom,
        messages
    });