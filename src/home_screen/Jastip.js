import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import styles from '../../components/style.js';
import { Header, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Rented extends Component {
	header(){
		return(
			<View style={styles.headerCenterBorder}>
				<Text style={[styles.bigTextSize,{ fontWeight:'600'}]}> JASTIP </Text>
			</View>
		)
	}

	render(){
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={[styles.container]}>
			<Header
				backgroundColor="#fefefe"
				centerComponent={this.header()}
				rightComponent={(<Icon 
					name="ios-add-outline" size={40} 
				color="dodgerblue" 
				onPress={() => this.props.navigation.navigate('AddTrip')} />)}
			/>			
			<View style={[styles.startContainer,{width:'100%'}]}>
				<Divider style={{backgroundColor:'#222'}}/>
					<View style={styles.RowJastipScreen}>
						<Text style={styles.TextTitleJastipScreen}
						onPress={() => this.props.navigation.navigate('Index')}
						> Current Trip </Text>
						<Icon name="ios-arrow-forward" size ={30} color="#222"/>
					</View>
				<Divider style={{backgroundColor:'#222'}}/>
					<View style={styles.RowJastipScreen} >
						<Text style={styles.TextTitleJastipScreen}> Passed Trip </Text>
						<Icon name="ios-arrow-forward" size ={30} color="#222"/>
					</View>
				<Divider style={{backgroundColor:'#222'}}/>
			</View>
		</View>
		)
	}
}