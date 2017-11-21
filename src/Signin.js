import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Button,
  TextInput,
  Modal,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { MessageBar,MessageBarManager } from 'react-native-message-bar';
import { reduxForm, Field } from 'redux-form';
import { Divider } from 'react-native-elements';
import { signInFacebook, signInUser } from '../actions';
import styles from '../components/style';
import { customInput } from '../components/elements/Input';
import { DefaultButton, TextButton } from '../components/elements/Button';
import Animation from 'lottie-react-native';

class Signin extends Component {
  constructor(props){
    super(props);
  state = {
    email: '',
    password: '',
    loading: this.props.auth.loading
  }
}

  onLogin(value){
    const { Email, Password } = value;
    console.log(Email, Password)
    this.props.signInUser({
      email: Email,
      password: Password
    });
    if(this.props.auth.error){
      MessageBarManager.showAlert({
        position: 'bottom',
        message: this.props.auth.errorMsg,
        alertType: 'error'
      })
    }
    // else{
    //   MessageBarManager.showAlert({
    //     position: 'bottom',
    //     message: 'Signed in',
    //     alertType: 'success'
    //   })
    // }
  }

  initAnimation(){
    if (!this.animation){
      setTimeout(() => {
        this.initAnimation();
      }, 100);
    } else {
        this.animation.play();
    }
  }

  componentWillUnmount(){
    MessageBarManager.unregisterMessageBar();
  }

  componentDidMount(){
    this.initAnimation();
    MessageBarManager.registerMessageBar(this.refs.notifications);
  }

  onLoginFacebook(){
    this.props.signInFacebook();
  }

  render(){
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    const { handleSubmit } = this.props;
    return(
      <View style={[styles.container, {backgroundColor:'#1E4072'}]}>
        <View style={styles.centerContainer}>
          <View style={styles.startContainer}>
            <Text style={[styles.indexTitle, { bottom:40, left:20}]}> Sign In </Text>
          </View>

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
            placeholderTextColor="#FFFFFF"
            underlineColorAndroid='#FFFFFF'
            secureTextEntry
            style={styles.customForm}
          />

            <DefaultButton 
              style={[styles.customButton, {margin:10}]}
              onPress={handleSubmit(this.onLogin.bind(this))}
              styleText={styles.customTextButton}
              text="Sign in"
            />
          
          <Text style={{ fontSize:12, marginTop:20, marginBottom:15, color:'red'}}> {this.props.auth.error} </Text>

          <TextButton 
            styleText={styles.normalCustomButtonText}
            onPress={() => this.props.navigation.navigate('Forgot')}
            text="Forgot Password?"
          />

          <Divider style={{backgroundColor:'#FFFFFF', width:'100%', marginTop:20}}/>
                    
          <DefaultButton 
              style={[styles.customButton, {margin:25}]}
              onPress={this.onLoginFacebook.bind(this)}
              styleText={styles.customTextButton}
              text="Sign in with Facebook"
            />

          <Modal
          animationType="fade"
          visible={this.props.auth.loading}
          // onRequestClose={() => !this.props.auth.loading }
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
                    source={require('../components/animations/loading_animation.json')}
                />
            </View>
          </View>
          </Modal>

        </View>
        <MessageBar ref="notifications"/>
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
    signInUser: (email, password) => dispatch(signInUser(email, password)),
  }
}
const validate = (value) => {
  const errors = {};
  const fields = ['Email','Password'];

  fields.forEach((f) => {
    if(!(f in value)) {
      errors[f] = `${f} is required`;
    }
  })
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.Email)){
    errors.Email =  'Invalid email address'
  }
  if (value.Password && value.Password.length < 6){
    errors.Password = 'Password must be at least than 6 characters'
  }
  return errors;
}

Signin = reduxForm({ form:"signin", validate})(Signin);

export default connect(mapStateToProps, mapDispatchToProps )(Signin)