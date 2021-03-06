import { Card, Icon } from 'native-base';
import React, { useState } from 'react'
import { StatusBar, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { MenuCard, NavBar } from '../../../components';
import { TopBar } from '../../../components/Organisms/TopBar';
import Colors from '../../../constants/Colors';
import { useStateContext } from '../../../context/state';
import { HomeStackNavProps } from '../HomeParamList';
import { convertUTCDateToLocalDate } from '../../../utilities/functions';
import { useTranslation } from 'react-i18next';
import { Locales } from '../../../enums';

export default function WalletScreen({ navigation }: HomeStackNavProps<"Wallet">) {
    const { t } = useTranslation();

    const { context } = useStateContext()
    const navigateToWalletInfoScreen = () => {
        navigation.navigate("WalletInfoScreen")
    }
    var localTime = { date : "",time :""}
    if (context.walletInfo) {
        localTime = convertUTCDateToLocalDate(new Date(context.walletInfo?.wallet.createdDate))
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.common.statusBarColor }}>
            <View style={{ flex: 1, backgroundColor: Colors.common.white }}>

                <StatusBar
                    animated={true}
                    backgroundColor={Colors.common.statusBarColor}
                    barStyle="light-content"
                    showHideTransition="slide"
                />
                <TopBar />
                <NavBar ImageProp="wallet" title={t(Locales.Wallet + ":TITLE")} />
                <View style={{ flex: 1 }}>


                    <View style={{ flexDirection: "row", height: 84, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
                        <MenuCard shouldNavigate imageUri={require("../../../../assets/images/icons/wallet.png")} title={t(Locales.Wallet + ":WALLETDASHBOARD")} isTouchable={false} />
                        <MenuCard shouldNavigate onMenuItemClick={navigateToWalletInfoScreen} imageUri={require("../../../../assets/images/icons/settings.png")} title={t(Locales.Wallet + ":WALLETTRANSACTIONS")} isTouchable={true} />
                    </View>


                    <Card style={{ marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                        <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.walletHeader, alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 18 }}>{t(Locales.Withdraw + ":BALANCE")} </Text>
                        </View>
                        <View style={{ backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, flexDirection: "row" }}>
                            <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                                <Text style={{ fontSize: 13, color: Colors.common.gray }}>{localTime.date}   |   {localTime.time}</Text>
                                <Text style={{ flex: 1, textAlign: "right", fontSize: 20, color: Colors.common.walletHeader, fontWeight: "bold", }}>{context.walletInfo?.wallet.balance} $</Text>
                            </View>
                        </View>
                    </Card>
                </View>
            </View>
        </SafeAreaView>
    )
}
