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
	ActivityIndicator,
	Modal
} from 'react-native';
import styles from '../../components/style.js';
import { fetchingUser, uploadProfilePhoto, uploadCoverPhoto } from '../../actions/';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Avatar, Divider } from 'react-native-elements';
import Animation from 'lottie-react-native';

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
	
	initAnimation(){
    if (!this.animation){
      setTimeout(() => {
        this.initAnimation();
      }, 100);
    } else {
        this.animation.play();
    }
  }

  componentDidMount(){
    this.initAnimation();
  }

  action(i) {
    this.setState({
      selected: i
		})
		const action = this.state.selected;
		if (action === 1){
			ImagePicker.openCamera({}).then((image) => {
				this.props.uploadPhoto({ id: this.props.auth.user.uid, image: image})
			})
		}
		else if (action === 2){
			ImagePicker.openPicker({}).then((image) => {
				this.props.uploadPhoto({ id: this.props.auth.user.uid, image: image})
			})
		}
	}
	
	actionCover(i) {
    this.setState({
      selected: i
		})
		const action = this.state.selected;
		if (action === 1){
			ImagePicker.openCamera({}).then((image) => {
				this.props.uploadCoverPhoto({ id: this.props.auth.user.uid, image: image})
			})
		}
		else if (action === 2){
			ImagePicker.openPicker({}).then((image) => {
				this.props.uploadCoverPhoto({ id: this.props.auth.user.uid, image: image})
			})
		}
	}

	componentDidMount(){
		const id = this.props.auth.user.uid;
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
		const avatar = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
		return(
		<View style={styles.container}>
			<ScrollView>
				<TouchableOpacity
					onPress={() => this.ActionSheetCover.show()}
				>
				<View style={styles.defaultCover}>
					{
						user.cover_image == '' ? 
					(
							<Text style={styles.customTextButton}> Press to set your cover Photos </Text>
					):
						<Image 
							style={{width:'100%', height:'100%'}}
							source={{uri: user.cover_image}}
						/>
				}
				</View>
				</TouchableOpacity>

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
									{
										loading ? <ActivityIndicator size = "large"/> 
									:
										<TouchableWithoutFeedback
										 onPress={this.showActionSheet.bind(this)}
										>
											<Image
												style={styles.largeProfileImage}
												source=
												{{uri: 
													user.profile_image ==  undefined ?  avatar
													:
													user.profile_image == '' ? avatar
													:
													user.profile_image
												}}
											>
											</Image>
										</TouchableWithoutFeedback>
									}
						</View>
						<View style={{bottom:20, left: 50, width:110}} >
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
				<ActionSheet
          ref={o => this.ActionSheetCover = o}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={this.actionCover.bind(this)}
        />
				<Modal
          animationType="fade"
          visible={this.props.user.loading}
          onRequestClose={() => {console.log("Modal has been closed.")}}
          >
          <View style={styles.container}>
            <View style={styles.centerContainer}>
            <Animation
                    ref={animation => {
                      this.animation = animation;
                    }}
                    style={{
                      width: 200,
                      height: 100
                    }}
                    loop={true}
                    source={require('../../components/animations/loading_animation.json')}
                />
            </View>
          </View>
          </Modal>
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
		getUser: (uid) => dispatch(fetchingUser(uid)),
		uploadPhoto: (uid, image) => dispatch(uploadProfilePhoto(uid, image)),
		uploadCoverPhoto: (uid, image) => dispatch(uploadCoverPhoto(uid, image))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);