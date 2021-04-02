import React from 'react'
import { View, StatusBar, SafeAreaView } from 'react-native'
import { MenuCard, NavBar } from '../../../components'
import { Text } from '../../../components/atom'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import { Card } from 'native-base'
import { HomeStackNavProps } from '../HomeParamList'
import { useTranslation } from 'react-i18next'
import { Locales } from '../../../enums'


export default function TransferScreen({ navigation }: HomeStackNavProps<"Transfer">) {
    const { t } = useTranslation();

    const navigateToDepositsHistory = () => {
        navigation.navigate("TransferHistory")
    }

    const navigateToNewDepositScreen = () => {
        navigation.navigate("NewTransfer")
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
                <NavBar ImageProp="wallet" title={t(Locales.Transfer + ":TITLE")} />
                <View style={{ flexDirection: "row", height: 84, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
                    <MenuCard shouldNavigate imageUri={require("../../../../assets/images/icons/bank.png")} title={t(Locales.Transfer + ":TRANSFERDASHBOARD")}  isTouchable={false} />
                    <MenuCard shouldNavigate onMenuItemClick={navigateToNewDepositScreen} imageUri={require("../../../../assets/images/icons/newdeposit.png")} title={t(Locales.Transfer + ":CREATETRANSFER")} isTouchable={true} />
                    <MenuCard shouldNavigate onMenuItemClick={navigateToDepositsHistory} imageUri={require("../../../../assets/images/icons/wall-clock.png")} title={t(Locales.Transfer + ":TRANSFERHISTORY")} isTouchable={true} />
                </View>
                <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                    <Text>
                        {t(Locales.Transfer + ":TRANSFERINFOTEXT1")}
                        {"\n"}{"\n"}
                        {t(Locales.Transfer + ":TRANSFERINFOTEXT2")}
                        {"\n"}{"\n"}
                        {t(Locales.Transfer + ":TRANSFERINFOTEXT3")}
                    </Text>
                </Card>
            </View>
        </SafeAreaView>
    )
}
