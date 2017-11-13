import { StackNavigator,NavigationActions } from 'react-navigation';
import StackScreen from '../components/navigations/StackScreen';

export const AppNavigator = StackNavigator(StackScreen);

const initState = AppNavigator.router.getStateForAction(NavigationActions.init())

const navReducer = (state = initState, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

export default navReducer;