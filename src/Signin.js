import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Button,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-elements';
import { signInFacebook } from '../actions';
import styles from '../components/style';
import { DefaultButton, TextButton } from '../components/elements/Button';

class Signin extends Component {
  state = {
    email: '',
    password: ''
  }

  onLogin(){
    this.props.signInFacebook();
  }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    return(
      <View style={[styles.container, {backgroundColor:'#1E4072'}]}>
        <View style={styles.centerContainer}>
          <View style={styles.startContainer}>
            <Text style={[styles.indexTitle, { bottom:40, left:20}]}> Sign In </Text>
          </View>

          <TextInput
            placeholder="Email"
            style={[styles.defaultForm, {margin:10}]}
            onChangeText={(email) => this.setState({email})}
            underlineColorAndroid='#FFFFFF'
            placeholderTextColor='#FFFFFF'
          />

          <TextInput
            placeholder="Password"
            style={[styles.defaultForm, {margin:10}]}
            underlineColorAndroid='#FFFFFF'
            placeholderTextColor='#FFFFFF'
            onChangeText={(password) => this.setState({password})}
            secureTextEntry
          />

          {
            this.props.auth.loading?
            <ActivityIndicator size="large" />
            :
            <DefaultButton 
              style={[styles.defaultButton, {margin:10}]}
              onPress={this.onLogin.bind(this)}
              styleText={styles.textDefaultButton}
              text="Sign in"
            />
          }
          
          <Text style={[styles.normalButtonText,{ fontSize:12, marginTop:20, marginBottom:15, color:'red'}]}> {this.props.auth.error} </Text>

          <TextButton 
            styleText={styles.normalButtonText}
            onPress={() => this.props.navigation.navigate('Forgot')}
            text="Forgot Password?"
          />

          <Divider style={{backgroundColor:'#FFFFFF', width:'100%', marginTop:20}}/>

          <DefaultButton 
              style={[styles.defaultButton, {margin:25}]}
              onPress={this.onLogin.bind(this)}
              styleText={styles.textDefaultButton}
              text="Sign in with Facebook"
            />

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
    signInFacebook: () => dispatch(signInFacebook())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);