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
  ActivityIndicator,
  ScrollView,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from'redux-form';
import { FormLabel } from 'react-native-elements';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import StatusBarAlert from 'react-native-statusbar-alert';
import Animation from 'lottie-react-native';
import { editProfile } from '../../../actions';
import { customInput } from '../../../components/elements/Input';
import styles from '../../../components/style';
import { DefaultButton, TextButton } from '../../../components/elements/Button';

class EditProfile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Profile'
  })
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
        id: this.props.auth.user.uid,
        name: props.auth.user.uid,
        email: '',
        password: '',
        number: '',
        address: '',
        value: this.props.initialValues.value || '10.000',
        gender: this.props.initialValues.gender,
        birthdate:'',
        error: false
        }
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

  onSave( values ){
    console.log(values)
    const { id, name, email, password, number, birthdate, address, value, gender} = values
      this.props.onSave({
        uid: this.props.auth.user.uid,
        name: name,
        email: email,
        password: password,
        number: number,
        birthdate: birthdate,
        address: address,
        value: this.state.value,
        gender: this.state.gender
      })
      if(!this.props.auth.error){
        MessageBarManager.showAlert({
          position: 'bottom',
          message: "Profile Updated",
          alertType: 'success'
        })
      }
      else{
        MessageBarManager.showAlert({
          position: 'bottom',
          message: "Error occured please check your connection",
          alertType: 'error'
        })
      }
  }

  render(){
    const { name, email, password, number, birthdate, address, value, gender} = this.state
    const { handleSubmit } = this.props;
    console.log(this.props.initialValues)
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    return(
      <View style={[styles.container]}>
        <ScrollView>
          <View style={[styles.centerContainer, {marginTop: 30}]}>
              <Field
                name="name"
                component={customInput}
                placeholder="Name"
                style={styles.widthForm}
                placeholderTextColor="#666666"
                underlineColorAndroid='#666666'
              />

              <Field
                name="email"
                component={customInput}
                placeholder="Email"
                style={styles.widthForm}
                placeholderTextColor="#666666"
                underlineColorAndroid='#666666'
              />

              <Field
                name="password"
                component={customInput}
                placeholder="Password"
                secureTextEntry
                style={styles.widthForm}
                placeholderTextColor="#666666"
                underlineColorAndroid='#666666'
              />

              <Field
                name="number"
                component={customInput}
                placeholder="Phone Number"
                style={styles.widthForm}
                placeholderTextColor="#666666"
                underlineColorAndroid='#666666'
              />
              <Field
                name="birthdate"
                component={customInput}
                placeholder="Birthdate"
                style={styles.widthForm}
                placeholderTextColor="#666666"
                underlineColorAndroid='#666666'
              />

              <Field
                name="address"
                component={customInput}
                placeholder="Address"
                style={styles.widthForm}
                placeholderTextColor="#666666"
                underlineColorAndroid='#666666'
              />

                <View style={[styles.startContainer, {marginLeft:30}]}>
                  <FormLabel> Gender </FormLabel>
                    <View style={{ borderWidth:0.7}}>
                      <Picker
                        style={{width:120, height: 30, borderWidth:1,color:'#222'}}
                        selectedValue={gender}
                        onValueChange={(itemValue) => this.setState({ gender: itemValue})}
                        mode='dropdown'
                      >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female"/>
                      </Picker>
                    </View>
                </View>

                <View style={[styles.startContainer, {marginLeft:30}]}>
                  <FormLabel> JASTIP-V </FormLabel>
                    <View style={{ borderWidth:0.7}}>
                      <Picker
                        style={{width:150, height: 30, borderWidth:1,color:'#222'}}
                        selectedValue={value}
                        onValueChange={(itemValue) => this.setState({ value: itemValue})}
                      >
                        <Picker.Item label="Rp 10.000" value="10.000" />
                        <Picker.Item label="Rp 20.000" value="20.000"/>
                        <Picker.Item label="Rp 30.000" value="30.000"/>
                        <Picker.Item label="Rp 40.000" value="40.000"/>
                        <Picker.Item label="Rp 50.000" value="50.000"/>
                        <Picker.Item label="Rp 60.000" value="60.000"/>
                        <Picker.Item label="Rp 70.000" value="70.000"/>
                        <Picker.Item label="Rp 80.000" value="80.000"/>
                        <Picker.Item label="Rp 90.000" value="90.000"/>
                        <Picker.Item label="Rp 100.000" value="100.000"/>
                      </Picker>
                    </View>
                </View>
                {
                  this.props.auth.loading ?
                <ActivityIndicator />
                :
                <DefaultButton 
                  style={[styles.defaultButton, {margin:10}]}
                  onPress={handleSubmit(this.onSave.bind(this))}
                  styleText={styles.normalButtonText}
                  text="Save"
                />
                }

          </View>  
        </ScrollView>
        <Modal
          animationType="fade"
          visible={this.props.auth.loading}
          onRequestClose={() => !this.props.auth.loading }
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
                    source={require('../../../components/animations/loading_animation.json')}
                />
            </View>
          </View>
          </Modal>

        <MessageBar ref="notifications"/>
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    auth: state.auth,
    initialValues: state.user.user
  };
}

mapDispatchToProps = (dispatch) => {
  return {
    onSave: (uid, name, email, password, number, birthdate, gender, value, address) => {
      dispatch(editProfile(uid,name, email, password, number, birthdate, gender, value, address)
    )},
  }
}

const validate = (value) => {
  const errors = {}
  if (!value.name){
    errors.name="Name is required"
  }else if (value.name.length < 6){
    errors.name="Name must be at least 6 characters"
  }
  if(!value.email){
    errors.email = "Email is required"
  }
  else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)){
    errors.email =  'Invalid email address'
  }
  if(!value.password){
    errors.password = "Password is required"
  }
  else if (value.password.length < 6){
    errors.password = "Password must be at least 6 characters"
  }
  if(!value.number){
    errors.number = "Phone Number is required"
  } else if (value.number.length < 10){
    errors.number = "Invalid phone number"
  }
  if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value.birthdate)){
    errors.birthdate = "Invalid Birth date"
  }
  if(value.address.length < 5){
    errors.address = "Address must be at least 5 characters"
  }
  return errors;
}

Edit = reduxForm({ form:'editProfile', enableReinitialize: true, validate })(EditProfile)

export default connect(mapStateToProps, mapDispatchToProps)(Edit);