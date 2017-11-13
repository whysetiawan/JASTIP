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
import { signInUser } from '../actions';
import styles from '../components/style';
import { DefaultButton, TextButton } from '../components/elements/Button';

class Signin extends Component {
  state = {
    email: '',
    password: ''
  }

  onLogin(){
    this.props.onLogin({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    return(
    <View style={styles.container}>
      <Text style={[styles.indexTitle,{alignSelf:'center'}]}> Login </Text>
        <View style={styles.centerContainer}>

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
            onPress={this.onLogin.bind(this)}
            styleText={styles.textDefaultButton}
            text="Sign In"
          />

          <TextButton 
            styleText={styles.normalText}
            onPress={() => this.props.navigation.navigate('Forgot')}
            text="Forgot Password?"
          />
        </View>       
    </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    loggedIn: state.auth
  };
}

mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => dispatch(signInUser(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);