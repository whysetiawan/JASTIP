import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import styles from '../../components/style.js';
import { connect } from 'react-redux';
import { Header, SearchBar } from 'react-native-elements';
import InstagramLogin from 'react-native-instagram-login';
import { fetchPost } from '../../actions';

class Explore extends Component {
	componentDidMount(){
    this.props.fetchPost()
	}
	render(){
    console.log(this.props.post.data)
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
      <Header 
        backgroundColor="#1E4072"
        centerComponent={
          (
          <SearchBar
            lightTheme
            containerStyle={{width:320}}
            placeholder="Search"
          />
        )
      }
      />
		</View>
		)
	}
}

			<InstagramLogin
        ref='instagramLogin'
        clientId='fa2dc113c7d745d0b3f45f1d2be6a61d'
        scopes= {['public_content']}
        onLoginSuccess= {
          (token) => dispatch({ type: INSTAGRAM_SUCCESS, payload: token})
        }
      />

mapDispatchToProps = (dispatch) => {
  return {
		fetchPost: () => dispatch(fetchPost())
  }
}

mapStateToProps = (state) => {
  return {
    post: state.post
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Explore);