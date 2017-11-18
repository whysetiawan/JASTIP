import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';
import styles from '../style';

const defaultProps = {
  secureTextEntry: false,
  multiline: false,
  containerStyle: {},
};

const customInput = (props) => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    placeholder,
    secureTextEntry,
    multiline,
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
        {...otherProps}
      />
      {
        touched && error &&
        <FormValidationMessage>{error}</FormValidationMessage>
      }
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


export { customInput };