import React, {Component} from "react";
import {View, ScrollView,RefreshControl, Text, StyleSheet, Button,DeviceEventEmitter,TouchableOpacity} from 'react-native'
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'
import RepositoryQuery from './RepositoryQuery'
// import FavoriteDao from '../../dao/FavoriteDao'
// import styles from './styles'
import LanguageDao, {FLAG_LANGUAGE} from '../../dao/LanguageDao'
// import DataRepository, {FLAG_STORAGE} from '../../dao/DataRepository'
type Props = {}

export default class RespositoryTab extends Component<props> {
    constructor(props) {
        super(props)
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        console.log('RespositoryTab.props: ',this.props)
        this.state = {
            languages: [],
            theme:this.props.theme,
            customThemeViewVisible: false,
        }
        this.loadLanguage();
    }
    componentDidMount() {

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
                    tabBarBackgroundColor="#2196F3"
                    tabBarInactiveTextColor='mintcream'
                    tabBarActiveTextColor='white'
                    tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                    ref="scrollableTabView"
                    style={{marginTop: 4, }}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                          tabStyle={{height: 39}}/>}
                    // tabBarPosition='overlayTop'
                >
                    {this.state.languages.map( (result,i,arr) =>{
                        let language = arr[i]
                        return language.checked
                            ? <RepositoryQuery key={i} tabLabel={language.name} type={language.name} {...this.props} theme={this.state.theme}/>
                            : null
                    })}

                    {/*<RepositoryQuery tabLabel="Node" type="Node" {...this.props} theme={this.state.theme}/>*/}
                    {/*<RepositoryQuery tabLabel="JavaScript" type="JavaScript" {...this.props} theme={this.state.theme}/>*/}
                    {/*<RepositoryQuery tabLabel="Python" type="Python" {...this.props} theme={this.state.theme}/>*/}
                    {/*<ScrollView tabLabel='Android'>*/}
                        {/*<Icon name='logo-apple' color='black' size={300} style={styles.icon} />*/}
                        {/*<Icon name='ios-phone-portrait' color='black' size={300} style={styles.icon} />*/}
                        {/*<Icon name='logo-apple' color='#DBDDDE' size={300} style={styles.icon} />*/}
                        {/*<Icon name='ios-phone-portrait' color='#DBDDDE' size={300} style={styles.icon} />*/}
                        {/*<Icon name='logo-android' color='#A4C639' size={300} style={styles.icon} />*/}
                        {/*<Icon name='logo-android' color='black' size={300} style={styles.icon} />*/}
                        {/*<Icon name='logo-android' color='brown' size={300} style={styles.icon} />*/}
                    {/*</ScrollView>*/}
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
