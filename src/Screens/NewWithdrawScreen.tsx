import { Card } from 'native-base'
import React from 'react'
import { StatusBar, ScrollView, View, SafeAreaView } from 'react-native'
import { NavBar } from '../components'
import { Text } from '../components/atomix'
import { WithdrawFromWallet } from '../components/Molecules'
import { TopBar } from '../components/TopBar'
import Colors from '../constants/Colors'
import { DepositsStackNavProps } from '../Routes/DepositStackNavigator/DepositParamList'


export default function NewWithdrawScreen({ navigation }: DepositsStackNavProps<"DepositsHistory">) {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.common.statusBarColor }}>
            <View style={{ flex: 1, backgroundColor: Colors.common.white }}>

                <ScrollView style={{ flex: 1 }}>
                    <StatusBar
                        animated={true}
                        backgroundColor={Colors.common.statusBarColor}
                        barStyle="light-content"
                        showHideTransition="slide"
                    />
                    <TopBar />
                    <NavBar name="wallet" type="Ionicons" title="Yeni Çekim" />

                    <Card style={{ marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                        <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.white, alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ flex: 1, textAlign: "left", color: Colors.common.walletHeader, fontWeight: "bold", fontSize: 18 }}>{"Cüzdan Bilgileri"}</Text>
                        </View>
                        <View style={{ backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, flexDirection: "row" }}>
                            <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                                <Text style={{ fontSize: 13, color: Colors.common.gray }}>Bakiye / Para Birimi:</Text>
                                <Text style={{ flex: 1, textAlign: "right", fontSize: 20, color: Colors.common.walletHeader, fontWeight: "bold", }}>1000 $</Text>
                            </View>
                        </View>
                    </Card>
                    <WithdrawFromWallet />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
