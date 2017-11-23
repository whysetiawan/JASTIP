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
  ScrollView,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import { FormLabel } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';
import { addPost } from '../../../actions';
import styles from '../../../components/style';
import Animation from 'lottie-react-native';
import { DefaultButton, TextButton } from '../../../components/elements/Button';
import { customInput, datePicker } from '../../../components/elements/Input';

class AddTrip extends Component {
  static navigationOptions = {
    title: 'Add Trip',
    headerTitleStyle: {alignSelf:'center'},
    headerRight: (<View></View>)
  }
  onAdd(post){
    const { origin, destination, departure, arrival, description, max_items, max_weight } = post;
    const { name , email, gender, birthdate, cover_image, profile_image, value } = this.props.user.user
      this.props.addPost({
        uid: this.props.auth.user.uid,
        name: name,
        email: email,
        gender: gender,
        birthdate: birthdate,
        cover_image: cover_image,
        profile_image: profile_image,
        value: value,
        origin: origin,
        destination: destination,
        departure_date: departure,
        arrival_date: arrival,
        description: description,
        max_items: max_items,
        max_weight: max_weight
      })
    }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    const { handleSubmit } = this.props
    return(
      <View style={[styles.container]}>
        <ScrollView>
          <View style={[styles.centerContainer, {marginTop: 30}]}>
                
                <Field
                  name="origin"
                  component={customInput}
                  placeholder="Origin"
                  style={styles.widthForm}
                  placeholderTextColor="#666666"
                  underlineColorAndroid='#666666'
                />

                <Field
                  name="destination"
                  component={customInput}
                  placeholder="Destination"
                  style={styles.widthForm}
                  placeholderTextColor="#666666"
                  underlineColorAndroid='#666666'
                />

                <View style={styles.rowContainer}>
                  <Field
                    name="departure"
                    component={datePicker}
                    placeholder="Departure Date"
                    style={styles.halfForm}
                    placeholderTextColor="#666666"
                    underlineColorAndroid='#666666'
                    keyboardType='numeric'
                  />

                  <Field
                    name="arrival"
                    component={datePicker}
                    placeholder="Arrival Date"
                    style={styles.halfForm}
                    placeholderTextColor="#666666"
                    underlineColorAndroid='#666666'
                  />
                </View>

                <Field
                  name="description"
                  component={customInput}
                  placeholder="Description"
                  style={styles.largeForm}
                  multiline={true}
                  placeholderTextColor="#666666"
                  underlineColorAndroid='#666666'
                />

                <View style={styles.rowContainer}>
                  <Field
                    name="max_items"
                    component={customInput}
                    placeholder="Max Item"
                    style={styles.halfForm}
                    keyboardType='numeric'
                    placeholderTextColor="#666666"
                    underlineColorAndroid='#666666'
                  />

                <Field
                  name="max_weight"
                  component={customInput}
                  placeholder="Max Weight"
                  style={styles.halfForm}
                  placeholderTextColor="#666666"
                  underlineColorAndroid='#666666'
                />
                </View>

                {
                  this.props.auth.loading ?
                <ActivityIndicator />
                :
                <DefaultButton 
                  style={[styles.defaultButton, {margin:10}]}
                  onPress={handleSubmit(this.onAdd.bind(this))}
                  styleText={styles.normalButtonText}
                  text="Post"
                />
                }
            <Modal
              animationType="fade"
              visible={this.props.auth.loading}
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
                        source={require('../../../components/animations/loading_animation.json')}
                    />
                </View>
              </View>
            </Modal>
          </View>  
        </ScrollView>     
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
    addPost: (
      uid,
      name,
      email,
      gender,
      birthdate,
      cover_image,
      profile_image,
      value,
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
        name,
        email,
        gender,
        birthdate,
        cover_image,
        profile_image,
        value,
        origin,
        destination,
        departure_date,
        arrival_date,
        description,
        max_items,
        max_weight
      ))
    }
  }
}
const validate = (value) => {
  const errors = {};
  if (!value.origin){
    errors.origin = "Origin is required"
  }
  if (!value.destination){
    errors.destination = "Destination is required"
  }
  if (!value.departure){
    errors.departure = "Departure Date is required"
  }
  if (!value.arrival){
    errors.arrival = "Arrival Date is required"
  }
  if (!value.description){
    errors.description = "Description is required"
  }
  if (!value.max_item){
    errors.max_item = "Max Item is required"
  }
  if (!value.max_weight){
    errors.max_weight = "Max Weight is required"
  }
  return errors;
}

Add = reduxForm({ form:'addTrip', validate })(AddTrip);

export default connect(mapStateToProps, mapDispatchToProps)(Add);