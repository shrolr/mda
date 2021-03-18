import React, { useState } from 'react'
import { View,   TouchableOpacity } from 'react-native';
import { Button, Card, Icon, Toast } from 'native-base';
import Colors from '../../constants/Colors';
import Clipboard from 'expo-clipboard';
import { Text } from '../atom';
import { Accounts } from '../../models/ApiModels/Account/AccountListApiModel';

interface IMetaTraderDemoAccountTab {
    Account:Accounts
}

export const MetaTraderDemoAccountTab: React.FC<IMetaTraderDemoAccountTab> = ({Account}) => {
    const [visible, setvisible] = useState(false)
     const showAccountInfo = () => {
        setvisible(true)
    }
    const hideAccountInfo = () => {
        setvisible(false)
    }
    const copyToClipboard = (string: string) => {
        Clipboard.setString(string);
        Toast.show({text: 'Kopyalandı',buttonText: 'Ok',type:"success",})
    }; 
    const renderAccountInfo = () => {
        if (visible) {
            return (
                <>
                    <Button onPress={hideAccountInfo} style={{ height: 50, marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 0, backgroundColor: Colors.common.buttonMistyRose }} full>
                        <Text style={{ color: Colors.common.orangered, fontWeight: "bold", fontSize: 14 }}>Hesap Bilgilerini Gizle</Text>
                        <View style={{ position: "absolute", right: 20 }}>
                            <Icon style={{ color: Colors.common.orangered }} name="chevron-with-circle-down" type="Entypo" />
                        </View>
                    </Button>
                    <View style={{ backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, }}>
                        <TouchableOpacity onPress={() => copyToClipboard(Account.user.toString())} style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.gray }}>Kullanıcı Adı</Text>
                                <Text style={{ flex: 1, fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.user}</Text>
                            </View>
                            <Icon style={{ color: Colors.common.walletHeader }} name="copy1" type="AntDesign" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => copyToClipboard(Account.password)} style={{ flex: 1, marginTop: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.gray }}>Şifre</Text>
                                <Text style={{ flex: 1, fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.password}</Text>
                            </View>
                            <Icon style={{ color: Colors.common.walletHeader }} name="copy1" type="AntDesign" />
                        </TouchableOpacity>

                    </View>

                </>
            )
        }
    }
    const renderAccountCard = () => {
        if (!visible) {
            return (
                <>

                    <View style={{ backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, }}>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#fff", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>Tipi</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>Standart</Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>Kaldıraç</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>1:100</Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#fff", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>Para Birimi</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>USD</Text>
                        </View>
                    </View>
                    <Button onPress={showAccountInfo} style={{ height: 50, marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 20, backgroundColor: Colors.common.buttonMistyRose }} full>
                        <Text style={{ color: Colors.common.orangered, fontWeight: "bold", fontSize: 14 }}>Hesap Bilgilerini Göster</Text>
                        <View style={{ position: "absolute", right: 20 }}>
                            <Icon style={{ color: Colors.common.orangered }} name="chevron-with-circle-up" type="Entypo" />
                        </View>
                    </Button>
                </>
            )
        }
    }
    return (
        <View style={{ marginBottom: 20 }}>
 
            <Card style={{ marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 5, overflow: "hidden" }}>
                <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.walletHeader, alignItems: "center", flexDirection: "row" }}>
                    <View style={{ paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: Colors.common.white, borderRadius: 15, borderWidth: 1, borderColor: Colors.common.mediumseagreen, marginRight: 10 }}>
                        <Text style={{ fontWeight: "bold", color: Colors.common.walletHeader, fontSize: 16 }}>{Account.tradingPlatform === "MetaTrader5" ? "MT5" : "MT4"}</Text>
                    </View>
                    <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 16 }}>{Account.user}</Text>
                </View>
                {renderAccountCard()}
                {renderAccountInfo()}

            </Card>

        </View>
    )


};