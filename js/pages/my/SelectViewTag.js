import React,{ Component} from 'react'
import {View, ScrollView, StyleSheet, Alert, Platform, Image} from 'react-native'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../../utils/ArrayUtils'
import ViewUtils from "../../utils/ViewUtils";
import GlobalStyles from "../../../res/styles/GlobalStyles";
import LanguageDao, {FLAG_LANGUAGE} from '../../dao/LanguageDao'

export default class SelectViewTag extends Component {
    constructor(props) {
        super(props)
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.changeValues = [];
        this.isRemoveKey=this.props.isRemoveKey?true:false;
        this.state = {
            dataArray: []
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        this.languageDao.fetch()
            .then(result => {
                console.log('SelectViewTag.loadData',result)
                this.setState({
                    dataArray: result
                })
            })
    }
    renderView() {
        if ( !this.state.dataArray || this.state.dataArray.length === 0)
            return null
        let len = this.state.dataArray.length
        let views = []
        for(var i=0;i*2<len-2;i+=1) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[2*i])}
                        {this.renderCheckBox(this.state.dataArray[2*i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        if ( 2*i === len-1){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[2*i])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )

        }
        console.log('SelectViewTag.renderView',views)

        return views
    }
    onClick(data) {
        if(this.props.navigation.state.params.isRemoveKey)
            data.deleted = data.deleted?false:true
        else
            data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data)
        this.setState(
            {
                dataArray: this.state.dataArray
            }
        )
    }
    renderCheckBox(data) {
        let leftText = data.name;
        let isChecked = false
        if (this.props.navigation.state.params.isRemoveKey)
            isChecked = data.deleted?true : false
        else
            isChecked = data.checked
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data)}
                isChecked={isChecked}
                leftText={leftText}
                checkedImage={<Image source={require('./img/ic_check_box.png')}
                                     style={this.props.navigation.state.params.theme.styles.tabBarSelectedIcon}/>}
                unCheckedImage={<Image source={require('./img/ic_check_box_outline_blank.png')}
                                       style={this.props.navigation.state.params.theme.styles.tabBarSelectedIcon}/>}
            />
        )
    }
    onBack() {
        if (this.changeValues.length > 0) {
            Alert.alert(
                '提示',
                '要保存修改吗?',
                [
                    {
                        text: '否', onPress: (() => {
                            this.props.navigation.pop();
                        })
                    },
                    {
                        text: '是', onPress: (() => {
                            this.onSave();
                        })
                    }
                ]
            )
        } else {
            this.props.navigation.pop();
        }
    }
    renderNavBar() {
        let backButton = ViewUtils.getLeftButton(()=>this.onBack());
        let actionLabel = this.props.navigation.state.params.isRemoveKey? '删除' : '保存'
        let rightButton = ViewUtils.getRightButton(actionLabel,()=>this.onSave()); //<Button title="保存"></Button>  //
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
    onSave() {
        console.log('SelectViewTag.changeValues',this.changeValues)
        if (this.changeValues.length === 0) {
            this.props.navigation.pop() //goBack()
            return;
        }
        if(this.props.navigation.state.params.isRemoveKey){
            for(let i=0,l=this.changeValues.length;i<l;i++){
                ArrayUtils.remove(this.state.dataArray,this.changeValues[i]);
            }
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigation.pop() //goBack()

    }
    render(){
        return (
            <View  style={styles.container}>
                {this.renderNavBar()}
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    tips: {
        fontSize: 20,
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})