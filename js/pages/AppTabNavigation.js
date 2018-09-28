import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import RespositoryTab from './Respository/RespositoryTab'
import CustomTheme from './my/CustomTheme'
import CustomTag from './my/CustomTag'
import FetchScreen from './FetchScreen'
import FlatListScreen from '../demo/FlatListScreen'

export default class AppTabNavigator extends Component<props>{
    constructor(props) {
        super(props);
        console.log('AppTabNavigator.props: ',this.props)
        let selectedTab=this.props.selectedTab?this.props.selectedTab:'tb_my';
        // console.log('this.props.navigation.state.params.theme', this.props.navigation.state.params.theme)
        this.state = {
            selectedTab: selectedTab,
            theme: this.props.navigation.state.params.theme,
        }
    }
    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
                title={title}
                renderIcon={() => <Image style={styles.image}
                                         source={renderIcon}/>}
                renderSelectedIcon={() =><Image style={[styles.image, this.state.theme.styles.tabBarSelectedIcon]}
                                                source={renderIcon}/>}
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component {...this.props} theme={this.state.theme}/>
            </TabNavigator.Item>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {/*<TabNavigator.Item><Text>Haha</Text></TabNavigator.Item>*/}
                    {this._renderTab(RespositoryTab,'tb_popular','最热',require('../../res/images/ic_polular.png'))}
                    {this._renderTab(FetchScreen,'tb_trending','趋势',require('../../res/images/ic_trending.png'))}
                    {this._renderTab(FlatListScreen,'tb_favorite','收藏',require('../../res/images/ic_favorite.png'))}
                    {this._renderTab(CustomTag,'tb_my','我的',require('../../res/images/ic_my.png'))}
                </TabNavigator>
                {/*<Toast ref={(toast)=>this.toast=toast}/>*/}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 26,
        width: 26,
    }
});
