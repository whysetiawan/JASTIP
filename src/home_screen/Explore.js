import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ListView,
  ActivityIndicator,
  NetInfo
} from 'react-native';
import styles from '../../components/style.js';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header, SearchBar, Avatar } from 'react-native-elements';
import InstagramLogin from 'react-native-instagram-login';
import { fetchPost, connectionStatus } from '../../actions';
import firebase from 'react-native-firebase';

class Explore extends Component {
  constructor(){
    super();
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
    }
  }

  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnection)
  }

  _handleConnection = (isConnected) => {
    this.props.dispatch(connectionStatus({ status: isConnected }))
  }

	componentDidMount(){
    // firebase.database().ref('user').on('value', (snap) => {
    //   console.log(snap.val())
    // })
    this.props.fetchPost();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.post.data)
    })
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnection)
  }

  fetchData(){
      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(items)
      // })
  }

  renderRow(post) {
    const { author_id, key, origin, destination, description, max_items, max_weight } = post
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
    // console.log(this.props.post.data[0].author_id)
		return(
		<View style={styles.container}>
      <Header 
        backgroundColor="#1E4072"
        centerComponent={
          (
          <SearchBar
            lightTheme
            containerStyle={{width:320}}
            placeholder="Search"
          />
        )
      }
      />
      <View style={styles.rowContainer}>
      
        <View style={styles.rowHeaderExplore}>
          <Text style={styles.exploreBoldText}> Feed </Text>
        </View>

        <View style={styles.rowHeaderExplore}>
          <Text style={styles.exploreBoldText}> Filter </Text>
        </View>

      </View>
      <View style={styles.rowContainer} >
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
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



export default connect(mapStateToProps, mapDispatchToProps)(Explore);