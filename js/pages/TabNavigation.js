import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PopularNavigator from './Popular/PopularNavigator'
import PopularScreen from './Popular/PopularScreen'
import CustomTheme from './my/CustomTheme'
import FetchScreen from './FetchScreen'
import SettingsScreen from './SettingsScreen'

/**
 * Tab点击跳转调用的公共方法
 */
const route = (navigation) => {
    if (!navigation.isFocused()) {
        navigation.navigate(navigation.state.routeName, {  //路由方法, 动态跳转到对应界面，可以传参
            myTitle: navigation.state.routeName,
        })
    }
};

const TabNavigator =  createBottomTabNavigator(
    {
        Popular: PopularScreen,//PopularNavigator,
        Settings: {
            screen: SettingsScreen,
            navigationOptions:({navigation}) => ({
                tabBarLabel: '设置1', // tabBar显示的文字
                tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                    // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                    <FontAwesome
                        name={'wpforms'}
                        size={20}
                        color={tintColor}
                    />
                ),
            })
        },
        TestAPI: FetchScreen,
        My: {
            screen: CustomTheme,
            navigationOptions:({navigation}) => ({
                tabBarOnPress: () => { // 使用tabBarOnPress点击事件
                    route(navigation)
                },
            })
        }
    },
    {
        initialRouteName: 'Popular',
        lazy: true, // 是否在app打开的时候将底部标签栏全部加载
        backBehavior: null, // 点击返回退到上级界面
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Popular') {
                    iconName = `ios-add-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-checkbox${focused ? '' : '-outline'}`;
                } else if (routeName === 'TestAPI') {
                    iconName = `ios-checkbox${focused ? '' : '-outline'}`;
                } else if (routeName === 'My') {
                    iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            },
            // tabBarOnPress: () => { // 使用tabBarOnPress点击事件
            //     route(navigation)
            // },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',  // 选中时tab的label/icon的颜色
            inactiveTintColor: 'gray',// 未选中的颜色
            showLabel: true,
            showIcon: true,
            // labelStyle: {  // TabBar内单独tab的文字样式
            //     fontSize: 12,
            // },
            // style: {  // 整体TabBar的样式
            //     backgroundColor: 'blue',
            //     height: 54,
            // },
            // tabStyle: { // TabBar内单独tab的样式
            //     height: 54,
            // },
        },
    }
);

TabNavigator.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];

    // You can do whatever you like here to pick the title based on the route name
    const headerTitle = routeName;

    return {
        headerTitle,
    };
};

export default TabNavigator