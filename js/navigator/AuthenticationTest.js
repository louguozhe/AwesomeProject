import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import TabNavigationApp from './TabNavigationTest'

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,  //验证登陆
        App: TabNavigationApp,   //主页面
        Auth: AuthStack,  //认证流程
    },
    {
        initialRouteName: 'AuthLoading',
    }
);