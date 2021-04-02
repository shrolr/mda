import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, Text, Image, View, FlatList, ListRenderItem, SafeAreaView } from 'react-native';
import { CreateRealMetaTraderAccount, MenuCard, MetaTraderDemoAccountTab, CreateDemoMetaTraderAccount, NavBar } from '../../../components';
import { TopBar } from '../../../components/Organisms/TopBar';
import Colors from '../../../constants/Colors';
import { CardItem, Tab, TabHeading, Tabs } from 'native-base';

import { AccountStackNavProps } from '../AccountParamList';
import { Locales, MetaTraderTabs, MetaTraderVersion } from '../../../enums';
import { useStateContext } from '../../../context/state';
import ApiCalls from '../../../network/ApiCalls';
import { NetworkResponseFail } from '../../../models';
import { Accounts } from '../../../models/ApiModels/Account/AccountListApiModel';
import { MetaTraderRealAccountTab } from '../../../components/Templates';


import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";
export default function AccountScreen({ navigation }: AccountStackNavProps<"Account">) {
    const { t, i18n } = useTranslation();

    let { context } = useStateContext()
    const [activeTab, setactiveTab] = useState<MetaTraderTabs>(MetaTraderTabs.RealAccount)
    const [version, setVersion] = useState<MetaTraderVersion>(MetaTraderVersion.MetaTrader4)
    const setVersionToMetaTrader5 = () => {
        setVersion(MetaTraderVersion.MetaTrader5)
    }
    const setVersionToMetaTrader4 = () => {
        setVersion(MetaTraderVersion.MetaTrader4)
    }
    const navigateToWalletInfoScreen = () => {
         
        navigation.navigate("RealAccountRequest")
    }
    const onChangeTab = (info: any) => {
        try {
            let index: MetaTraderTabs = info.i;
            setactiveTab(index)
        } catch (error) {

        }

    }

    const _renderRealAccounts: ListRenderItem<Accounts> = ({ item }) => (
        <MetaTraderRealAccountTab t={t} Account={item} />
    )
    const _renderDemoAccounts: ListRenderItem<Accounts> = ({ item }) => (
        <MetaTraderDemoAccountTab t={t} Account={item} />
    )

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
                <View style={{ flex: 1 }}>
                    <NavBar   ImageProp="bank" title={t(Locales.Accounts + ":TITLE")} />
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", height: 84, paddingLeft: 20, marginTop: 20,marginBottom:20, paddingRight: 20 }}>
                            <MenuCard shouldNavigate imageUri={require("../../../../assets/images/icons/wallet.png")} title={t(Locales.Accounts + ":TITLE")} isTouchable={false} />
                            <MenuCard shouldNavigate onMenuItemClick={navigateToWalletInfoScreen} imageUri={require("../../../../assets/images/icons/analytics.png")} title={t(Locales.Accounts + ":ACCOUNTREQUEST")} isTouchable={true} />
                        </View>

                        <View style={{ paddingLeft: 30, alignItems: "center", paddingRight: 30, flexDirection: "row", backgroundColor: "#e9e9e9", height: 82 }}>
                            <CardItem button bordered onPress={setVersionToMetaTrader4} style={{ flexDirection: "row", height: 50, backgroundColor: "#f7f7f6", borderRadius: 5, justifyContent: "center", alignItems: "center", flex: 1, marginRight: 10 }}>
                                <Image source={require("../../../../assets/images/icons/meta4.png")} resizeMode="contain" style={{ tintColor: version === MetaTraderVersion.MetaTrader4 ? "black" : "#B1B1B1", marginRight: 5, height: 26, width: 26, }} />
                                <Text style={{ color: version === MetaTraderVersion.MetaTrader4 ? "black" : "#B1B1B1", fontWeight: "bold", fontSize: 12 }}>META TRADER 4</Text>
                            </CardItem>
                            <CardItem button bordered onPress={setVersionToMetaTrader5} style={{ flexDirection: "row", height: 50, backgroundColor: "#f7f7f6", borderRadius: 5, justifyContent: "center", alignItems: "center", flex: 1, marginLeft: 10 }}>
                                <Image source={require("../../../../assets/images/icons/meta5.png")} resizeMode="contain" style={{ tintColor: version === MetaTraderVersion.MetaTrader5 ? "black" : "#B1B1B1", marginRight: 5, height: 26, width: 26, }} />
                                <Text style={{ color: version === MetaTraderVersion.MetaTrader5 ? "black" : "#B1B1B1", fontWeight: "bold", fontSize: 12 }}>META TRADER 5</Text>
                            </CardItem>
                        </View>


                        <Tabs onChangeTab={onChangeTab} tabBarUnderlineStyle={{ backgroundColor: "#5ED5A5", height: 3, }}>
                            <Tab heading={<TabHeading style={{ backgroundColor: "white" }}><Image source={require("../../../../assets/images/icons/user-circle-regular.png")} style={{ tintColor: activeTab === MetaTraderTabs.RealAccount ? "#5ED5A5" : "#B1B1B1", height: 16, width: 16, marginRight: 5, }} /><Text style={{ fontSize: 12, fontWeight: "bold", color: activeTab === MetaTraderTabs.RealAccount ? "#5ED5A5" : "#B1B1B1" }}>{t(Locales.Accounts + ":REALACCOUNTS")}</Text></TabHeading>}>


                                <FlatList
                                    ListHeaderComponent={<CreateRealMetaTraderAccount t={t} version={version} />}
                                    data={version === MetaTraderVersion.MetaTrader4 ? context.mt4RealAccounts : context.mt5RealAccounts}
                                    renderItem={_renderRealAccounts}
                                    keyExtractor={(item) => item.user.toString()}

                                />

                            </Tab>
                            <Tab heading={<TabHeading style={{ backgroundColor: "white" }}><Image source={require("../../../../assets/images/icons/candlestick.png")} style={{ tintColor: activeTab === MetaTraderTabs.DemoAccount ? "#5ED5A5" : "#B1B1B1", height: 16, width: 16, marginRight: 5, }} /><Text style={{ fontSize: 12, fontWeight: "bold", color: activeTab === MetaTraderTabs.DemoAccount ? "#5ED5A5" : "#B1B1B1" }}>{t(Locales.Accounts + ":DEMOACCOUNTS")}</Text></TabHeading>}>

                                <FlatList
                                    ListHeaderComponent={<CreateDemoMetaTraderAccount t={t} version={version} />}
                                    data={version === MetaTraderVersion.MetaTrader4 ? context.mt4DemoAccounts : context.mt5DemoAccounts}
                                    renderItem={_renderDemoAccounts}
                                    keyExtractor={(item) => item.user.toString()}

                                />
                            </Tab>

                        </Tabs>


                    </View>
                </View >

            </View>
        </SafeAreaView>
    )
}
