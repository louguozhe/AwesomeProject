import React,{ Component} from 'react'
import {View, WebView, Text, Platform, StyleSheet,} from 'react-native'
import SelectViewTag from './SelectViewTag'
import LanguageDao, {FLAG_LANGUAGE} from "../../dao/LanguageDao";

export default class CustomTag extends Component{
    constructor(props) {
        super(props)
        console.log('CustomTag.props: ',this.props)
    }

    onCustomTag() {
        this.props.navigation.navigate('SelectViewTag',
            {...this.props}
        );
    }
    onDeleteTag() {
        this.props.navigation.navigate('SelectViewTag',
            {...this.props, isRemoveKey: true}
        );
    }
    onSortSelectedTag() {
        this.props.navigation.navigate('SortSelectTag',
            {...this.props}
        );

    }

    render() {
        return (
            <View>
                <Text style={styles.text} onPress={() => this.onCustomTag()}>自定义标签</Text>
                <Text style={styles.text} onPress={() => this.onDeleteTag()}>删除标签</Text>
                <Text style={styles.text} onPress={() => this.onSortSelectedTag()}>排序标签</Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    text: {
        fontSize: 40,
    },
})