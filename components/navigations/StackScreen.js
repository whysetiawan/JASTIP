import {StackNavigator} from 'react-navigation';
import Index from '../../src/index';
import Signin from '../../src/Signin';
import Register from '../../src/Register';
import Forgot from '../../src/Forgot Password';
import Tabs from './TabScreen';

export default StackScreen = {
  Index : { screen: Index },
  Signin: { screen: Signin },
  Register: { screen: Register },
  Forgot : { screen: Forgot },
  Tabs: { screen: Tabs },
}