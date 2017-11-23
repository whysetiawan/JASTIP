import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import styles from '../../../components/style.js';
import { Field, reduxForm } from 'redux-form';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { customInput } from '../../../components/elements/Input';

class Order extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Request',
    headerStyle: {backgroundColor:'#1E4072'},
    headerTintColor: "#FFFFFF",
  })
	render(){
  		console.ignoredYellowBox = ['Remote debugger'];
		console.ignoredYellowBox = ['Setting a timer'];
		return(
		<View style={styles.container}>
			<View style={styles.centerContainer}>
        <Text style={[styles.normalTextSize2, {textAlign:'center', marginTop: 10}]}> You can request the items here. Easy way, just fill the 
          form below and get what you want
        </Text>
        <View style={{marginTop:40}}>
          <Field
            name="name"
            component={customInput}
            placeholder="What's items name?"
            style={styles.widthForm}
            placeholderTextColor="#666666"
            underlineColorAndroid='#666666'
          />

          <Field
            name="many"
            component={customInput}
            placeholder="How many items?"
            style={styles.widthForm}
            placeholderTextColor="#666666"
            underlineColorAndroid='#666666'
          />

          <Field
            name="weight"
            component={customInput}
            placeholder="How heavy is the items?"
            style={styles.widthForm}
            placeholderTextColor="#666666"
            underlineColorAndroid='#666666'
          />

          <Field
            name="price"
            component={customInput}
            placeholder="Price of the items?"
            style={styles.widthForm}
            placeholderTextColor="#666666"
            underlineColorAndroid='#666666'
          />
          
          <Text style={[styles.smallTextSize, {marginTop:15}]}> Please pick some picture of the items </Text> 
          <View>
          <MapView
              style={{width:400, height:200}}
							initialRegion={{
								latitude: 37.78825,
								longitude: -122.4324,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							}}
						/>
          </View>
        </View>
			</View>
		</View>
		)
	}
}

Order = reduxForm({ form: 'Order' })(Order)

export default connect(undefined,undefined)(Order)