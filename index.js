import React, { Component } from 'react';
import { View, AppRegistry, AsyncStorage, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './App';
import store from './configureStore';
import { persistStore } from 'redux-persist';

export default class Root extends Component{
    render(){
        return(  
            <Provider store={store}>
                    <AppWithNavigationState />
                    </Provider>
            );
    }
}
AppRegistry.registerComponent('Jastip', () => Root);