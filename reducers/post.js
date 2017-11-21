import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,

  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
} from '../constants';

const initState={
  loading: false,
  data: [],
  error:false,
  errorMsg: ''
}

export default postReducer = (state=initState, action) => {
  switch(action.type){
    case CREATE_POST_REQUEST:
    return {
      ...state,
      loading: true
    }
    case CREATE_POST_SUCCESS:
    return{
      ...state,
      loading:false
    }
    case CREATE_POST_FAILURE:
    return {
      ...state,
      error: true,
      loading: false,
      errorMsg: action.payload
    }
    case FETCH_POST_REQUEST:
    return{
      ...state,
      loading: true
    }
    case FETCH_POST_SUCCESS:
    return{
        ...state,
        loading:false,
        data: action.payload
      }
    case FETCH_POST_FAILURE:
    return{
      ...state,
      loading:false,
      error:true,
      errorMsg: action.payload
    }
    default:
    return state;
  }
}