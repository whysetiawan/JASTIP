import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ListView,
  ActivityIndicator,
  NetInfo,
  TouchableWithoutFeedback
} from 'react-native';
import styles from '../../../components/style.js';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header, SearchBar, Avatar } from 'react-native-elements';
import { fetchPost, connectionStatus } from '../../../actions';
import firebase from 'react-native-firebase';

class Detail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:  `Tobias Eaton's Trip`,
    headerStyle: {backgroundColor:'#1E4072'},
    headerTintColor: "#FFFFFF",
    headerRight: (
    <View style={[styles.rowContainer, {margin: 10}]}>
      <Icon name="md-heart" color="#FFFFFF" size={30} />
      <Icon name="md-share" color ="#FFFFFF" size={30} style={{marginLeft:10,marginRight:10}} />
      <Icon name="md-chatboxes" color="#FFFFFF" size={30} />
    </View>
  )
  });
  constructor(){
    super()
      this.state = {
        dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
      }
  }
	render(){
    let {
      params: {
      post: {
        key, arrival_date, author_id, departure_date, description, destination, max_items, max_weight, origin
      }
    } 
  } = this.props.navigation.state;
  console.log(key)
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    console.log(this.props.post)
		return(
      <View style={[styles.rowContainer, {borderBottomWidth: 0.7, borderColor:'#666666', margin: 5 }]}>
        <View style={styles.exploreContainerListview}>
          <Avatar 
          rounded
          large
          />
        </View>
        <View style={styles.exploreContainerListview}>
          <View>
            <Text style={styles.exploreBoldText} > Tobias Eaton </Text>
          </View>
          <View style={styles.listViewTrip}>          
            <Text style={styles.listViewTripText}> {origin} </Text>
              <Icon name="md-arrow-round-forward" size={20} color="#FFFFFF" style={{marginLeft: 10, marginRight:10}} />
            <Text style={styles.listViewTripText}> {destination} </Text>
          </View>
          <View>
            <Text style={styles.normalTextSize}> {`Depart at ${departure_date}`} </Text>
            <Text style={styles.normalTextSize}> {`Arrive at ${arrival_date}`} </Text>
          </View>
        </View>
      </View>
    )
	}
}

mapDispatchToProps = (dispatch) => {
  return {
		fetchPost: () => dispatch(fetchPost())
  }
}

mapStateToProps = (state) => {
  return {
    post: state.post,
    isConnected: state.connect
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Detail);