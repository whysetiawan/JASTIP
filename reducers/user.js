import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  
  UPLOAD_PROFILE_PHOTO,
  UPLOAD_PROFILE_PHOTO_SUCCESS,
  UPLOAD_PROFILE_PHOTO_FAILURE,

  UPLOAD_COVER_PHOTO,
  UPLOAD_COVER_PHOTO_SUCCESS,
  UPLOAD_COVER_PHOTO_FAILURE,

  FETCH_USER_POST_REQUEST,
  FETCH_USER_POST_SUCCESS,
  FETCH_USER_POST_FAILURE,

  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS
} from '../constants';

const initState = {
  loading: false,
  user: {},
  error: false,
  errorMsg: ''
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
      error: true,
      errorMsg: action.payload
    }
    case UPDATE_USER_REQUEST:
    return {
      ...state,
      loading: true,
    }
    case UPDATE_USER_SUCCESS:
    return {
      ...state,
      loading: false,
    }
    case UPDATE_USER_FAILURE:
    return {
      ...state,
      loading:false,
      error: true,
      errorMsg: action.payload
    }
    case UPLOAD_PROFILE_PHOTO:
    return {
      ...state,
      loading: true
    }
    case UPLOAD_PROFILE_PHOTO_SUCCESS:
    return {
      ...state,
      loading: false,
      user: {
        ...state.user,
        profile_image:action.payload
      }
    }
    case UPLOAD_PROFILE_PHOTO_FAILURE:
    return {
      ...state,
      loading:false,
      errorMsg: action.payload
    }
    case UPLOAD_COVER_PHOTO:
    return {
      ...state,
      loading:true,
    }
    case UPLOAD_COVER_PHOTO_SUCCESS:
    return {
      ...state,
      loading: false,
      user: {
        ...state.user,
        profile_cover: action.payload
      }
    }
    case UPLOAD_COVER_PHOTO_FAILURE:
    return {
      ...state,
      loading: false,
      error: true,
      errorMsg: action.payload
    }
    case FETCH_USER_POST_REQUEST:
    return {
      ...state,
      loading:true
    }
    case FETCH_USER_POST_SUCCESS:
    return {
      ...state,
      loading: false,
      user: {
        ...state.user,
        post: action.payload
      }
    }
    case FETCH_USER_POST_FAILURE:
    return {
      ...state,
      loading: false,
      error: true,
      errorMsg: action.payload
    }
    case ADD_TO_WISHLIST_REQUEST:
    return {
      ...state,
    }
    case ADD_TO_WISHLIST_SUCCESS:
    return {
      ...state,
    }
    case ADD_TO_WISHLIST_FAILURE:
    return {
      ...state,
      error : true,
      errorMsg: action.payload
    }
    default:
    return state
  }
}