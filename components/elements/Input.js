import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { FormInput, FormValidationMessage } from 'react-native-elements';
import styles from '../style';

const defaultProps = {
  secureTextEntry: false,
  multiline: false,
  editable:true,
  containerStyle: {},
};

const customInput = (props) => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    placeholder,
    secureTextEntry,
    multiline,
    editable,
    ...otherProps
  } = props;

  return(
    <View>
      <TextInput 
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={(value) => onChange(value)}
        value={value}
        editable={editable}
        {...otherProps}
      />
      {
        touched && error &&
        <FormValidationMessage>{error}</FormValidationMessage>
      }
    </View>
  )
}

const datePicker = (props) => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    placeholder,
    style,
    ...otherProps
  } = props;
  return (
    <View>
      <DatePicker
      placeholder={placeholder}
      format="YYYY-MM-DD"
      date={value}
      onDateChange={onChange}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      style={style}
      showIcon={false}
      customStyles={{
        dateInput: {
          borderBottomWidth:0.7,
          borderWidth:0,
          borderColor:'#666666'
        },
        placeholderText:{
          color:'#222',
          alignSelf:'flex-start',
        },
        dateText: {
          alignSelf:'flex-start'
        }
      }}
      />
    </View>
  )
}

customInput.defaultProps = defaultProps;
customInput.propTypes= {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  multiline: PropTypes.bool,
};


export { customInput, datePicker };