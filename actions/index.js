import firebase from '../components/Firebase';
import { NavigationActions } from 'react-navigation';
import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS
} from '../constants';

export const signInUser = ({ email, password }) => {
return (dispatch) => {
  console.log(email)
  dispatch({ type: SIGN_IN_REQUEST });
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    dispatch({ type: SIGN_IN_SUCCESS, payload: user})
  })
  .then(() => {
    dispatch(NavigationActions.navigate({routeName: 'Index'}))
  })
  .catch((e) => {
    console.log(e)
    dispatch({ type: SIGN_IN_FAILURE, payload: e.code || e})
  })
  }
}