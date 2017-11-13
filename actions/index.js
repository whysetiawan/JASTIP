import firebase from '../components/Firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk'
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
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName:'Tabs'
        })
      ]
    }))
  })
  .catch((e) => {
    console.log(e)
    dispatch({ type: SIGN_IN_FAILURE, payload: e.message || e})
  })
  }
}

export const signInFacebook = (user) => {
  return(dispatch) => {
    dispatch({ type: SIGN_IN_REQUEST })
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if(result.isCancelled) {
        console.log('you cancelled login')
      }
      else {
        AccessToken.getCurrentAccessToken().then((data) => {
          const token = data.accessToken.toString();
          const credential = firebase.auth.FacebookAuthProvider.credential(token);
          console.log(credential)
          dispatch({ type: SIGN_IN_SUCCESS ,payload:user})
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName:'Tabs'
              })
            ]
          }))
        })
    .catch((e) => {
      dispatch({ type: SIGN_IN_FAILURE, payload:e.message || e })
    })
      }
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
      console.log(id)
      dispatch({ type: SIGN_UP_SUCCESS, payload: user })
    })
    .catch ((e) =>
      dispatch({ type: SIGN_UP_FAILURE, payload: error.message })
    )
  }
}