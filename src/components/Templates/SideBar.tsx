import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Button, Icon } from 'native-base';
import React, { useState } from 'react'
import { View, Image, Pressable, SafeAreaView, ScrollView, Platform, UIManager, LayoutAnimation } from 'react-native';
import Colors from '../../constants/Colors';
import { useStateContext } from '../../context/state';
import { Text } from '../atom';
import * as SecureStore from 'expo-secure-store';
import { ActionType } from '../../context/reducer';
import { AppTabs, CustomerAccountTypeEnum, Locales } from '../../enums';
import { useTranslation } from 'react-i18next';
import { CustomerDepositAccountTypeEnum } from '../../types/post';
import { downloadMetaTrader } from '../../utilities/functions';

interface ISideBar {
    DrawerNavigation: DrawerContentComponentProps<DrawerContentOptions>
}


var capitalize = require('capitalize')



export const SideBar: React.FC<ISideBar> = ({ DrawerNavigation }) => {
    const { t } = useTranslation();

    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    const { context, dispatch } = useStateContext();
    const [depositActive, setdepositToggle] = useState(false)
    const [transferActive, settransferActive] = useState(false)
    const [withdrawActive, setwithdrawActive] = useState(false)
    const [accountsActive, setaccountsActive] = useState(false)
    const [walletActive, setwalletActive] = useState(false)

    const onLogoutPress = async () => {
        DrawerNavigation.navigation.closeDrawer()
        await SecureStore.deleteItemAsync("auth")

        dispatch!({ type: ActionType.SIGN_OUT })
    }


    const resetActives = () => {
        setdepositToggle(false)
        settransferActive(false)
        setwithdrawActive(false)
    }
    const toggleWallet = () => {
        setwalletActive(!walletActive)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    const toggleAccount = () => {
        setaccountsActive(!accountsActive)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    const toggleDeposit = () => {
        setdepositToggle(!depositActive)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    const toggleTransfer = () => {
        settransferActive(!transferActive)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    const toggleWithdraw = () => {
        setwithdrawActive(!withdrawActive)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    const onPress = () => {
        DrawerNavigation.navigation.navigate("ProfileScreen")
    }
    const NavigateToTransfer = () => {
        DrawerNavigation.navigation.navigate(AppTabs.AnaSayfa, { screen: 'Transfer' });
    }
    const NavigateToTransferHistory = () => {
        DrawerNavigation.navigation.navigate(AppTabs.AnaSayfa, { screen: 'TransferHistory' });
    }
    const NavigateToNewTransfer = () => {
        DrawerNavigation.navigation.navigate(AppTabs.AnaSayfa, { screen: 'NewTransfer' });
    }
    const NavigateToWithdraw = () => {
        DrawerNavigation.navigation.navigate(AppTabs.ParaCekme, { screen: 'Withdraw' });
    }
    const NavigateToWithdrawHistory = () => {
        DrawerNavigation.navigation.navigate(AppTabs.ParaCekme, { screen: 'WithdrawHistory' });
    }
    const NavigateToNewWithdraw = () => {
        DrawerNavigation.navigation.navigate(AppTabs.ParaCekme, { screen: 'NewWithdraw' });
    }
    const NavigateToWallet = () => {
        DrawerNavigation.navigation.navigate(AppTabs.AnaSayfa, { screen: 'Wallet' });

    }
    const NavigateToAccounts = () => {
        DrawerNavigation.navigation.navigate(AppTabs.Hesaplarim, { screen: 'Account' });
    }
    const NavigateToRealAccountRequest = () => {
        DrawerNavigation.navigation.navigate(AppTabs.Hesaplarim, { screen: 'RealAccountRequest' });

    }

    const NavigateToWalletHistory = () => {
        DrawerNavigation.navigation.navigate(AppTabs.AnaSayfa, { screen: 'WalletInfoScreen' });

    }
    const onPressHome = () => {
        DrawerNavigation.navigation.navigate(AppTabs.AnaSayfa, { screen: 'Home' });
    }
    const navigateToNewDeposit = () => {
        DrawerNavigation.navigation.navigate(AppTabs.ParaYatirma, { screen: 'NewDeposit' });
    }
    const navigateToDepositHistory = () => {
        DrawerNavigation.navigation.navigate(AppTabs.ParaYatirma, { screen: 'DepositsHistory' });
    }
    const navigateToDepositScreen = () => {
        DrawerNavigation.navigation.navigate(AppTabs.ParaYatirma, { screen: 'Deposits' });
    }
    const getCustomerAccountType = (type: number | undefined) => {

        if (type === CustomerAccountTypeEnum.Demo) {
            return capitalize.words(t(Locales.Tabs + ":DEMO"))
        }
        if (type === CustomerAccountTypeEnum.Ib) {
            return capitalize.words(t(Locales.Tabs + ":INVESTOR"))

        }
        if (type === CustomerAccountTypeEnum.Investor) {
            return capitalize.words(t(Locales.Tabs + ":IB"))

        }
        return  ""
    }
     
    return (
        <View style={{ flex: 1, marginTop: 70, backgroundColor: 'rgba(25, 25, 25, 0.98)', }}>
            <SafeAreaView style={{ flex: 1, }}>
                <ScrollView contentContainerStyle={{paddingTop:40, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }} style={{ flex: 1, }}>
                    <Pressable onPress={onPress}>
                        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: "Roboto", fontSize: 12, fontWeight: "bold", textAlign: "right", color: Colors.common.white }}>{context.user!.customerAccountInfo.displayName}</Text>
                                <Text style={{ fontSize: 9, textAlign: "right", color: Colors.common.gray }}>{getCustomerAccountType(context.user?.customerAccountInfo.typeId)}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end", }}>
                                <Image source={{ uri: context.user?.customerInfo.picture}} resizeMode="contain" style={{  marginLeft: 10, height: 30, width: 30 }} />

                            </View>
                        </View>
                    </Pressable>
                    <View style={{ height: 0.5, marginTop: 10, marginBottom: 30, backgroundColor: Colors.common.white }} />
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Pressable onPress={onPressHome}>
                            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                <Image source={require("../../../assets/images/icons/home.png")} resizeMode="contain" style={{ tintColor: "#737576", marginRight: 10, height: 29, width: 24 }} />
                                <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: Colors.common.white }}>{capitalize.words(t(Locales.Tabs + ":AnaSayfa"))}</Text>
                            </View>
                        </Pressable>

                    </View>





                    <View style={{ paddingTop: 10, marginTop: 10, backgroundColor: walletActive ? Colors.common.sideBarGrayBg : 'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleWallet} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/walletgray.png")} resizeMode="contain" style={{ tintColor: walletActive ? "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: walletActive ? Colors.common.sidebarActiveMenu : Colors.common.white }}>{capitalize.words(t(Locales.Wallet + ":TITLE"))}</Text>
                                    <View style={{ flex: 1, alignItems: "flex-end", marginBottom: 5, }}>
                                        <Icon style={{ fontSize: 12, color: "white" }} name={walletActive ? "minus" : "plus"} type="AntDesign" />
                                    </View>
                                </View>
                            </Pressable>
                            {
                                walletActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={NavigateToWallet} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words((t(Locales.Wallet + ":TITLE")))}</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={NavigateToWalletHistory} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{(capitalize.words(t(Locales.Wallet + ":WALLETTRANSACTIONS")))}</Text>
                                                </View>
                                            </Pressable>


                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>

                    <View style={{ paddingTop: 10, marginTop: 10, backgroundColor: accountsActive ? Colors.common.sideBarGrayBg : 'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleAccount} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/bank.png")} resizeMode="contain" style={{ tintColor: accountsActive ? "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: accountsActive ? Colors.common.sidebarActiveMenu : Colors.common.white }}>{(capitalize.words(t(Locales.Accounts + ":TITLE")))}</Text>
                                    <View style={{ flex: 1, alignItems: "flex-end", marginBottom: 5, }}>
                                        <Icon style={{ fontSize: 12, color: "white" }} name={accountsActive ? "minus" : "plus"} type="AntDesign" />
                                    </View>
                                </View>
                            </Pressable>
                            {
                                accountsActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={NavigateToAccounts} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{(capitalize.words(t(Locales.Accounts + ":TITLE")))}</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={NavigateToRealAccountRequest} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Accounts + ":ACCOUNTREQUESTTEXT"))}</Text>
                                                </View>
                                            </Pressable>


                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>

                    <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 20, color: Colors.common.gray }}>{capitalize.words(t(Locales.Tabs + ":MoneyTransactions"))}</Text>

                    <View style={{ paddingTop: 10, marginTop: 10, backgroundColor: depositActive ? Colors.common.sideBarGrayBg : 'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleDeposit} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/sidebar_deposit.png")} resizeMode="contain" style={{ tintColor: depositActive ? "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: depositActive ? Colors.common.sidebarActiveMenu : Colors.common.white }}>{capitalize.words(t(Locales.Deposits + ":TITLE"))}</Text>
                                    <View style={{ flex: 1, alignItems: "flex-end", marginBottom: 5, }}>
                                        <Icon style={{ fontSize: 12, color: "white" }} name={depositActive ? "minus" : "plus"} type="AntDesign" />
                                    </View>
                                </View>
                            </Pressable>
                            {
                                depositActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={navigateToDepositScreen} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Deposits + ":TITLE"))}</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={navigateToNewDeposit} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Deposits + ":CREATEDEPOSIT"))}</Text>
                                                </View>
                                            </Pressable>
                                            <Pressable onPress={navigateToDepositHistory} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_history.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Deposits + ":DEPOSITHISTORY"))}</Text>
                                                </View>
                                            </Pressable>

                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>

                    <View style={{ paddingTop: 10, marginTop: 10, backgroundColor: transferActive ? Colors.common.sideBarGrayBg : 'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleTransfer} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/sidebar_transfer.png")} resizeMode="contain" style={{ tintColor: transferActive ? "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: transferActive ? Colors.common.sidebarActiveMenu : Colors.common.white }}>{capitalize.words(t(Locales.Transfer + ":TRANSFERDASHBOARD"))}</Text>
                                    <View style={{ flex: 1, alignItems: "flex-end", marginBottom: 5, }}>
                                        <Icon style={{ fontSize: 12, color: "white" }} name={transferActive ? "minus" : "plus"} type="AntDesign" />
                                    </View>
                                </View>
                            </Pressable>
                            {
                                transferActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={NavigateToTransfer} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Transfer + ":TITLE"))}</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={NavigateToNewTransfer} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Transfer + ":CREATETRANSFER"))}</Text>
                                                </View>
                                            </Pressable>
                                            <Pressable onPress={NavigateToTransferHistory} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_history.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Transfer + ":TRANSFERHISTORY"))}</Text>
                                                </View>
                                            </Pressable>

                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>

                    <View style={{ paddingTop: 10, marginTop: 10, backgroundColor: withdrawActive ? Colors.common.sideBarGrayBg : 'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleWithdraw} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/atm.png")} resizeMode="contain" style={{ tintColor: withdrawActive ? "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: withdrawActive ? Colors.common.sidebarActiveMenu : Colors.common.white }}>{capitalize.words(t(Locales.Withdraw + ":WITHDRAWDASHBOARD"))}</Text>
                                    <View style={{ flex: 1, alignItems: "flex-end", marginBottom: 5, }}>
                                        <Icon style={{ fontSize: 12, color: "white" }} name={withdrawActive ? "minus" : "plus"} type="AntDesign" />
                                    </View>
                                </View>
                            </Pressable>
                            {
                                withdrawActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={NavigateToWithdraw} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Withdraw + ":TITLE"))}</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={NavigateToNewWithdraw} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Withdraw + ":CREATEWITHDRAW"))}</Text>
                                                </View>
                                            </Pressable>
                                            <Pressable onPress={NavigateToWithdrawHistory} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_history.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>{capitalize.words(t(Locales.Withdraw + ":WITHDRAWHISTORY"))}</Text>
                                                </View>
                                            </Pressable>

                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>


                    <View style={{ height: 0.5, marginTop: 20, marginBottom: 30, backgroundColor: Colors.common.white }} />
                    <View style={{ paddingLeft: 10, marginBottom: 30, paddingRight: 10 }}>
                        <Pressable onPress={onLogoutPress}>
                            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                <Image source={require("../../../assets/images/icons/user-circle-regular.png")} resizeMode="contain" style={{ tintColor: "#737576", marginRight: 10, height: 29, width: 24 }} />
                                <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: Colors.common.white }}>{capitalize.words(t(Locales.Tabs + ":LOGOUT"))}</Text>
                            </View>
                        </Pressable>

                    </View>

                    <Button onPress={downloadMetaTrader} style={{ height: 35, borderRadius: 5, backgroundColor: Colors.common.menuBackgroundColor }} full>
                        <Icon style={{ marginLeft: 0, fontSize: 13, color: "black", alignSelf: "center" }} type="AntDesign" name="download" />

                        <Text style={{ color: Colors.common.black, fontWeight: "bold", fontSize: 12 }}>META TRADER</Text>
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </View>
    )

};