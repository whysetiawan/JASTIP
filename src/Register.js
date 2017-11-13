import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Button,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../components/style';
import { DefaultButton, TextButton } from '../components/elements/Button';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  onRegister(){
  }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    return(
    <View style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.startContainer}>
            <Text style={[styles.indexTitle, { bottom:40, left:20}]}> Register </Text>
          </View>
              <TextInput
                placeholder="Name"
                style={[styles.defaultForm, {margin:10}]}
                onChangeText={(name) => this.setState({name})}
                underlineColorAndroid='#222'
              />

              <TextInput
                placeholder="Email"
                style={[styles.defaultForm, {margin:10}]}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='#222'
              />

              <TextInput
                placeholder="Password"
                style={[styles.defaultForm, {margin:10}]}
                underlineColorAndroid='#222'
                onChangeText={(password) => this.setState({password})}
                secureTextEntry
              />

              <DefaultButton 
                style={[styles.defaultButton, {margin:10}]}
                onPress={this.onRegister.bind(this)}
                styleText={styles.textDefaultButton}
                text="Register"
              />
      </View>       
    </View>
    )
  }
}

export default Register;