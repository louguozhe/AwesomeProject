import {createStackNavigator} from "react-navigation";
import PopularScreen from "./PopularScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";

export default createStackNavigator(
    {
        Popular: {
            screen: PopularScreen,
            // navigationOptions:({navigation}) => ({
            //     title: '热门商品',
                // headerTitle: '我的应用',
                // headerRight: (
                //     <Button
                //         onPress={() => navigation.navigate('Auth')}
                //         title="注销"
                //         //color="#fff"
                //     />
                // )
            // })
    }}
);
