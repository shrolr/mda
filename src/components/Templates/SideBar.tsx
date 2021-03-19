import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Button, Icon } from 'native-base';
import React from 'react'
import { View, Image, Pressable, SafeAreaView, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { useStateContext } from '../../context/state';
import { Text } from '../atom';

interface ISideBar {
    DrawerNavigation: DrawerContentComponentProps<DrawerContentOptions>
}
// TO DO ADD SCREENS NAME TO CONSTANT
export const SideBar: React.FC<ISideBar> = ({ DrawerNavigation }) => {
    const { context } = useStateContext();
    const onPress = () => {
        DrawerNavigation.navigation.navigate("ProfileScreen")
    }
    const onPressTransfer = () => {
        DrawerNavigation.navigation.navigate("Transfer")
    }
    const onPressWallet = () => {
        DrawerNavigation.navigation.navigate("Wallet")
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
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <Image source={require("../../../assets/images/icons/home.png")} resizeMode="contain" style={{ tintColor: "#737576", marginRight: 10, height: 29, width: 24 }} />
                            <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: Colors.common.white }}>Ana Sayfa</Text>
                        </View>
                        <Pressable onPress={onPressWallet}>
                            <View style={{ flexDirection: "row", marginTop: 25, marginBottom: 25, alignItems: "flex-end" }}>
                                <Image source={require("../../../assets/images/icons/walletgray.png")} resizeMode="contain" style={{ tintColor: "#737576", marginRight: 10, height: 29, width: 24 }} />
                                <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: Colors.common.white }}>Cüzdan</Text>
                            </View>
                        </Pressable>
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <Image source={require("../../../assets/images/icons/bank.png")} resizeMode="contain" style={{ tintColor: "#737576", marginRight: 10, height: 29, width: 24 }} />
                            <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: Colors.common.white }}>Hesaplar</Text>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 20, color: Colors.common.gray }}>Parasal İşlemler</Text>

                    </View>

                    <View style={{ paddingTop: 20, paddingBottom: 20, marginTop: 10, backgroundColor: Colors.common.sideBarGrayBg, marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require("../../../assets/images/icons/sidebar_deposit.png")} resizeMode="contain" style={{ tintColor: "#F7B92D", marginRight: 10, height: 29, width: 24 }} />
                            <View>
                                <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 5, color: Colors.common.sidebarActiveMenu }}>Yatırımlar</Text>

                                <View style={{ flexDirection: "row", marginTop: 25, }}>
                                    <Image source={require("../../../assets/images/icons/sidebar_info.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Para Yatırma</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 20, }}>
                                    <Image source={require("../../../assets/images/icons/sidebar_new.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Yeni Para Yatırma</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 20, }}>
                                    <Image source={require("../../../assets/images/icons/sidebar_history.png")} resizeMode="contain" style={{ marginRight: 10, height: 14, width: 14 }} />
                                    <Text style={{ fontSize: 11, color: Colors.common.white }}>Para Yatırım Geçmişi</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 25, paddingLeft: 10, paddingRight: 10 }}>
                        <Pressable onPress={onPressTransfer}>
                            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                <Image source={require("../../../assets/images/icons/sidebar_transfer.png")} resizeMode="contain" style={{ tintColor: "#737576", marginRight: 10, height: 29, width: 24 }} />
                                <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: Colors.common.white }}>Transferler</Text>
                            </View>
                        </Pressable>
                        <View style={{ flexDirection: "row", marginTop: 25, marginBottom: 15, alignItems: "flex-end" }}>
                            <Image source={require("../../../assets/images/icons/atm.png")} resizeMode="contain" style={{ tintColor: "#737576", marginRight: 10, height: 29, width: 24 }} />
                            <Text style={{ marginBottom: 5, fontSize: 12, fontWeight: "normal", color: Colors.common.white }}>Çekimler</Text>
                        </View>

                    </View>
                    <View style={{ height: 0.5, marginTop: 10, marginBottom: 30, backgroundColor: Colors.common.white }} />
                    <Button style={{ height: 35, borderRadius: 5, backgroundColor: Colors.common.menuBackgroundColor }} full>
                        <Icon style={{ marginLeft: 0, fontSize: 13, color: "black", alignSelf: "center" }} type="AntDesign" name="download" />

                        <Text style={{ color: Colors.common.black, fontWeight: "bold", fontSize: 12 }}>META TRADER</Text>
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </View>
    )

};