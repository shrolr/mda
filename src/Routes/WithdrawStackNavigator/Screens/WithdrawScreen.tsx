import React from 'react'
import { View, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import { MenuCard, NavBar } from '../../../components'
import { Text } from '../../../components/atom'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import { Card } from 'native-base'
import { WithdrawStackNavProps } from '../WithdrawParamList'


import { useTranslation } from 'react-i18next';
import { Locales } from '../../../enums'

export default function WithdrawScreen({ navigation }: WithdrawStackNavProps<"Withdraw">) {
    const { t } = useTranslation();

    const navigateToWithdrawsHistory = () => {
        navigation.navigate("WithdrawHistory")
    }

    const navigateToNewWithdrawcreen = () => {
        navigation.navigate("NewWithdraw")
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
                <NavBar ImageProp="wallet" title={t(Locales.Withdraw + ":TITLE")} />
                <ScrollView style={{flex:1}}>
                    <View style={{ flexDirection: "row", height: 84, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
                        <MenuCard shouldNavigate imageUri={require("../../../../assets/images/icons/atm.png")} title={t(Locales.Withdraw + ":TITLE")} isTouchable={false} />
                        <MenuCard shouldNavigate onMenuItemClick={navigateToNewWithdrawcreen} imageUri={require("../../../../assets/images/icons/newdeposit.png")} title={t(Locales.Withdraw + ":CREATEWITHDRAW")} isTouchable={true} />
                        <MenuCard shouldNavigate onMenuItemClick={navigateToWithdrawsHistory} imageUri={require("../../../../assets/images/icons/wall-clock.png")} title={t(Locales.Withdraw + ":WITHDRAWHISTORY")} isTouchable={true} />
                    </View>
                    <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                        <Text>
                            {t(Locales.Withdraw + ":WITHDRAWINFOTEXT1")}
                            {"\n"}{"\n"}
                            {t(Locales.Withdraw + ":WITHDRAWINFOTEXT2")}
                            {"\n"}{"\n"}
                            {t(Locales.Withdraw + ":WITHDRAWINFOTEXT3")}
                            {"\n"}{"\n"}
                            {t(Locales.Withdraw + ":WITHDRAWINFOTEXT4")}
                            {"\n"}{"\n"}
                            {t(Locales.Withdraw + ":WITHDRAWINFOTEXT5")}
                        </Text>
                    </Card>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
