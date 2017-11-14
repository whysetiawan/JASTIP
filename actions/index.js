import firebase from '../components/Firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import InstagramLogin from 'react-native-instagram-login';
import { NavigationActions } from 'react-navigation';
import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,

  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,

  INSTAGRAM_REQUEST,
  INSTAGRAM_SUCCESS,
  INSTAGRAM_FAILURE,

  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
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
          var provider = firebase.auth.FacebookAuthProvider();
          firebase.auth().signInWithPopup(provider).then((res) => {
            console.log(res)
          })
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
      firebase.database().ref(`user/${user.uid}`).set({
        name: name,
        email: email,
        password: password,
        gender: gender,
        birthdate: birthdate,
        address: address
      })
      dispatch({ type: SIGN_UP_SUCCESS, payload: user })
    })
    .catch ((e) =>
    dispatch({ type: SIGN_UP_FAILURE, payload: e.message })
    ) 
  }
}

// export const instagramLogin = () => {
//   return (dispatch) => {
//     this.refs.instagramLogin.show();
//     dispatch({ type: INSTAGRAM_REQUEST })
//     return(
//       <InstagramLogin
//         ref='instagramLogin'
//         clientId='fa2dc113c7d745d0b3f45f1d2be6a61d'
//         scopes= {['public_content']}
//         onLoginSuccess= {
//           (token) => dispatch({ type: INSTAGRAM_SUCCESS, payload: token})
//         }
//       />
//     )
//   }
// }

export const fetchingUser = (uid) => {
  return(dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST })
    firebase.database().ref(`user/${uid}`).on('value', (snap) => {
      console.log(snap.val())
      dispatch({type: FETCH_USER_SUCCESS, payload: snap.val()})
    })
    // .catch((e) => {
    //   dispatch({ type: FETCH_USER_FAILURE, payload: e.message || e })
    // })
  }
}
