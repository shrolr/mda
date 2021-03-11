import React from 'react'
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { MetaTrader4DemoAccountTab, MetaTrader4RealAccountTab, NavBar } from '../components';
import { TopBar } from '../components/TopBar';
import Colors from '../constants/Colors';
import { Card, Icon, Tab, TabHeading, Tabs } from 'native-base';

import { AccountStackNavProps } from '../Routes/AccountStackNavigator/AccountParamList';

export default function AccountScreen({ navigation }: AccountStackNavProps<"Account">) {


    const navigateToWalletInfoScreen = () => {
        navigation.navigate("Account")
    }
    return (
        <ScrollView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.common.statusBarColor}
                barStyle="light-content"
                showHideTransition="slide"
            />
            <TopBar />
            <NavBar name="wallet" type="Ionicons" title="Hesaplar" />
            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: "row", height: 100, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginRight: 10, flex: 1, backgroundColor: Colors.common.walletTabBg, borderRadius: 5 }}>
                            <Icon style={{ fontSize: 52, color: Colors.common.white }} type={"Ionicons"} name={"wallet"} />
                            <Text style={{ color: Colors.common.white, fontSize: 12, fontWeight: "bold" }}>HESAPLAR</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={navigateToWalletInfoScreen} style={{ flex: 1 }}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10, flex: 1, borderWidth: 2, backgroundColor: "#fff", borderColor: Colors.common.walletTabBg, borderRadius: 5 }}>
                            <Icon style={{ fontSize: 52, color: Colors.common.black }} type={"FontAwesome"} name={"gear"} />
                            <Text style={{ textAlign: "center", color: Colors.common.black, fontSize: 12, fontWeight: "bold" }}>GERÇEK HESAP TALEBİ</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingLeft: 30, paddingTop: 20, paddingBottom: 20, marginTop: 20, paddingRight: 30, flexDirection: "row", backgroundColor: "#e9e9e9", height: 100 }}>
                    <Card style={{ backgroundColor: "#f7f7f6", borderRadius: 5, justifyContent: "center", alignItems: "center", flex: 1, marginRight: 10 }}>
                        <Text>META TRADER 4</Text>
                    </Card>
                    <Card style={{ backgroundColor: "#f7f7f6", borderRadius: 5, justifyContent: "center", alignItems: "center", flex: 1, marginLeft: 10 }}>
                        <Text>META TRADER 5</Text>
                    </Card>
                </View>
                <Tabs >
                    <Tab heading={<TabHeading style={{ backgroundColor: "white" }}><Icon style={{ color: "black" }} name="camera" /><Text>  GERÇEK HESAP</Text></TabHeading>}>
                        <MetaTrader4RealAccountTab />
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: "white" }}><Text>DEMO HESAP</Text></TabHeading>}>
                        <MetaTrader4DemoAccountTab />
                    </Tab>

                </Tabs>


            </View>
        </ScrollView>

    )
}
