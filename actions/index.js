import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import InstagramLogin from 'react-native-instagram-login';
import { NavigationActions } from 'react-navigation';
import fb from '../components/Firebase';
import RNFetchBlob from 'react-native-fetch-blob';
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
  FETCH_USER_FAILURE,
  
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,

  UPLOAD_PROFILE_PHOTO,
  UPLOAD_PROFILE_PHOTO_SUCCESS,
  UPLOAD_PROFILE_PHOTO_FAILURE,

  UPLOAD_COVER_PHOTO,
  UPLOAD_COVER_PHOTO_SUCCESS,
  UPLOAD_COVER_PHOTO_FAILURE
} from '../constants';

export const signInUser = ({ email, password }) => {
return (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    console.log(user)
    dispatch({ type: SIGN_IN_SUCCESS, payload: user._user})
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
          AccessToken.getCurrentAccessToken().then( async (data) => {
          const credential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          const user = await firebase.auth().signInWithCredential(credential).then((user) => {
            console.log(user._user)
            dispatch(NavigationActions.navigate({routeName:'Tabs'}))
            dispatch({ type: SIGN_IN_SUCCESS, payload:user._user})
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
  number
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
        number: number
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

export const editProfile = ({
  uid,
  name,
  email, 
  password, 
  number, 
  birthdate, 
  gender, 
  value, 
  address
}) => {
  return(dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST })
    firebase.database().ref(`user/${uid}`).update({
      name: name,
      email: email,
      password: password,
      number: number,
      birthdate: birthdate,
      gender: gender,
      value: value,
      address: address
    })
    .then(() => {
    dispatch({ type: UPDATE_USER_SUCCESS })
    })
    .catch((e) => {
    dispatch({ type: UPDATE_USER_FAILURE, payload: e })
    })
  }
}

export const uploadProfilePhoto = ({id, image}) => {

  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  const sessionId = new Date().getTime()
  window.Blob = Blob;
  const imageRef = fb.storage().ref('Profile').child(`${id}/Image - ${sessionId}`)
  let mime = 'image/jpg';
  const path = image.path;
  let uploadBlob = null

  return (dispatch) => {
    dispatch({ type: UPLOAD_PROFILE_PHOTO })
    fs.readFile(path, 'base64')
    .then((data) => {
      return Blob.build(data, { type: `${mime};BASE64` })
    })
    .then((blob) => {
      uploadBlob = blob
      return imageRef.put(blob, { contentType:mime })
    })
    .then(() => {
      uploadBlob.close();
      return imageRef.getDownloadURL()
    })
    .then( async (url) => {
      firebase.database().ref(`user/${id}`).update({
        profile_image: url
      }).then(() => {
        dispatch({ type: UPLOAD_PROFILE_PHOTO_SUCCESS, payload: url })
      })
    })
    .catch((e) => {
      dispatch({ type: UPLOAD_PROFILE_PHOTO_FAILURE, payload: e })
    })
  }
}

export const uploadCoverPhoto = ({id, image}) => {
  
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    const sessionId = new Date().getTime()
    window.Blob = Blob;
    const imageRef = fb.storage().ref('Cover').child(`${id}/Image - ${sessionId}`)
    let mime = 'image/jpg';
    const path = image.path;
    let uploadBlob = null
  
    return (dispatch) => {
      dispatch({ type: UPLOAD_COVER_PHOTO })
      fs.readFile(path, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType:mime })
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL()
      })
      .then( async (url) => {
       await firebase.database().ref(`user/${id}`).update({
          cover_image: url
        }).then(() => {
          dispatch({ type: UPLOAD_COVER_PHOTO_SUCCESS, payload: url })
        })
      })
      .catch((e) => {
        dispatch({ type: UPLOAD_COVER_PHOTO_FAILURE, payload: e })
      })
    }
  }