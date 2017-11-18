import React, {Component} from 'react';
import {TabNavigator, TabView, TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Explore from '../../src/home_screen/Explore';
import Saved from '../../src/home_screen/Saved';
import Profile from '../../src/home_screen/Profile';
import Jastip from '../../src/home_screen/Jastip';
import Message from '../../src/home_screen/Message';

export default Tabs = TabNavigator({
	Explore: { screen: Explore,
	navigationOptions: {
		tabBarLabel: 'EXPLORE',
		tabBarIcon: ({ tintColor}) =>  <Icon name="ios-search-outline" size={35} />
	},
},
	Saved: { screen: Saved,
	navigationOptions: {
		tabBarLabel: 'WISHLIST',
		tabBarIcon: ({ tintColor }) =>  <Icon name="ios-heart-outline" size={35} color={tintColor} />
	},
},
	Jastip: { screen: Jastip,
	navigationOptions: {
		tabBarLabel: 'JASTIP',
		tabBarIcon: ({ tintColor}) =>  <Icon name="md-list" size={35} color={tintColor} />
	},
},
	Message: { screen: Message,
	navigationOptions: {
		tabBarLabel: 'MESSAGE',
		tabBarIcon: ({ tintColor}) =>  <Icon name="ios-chatbubbles-outline" size={35} color={tintColor} />
	},
},
	Profile: { screen: Profile,
	navigationOptions: {
		tabBarLabel: 'PROFILE',
		tabBarIcon: ({ tintColor }) =>  <Icon name="ios-person-outline" size={35} color={tintColor}/>
	},
},

},
{
	tabBarOptions: {
		 activeTintColor: 'dodgerblue',
		 pressColor: 'dodgerblue',
		 inactiveTintColor:'#222',
		 inactiveBackgroundColor:'#fefefe',
		 style: {
			 borderTopWidth: 1,
			 marginBottom: 3,
			 backgroundColor: '#fefefe'
		 }
	},
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'bottom',
	swipeEnabled: false,
	initialRouteName:'Explore'
})