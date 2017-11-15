import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback,
	ScrollView,
	TouchableNativeFeedback,
} from 'react-native';
import styles from '../../components/style.js';
import { fetchingUser } from '../../actions/';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Avatar, Divider } from 'react-native-elements';

const CANCEL_INDEX = 0
const options = ['Cancel','Take a selfie', 'Select from gallery']

class Profile extends Component {
	constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
    this.showActionSheet = this.showActionSheet.bind(this)
  }

  showActionSheet() {
    this.ActionSheet.show()
  }

  action(i) {
    this.setState({
      selected: i
		})
		const action = this.state.selected;
		if (action === 1){
			ImagePicker.openCamera({}).then((image){
				alert(image)
			})
		}
		else if (action === 2){
			ImagePicker.openPicker({}).then((image) => {
				alert(image)
			})
		}
  }

	componentDidMount(){
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
		const data = this.props.user
  	console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.defaultCover}>
				</View>

						<View style={styles.rowContainer}>
								<View style={styles.profileStyle}>
									<Text style={[styles.bigTextSize]}> {user.name} </Text>

										<View style={styles.rowContainer}>
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
										<TouchableWithoutFeedback
										 onPress={this.showActionSheet.bind(this)}
										>
											<Image
												style={styles.largeProfileImage}
												source={{uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}}
											>
											</Image>
										</TouchableWithoutFeedback>
						</View>
						<View style={{bottom:50, left: 50, width:110}} >
							<TouchableNativeFeedback
								onPress={() => this.props.navigation.navigate('EditProfile', {data})}
							>
								<Text style={[styles.normalTextSize]}> Edit your Profile </Text>
							</TouchableNativeFeedback>
						</View>
							<View style={styles.container}>
								<Divider 
									style={{ backgroundColor: '#616161', height:0.7}}
								/>
								<View style={[styles.rowSpaceBetweenContainer, {height: 50, alignItems:'center'}]} >
									<Text style={[styles.normalTextSize2]}> Payment </Text>
									<Icon name="ios-arrow-forward" size={30} color='#222' style={{right: 20}} />
								</View>
								<Divider 
									style={{ backgroundColor: '#616161', height:0.7}}
								/>
								<View style={[styles.container, {marginTop:12}]} >
									<Text style={[styles.normalTextSize2]}> Review </Text>
									<View style={[styles.rowContainer, {marginLeft: 5, height:60}]}>
										<Avatar
											medium
											rounded
											title={"KM"}
											containerStyle={{marginRight:5, marginTop:5}}
										/>
										<View>
											<Text style={styles.normalTextSize} > Kathryn McCormick </Text>
										</View>
									</View>
									<View style={[styles.startContainer, {margin: 5}]}>
										<Text style={[styles.smallTextSize, {textAlign:'auto'}]} > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. </Text>
										<Text style={[styles.smallTextSize, {color: '#00acee'}]}> See All </Text>
									</View>
								</View>
							</View>
			</ScrollView>
				<ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={this.action.bind(this)}
        />
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