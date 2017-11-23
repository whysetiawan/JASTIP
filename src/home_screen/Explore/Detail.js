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
import styles from '../../../components/style.js';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header, SearchBar, Avatar, Divider } from 'react-native-elements';
import { DefaultButton } from '../../../components/elements/Button';
import { fetchPost, connectionStatus, addToWishlist } from '../../../actions';
import StarRating from 'react-native-star-rating';

class Detail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:  `${navigation.state.params.post.name}'s Trip`,
    headerStyle: {backgroundColor:'#1E4072'},
    headerTintColor: "#FFFFFF",
    headerRight: (
    <View style={[styles.rowContainer, {margin: 10}]}>
      <Icon name="md-heart" color="#FFFFFF" size={30} onPress={navigation.state.params.addToWishList} />
      <Icon name="md-share" color ="#FFFFFF" size={30} style={{marginLeft:10,marginRight:10}} />
      <Icon name="md-chatboxes" color="#FFFFFF" size={30} />
    </View>
    )
  });

  addToWishList(){
    this.props.addToWishList({
      key: this.props.navigation.state.params.post.key,
      uid: this.props.auth.user.uid
    });
  }

  componentDidMount(){
    this.props.navigation.setParams({addToWishList: this.addToWishList.bind(this)})
  }

	render(){
    let {
      params: {
      post: {
        key, name, profile_image, arrival_date, author_id, departure_date, description, destination, max_items, max_weight, origin
      }
    } 
  } = this.props.navigation.state;
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    const { post } =this.props.navigation.state.params;
		return(
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.rowContainer, {borderBottomWidth: 0.7, borderColor:'#666666', margin: 5 }]}>
            <View style={styles.exploreContainerListview}>
              <Avatar
              source={{uri: profile_image}}
              rounded
              large
              />
              <StarRating
              disabled={true}
              emptyStar='ios-star-outline'
              fullStar='ios-star'
              halfStar='ios-star-half'
              iconSet='Ionicons'
              maxStars={5}
              rating={4.5}
              starColor='#f1c40f'
              starSize={17}
            />
            </View>
            <View style={styles.exploreContainerListview}>
              <View>
                <Text style={styles.exploreBoldText} onPress={() => this.props.navigation.navigate('ProfileExt',{post} )} > {name} </Text>
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
          <View style={{margin: 10}} >
            <Text style={styles.exploreBoldText}> Description </Text>
            <Text style={[styles.normalTextSize, {textAlign:'justify', marginTop:10}]}> {description} </Text>
            <Divider style={{backgroundColor:'#666666', marginTop: 15, height: 0.9}} />
              <View style={[styles.rowSpaceBetweenContainer, {margin: 10}]}>
                <Text style={styles.exploreBoldText}> JASTIP-V </Text>
                <Text style={styles.normalTextSize}> Rp.100.000 </Text>
              </View>
              <View style={[styles.rowSpaceBetweenContainer, {margin: 10}]}>
                  <Text style={styles.exploreBoldText}> Max Items </Text>
                  <Text style={styles.normalTextSize}> {max_items} </Text>
              </View>
              <View style={[styles.rowSpaceBetweenContainer, {margin: 10}]}>
                  <Text style={styles.exploreBoldText}> Max Weight </Text>
                  <Text style={styles.normalTextSize}> {max_weight} </Text>
              </View>
              <View style={{margin:7}}>
                <Text style={styles.normalTextSize}> 5 People has ordered </Text>
                <Text style={styles.normalTextSize}> 1 Order remains </Text>
              </View>
              <Divider style={{backgroundColor:'#666666', marginTop: 15, height: 0.9}} />
                <View style={styles.centerContainer}>
                  <DefaultButton 
                      style={[styles.defaultButton, {margin:10}]}
                      onPress={() => this.props.navigation.navigate('Order')}
                      styleText={styles.normalButtonText}
                      text="Request Now"
                    />
                </View>
          </View>
        </ScrollView>
      </View>
    )
	}
}

mapDispatchToProps = (dispatch) => {
  return {
		addToWishList: (key, uid) => dispatch(addToWishlist(key, uid))
  }
}

mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post,
    isConnected: state.connect
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Detail);