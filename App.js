import React, { Component } from 'react';
import { BackHandler } from "react-native";
import { NetInfo } from 'react-native';
import { AppNavigator } from './reducers/nav';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connectionStatus } from './actions';

class App extends Component{
  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnection)
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnection)
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  _handleConnection = (isConnected) => {
    this.props.dispatch(connectionStatus({ status: isConnected }))
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render(){
    const { dispatch, nav } = this.props
    console.log(this.props.navigation)
    return(
      <AppNavigator navigation={addNavigationHelpers({
        dispatch,
        state: nav,
      })} />
    )
  }
}
const mapStateToProps = (state) => {
  return {
    connect: state.connect,
    nav: state.nav,
    auth: state.auth
  }  
};

export default connect(mapStateToProps)(App);
