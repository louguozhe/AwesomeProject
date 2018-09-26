import React from "react";
import {AsyncStorage, Button, View} from "react-native";
import TabNavigationApp from "./TabNavigation";


export default class AppScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '主页A',
            headerTitle: '我的应用',
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('Auth')}
                    title="注销"
                    //color="#fff"
                />
            )
        }
    };
    render() {
        return (
            <TabNavigationApp/>
        );
    };
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

}