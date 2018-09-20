import React from 'react';
import {StyleSheet, View, Image, Button} from 'react-native'
import {createDrawerNavigator} from "react-navigation";

class MyHomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../../res/images/ic_contacts.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"
                />
                <Button
                    onPress={() => this.props.navigation.openDrawer()}
                    title="openDrawer"
                />
                <Button
                    onPress={() => this.props.navigation.closeDrawer()}
                    title="closeDrawer"
                />
                <Button
                    onPress={() => this.props.navigation.toggleDrawer()}
                    title="toggleDrawer"
                />
            </View>
        );
    }
}

class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Notifications',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../../res/images/ic_code.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

export default App = createDrawerNavigator({
    Home: {
        screen: MyHomeScreen,
    },
    Notifications: {
        screen: MyNotificationsScreen,
    },
});