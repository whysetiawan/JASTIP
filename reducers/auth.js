import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,

  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,

  INSTAGRAM_REQUEST,
  INSTAGRAM_SUCCESS,
  INSTAGRAM_FAILURE,
} from '../constants';

const initialState = {
  loggedIn: false,
  loading:false,
  user: {},
  error: true,
  errorMsg: '',
  igToken: ''
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
      user: action.payload,
      error: false,
    }
    case SIGN_IN_FAILURE:
    return {
      ...state,
      loading: false,
      error: true,
      errorMsg: action.payload
    }
    case SIGN_UP_REQUEST:
    return {
      ...state,
      loading: true
    }
    case SIGN_UP_SUCCESS:
    return {
      ...state,
      user: action.payload,
      loading: false,
      error: false,
    }
    case SIGN_UP_FAILURE:
    return {
      ...state,
      loading:false,
      error: true,
      errorMsg: action.payload
    }
    // case INSTAGRAM_REQUEST:
    // return {
    //   ...state,
    //   loading: true
    // }
    // case INSTAGRAM_SUCCESS:
    // return {
    //   ...state,
    //   loading:false,
    //   token: action.payload
    // }
    // case INSTAGRAM_FAILURE:
    // return {
    //   ...state,
    //   loading: false,
    //   error: true,
    //   errormsg: 'Login Failure'
    // }
    default: 
    return state;
  }
}