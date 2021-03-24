import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Button, Icon } from 'native-base';
import React, { useState } from 'react'
import { View, Image, Pressable, SafeAreaView, ScrollView, Platform, UIManager, LayoutAnimation } from 'react-native';
import Colors from '../../constants/Colors';
import { useStateContext } from '../../context/state';
import { Text } from '../atom';

interface ISideBar {
    DrawerNavigation: DrawerContentComponentProps<DrawerContentOptions>
}

enum AppTabs {
    AnaSayfa = "AnaSayfa",
    Hesaplarim = "Hesaplarim",
    ParaYatirma = "ParaYatirma",
    ParaCekme = "ParaCekme"

};



export const SideBar: React.FC<ISideBar> = ({ DrawerNavigation }) => {
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    const { context } = useStateContext();
    const [depositActive, setdepositToggle] = useState(false)
    const [transferActive, settransferActive] = useState(false)
    const [withdrawActive, setwithdrawActive] = useState(false)
    const [accountsActive, setaccountsActive] = useState(false)
    const [walletActive, setwalletActive] = useState(false)

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
    const onPressWallet = () => {
        DrawerNavigation.navigation.navigate("Wallet")
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
    return (
        <View style={{ flex: 1, marginTop: 70, backgroundColor: 'rgba(25, 25, 25, 0.98)', }}>
            <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
                <ScrollView contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }} style={{ flex: 1, }}>
                    <Pressable onPress={onPress}>
                        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: "Roboto", fontSize: 12, fontWeight: "bold", textAlign: "right", color: Colors.common.white }}>{context.user!.customerAccountInfo.displayName}</Text>
                                <Text style={{ fontSize: 9, textAlign: "right", color: Colors.common.gray }}>IB Hesabı</Text>
                            </View>
                            <View style={{ alignItems: "flex-end", }}>
                                <Image source={{ uri: "https://www.peterbe.com/avatar.random.png" }} resizeMode="contain" style={{ marginLeft: 10, height: 30, width: 30 }} />

                            </View>
                        </View>
                    </Pressable>
                    <View style={{ height: 0.5, marginTop: 10, marginBottom: 30, backgroundColor: Colors.common.white }} />
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Pressable onPress={onPressHome}>
                            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                <Image source={require("../../../assets/images/icons/home.png")} resizeMode="contain" style={{ tintColor: "#737576", marginRight: 10, height: 29, width: 24 }} />
                                <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: Colors.common.white }}>Ana Sayfa</Text>
                            </View>
                        </Pressable>

                    </View>





                    <View style={{ paddingTop: 10,  marginTop: 10, backgroundColor: walletActive ? Colors.common.sideBarGrayBg:'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleWallet} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/walletgray.png")} resizeMode="contain" style={{ tintColor: walletActive ?  "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: walletActive ? Colors.common.sidebarActiveMenu :Colors.common.white  }}>Cüzdan</Text>

                                </View>
                            </Pressable>
                            {
                                walletActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={NavigateToTransfer} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Cüzdan</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={NavigateToNewTransfer} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Cüzdan İşlemleri</Text>
                                                </View>
                                            </Pressable>
                                           

                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>

                    <View style={{ paddingTop: 10,  marginTop: 10, backgroundColor: accountsActive ? Colors.common.sideBarGrayBg:'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleAccount} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/bank.png")} resizeMode="contain" style={{ tintColor: accountsActive ?  "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: accountsActive ? Colors.common.sidebarActiveMenu :Colors.common.white  }}>Hesaplar</Text>

                                </View>
                            </Pressable>
                            {
                                accountsActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={NavigateToTransfer} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Hesaplar</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={NavigateToNewTransfer} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Gerçek Hesap Talebi</Text>
                                                </View>
                                            </Pressable>
                                           

                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>
  
                    <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 20, color: Colors.common.gray }}>Parasal İşlemler</Text>

                    <View style={{ paddingTop: 10,  marginTop: 10, backgroundColor: depositActive ? Colors.common.sideBarGrayBg:'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleDeposit} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/sidebar_deposit.png")} resizeMode="contain" style={{ tintColor: depositActive ?  "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: depositActive ? Colors.common.sidebarActiveMenu :Colors.common.white  }}>Yatırımlar</Text>

                                </View>
                            </Pressable>
                            {
                                depositActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={navigateToDepositScreen} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Para Yatırma</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={navigateToNewDeposit} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Yeni Para Yatırma</Text>
                                                </View>
                                            </Pressable>
                                            <Pressable onPress={navigateToDepositHistory} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_history.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Para Yatırım Geçmişi</Text>
                                                </View>
                                            </Pressable>

                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>

                    <View style={{ paddingTop: 10,  marginTop: 10, backgroundColor: transferActive ? Colors.common.sideBarGrayBg:'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleTransfer} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/sidebar_transfer.png")} resizeMode="contain" style={{ tintColor: transferActive ?  "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: transferActive ? Colors.common.sidebarActiveMenu :Colors.common.white  }}>Transferler</Text>

                                </View>
                            </Pressable>
                            {
                                transferActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={NavigateToTransfer} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Transferler</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={NavigateToNewTransfer} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Yeni Transfer</Text>
                                                </View>
                                            </Pressable>
                                            <Pressable onPress={NavigateToTransferHistory} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_history.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Transfer Geçmişi</Text>
                                                </View>
                                            </Pressable>

                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>

                    <View style={{ paddingTop: 10,  marginTop: 10, backgroundColor: withdrawActive ? Colors.common.sideBarGrayBg:'transparent', marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View>
                            <Pressable onPress={toggleWithdraw} >
                                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                    <Image source={require("../../../assets/images/icons/atm.png")} resizeMode="contain" style={{ tintColor: withdrawActive ?  "#F7B92D" : "#737576", marginRight: 10, height: 29, width: 24 }} />
                                    <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: withdrawActive ? Colors.common.sidebarActiveMenu :Colors.common.white  }}>Çekimler</Text>

                                </View>
                            </Pressable>
                            {
                                withdrawActive ?
                                    <View style={{ paddingLeft: 20, flexDirection: "row" }}>
                                        <View>
                                            <Pressable onPress={NavigateToWithdraw} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Çekimler</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={NavigateToNewWithdraw} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Yeni Çekimler</Text>
                                                </View>
                                            </Pressable>
                                            <Pressable onPress={NavigateToWithdrawHistory} >
                                                <View style={{ height: 44, flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../../../assets/images/icons/sidebar_history.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Çekim Geçmişi</Text>
                                                </View>
                                            </Pressable>

                                        </View>
                                    </View>
                                    : null}
                        </View>
                    </View>

                   
                    <View style={{ height: 0.5, marginTop: 20, marginBottom: 30, backgroundColor: Colors.common.white }} />
                    <Button style={{ height: 35, borderRadius: 5, backgroundColor: Colors.common.menuBackgroundColor }} full>
                        <Icon style={{ marginLeft: 0, fontSize: 13, color: "black", alignSelf: "center" }} type="AntDesign" name="download" />

                        <Text style={{ color: Colors.common.black, fontWeight: "bold", fontSize: 12 }}>META TRADER</Text>
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </View>
    )

};