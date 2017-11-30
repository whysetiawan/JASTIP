import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ListView,
  ActivityIndicator,
  NetInfo,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import styles from '../../components/style.js';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header, SearchBar, Avatar } from 'react-native-elements';
import Animation from 'lottie-react-native';
import InstagramLogin from 'react-native-instagram-login';
import { fetchPost, connectionStatus } from '../../actions';
import firebase from 'react-native-firebase';

class Explore extends Component {
  constructor(){
    super()
      this.state = {
        dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
      }
  }

  componentDidMount(){
    this.props.fetchPost();
    if(!this.animation){
      setTimeout(() => {
        this.animation.play();
      }, 100 );
    }
    else if( this.animation === null ){
      setTimeout(() => {
        this.animation.play();
      }, 100 );
    }
    else {
      this.animation.play()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.post.data)
    })
  }

  renderRow(post) {
    const { author_id, profile_image, cover_image, name, email, gender, value, birthdate, key, origin, destination, description, max_items, max_weight } = post
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

    const depart = post.departure_date.split("-");
    let departDate  = depart.map((dates) => parseInt(dates));
    const departMonth = monthNames[departDate[1]-1];
    let departure_date = departDate.join("-");
    const d = new Date(departure_date);
    let departDay = days[d.getDay()];

    const arrive = post.arrival_date.split("-");
    let arriveDate = arrive.map((dates) => parseInt(dates));
    const arriveMonth = monthNames[arriveDate[1]-1];
    let arrival_date = arriveDate.join("-");
    const day = new Date(arrival_date);
    let arriveDay = days[day.getDay()];

    return(
      <View style={[styles.rowContainer, {borderBottomWidth: 0.7, borderColor:'#666666', margin: 5 }]}>
        <View style={styles.exploreContainerListview}>
          <Avatar 
          rounded
          large
          source={{uri: profile_image}}
          />
        </View>
        <View style={styles.exploreContainerListview}>
          <View>
            <Text style={styles.exploreBoldText} > {name} </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={ () => this.props.navigation.navigate('Detail', {post})}
          >
          <View style={styles.listViewTrip} key={key} >
            <Text style={styles.listViewTripText}> {origin} </Text>
              <Icon name="md-arrow-round-forward" size={20} color="#FFFFFF" style={{marginLeft: 10, marginRight:10}} />
            <Text style={styles.listViewTripText}> {destination} </Text>
          </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={styles.normalTextSize}> {`Depart at ${departDay}, ${departDate[2]} ${departMonth} ${departDate[0]}`} </Text>
            <Text style={styles.normalTextSize}> {`Arrive at ${arriveDay}, ${arriveDate[2]} ${arriveMonth} ${arriveDate[0]}`} </Text>
          </View>
        </View>
      </View>
    )
  }

	render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    const loader = () => {
      if(this.props.post.loading){
        return(
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
        )
      }
    }
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
      <ScrollView>
      <View style={styles.rowContainer}>
        
          <View style={styles.rowHeaderExplore}>
            <Text style={styles.exploreBoldText}> Feed </Text>
          </View>

          <View style={styles.rowHeaderExplore}>
            <Text style={styles.exploreBoldText}> Filter </Text>
          </View>
        </View>
        <View style={styles.rowContainer} >
          {
            this.props.post.loading ?
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
          :
          <View style={styles.rowContainer} >
            <ListView
              enableEmptySections
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />
          </View>
          }
          </View>
        </ScrollView>
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