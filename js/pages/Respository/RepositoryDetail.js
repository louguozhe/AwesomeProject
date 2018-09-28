import React,{ Component} from 'react'
import {View,WebView, Text, Platform,} from 'react-native'
import ViewUtils from "../../utils/ViewUtils";
import GlobalStyles from "../../../res/styles/GlobalStyles";

export default class RepositoryDetail extends Component<props>{
    constructor(props) {
        super(props);
        console.log('RepositoryDetail.props: ',this.props)
        console.log('RepositoryDetail.url: ',this.props.navigation.state.params.url)
    }
    renderNavBar() {
        let backButton = ViewUtils.getLeftButton(()=>this.props.navigation.goBack());
        return <View style={{
            backgroundColor: this.props.navigation.state.params.theme.themeColor,
            flexDirection: 'row',
            alignItems: 'center',
            height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
        }}>
            {backButton}
        </View>
    }
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    render() {
        return (
            <View>
                {this.renderNavBar()}
                {/*<WebView*/}
                    {/*ref={webView=>this.webView = webView}*/}
                    {/*startInLoadingState={true}*/}
                    {/*onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}*/}
                    {/*source={{uri: this.props.navigation.state.params.url}}/>*/}
            </View>
        )
    }
}