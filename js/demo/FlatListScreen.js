import React, {Component} from "react";
import {FlatList, View, Text, StyleSheet, RefreshControl, ActivityIndicator} from 'react-native'
// import styles from './styles'

type Props = {}
const CITY_NAMES = [
    {name: '北京',key: '1'},
    {name: '上海',key: '2'},
    {name: '天津',key: '3'},
]
export default class PopularScreen extends Component<props> {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES
        }
    }

    _renderItem(data, index) {
        return (
            <View style={styles.flatlistitem} key={index}>
                <Text style={styles.flatlistitemtext}>{data.item.name}</Text>
            </View>
        )
    }
    _loadData(refreshing) {
        if(refreshing){
            this.setState({
                isLoading: true
            })
        }
       setTimeout(() =>{
            let dataArray = []
            if(refreshing){
                for(let i=this.state.dataArray.length-1;i>=0;i--){
                    dataArray.push(this.state.dataArray[i])
                }
            } else {
                dataArray = this.state.dataArray.concat(CITY_NAMES)
            }
            this.setState({
                dataArray: dataArray,
                isLoading: false
            })
        }, 2000)
    }
    _getIndicator() {
        return (
            <View styles={styles.indicatorContainer}>
                <ActivityIndicator styles={styles.indicator}
                    size={'large'}
                    animating={true}
                    color={'red'}
                />
                <Text>正在加载更多...</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {/*<FlatList renderItem={} data={} initialNumToRender={} keyExtractor={} numColumns={} getItem={} getItemCount={} disableVirtualization={} maxToRenderPerBatch={} updateCellsBatchingPeriod={} windowSize={}/>*/}
                <FlatList
                    data={this.state.dataArray}
                    renderItem={(data, index)=>this._renderItem(data, index)}
                    // refreshing={this.state.isLoading}
                    // onRefresh={() => {
                    //     this._loadData()
                    // }}
                    refreshControl= {
                        <RefreshControl
                            title= {'Loading'}  //ios
                            titleColor={'red'}  //ios
                            colors ={ ['red'] }  //tinyColor on ios
                            refreshing={this.state.isLoading}
                            onRefresh={ () => {
                                this._loadData(true)
                            }}
                        />
                    }
                    ListFooterComponent={ () => this._getIndicator() }
                    onEndReached={() => {
                        this._loadData(false)
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatlistitem: {
        backgroundColor: '#169',
        height: 200,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },
    flatlistitemtext: {
        color: 'white',
        fontSize: 20
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
