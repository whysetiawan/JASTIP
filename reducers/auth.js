import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from '../constants';

const initialState = {
  loggedIn: false,
  loading:false,
  user: {},
  error: ''
};

export default authReducer = (state = initialState, action) => {
  switch(action.type){
    case SIGN_IN_REQUEST:
    return {
      ...state,
      loading: true
    }
    case SIGN_IN_SUCCESS: 
    return {
      ...state,
      loading: false,
      loggedIn: true,
      user: action.payload
    }
    case SIGN_IN_FAILURE:
    return {
      ...state,
      error: action.payload
    }
    case SIGN_UP_REQUEST:
    return {
      ...state,
      loading: true
    }
    case SIGN_UP_SUCCESS:
    return {
      ...state,
      user: action.payload
    }
    case SIGN_UP_FAILURE:
    return {
      ...state,
      error: action.payload
    }
    default: 
    return state;
  }
}