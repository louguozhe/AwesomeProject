import React from 'react';
import {Text, View} from 'react-native';

export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>设置:{this.props.navigation.getParam('myTitle', 'What?')}</Text>
            </View>
        );
    }
}