import React, { Component } from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';

import Explore from '../../src/home_screen/Explore';

export default TabChild = TabNavigator({
  Explore: { screen: Explore },
},
{
  tabBarOptions:{
    style: {
      position: 'absolute',
      flex: 1
    }
  },
  tabBarPosition: 'top',
  tabBarComponent: TabBarTop
}
)