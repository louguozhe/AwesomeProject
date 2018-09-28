import React, {Component} from 'react'
import {View, Text} from 'react-native'
import HttpUtils from '../utils/HttpUtils'

export default class FetchScreen extends Component<props> {
    constructor(props) {
        super(props)
        this.state = {
            result: ''
        }
    }
    onLoad(url) {
        console.log('fetch:' + url)
        HttpUtils.get(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }
    onPost(url, data) {
        HttpUtils.post(url,data)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }
    render() {
        return (
            <View style={{fontSize: 20}}>
                <Text style={{fontSize: 20}} onPress={ () => {this.onLoad('https://api.github.com/search/repositories?q=windows')}}>
                    获取数据...
                </Text>
                <Text style={{fontSize: 20,paddingTop: 30}} onPress={ () => {
                    this.onPost('http://rap2api.taobao.org/app/mock/86002/testpost',
                    {userName: '123',password: '456'}
                    )}}>
                    提交数据...
                </Text>
                <Text style={{fontSize: 20,paddingTop: 60}}>
                    返回结果：{this.state.result}
                </Text>
            </View>
        )
    }
}