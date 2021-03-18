import React, { useState } from 'react'
import { View, Image,  LayoutAnimation, Platform, UIManager } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useIsDrawerOpen } from '@react-navigation/drawer'
import { Text } from '../atom';

interface ITopBar {

}

export const TopBar: React.FC<ITopBar> = () => {
    const navigation = useNavigation();
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    const isOpen: boolean = useIsDrawerOpen()
    const toggleNavigation = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        navigation.dispatch(DrawerActions.toggleDrawer())
    }
    return (
        <View>
            <View style={{ height: 15, backgroundColor: Colors.common.statusBarColor }} />
            <View style={{ paddingRight: 20, height: 55, flexDirection: "row", backgroundColor: Colors.common.white }}>

                <View style={{ justifyContent: "center", width: 60, backgroundColor: Colors.common.menuBackgroundColor }}>
                    <TouchableWithoutFeedback onPress={toggleNavigation}>
                        {
                            isOpen ?
                                <Icon style={{ color: "white", alignSelf: "center" }} type="FontAwesome" name="close" /> :
                                <Icon style={{ color: "white", alignSelf: "center" }} type="Entypo" name="menu" />

                        }


                    </TouchableWithoutFeedback>
                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Image source={require("../../../assets/images/icons/logo.png")}   style={{ marginLeft: 10, height: 35, width: 100 }} />
                </View>
                <View style={{ marginLeft: 5, alignSelf: "center", justifyContent: "center", backgroundColor: Colors.common.white, }}>
                    <Image source={require("../../../assets/images/icons/download_orange.png")} style={{   height: 22, width: 22 }} />
                </View>

                <View style={{ marginLeft: 5, alignSelf: "center", justifyContent: "center", backgroundColor: Colors.common.white, }}>
                    <Image source={require("../../../assets/images/icons/bell.png")}   style={{ marginLeft: 5, height: 20, width: 20 }} />
                </View>
                <View style={{ marginLeft: 15, flexDirection: "row", alignSelf: "center", justifyContent: "center", backgroundColor: Colors.common.white, }}>
                <Image source={require("../../../assets/images/icons/flag_uk.png")}  style={{ marginRight: 5, height: 20, width: 20 }} />
                    <Text>EN</Text>
                </View>
            </View>
        </View>

    )


};