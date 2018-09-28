import React from 'react';
import {Button, AsyncStorage, View, StyleSheet} from 'react-native';
import styles from './styles'

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: '请登录',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="登陆" onPress={this._signInAsync} />
            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}