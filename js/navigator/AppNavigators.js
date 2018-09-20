import {DrawerNavigator, StackNavigator, TabBarBottom, TabNavigator, SafeAreaView, DrawerItems} from 'react-navigation'
import HomePage from '../pages/HomePage'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'
import Page4 from '../pages/Page4'
import Page5 from '../pages/Page5'
import React from 'react'
import {Button, Platform, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        };
    }

    render() {
        const {routes, index} = this.props.navigationState;
        const {theme} = routes[index].params;
        if (theme && theme.updateTime > this.theme.updateTime) {
            this.theme = theme;
        }
        return <TabBarBottom
            {...this.props}
            activeTintColor={this.theme.tintColor || this.props.activeTintColor}
        />
    }
}

export const DrawerNav = DrawerNavigator({
    Page4: {
        screen: Page4,
        navigationOptions: {
            drawerLabel: 'Page4',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons
                    name={"drafts"}
                    size={24}
                    style={{color: tintColor}}/>
            )
        }
    },
    Page5: {
        screen: Page5,
        navigationOptions: {
            drawerLabel: 'Page5',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons
                    name={"drafts"}
                    size={24}
                    style={{color: tintColor}}/>
            )
        }
    }
}, {
    initialRouteName:'Page5',
    contentOptions:{
        activeTintColor:'#e89'
    },
    contentComponent: (props) => (
        <ScrollView style={{backgroundColor: '#987666', flex: 1}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerItems {...props}/>
            </SafeAreaView>
        </ScrollView>
    )
});
export const AppTabNavigator = TabNavigator({
    Page1: {
        screen: Page1,
        navigationOptions: {
            tabBarLabel: 'Page1',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            tabBarLabel: 'Page2',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-people' : 'ios-people-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    Page3: {
        screen: Page3,
        navigationOptions: {
            tabBarLabel: 'Page3',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    }
}, {
    // tabBarComponent: TabBarComponent,
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#e91e61' : '#fff'
    }

});
export const AppStackNavigator = StackNavigator({
    HomePage: {
        screen: HomePage,
    },
    Page1: {
        screen: Page1,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}页面名`
        })
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            title: "Page22"
        }
    },
    Page3: {
        screen: Page3,
        navigationOptions: (props) => {
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;
            return {
                title: params.title ? params.title : 'This is Page3',
                headerRight: (
                    <Button
                        title={params.mode === 'edit' ? '保存' : '编辑'}
                        onPress={() => {
                            setParams({mode: params.mode === 'edit' ? "" : "edit"})
                        }}
                    />
                )
            }
        }
    },
    TabNav: {
        screen: AppTabNavigator,
        navigationOptions: {
            title: "This is TabNavigator"
        }
    },
    DrawerNav: {
        screen: DrawerNav,
        navigationOptions: {
            title: "This is DrawerNavigator"
        }
    },
}, {
    navigationOptions: {
        // header: null
    }
});