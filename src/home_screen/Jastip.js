import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
	TouchableWithoutFeedback,
	ListView,
} from 'react-native';
import { userPost } from '../../actions';
import styles from '../../components/style.js';
import { connect } from 'react-redux';
import { Header, Divider, Avatar } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';

class Jastip extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentCollapsed: true,
			passedCollapsed: true,
			current_trip: [],
			passed_trip: [],
			current_trip_dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
			passed_trip_dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		}
	}
	centerHeader(){
		return(
			<View style={styles.headerCenterBorder}>
				<Text style={[styles.bigTextSize,{ fontWeight:'600'}]}> JASTIP </Text>
			</View>
		)
	}

	componentDidMount(){
		this.props.fetchUserPost({ uid:this.props.auth.user.uid })
	}

	componentWillReceiveProps({user}){
		const { post } = user.user;
		if( post !== undefined ) {
			this.setState({current_trip: []}, ()=> {
				this.setState({passed_trip: []})
				post.forEach((posts) => {
					const today = new Date();
						const trip = new Date(posts.departure_date)
						if (today < trip){
							this.setState((prevState) => {
								const current_trip = prevState.current_trip.concat(posts)
								return {
									current_trip,
									current_trip_dataSource: prevState.current_trip_dataSource.cloneWithRows(current_trip)
								}
							})
						}
						else {
							this.setState((prevState) => {
								const passed_trip = prevState.passed_trip.concat(posts)
								return {
									passed_trip: prevState.passed_trip.concat(posts),
									passed_trip_dataSource: prevState.passed_trip_dataSource.cloneWithRows(passed_trip)
								}
						})
						}
					})
			})

		}
	}

	currentTrip(post) {
    const { author_id, profile_image, cover_image, name, email, gender, value, birthdate, key, origin, destination, description, max_items, max_weight } = post
    return(
      <View style={[styles.rowContainer, {margin: 5 }]}>
        <View style={styles.exploreContainerListview}>
          <TouchableWithoutFeedback>
          <View style={styles.listViewTrip} key={key} >          
            <Text style={styles.listViewTripText}> {origin} </Text>
              <Icon name="md-arrow-round-forward" size={20} color="#FFFFFF" style={{marginLeft: 10, marginRight:10}} />
            <Text style={styles.listViewTripText}> {destination} </Text>
          </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={styles.normalTextSize}> {`Depart at ${post.departure_date}`} </Text>
            <Text style={styles.normalTextSize}> {`Arrive at ${post.arrival_date}`} </Text>
          </View>
        </View>
      </View>
    )
	}
	
	passedTrip(post){
		const { author_id, profile_image, cover_image, name, email, gender, value, birthdate, key, origin, destination, description, max_items, max_weight } = post
    return(
      <View style={[styles.rowContainer, {margin: 5 }]}>
        <View style={styles.exploreContainerListview}>
          <TouchableWithoutFeedback>
          <View style={styles.listViewTrip} key={key} >          
            <Text style={styles.listViewTripText}> {origin} </Text>
              <Icon name="md-arrow-round-forward" size={20} color="#FFFFFF" style={{marginLeft: 10, marginRight:10}} />
            <Text style={styles.listViewTripText}> {destination} </Text>
          </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={styles.normalTextSize}> {`Depart at ${post.departure_date}`} </Text>
            <Text style={styles.normalTextSize}> {`Arrive at ${post.arrival_date}`} </Text>
          </View>
        </View>
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
				centerComponent={this.centerHeader()}
				rightComponent={(<Icon 
					name="ios-add-outline" size={40} 
				color="dodgerblue" 
				onPress={() => this.props.navigation.navigate('AddTrip')} />)}
			/>			
			<View style={[styles.startContainer,{width:'100%'}]}>
				<Divider style={{backgroundColor:'#222'}}/>

					<TouchableWithoutFeedback
						onPress={() => this.setState({ currentCollapsed: !this.state.currentCollapsed })}
					>
					<View style={styles.RowJastipScreen}>
						<Text style={styles.TextTitleJastipScreen}> Current Trip </Text>
						<Icon name={ this.state.currentCollapsed ? "ios-arrow-forward" : 'ios-arrow-down-outline'} size ={30} color="#222"/>
					</View>
					</TouchableWithoutFeedback>
					<Collapsible collapsed={this.state.currentCollapsed} align="center">
						<ListView
							enableEmptySections
							dataSource={this.state.current_trip_dataSource}
							renderRow={this.currentTrip.bind(this)}
						/>
					</Collapsible>

				<Divider style={{backgroundColor:'#222'}}/>

					<TouchableWithoutFeedback
						onPress={() => this.setState({ passedCollapsed: !this.state.passedCollapsed })}
					>
						<View style={styles.RowJastipScreen} >
							<Text style={styles.TextTitleJastipScreen}> Passed Trip </Text>
							<Icon name={ this.state.passedCollapsed ? "ios-arrow-forward" : 'ios-arrow-down-outline'} size ={30} color="#222"/>
						</View>
					</TouchableWithoutFeedback>
					<Collapsible collapsed={this.state.passedCollapsed} align="center">
						<ListView
							enableEmptySections
							dataSource={this.state.passed_trip_dataSource}
							renderRow={this.passedTrip.bind(this)}
						/>
					</Collapsible>
				<Divider style={{backgroundColor:'#222'}}/>
			</View>
		</View>
		)
	}
}

mapDispatchToProps = (dispatch) => {
	return {
		fetchUserPost: (uid) => dispatch(userPost(uid))
	}
}

mapStateToProps = (state) => {
	return {
		auth: state.auth,
		// post: state.post,
		user: state.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Jastip)