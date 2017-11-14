import React, { Component } from 'react';
import { AppNavigator } from './reducers/nav';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import firebase from './components/Firebase';


console.log(this.props)
const App = ({ dispatch, nav }) => (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch,
        state: nav,
      })} />
    );

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);
