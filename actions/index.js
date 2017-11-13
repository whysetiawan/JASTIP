import firebase from '../components/Firebase';
import { NavigationActions } from 'react-navigation';
import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
} from '../constants';

export const signInUser = ({ email, password }) => {
return (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    dispatch({ type: SIGN_IN_SUCCESS, payload: user})
  })
  .then(() => {
    dispatch(NavigationActions.navigate({routeName: 'Tabs'}))
  })
  .catch((e) => {
    console.log(e)
    dispatch({ type: SIGN_IN_FAILURE, payload: e.code || e})
  })
  }
}

export const signUpUser = ({
  email,
  password,
  name,
  gender,
  birthdate,
  address
}) => {
  return(dispatch) => {
    dispatch({ type: SIGN_UP_REQUEST });
    var id;
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((user) => {
      id = user.uid
      dispatch({ type: SIGN_UP_SUCCESS, payload: user })
    })
    .catch ((e) =>
      dispatch({ type: SIGN_UP_FAILURE, payload: error.message })
    )
  }
}