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
import { signInFacebook, signInUser } from '../actions';
import styles from '../components/style';
import { DefaultButton, TextButton } from '../components/elements/Button';
import { Anim } from '../components/elements/Animation';

class Signin extends Component {
  state = {
    email: '',
    password: '',
    loading: this.props.auth.loading
  }

  onLogin(){
    const { email, password } = this.state
    this.props.signInUser({
      email: email,
      password: password
    });
  }

  onLoginFacebook(){
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

          {
            this.props.auth.loading?
            <ActivityIndicator size="large" />
            :
            <DefaultButton 
              style={[styles.customButton, {margin:10}]}
              onPress={this.onLogin.bind(this)}
              styleText={styles.customTextButton}
              text="Sign in"
            />
          }
          
          <Text style={{ fontSize:12, marginTop:20, marginBottom:15, color:'red'}}> {this.props.auth.error} </Text>

          <TextButton 
            styleText={styles.normalCustomButtonText}
            onPress={() => this.props.navigation.navigate('Forgot')}
            text="Forgot Password?"
          />

          <Divider style={{backgroundColor:'#FFFFFF', width:'100%', marginTop:20}}/>
          
          {
            this.state.loading?
            <ActivityIndicator size="large" />
            :
          <DefaultButton 
              style={[styles.customButton, {margin:25}]}
              onPress={this.onLoginFacebook.bind(this)}
              styleText={styles.customTextButton}
              text="Sign in with Facebook"
            />
          }

          {/* <Anim
            style={styles.modal}
            ref="modal"
            backdropPressToClose={false}
            backdropOpacity={0.7}
            swipeToClose={false}
            onOpened={this.onLogin.bind(this)}
            animRef={ animation => {
              this.animation = animation
            }}
            animStyle={{ width: 200, height:100 }}
            loop={true}
            source={require('../components/animations/loading_animation.json')}
          /> */}

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
    signInFacebook: () => dispatch(signInFacebook()),
    signInUser: (email, password) => dispatch(signInUser(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);