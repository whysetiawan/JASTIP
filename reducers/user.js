import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from '../constants';

const initState = {
  loading: false,
  user: {},
  error: ''
}

export default userReducer = (state= initState, action) => {
  switch(action.type){
    case FETCH_USER_REQUEST:
    return{
      ...state,
      loading:true
    }
    case FETCH_USER_SUCCESS:
    return {
      ...state,
      loading:false,
      user: action.payload
    }
    case FETCH_USER_FAILURE:
    return {
      ...state,
      loading:false,
      error: action.payload
    }
    default:
    return state
  }
}