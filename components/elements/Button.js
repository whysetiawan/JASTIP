import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export const DefaultButton = (props) => {
	const { onPress, style, styleText, text } = props;
	return(
		<TouchableOpacity
          onPress={onPress}
          style={style}>
          <Text style={styleText}> {text} </Text>
        </TouchableOpacity>
	)
}

export const TextButton = (props) => {
	const { onPress, styleText, text } = props
	return(
		<TouchableOpacity
        onPress={onPress}
        >
        <Text style={styleText}> {text} </Text>
        </TouchableOpacity>
	)
}