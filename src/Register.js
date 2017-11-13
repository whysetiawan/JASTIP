import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Button,
  TextInput,
  Picker
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
    gender: '',
    birthdate: '',
    address: '',
  }

  onRegister(){
    let { name,email,password,gender,birthdate,address } = this.state;
    this.props.onRegister({
      name: name,
      email: email,
      password: password,
      gender: gender,
      birthdate: birthdate,
      address: address
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
                style={[styles.defaultForm, {margin:10}]}
                onChangeText={(name) => this.setState({name})}
                underlineColorAndroid='#FFFFFF'
                placeholderTextColor='#FFFFFF'
              />

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
              <View style={[styles.startContainer,{left: 25, borderWidth:1, borderColor:'#FFFFFF'}]}>
              <Picker
                style={{width:100, height: 30, borderWidth:1,color:'#FFFFFF'}}
                selectedValue={this.state.gender}
                onValueChange={(itemValue) => this.setState({ gender: itemValue})}
                mode='dropdown'
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female"/>
              </Picker>
              </View>

              <TextInput
                placeholder="YYYY - MM - DD"
                style={[styles.defaultForm, {margin:10}]}
                underlineColorAndroid='#FFFFFF'
                placeholderTextColor='#FFFFFF'
                onChangeText={(birthdate) => this.setState({birthdate})}
              />

              <TextInput
                placeholder="Address"
                style={[styles.defaultForm, {margin:10}]}
                underlineColorAndroid='#FFFFFF'
                placeholderTextColor='#FFFFFF'
                onChangeText={(address) => this.setState({address})}
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

mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (name, email, password, gender, birthdate, address) => {
      dispatch(signUpUser(name, email, password, gender, birthdate, address)
    )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);