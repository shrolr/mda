import React, { useState } from 'react'
import { View,   TouchableOpacity } from 'react-native';
import { Button, Card, Icon, Toast } from 'native-base';
import Colors from '../../constants/Colors';
import Clipboard from 'expo-clipboard';
import { Text } from '../atom';
import { Accounts } from '../../models/ApiModels/Account/AccountListApiModel';
import { TFunction } from 'react-i18next';
import { Locales } from '../../enums/Locales';

interface IMetaTraderDemoAccountTab {
    Account:Accounts,
    t: TFunction<"translation">

}

export const MetaTraderDemoAccountTab: React.FC<IMetaTraderDemoAccountTab> = ({t,Account}) => {
    const [visible, setvisible] = useState(false)
     const showAccountInfo = () => {
        setvisible(true)
    }
    const hideAccountInfo = () => {
        setvisible(false)
    }
    const copyToClipboard = (string: string) => {
        Clipboard.setString(string);
        Toast.show({text:t(Locales.Accounts + ":COPY"),buttonText: 'Ok',type:"success",})
    }; 
    const renderAccountInfo = () => {
        if (visible) {
            return (
                <>
                    <Button onPress={hideAccountInfo} style={{ height: 50, marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 0, backgroundColor: Colors.common.buttonMistyRose }} full>
                        <Text style={{ color: Colors.common.orangered, fontWeight: "bold", fontSize: 14 }}>{t(Locales.Accounts + ":HIDEACCOUNTDETAILS")}</Text>
                        <View style={{ position: "absolute", right: 20 }}>
                            <Icon style={{ color: Colors.common.orangered }} name="chevron-with-circle-down" type="Entypo" />
                        </View>
                    </Button>
                    <View style={{ backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, }}>
                        <TouchableOpacity onPress={() => copyToClipboard(Account.user.toString())} style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.gray }}>{t(Locales.Accounts + ":USERNAME")}</Text>
                                <Text style={{ flex: 1, fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.user}</Text>
                            </View>
                            <Icon style={{ color: Colors.common.walletHeader }} name="copy1" type="AntDesign" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => copyToClipboard(Account.password)} style={{ flex: 1, marginTop: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.gray }}>{t(Locales.Accounts + ":PASSWORD")}</Text>
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
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>{t(Locales.Accounts + ":TYPE")}</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.type}</Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>{t(Locales.Accounts + ":LEVERAGE")}</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.leverage}</Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#fff", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>{t(Locales.Accounts + ":CURRENCY")}</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.currency}</Text>
                        </View>
                    </View>
                    <Button onPress={showAccountInfo} style={{ height: 50, marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 20, backgroundColor: Colors.common.buttonMistyRose }} full>
                        <Text style={{ color: Colors.common.orangered, fontWeight: "bold", fontSize: 14 }}>{t(Locales.Accounts + ":SHOWACCOUNTDETAILS")}</Text>
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