import React, { Component } from 'react';
import { AppNavigator } from './reducers/nav';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import firebase from './components/Firebase';

class App extends Component{
  render(){
    console.log(this.props)
    const { dispatch, nav } = this.props
    return(
      <AppNavigator navigation={addNavigationHelpers({
        dispatch,
        state: nav,
      })} />
    )
  }
}
const mapStateToProps = (state) => ({
  nav: state.nav,
  auth: state.auth
});

export default connect(mapStateToProps)(App);
