import { CHECK_CONNECTION_STATUS } from '../constants';

const initState = {
  isConnected: false
}

export default connectReducer = ( state= initState, action ) => {
  switch(action.type) {
    case CHECK_CONNECTION_STATUS:
    return Object.assign({}, state, {
      isConnected: action.isConnected
    });
    default:
      return state;
  }
}