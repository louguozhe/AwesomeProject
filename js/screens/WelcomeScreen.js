import React, {Component} from 'react';
import {View, Text} from 'react-navigation';
import AppTabNavigation from '../pages/TabNavigation'

export default class WelcomeScreen extends Component{

    componentDidMount() {
        this.timer = setTimeout( () => {
            this.props.navigator.resetTo({component: AppTabNavigation})
        },2000)
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    render() {
        return (
            <View>
                <Text>欢迎</Text>
            </View>
        )
    }
}