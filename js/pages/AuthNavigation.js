import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './AuthLoadingScreen'
import AppStackNavigator from './AppStackNavigator'
import TabNavigation from './TabNavigation'
import AuthStackNavigator from './AuthStackNavigator'

export default createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,  //验证登陆
        App: TabNavigation,  //AppStackNavigator, 该主页顶端有标题
        Auth: AuthStackNavigator,  //认证流程
    },
    {
        initialRouteName: 'AuthLoading',
    }
);