import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import { AppNavigator } from './reducers/nav';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { connectionStatus } from './actions';

class App extends Component{
  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnection)
  }

  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnection)
  }

  _handleConnection = (isConnected) => {
    this.props.dispatch(connectionStatus({ status: isConnected }))
  }

  render(){
    console.log(this.props.connect)
    const { dispatch, nav } = this.props
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
