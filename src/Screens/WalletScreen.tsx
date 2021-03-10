import { Card, Icon } from 'native-base';
import React, { useState } from 'react'
import { StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { NavBar } from '../components';
import { TopBar } from '../components/TopBar';
import Colors from '../constants/Colors';
import { HomeStackNavProps } from '../Routes/HomeStackNavigator/HomeParamList';

export default function WalletScreen({ navigation }: HomeStackNavProps<"Wallet">) {


    const navigateToWalletInfoScreen = () => {
        navigation.navigate("WalletInfoScreen")
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.common.statusBarColor}
                barStyle="light-content"
                showHideTransition="slide"
            />
            <TopBar />
            <NavBar name="wallet" type="Ionicons" title="Cüzdan" />
            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: "row", height: 100, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginRight: 10, flex: 1, backgroundColor: Colors.common.walletTabBg, borderRadius: 5 }}>
                            <Icon style={{ fontSize: 52, color: Colors.common.white }} type={"Ionicons"} name={"wallet"} />
                            <Text style={{ color: Colors.common.white, fontSize: 16, fontWeight: "bold" }}>Cüzdan</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={navigateToWalletInfoScreen} style={{ flex: 1 }}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10, flex: 1, borderWidth: 2, backgroundColor: "#fff", borderColor: Colors.common.walletTabBg, borderRadius: 5 }}>
                            <Icon style={{ fontSize: 52, color: Colors.common.black }} type={"FontAwesome"} name={"gear"} />
                            <Text style={{ color: Colors.common.black, fontSize: 16, fontWeight: "bold" }}>Cüzdan İşlemleri</Text>
                        </View>
                    </TouchableOpacity>
                </View>



                <Card style={{ marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                    <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.walletHeader, alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 18 }}>{"Bakiye"}</Text>
                    </View>
                    <View style={{ backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, flexDirection: "row" }}>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, color: Colors.common.gray }}>18-01-2021 | 14:46:32</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 20, color: Colors.common.walletHeader, fontWeight: "bold", }}>1000 $</Text>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    )
}
