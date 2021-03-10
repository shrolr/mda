import React from 'react'
import { View, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface ITopBar {

}

export const TopBar: React.FC<ITopBar> = () => {
    const navigation = useNavigation();
    const toggleNavigation = () => {
        navigation.dispatch(DrawerActions.toggleDrawer())

    }
    return (
        <View>
            <View style={{ height: 15, backgroundColor: Colors.common.statusBarColor }} />
            <View style={{ paddingRight: 20, height: 55, flexDirection: "row", backgroundColor: Colors.common.white }}>

                <View style={{ justifyContent: "center", width: 60, backgroundColor: Colors.common.menuBackgroundColor }}>
                    <TouchableWithoutFeedback onPress={toggleNavigation}> 
                        <Icon style={{ color: "white", alignSelf: "center" }} type="Entypo" name="menu" />
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Image source={{ uri: "https://i.hizliresim.com/TtqzTs.png" }} resizeMode="contain" style={{ marginLeft: 10, height: 50, width: 100 }} />
                </View>
                <View style={{ alignSelf: "center", justifyContent: "center", width: 30, borderRadius: 15, height: 30, backgroundColor: Colors.common.menuBackgroundColor }}>
                    <Icon style={{ fontSize: 16, color: "black", alignSelf: "center" }} type="AntDesign" name="download" />
                </View>
                <View style={{ marginLeft: 10, alignSelf: "center", justifyContent: "center", backgroundColor: Colors.common.white, }}>
                    <Icon style={{ fontSize: 16, color: "black", alignSelf: "center" }} type="Feather" name="bell" />
                </View>
                <View style={{ marginLeft: 10, flexDirection: "row", alignSelf: "center", justifyContent: "center", backgroundColor: Colors.common.white, }}>
                    <Image resizeMode="contain" style={{ marginRight: 10, height: 20, width: 20 }} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/United-kingdom_flag_icon_round.svg/1200px-United-kingdom_flag_icon_round.svg.png" }} />
                    <Text>EN</Text>
                </View>
            </View>
        </View>

    )


};