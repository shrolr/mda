import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Button, Icon } from 'native-base';
import React from 'react'
import { View, Image, Pressable, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import { useStateContext } from '../context/state';
import { Text } from './atomix';

interface ISideBar {
    DrawerNavigation: DrawerContentComponentProps<DrawerContentOptions>
}

export const SideBar: React.FC<ISideBar> = ({ DrawerNavigation }) => {
    const { context } = useStateContext();
    const onPress = () => {
        DrawerNavigation.navigation.navigate("Wallet")
    }
    return (
        <View style={{flex: 1,paddingTop:30, paddingLeft: 20, paddingRight: 20, backgroundColor: 'rgba(52, 52, 52, 0.95)',  }}>
            <SafeAreaView style={{flex:1,marginTop:40}}>
                <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: "Roboto", fontSize: 12, fontWeight: "bold", textAlign: "right", color: Colors.common.white }}>{context.user!.customerAccountInfo.displayName}</Text>
                        <Text style={{ fontSize: 9, textAlign: "right", color: Colors.common.gray }}>IB Hesabı</Text>
                    </View>
                    <View style={{ alignItems: "flex-end", }}>
                        <Image source={{ uri: "https://www.peterbe.com/avatar.random.png" }} resizeMode="contain" style={{ marginLeft: 10, height: 30, width: 30 }} />

                    </View>

                </View>
                <View style={{ height: 0.5, marginTop: 10, marginBottom: 30, backgroundColor: Colors.common.white }} />
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={require("../../assets/images/icons/home.png")} resizeMode="contain" style={{ marginRight: 10, height: 20, width: 20 }} />
                        <Text style={{ color: Colors.common.white }}>Ana Sayfa</Text>
                    </View>
                    <Pressable onPress={onPress}>
                        <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 15 }}>
                            <Image source={require("../../assets/images/icons/walletgray.png")} resizeMode="contain" style={{ marginRight: 10, height: 20, width: 20 }} />
                            <Text style={{ color: Colors.common.white }}>Cüzdan</Text>
                        </View>
                    </Pressable>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={require("../../assets/images/icons/bank.png")} resizeMode="contain" style={{ marginRight: 10, height: 20, width: 20 }} />
                        <Text style={{ color: Colors.common.white }}>Hesaplar</Text>
                    </View>
                    <Text style={{ marginTop: 20, color: Colors.common.gray }}>Parasal İşlemler</Text>

                </View>

                <View style={{ paddingTop: 20, paddingBottom: 30, marginTop: 10, backgroundColor: Colors.common.sideBarGrayBg, marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon style={{ marginRight: 10, fontSize: 16, color: "gray", }} type="Feather" name="home" />
                        <View>
                            <Text style={{ color: Colors.common.white }}>Yatırımlar</Text>

                            <View style={{ flexDirection: "row", marginTop: 10, }}>
                                <Icon style={{ marginRight: 10, fontSize: 12, color: "gray", alignSelf: "center" }} type="Feather" name="home" />
                                <Text style={{ fontSize: 9, color: Colors.common.white }}>Para Yatırma</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 10, }}>
                                <Icon style={{ marginRight: 10, fontSize: 12, color: "gray", alignSelf: "center" }} type="Feather" name="home" />
                                <Text style={{ fontSize: 9, color: Colors.common.white }}>Yeni Para Yatırma</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 10, }}>
                                <Icon style={{ marginRight: 10, fontSize: 12, color: "gray", alignSelf: "center" }} type="Feather" name="home" />
                                <Text style={{ fontSize: 9, color: Colors.common.white }}>Para Yatırım Geçmişi</Text>
                            </View>
                        </View>
                    </View>


                </View>
                <View style={{ height: 0.5, marginTop: 10, marginBottom: 30, backgroundColor: Colors.common.white }} />
                <Button style={{ height: 35, borderRadius: 5, backgroundColor: Colors.common.menuBackgroundColor }} full>
                    <Icon style={{ marginLeft: 0, fontSize: 13, color: "black", alignSelf: "center" }} type="AntDesign" name="download" />

                    <Text style={{ color: Colors.common.black, fontWeight: "bold", fontSize: 12 }}>META TRADER</Text>
                </Button>
            </SafeAreaView>
        </View>
    )

};