import React from 'react'
import { View, Image } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import { Text } from '../atom';

interface INavBar {
    title: string
    ImageProp?: "wallet" | "settings" | "history" | "bank" | "analytics" | "BarChart" | "new-deposit" | "profile" | "notification"
}

export const NavBar: React.FC<INavBar> = ({ ImageProp, title }) => {
    const navigation = useNavigation()
    const renderImage = () => {

        switch (ImageProp) {
            case "wallet":
                return require("../../../assets/images/icons/wallet.png")
            case "settings":
                return require("../../../assets/images/icons/settings.png")
            case "history":
                return require("../../../assets/images/icons/wall-clock.png")
            case "bank":
                return require("../../../assets/images/icons/bank.png")
            case "analytics":
                return require("../../../assets/images/icons/analytics.png")
            case "BarChart":
                return require("../../../assets/images/icons/Solid.png")
            case "new-deposit":
                return require("../../../assets/images/icons/newdeposit.png")
            case "profile":
                return require("../../../assets/images/icons/user-circle-regular.png")
            case "notification":
                return require("../../../assets/images/icons/bell2.png")
            default:
                return require("../../../assets/images/icons/wallet.png")
        }

    }
    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }
    return (
        <View style={{ flexDirection: "row", paddingRight: 20, height: 50, alignItems: "center", backgroundColor: "#393936" }}>
            <Icon onPress={goBack} style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: Colors.common.textOrange }} type="Ionicons" name="arrow-back" />
            <View style={{ alignItems: "center", justifyContent: "flex-end", flex: 1, flexDirection: "row" }}>
                <Image resizeMode="contain" source={renderImage()} style={{ tintColor: Colors.common.borderOrange, height: 20, width: 20 }} />

                <Text style={{ color: Colors.common.white, fontSize: 14, fontWeight: "bold", marginLeft: 10 }}>{title}</Text>
            </View>
        </View>
    )

};