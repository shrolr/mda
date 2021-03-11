import React from 'react'
import { View  } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import { Text } from './atomix';

interface INavBar {
    title: string
    type: "Ionicons" | "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial"
    name: string
}

export const NavBar: React.FC<INavBar> = ({ title, type, name }) => {
    const navigation = useNavigation()

    const goBack = () => {
        if(navigation.canGoBack()){
            navigation.goBack()
        }
    }
    return (
        <View style={{ flexDirection: "row", paddingRight: 20, height: 50, alignItems: "center", backgroundColor: "#393936" }}>
            <Icon onPress={goBack} style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: Colors.common.textOrange }} type="Ionicons" name="arrow-back" />
            <View style={{ alignItems: "center", justifyContent: "flex-end", flex: 1, flexDirection: "row" }}>
                <Icon style={{ color: Colors.common.textOrange }} type={type} name={name} />
                <Text style={{ color: Colors.common.white, fontSize: 14, fontWeight: "bold", marginLeft: 10 }}>{title}</Text>
            </View>
        </View>
    )

};