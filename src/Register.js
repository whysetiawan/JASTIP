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
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
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

  componentDidMount(){
    MessageBarManager.registerMessageBar(this.refs.success);
  }

  componentWillUnmount(){
    MessageBarManager.unregisterMessageBar();
  }

  onRegister(value){
    console.log(value)
    const { Name, Email, Password, Number } = value
    this.props.onRegister({
      name: Name,
      email: Email,
      password: Password,
      number: Number,
    })
    if(!this.props.auth.error){
      MessageBarManager.showAlert({
        alertType: 'success',
        message: 'Register Success',
        position: 'bottom',
        duration: 5000
      })
    }
    else{
      MessageBarManager.showAlert({
        alertType: 'error',
        message: this.props.auth.errorMsg,
        position:'bottom',
        duration: 5000
      })
    }
  }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    const { handleSubmit } = this.props
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
            name="Number"
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
                onPress={handleSubmit(this.onRegister.bind(this))}
                styleText={styles.customTextButton}
                text="Register"
              />
              }

      </View>
              <MessageBar ref="success" />
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

const validate = (value) => {
  const errors = {};
  const fields = ['Name','Email', 'Password','Number']
  fields.forEach((f) => {
    if(!(f in value)) {
      errors[f] = `${f} is required`;
    }
  })
  return errors;
}

Register = reduxForm({ form: "register", validate })(Register)

export default connect(mapStateToProps, mapDispatchToProps)(Register);