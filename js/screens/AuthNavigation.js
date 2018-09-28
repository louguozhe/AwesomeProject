import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './AuthLoadingScreen'
import AuthStackNavigator from './AuthStackNavigator'
import AppTabNavigation from '../pages/AppTabNavigation'

export default createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,  //验证登陆
        App: AppTabNavigation,  //该布局顶端无标题
        // App: AppStackNavigator,  //该主页顶端有标题
        Auth: AuthStackNavigator,  //认证流程
    },
    {
        initialRouteName: 'AuthLoading',
    }
);