import React, {Component} from "react";
import {View, ScrollView,RefreshControl, Text, StyleSheet, Button,DeviceEventEmitter,TouchableOpacity} from 'react-native'
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'
import PopularTab from './PopularTab'
// import FavoriteDao from '../../dao/FavoriteDao'
// import styles from './styles'
// import LanguageDao, {FLAG_LANGUAGE} from '../../dao/LanguageDao'
// import DataRepository, {FLAG_STORAGE} from '../../dao/DataRepository'
type Props = {}

export default class PopularScreen extends Component<props> {
    constructor(props) {
        super(props)
        // this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        // this.state = {
        //     languages: [],
        //     // theme:this.props.theme,
        //     customThemeViewVisible: false,
        // }
        // this.loadLanguage();
    }
    loadLanguage() {
        this.languageDao.fetch().then((languages)=> {
            if (languages) {
                this.setState({
                    languages: languages,
                });
            }
        }).catch((error)=> {

        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    // tabBarInactiveTextColor='mintcream'
                    style={{marginTop: 4, }}
                    initialPage={1}
                    renderTabBar={() => <DefaultTabBar
                        backgroundColor='rgba(255, 255, 255, 0.7)'
                    />}
                    // tabBarPosition='overlayTop'
                >
                    <PopularTab tabLabel="React1" type="Type1"/>
                    <PopularTab tabLabel="React2" type="Type2"/>
                    <ScrollView tabLabel='iOS'>
                        <Icon name='logo-apple' color='black' size={300} style={styles.icon} />
                        <Icon name='ios-phone-portrait' color='black' size={300} style={styles.icon} />
                        <Icon name='logo-apple' color='#DBDDDE' size={300} style={styles.icon} />
                        <Icon name='ios-phone-portrait' color='#DBDDDE' size={300} style={styles.icon} />
                    </ScrollView>
                    <ScrollView tabLabel='Android'>
                        <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon} />
                        <Icon name='logo-android' color='black' size={300} style={styles.icon} />
                        <Icon name='logo-android' color='brown' size={300} style={styles.icon} />
                    </ScrollView>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});
