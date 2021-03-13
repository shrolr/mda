import React from 'react'
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { MenuCard, MetaTrader4DemoAccountTab, MetaTrader4RealAccountTab, NavBar } from '../components';
import { TopBar } from '../components/TopBar';
import Colors from '../constants/Colors';
import { Card, Icon, Tab, TabHeading, Tabs } from 'native-base';

import { AccountStackNavProps } from '../Routes/AccountStackNavigator/AccountParamList';

export default function AccountScreen({ navigation }: AccountStackNavProps<"Account">) {


    const navigateToWalletInfoScreen = () => {
        // TO DO GERÇEK HESAP TALEBİ TASARIMLAR EKSİK
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
                <View style={{ flexDirection: "row", height: 84, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
                    <MenuCard shouldNavigate imageUri={require("../../assets/images/icons/wallet.png")} title="HESAP" isTouchable={false} />
                    <MenuCard shouldNavigate onMenuItemClick={navigateToWalletInfoScreen} imageUri={require("../../assets/images/icons/settings.png")} title="GERÇEK HESAP TALEBİ" isTouchable={true} />
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
