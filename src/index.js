import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import styles from '../components/style.js';
import { DefaultButton, TextButton } from '../components/elements/Button';
import {connect} from 'react-redux';

class Index extends Component {
	render(){
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		const {navigate} = this.props.navigation;
		return(
		<View style={[styles.container, {backgroundColor:'#1E4072'}]}>
			<View style={styles.centerContainer} >
				<View style={styles.startContainer}>
					{!this.props.connect.isConnected ? <Text> OFF </Text> : <Text> ON </Text>}
					<Text style={[styles.indexTitle, {bottom:80, left:35 }]}> Welcome to JASTIP </Text>
				</View>				
						<DefaultButton 
							style={styles.customButton}
							onPress={() => navigate('Signin')}
							styleText={styles.customTextButton}
							text="Sign In"
						/>

						<DefaultButton 
							style={styles.customButton}
							onPress={() => navigate('Register')}
							styleText={styles.customTextButton}
							text="Create an account"
						/>
			</View>
		</View>
		)
	}
}

const mapStateToProps = (state) => {
	return{
	connect: state.connect
	}
}

export default connect(mapStateToProps)(Index)