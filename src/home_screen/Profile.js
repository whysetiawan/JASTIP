import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback
} from 'react-native';
import styles from '../../components/style.js';
import { fetchingUser } from '../../actions/';
import { connect } from 'react-redux';
import { Avatar, Divider } from 'react-native-elements';

class Profile extends Component {

	componentWillMount(){
		const id = this.props.auth.user.uid;
		console.log(id)
		this.props.getUser(id);
	}

	render(){
			const {
				loading, error, user: {
				user
			} 
		} = this.props;
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={[styles.container, {backgroundColor: '#fefefe'}]}>
			<View style={styles.defaultCover}>
			</View>

					<View style={styles.rowSpaceBetween}>
						<TouchableWithoutFeedback>
							<View style={styles.profileStyle}>
								<Text style={[styles.bigTextSize]}> {user.name} </Text>

									<View style={styles.rowSpaceBetween}>
										<View style={styles.followingStyle}>
											<Text style={styles.bigTextSize2}> 50 </Text>
											<Text style={[styles.normalTextSize]}> Followers </Text>
										</View>

										<View style={styles.followingStyle}>
											<Text style={styles.bigTextSize2}> 10 </Text>
											<Text style={[styles.normalTextSize]}> Following </Text>
										</View>
									</View>
							</View>
						</TouchableWithoutFeedback>
									<Avatar
										xlarge
										rounded
										source={{uri:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}}
										containerStyle={{left: 40}}
									/>
					</View>
		</View>
		)
	}
}

mapStateToProps = (state) => {
  return {
		auth: state.auth,
		user: state.user
  };
}

mapDispatchToProps = (dispatch) => {
	return {
		getUser: (uid) => dispatch(fetchingUser(uid))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);