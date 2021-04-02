import { Card } from 'native-base'
import React from 'react'
import { StatusBar, ScrollView, View, SafeAreaView } from 'react-native'
import { NavBar } from '../../../components'
import { Text } from '../../../components/atom'
import { WithdrawFromWallet } from '../../../components/Templates'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import { useStateContext } from '../../../context/state'
import { WithdrawStackNavProps } from '../WithdrawParamList'
import { useTranslation } from 'react-i18next'
import { Locales } from '../../../enums'


export default function NewWithdrawScreen({ navigation }: WithdrawStackNavProps<"Withdraw">) {
    const { context } = useStateContext()
    const { t } = useTranslation();

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
                <NavBar   ImageProp="new-deposit" title={t(Locales.Withdraw + ":CREATEWITHDRAW")} />
                <ScrollView style={{ flex: 1 }}>


                    <Card style={{ marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                        <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.white, alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ flex: 1, textAlign: "left", color: Colors.common.walletHeader, fontWeight: "bold", fontSize: 18 }}>{t(Locales.Withdraw + ":WALLETINFO")}</Text>
                        </View>
                        <View style={{ backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, flexDirection: "row" }}>
                            <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                                <Text style={{ fontSize: 13, color: Colors.common.gray }}>{t(Locales.Withdraw + ":BALANCE")} / {t(Locales.Withdraw + ":CURRENCY")}:</Text>
                                <Text style={{ flex: 1, textAlign: "right", fontSize: 20, color: Colors.common.walletHeader, fontWeight: "bold", }}>{context.walletInfo[0].wallet.balance} $</Text>
                            </View>
                        </View>
                    </Card>
                    <WithdrawFromWallet t={t} navigation={navigation} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
