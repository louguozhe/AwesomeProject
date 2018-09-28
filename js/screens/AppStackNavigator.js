import {createStackNavigator} from "react-navigation";
import AppScreen from "./AppScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";

export default createStackNavigator(
    {
        Home: {
            screen: AppScreen,
            navigationOptions:({navigation}) => ({
                tabBarLabel: '主页', // tabBar显示的文字
                tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                    // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                    <FontAwesome
                        name={'wpforms'}
                        size={20}
                        color={tintColor}
                    />
                ),
            })
        }
    }
);
