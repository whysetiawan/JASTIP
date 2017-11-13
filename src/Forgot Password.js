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

class Forgot extends Component {
  state = {
    email: '',
  }

  onLogin(){
    this.props.onLogin({
      email: this.state.email,
    });
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
            placeholder="Email"
            style={[styles.defaultForm, {margin:10}]}
            onChangeText={(email) => this.setState({email})}
            underlineColorAndroid='#222'
          />

          <DefaultButton 
            style={[styles.defaultButton, {margin:10}]}
            onPress={this.onLogin.bind(this)}
            styleText={styles.textDefaultButton}
            text="Apply"
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
    onLogin: (email) => dispatch(signInUser(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);