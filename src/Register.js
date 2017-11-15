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
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { signUpUser } from '../actions';
import styles from '../components/style';
import { DefaultButton, TextButton } from '../components/elements/Button';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    number: '',
  }

  onRegister(){
    let { name,email,password,number } = this.state;
    this.props.onRegister({
      name: name,
      email: email,
      password: password,
      number: number,
    })
  }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    return(
      <View style={[styles.container, {backgroundColor:'#1E4072'}]}>
        <View style={styles.centerContainer}>
          <View style={styles.startContainer}>
            <Text style={[styles.indexTitle, { bottom:40, left:20}]}> Register </Text>
          </View>
              <TextInput
                placeholder="Name"
                style={[styles.customForm, {margin:10}]}
                onChangeText={(name) => this.setState({name})}
                underlineColorAndroid='#FFFFFF'
                placeholderTextColor='#FFFFFF'
              />

              <TextInput
                placeholder="Email"
                style={[styles.customForm, {margin:10}]}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='#FFFFFF'
                placeholderTextColor='#FFFFFF'
              />

              <TextInput
                placeholder="Password"
                style={[styles.customForm, {margin:10}]}
                underlineColorAndroid='#FFFFFF'
                placeholderTextColor='#FFFFFF'
                onChangeText={(password) => this.setState({password})}
                secureTextEntry
              />

              <TextInput
                placeholder="Phone Number"
                style={[styles.customForm, {margin:10}]}
                underlineColorAndroid='#FFFFFF'
                placeholderTextColor='#FFFFFF'
                onChangeText={(number) => this.setState({number})}
                keyboardType="phone-pad"
              />
              
              {
                this.props.auth.loading?
                <ActivityIndicator size="large" />
                :
              <DefaultButton 
                style={[styles.customButton, {margin:10}]}
                onPress={this.onRegister.bind(this)}
                styleText={styles.customTextButton}
                text="Register"
              />
              }

      </View>       
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
    onRegister: (name, email, password, number) => {
      dispatch(signUpUser(name, email, password, number)
    )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);