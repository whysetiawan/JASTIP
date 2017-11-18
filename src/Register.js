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
import Animation from 'lottie-react-native';
import { customInput } from '../components/elements/Input';
import { reduxForm, Field } from 'redux-form';


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

          <Field
            name="Name"
            component={customInput}
            placeholder="Name"
            placeholderTextColor="#FFFFFF"
            underlineColorAndroid='#FFFFFF'
            style={styles.customForm}
          />

          <Field
            name="Email"
            component={customInput}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            underlineColorAndroid='#FFFFFF'
            style={styles.customForm}
          />

          <Field
            name="Password"
            component={customInput}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#FFFFFF"
            underlineColorAndroid='#FFFFFF'
            style={styles.customForm}
          />

          <Field
            name="Phone Number"
            component={customInput}
            placeholder="Phone Number"
            placeholderTextColor="#FFFFFF"
            underlineColorAndroid='#FFFFFF'
            style={styles.customForm}
            keyboardType="numeric"
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



Register = reduxForm({ form: "register" })(Register)

export default connect(mapStateToProps, mapDispatchToProps)(Register);