import React from 'react';
import {StyleSheet, FlatList, View, Text,RefreshControl, ActivityIndicator} from 'react-native';
import HttpUtils from '../../utils/HttpUtils'
import RepositoryItem from './RepositoryItem'
import ActionUtils from '../../utils/ActionUtils'
import FavoriteDao from '../../dao/FavoriteDao'
import DataRepository, {FLAG_STORAGE} from '../../dao/DataRepository'

var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

export default class RepositoryQuery extends React.Component {
    constructor(props) {
        super(props)
        console.log('RepositoryQuery.props: ',this.props)
        this.state = {
            isLoading: false,
            currentPage: -1,
            dataSource:[],
            url: '',
        }
    }

    componentDidMount() {
        this.LoadPageData()
    }
    RefreshData() {
        console.log('RefreshData')
        let loadPage = 0
        const url = 'https://api.github.com/search/repositories?q=' + this.props.type + '&per_page=10&page=' + loadPage
        this.setState({
            isLoading: true
        })
        HttpUtils.get(url)
            .then(result => {
                // console.log('getData：' + result)
                // let dataArray = this.setState.dataSource.concat(result.items)
                let dataArray = result && result.items ? result.items : result ? result : []
                this.setState({
                    dataSource: dataArray,
                    url: url,
                    currentPage: loadPage,
                    isLoading: false
                })
            })
            .catch(error => {
                this.setState({
                    dataSource: JSON.stringify(error),
                    url: url
                })
            })

    }
    LoadPageData(page) {
        let loadPage = page || this.state.currentPage + 1
        if (loadPage<0)
            loadPage = 0
        const url = 'https://api.github.com/search/repositories?q=' + this.props.type + '&per_page=10&page=' + loadPage
        console.log('LoadPageData: ',loadPage, url)
        HttpUtils.get(url)
            .then(result => {
                console.log('getData：' + result)
                // let dataArray = this.setState.dataSource.concat(result.items)
                let dataArray = result && result.items ? result.items : result ? result : []
                if (loadPage !== 0)
                    dataArray = this.state.dataSource.concat(dataArray)
                this.setState({
                    dataSource: dataArray,
                    url: url,
                    currentPage: loadPage
                })
            })
            .catch(error => {
                this.setState({
                    dataSource: JSON.stringify(error),
                    url: url
                })
            })

    }
    _renderItem(projectModel, index) {
        return (
            <RepositoryItem
                key={projectModel.item.id}
                projectModel={projectModel}
                theme={this.props.theme}
                onSelect={()=>ActionUtils.onSelectRepository({
                    projectModel: projectModel,
                    flag: FLAG_STORAGE.flag_popular,
                    ...this.props
                })}
                onFavorite={(item, isFavorite)=>ActionUtils.onFavorite(favoriteDao,item, isFavorite)}
            />
        )
    }
    _getIndicator() {
        return (
            <View styles={styles.indicatorContainer}>
                <ActivityIndicator styles={styles.indicator}
                                   size={'large'}
                                   animating={true}
                                   color={'red'}
                />
                {/*<Text>正在加载...</Text>*/}
            </View>
        )
    }
    _keyExtractor = (item, index) => index.toString()  //item.node_id // item.node_id;
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                   data={this.state.dataSource}
                   renderItem={(data, index)=>this._renderItem(data, index)}
                   keyExtractor={this._keyExtractor}
                   refreshControl= {
                       <RefreshControl
                           title= {'Loading'}  //ios
                           titleColor={'red'}  //ios
                           colors ={ ['red'] }  //tinyColor on ios
                           refreshing={this.state.isLoading}
                           onRefresh={ () => {
                               this.RefreshData()
                           }}
                       />
                   }
                   ListFooterComponent={ () => this._getIndicator() }
                   onEndReached={() => {
                       this.LoadPageData()
                   }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 30
    },
    textInput: {
        borderWidth: 1,
        height: 40,
        width: 300
    },
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
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
    },
});
