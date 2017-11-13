import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import styles from '../components/style.js';
import { DefaultButton, TextButton } from '../components/elements/Button';

export default class Index extends Component {
	render(){
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		const {navigate} = this.props.navigation;
		return(
		<View style={[styles.container, {backgroundColor:'#1E4072'}]}>
			<View style={styles.centerContainer} >
				<View style={styles.startContainer}>
					<Text style={[styles.indexTitle, {bottom:80, left:35 }]}> Welcome to JASTIP </Text>
				</View>					
						<DefaultButton 
							style={styles.defaultButton}
							onPress={() => navigate('Signin')}
							styleText={styles.textDefaultButton}
							text="Sign In"
						/>

						<DefaultButton 
							style={styles.defaultButton}
							onPress={() => navigate('Register')}
							styleText={styles.textDefaultButton}
							text="Create an account"
						/>
			</View>
		</View>
		)
	}
}