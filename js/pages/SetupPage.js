import React, {Component} from 'react'
import {View, Text, createStackNavigator, withNavigation  } from 'react-navigation'
import WelcomePage from './WelcomePage'
import RepositoryDetail from "./Respository/RepositoryDetail";
import AppTabNavigation from "./AppTabNavigation";
import SelectViewTag from './my/SelectViewTag'
import SortSelectTag from './my/SortSelectTag'
import ViewUtils from '../utils/ViewUtils'


export default createStackNavigator(
    {
        Welcome: {
            screen: WelcomePage, //withNavigation(WelcomePage)
            navigationOptions: ({ navigation }) => ({
                // title: `${navigation.state.params.name}`,
            }),
        },
        App: {
            screen: AppTabNavigation
        },
        RepositoryDetail:{
            screen: RepositoryDetail,
            navigationOptions: ({ navigation }) => ({
            }),
        },
        SelectViewTag: {
            screen: SelectViewTag,
        },
        SortSelectTag: {
            screen: SortSelectTag,
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            // gesturesEnabled: false,
        },
    }
);

