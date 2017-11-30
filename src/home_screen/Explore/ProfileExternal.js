import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
	TouchableOpacity,
	Dimensions,
	ScrollView
} from 'react-native';
import styles from '../../../components/style.js';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { DefaultButton } from '../../../components/elements/Button';
import { Header, Avatar, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 40.7134248;;
const LONGITUDE = -74.00552499;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ProfileExt extends Component {
	static navigationOptions = ({navigation}) => ({
		header: false
	})
	render(){
		const { post } =this.props.navigation.state.params
		console.log(post.location)
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		const verified = <Icon name="md-checkmark" color="#2ecc71" size={27} style={{ marginRight: 10}}/>;
		const notVerified = <Icon name="md-close" color="#c0392b" size={27} style={{ marginRight: 10}}/>
		return(
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.startContainer}>
					<ImageBackground
						style={{width:'100%', height: 150,}}
						source={{uri: post.cover_image}}
					>
						<Icon name="md-arrow-round-back" size={35} style={{marginLeft: 15}} color="#FFFFFF" onPress={() => this.props.navigation.goBack()}/>
						<Avatar
							rounded
							large
							source={{uri: post.profile_image}}
							containerStyle={{top:32, left:15}}
							avatarStyle={{borderWidth:1, borderColor:'white'}}
						/>
					</ImageBackground>
						<View style={styles.profileExtContainer}>
							<Text style={styles.bigBoltText}> {post.name} </Text>
							<View style={styles.rowContainer}>
								<View style={styles.relationsContainer}>
									<Text style={[styles.exploreBoldText, {textAlign:'center'} ]} > 550 </Text>
									<Text style={[styles.normalTextSize, {top:15}]}> Followers </Text>
								</View>
								<View style={styles.relationsContainer}>
									<Text style={[styles.exploreBoldText, {textAlign:'center'} ]} > 90 </Text>
									<Text style={[styles.normalTextSize, {top:15}]}> Following </Text>
								</View>
								<View style={styles.relationsContainer}>
								{
									this.props.auth.user.uid != post.author_id ?
									<DefaultButton
									text="Follow"
									styleText={styles.normalTextSize}
									style={styles.smallButton}
								/> :
									null
								}								
								</View>
							</View>
							<Divider style={{backgroundColor:'#222', marginTop:25}} />
							<View style={[styles.rowSpaceBetweenContainer, {marginTop:15}]}>
								<Text style={[styles.normalTextSize2,{ marginLeft: 10}]}> Verified </Text>
								{ this.props.auth.user.emailVerified ? verified : notVerified}
							</View>
							<Divider style={{backgroundColor:'#222', marginTop:15}} />
							<View style={[styles.rowSpaceBetweenContainer, {marginTop:15}]}>
								<Text style={[styles.normalTextSize2,{ marginLeft: 10}]}> Gender </Text>
								<Text style={[styles.normalTextSize2,{ marginLeft: 10}]}> {post.gender} </Text>
							</View>
								<Divider style={{backgroundColor:'#222', marginTop:15}} />
							<View style={[styles.startContainer, { marginTop: 15}]}>
								<Text style={[styles.normalTextSize2,{ marginLeft: 10}]}> {post.name} Locations </Text>
								<MapView
									style={styles.userLocation}
									region={{
										latitude: post.location.lat,
										longitude: post.location.lng,
										latitudeDelta: LATITUDE_DELTA,
										longitudeDelta: LONGITUDE_DELTA
									}}
									onRegionChange= {(region) => console.log(region)}
								>
									<MapView.Circle
										strokeColor='rgba(0, 0, 0,0.5)'
										fillColor='rgba(30, 144, 255,0.5)'
										center={{
											latitude: post.location.lat,
											longitude: post.location.lng
										}}
										radius={3000}
									/>
								</MapView>
							</View>
						</View>
				</View>
			</ScrollView>
		</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(ProfileExt);