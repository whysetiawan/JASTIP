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
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { FormLabel } from 'react-native-elements';
import { editProfile } from '../../../actions';
import styles from '../../../components/style';
import { DefaultButton, TextButton } from '../../../components/elements/Button';

class EditProfile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Profile'
  })
  constructor(props){
    super(props);
    this.state = {
        id: this.props.auth.user.uid,
        name: '',
        email: '',
        password: '',
        number: '',
        address: '',
        value:'',
        gender: 'Jastip-V',
        birthdate:''
        }
  }
  componentWillMount(){
    const { params } = this.props.navigation.state;
    const { 
      data: {
        user : data 
      }
    } = params
    console.log(data)
    this.setState({
      name: data.name,
      email: data.email,
      password: data.password,
      number: data.number,
      address: data.address || '',
      value: data.jastip || '',
      gender: data.gender || '',
      birthdate: data.birthdate || ''
    })
  }

  onSave(){
    const { id, name, email, password, number, birthdate, address, value, gender} = this.state
    this.props.onSave({
      uid: id,
      name: name,
      email: email,
      password: password,
      number: number,
      birthdate: birthdate,
      address: address,
      value: value,
      gender: gender
    })
  }

  render(){
    const { name, email, password, number, birthdate, address, value, gender} = this.state
    console.ignoredYellowBox = ['Remote debugger'];
    console.ignoredYellowBox = ['Setting a timer'];
    return(
      <View style={[styles.container]}>
        <ScrollView>
          <View style={[styles.centerContainer, {marginTop: 30}]}>
                <TextInput
                  placeholder="Name"
                  style={[styles.widthForm, {margin:5}]}
                  onChangeText={(name) => this.setState({name})}
                  placeholderTextColor="#666666"
                  underlineColorAndroid="#666666"
                  value={name}
                />

                <TextInput
                  placeholder="Email"
                  style={[styles.widthForm, {margin:5}]}
                  onChangeText={(email) => this.setState({email})}
                  value={email}
                  placeholderTextColor="#666666"
                  underlineColorAndroid="#666666"
                />

                <TextInput
                  placeholder="Password"
                  style={[styles.widthForm, {margin:5}]}
                  onChangeText={(password) => this.setState({password})}
                  value={password}
                  placeholderTextColor="#666666"
                  underlineColorAndroid="#666666"
                  secureTextEntry
                />

                <TextInput
                  placeholder="Phone Number"
                  style={[styles.widthForm, {margin:5}]}
                  onChangeText={(number) => this.setState({number})}
                  value={number}
                  keyboardType="phone-pad"
                  placeholderTextColor="#666666"
                  underlineColorAndroid="#666666"
                />

                <TextInput
                  placeholder="1999-12-31"
                  style={[styles.widthForm, {margin:5}]}
                  onChangeText={(birthdate) => this.setState({birthdate})}
                  value={birthdate}
                  placeholderTextColor="#666666"
                  underlineColorAndroid="#666666"
                  keyboardType="numeric"
                />

                <View style={[styles.startContainer, {marginLeft:30}]}>
                  <FormLabel> Gender </FormLabel>
                    <View style={{ borderWidth:0.7}}>
                      <Picker
                        style={{width:120, height: 30, borderWidth:1,color:'#222'}}
                        selectedValue={this.state.gender}
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

                <TextInput
                  placeholder="Address"
                  style={[styles.widthForm, {margin:5}]}
                  onChangeText={(address) => this.setState({address})}
                  value={address}
                  placeholderTextColor="#666666"
                  underlineColorAndroid="#666666"
                />

                <DefaultButton 
                  style={[styles.defaultButton, {margin:10}]}
                  onPress={this.onSave.bind(this)}
                  styleText={styles.normalButtonText}
                  text="Save"
                />

          </View>  
        </ScrollView>     
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
    onSave: (uid, name, email, password, number, birthdate, gender, value, address) => {
      dispatch(editProfile(uid,name, email, password, number, birthdate, gender, value, address)
    )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);