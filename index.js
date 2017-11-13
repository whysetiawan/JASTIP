import React, { Component } from 'react';
import { View, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './App';
import configureStore from './configureStore';

const store = configureStore();

const Root = () => (
      <Provider store={store}>
        	<AppWithNavigationState />
			</Provider>
    );

AppRegistry.registerComponent('Jastip', () => Root);