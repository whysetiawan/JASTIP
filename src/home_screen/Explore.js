import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import styles from '../../components/style.js';
import { connect } from 'react-redux';
import InstagramLogin from 'react-native-instagram-login';
import { instagramLogin } from '../../actions';

class Explore extends Component {
	componentWillMount(){
		// this.refs.instagramLogin.show();
	}
	render(){
  		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
			<View style={styles.startContainer}>
			<Text style={styles.indexTitle}> Welcome </Text>
			<TouchableOpacity onPress={()=> this.refs.instagramLogin.show()}>
        <Text style={{color: 'white'}}>Login</Text>
    </TouchableOpacity>
    <InstagramLogin
        ref='instagramLogin'
        clientId='fa2dc113c7d745d0b3f45f1d2be6a61d'
        scopes={['public_content']}
        onLoginSuccess={(token) => this.setState({ token })}
    />
			</View>
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
		instagramLogin: () => dispatch(instagramLogin())
  }
}



export default connect(undefined, mapDispatchToProps)(Explore);