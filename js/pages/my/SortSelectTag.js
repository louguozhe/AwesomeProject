import React,{ Component} from 'react'
import {View,Text, ScrollView, StyleSheet, Alert, Platform, Image, TouchableHighlight, DeviceEventEmitter} from 'react-native'
import SortableListView from 'react-native-sortable-listview'
import ArrayUtils from '../../utils/ArrayUtils'
import ViewUtils from "../../utils/ViewUtils";
import GlobalStyles from "../../../res/styles/GlobalStyles";
import LanguageDao, {FLAG_LANGUAGE} from '../../dao/LanguageDao'

class SortCell extends Component {
    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked ? styles.item : styles.hidden}
            {...this.props.sortHandlers}>
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <Image source={require('./img/ic_sort.png')} resizeMode='stretch' style={[{
                    opacity: 1,
                    width: 16,
                    height: 16,
                    marginRight: 10,
                },this.props.navigation.state.params.theme.styles.tabBarSelectedIcon]}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>    }
}
export default class SortSelectTag extends Component {
    constructor(props) {
        super(props)
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.dataArray = []
        this.originalCheckedArray = []
        this.sortResultArray = [];
        this.state = {
            checkedArray: []
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.getCheckedItem(result);
            })
    }
    getCheckedItem(result) {
        this.dataArray = result
        console.log('SortSelectTag.getCheckedItem.dataArray',this.dataArray)
        let checkedArray = []
        for(let i=0;i< this.dataArray.length;i++){
            let data = this.dataArray[i]
            if(data.checked)
                checkedArray.push(data)
        }
        this.setState({
            checkedArray: checkedArray
        })
        console.log('SortSelectTag.getCheckedItem.checkedArray',checkedArray)
        this.originalCheckedArray = ArrayUtils.clone(checkedArray)
    }

    onClick(data) {
        // if(!this.isRemoveKey)
        data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data)
        this.setState(
            {
                dataArray: this.state.dataArray
            }
        )
    }
    renderSortableListView() {
        return (
            <SortableListView
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={(e) => {
                    console.log('Moved...???')
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                    this.forceUpdate();
                }}
                renderRow={row => <SortCell data={row} {...this.props}/>}
            />
        )
    }
    onBack() {
        if (!ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            Alert.alert(
                '提示',
                '是否要保存修改呢?',
                [
                    {
                        text: '否', onPress: () => {
                            this.props.navigation.pop();
                        }
                    }, {
                    text: '是', onPress: () => {
                        this.onSave(true);
                    }
                }
                ]
            )
        } else {
            this.props.navigation.pop();
        }
    }
    renderNavBar() {
        let backButton = ViewUtils.getLeftButton(()=>this.onBack());
        let rightButton = ViewUtils.getRightButton('保存',()=>this.onSave()); //<Button title="保存"></Button>  //
        return (
            <View style={{
                backgroundColor: this.props.navigation.state.params.theme.themeColor,
                flexDirection: 'row',
                alignItems: 'center',
                height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
            }}>
                {backButton}
                {/*<Text>Title</Text>*/}
                {rightButton}
            </View>
        )
    }
    onSave(hasChecked) {
        if (!hasChecked) {
            if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
                this.props.navigator.pop();
                return;
            }
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        // var jumpToTab=this.props.flag===FLAG_LANGUAGE.flag_key?FLAG_TAB.flag_popularTab:FLAG_TAB.flag_trendingTab;
        // DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_RESTART,jumpToTab);
    }
    getSortResult() {
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for (let i = 0, j = this.originalCheckedArray.length; i < j; i++) {
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
    }

    render(){
        return (
            <View style={styles.container}>
                {this.renderNavBar()}
                {this.renderSortableListView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    hidden: {
        height: 0
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})
