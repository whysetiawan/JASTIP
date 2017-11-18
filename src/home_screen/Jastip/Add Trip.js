import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Button,
  TextInput,
  Picker,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { FormLabel } from 'react-native-elements';
import StatusBarAlert from 'react-native-statusbar-alert';
import { addPost } from '../../../actions';
import styles from '../../../components/style';
import { DefaultButton, TextButton } from '../../../components/elements/Button';

class AddTrip extends Component {
  static navigationOptions = {
    title: 'Add Trip',
    headerTitleStyle: {alignSelf:'center'},
    headerRight: (<View></View>)
  }
  constructor(props){
    super(props);
    this.state = {
        id: this.props.auth.user.uid,
        origin:'',
        destination: '',
        departure_date: '',
        arrival_date:'',
        description:'',
        max_items:'',
        max_weight:'',
        error: false,
        }
  }
  componentWillMount(){
  }

  onAdd(){
    const {
      id,
      origin,
      destination,
      departure_date,
      arrival_date,
      description,
      max_items,
      max_weight
    } = this.state
    if(origin.length || destination.length || departure_date.length || arrival_date.length ||
      description.length || max_items.length || max_weight.length <=1 ){
        this.setState({ error: true })
    }
    else{
      this.props.addPost({
        uid: id,
        origin: origin,
        destination: destination,
        departure_date: departure_date,
        arrival_date: arrival_date,
        description: description,
        max_items: max_items,
        max_weight: max_weight
      })
    }
  }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    return(
      <View style={[styles.container]}>
      <StatusBarAlert
        visible={this.state.error}
        message="Please fill data correctly"
        color="white"
        backgroundColor="#fc3d39"
      />
        <ScrollView>
          <View style={[styles.centerContainer, {marginTop: 30}]}>
                <TextInput
                  placeholder="Origin"
                  style={[styles.widthForm, {margin:5}]}
                  onChangeText={(origin) => this.setState({origin})}
                  placeholderTextColor="#666666"
                  underlineColorAndroid="#666666"
                />

                <TextInput
                  placeholder="Destination"
                  style={[styles.widthForm, {margin:5}]}
                  onChangeText={(destination) => this.setState({destination})}
                  placeholderTextColor="#666666"
                  underlineColorAndroid="#666666"
                />

                <View style={styles.rowContainer}>
                  <TextInput
                    placeholder="Departure Date"
                    style={styles.halfForm}
                    onChangeText={(departure_date) => this.setState({departure_date})}
                    keyboardType="numeric"
                    placeholderTextColor="#666666"
                    underlineColorAndroid="#666666"
                  />

                  <TextInput
                    placeholder="Arrival Date"
                    style={styles.halfForm}
                    onChangeText={(arrival_date) => this.setState({arrival_date})}
                    keyboardType="numeric"
                    placeholderTextColor="#666666"
                    underlineColorAndroid="#666666"
                  />
                </View>

                <TextInput
                  placeholder="Description"
                  style={[styles.largeForm,{margin:5}]}
                  onChangeText={(description) => this.setState({description})}
                  multiline={true}
                  placeholderTextColor="#666666"
                  underlineColorAndroid="#666666"
                />

                <View style={styles.rowContainer}>
                  <TextInput
                    placeholder="Max Items"
                    style={styles.halfForm}
                    onChangeText={(max_items) => this.setState({max_items})}
                    keyboardType="numeric"
                    placeholderTextColor="#666666"
                    underlineColorAndroid="#666666"
                  />

                  <TextInput
                    placeholder="Max Weight"
                    style={styles.halfForm}
                    onChangeText={(max_weight) => this.setState({max_weight})}
                    keyboardType="numeric"
                    placeholderTextColor="#666666"
                    underlineColorAndroid="#666666"
                  />
                </View>

                {
                  this.props.auth.loading ?
                <ActivityIndicator />
                :
                <DefaultButton 
                  style={[styles.defaultButton, {margin:10}]}
                  onPress={this.onAdd.bind(this)}
                  styleText={styles.normalButtonText}
                  text="Post"
                />
                }

          </View>  
        </ScrollView>     
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

mapDispatchToProps = (dispatch) => {
  return {
    addPost: (
      uid,
      origin,
      destination,
      departure_date,
      arrival_date,
      description,
      max_items,
      max_weight
    ) => {
      dispatch(addPost(
        uid,
        origin,
        destination,
        departure_date,
        arrival_date,
        description,
        max_items,
        max_weight))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTrip);