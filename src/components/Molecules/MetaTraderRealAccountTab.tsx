import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { Button, Card, Icon, Input, Item, Spinner, Toast } from 'native-base';
import Colors from '../../constants/Colors';
import { Text } from '../atomix';
import { Accounts } from '../../models/ApiModels/Account/AccountListApiModel';
import { MetatraderAccountChangePassword } from '../../types/post/MetatraderAccountChangePassword';
import ApiCalls from '../../network/ApiCalls';
import { NetworkResponse } from '../../models';

interface IMetaTraderRealAccountTab {
    Account: Accounts

}

export const MetaTraderRealAccountTab: React.FC<IMetaTraderRealAccountTab> = ({ Account }) => {
    const [progress, setprogress] = useState(false)
    const [visible, setvisible] = useState(false)
    const [passwordHidden, setpasswordHidden] = useState(true)
    const [passwordConfirmHidden, setpasswordConfirmHidden] = useState(true)
    const [password, setpassword] = useState("")
    const [passwordConfirmation, setpasswordConfirmation] = useState("")
    useEffect(() => {
        if(visible === false){
            setpasswordHidden(true)
            setpasswordConfirmHidden(true)
            setpassword("")
            setpasswordConfirmation("")
            setprogress(false)
        }
    }, [visible])
    const changeAccountPassword = () => {
        setvisible(true)
    }
    const cancelPasswordChange = () => {
        setvisible(false)
    }
    const togglePasswordVisible = () => {
        setpasswordHidden(!passwordHidden)
    }
    const togglePasswordConfirmationVisible = () => {
        setpasswordConfirmHidden(!passwordConfirmHidden)
    }
    const changePassword = () => {
        // TO DO CHANGE PASSWORD

        if (password === passwordConfirmation) {
            setprogress(true)
            let metatraderAccountChangePassword: MetatraderAccountChangePassword = {
                id: Account.id,
                user: Account.user,
                newPassword: password,
                host: Account.serverName,
                port: ""
            }
            ApiCalls.updateAccountPassword(metatraderAccountChangePassword).then((response) => {
                // TO DO ADD LOADİNG SPİNNER
                setprogress(false)
                setvisible(false)
                if (response instanceof NetworkResponse) {
                    // success
                    console.log("success")
                }
                else {
                    console.log("fail")
                }
            })

        }
        else {
            console.log("password mismatch")
        }
    }
    const onPasswordChange = (password: string) => {
        setpassword(password)
    }
    const onPasswordConfirmationChange = (password: string) => {
        setpasswordConfirmation(password)
    }
    const renderAccountInfo = () => {
        if (visible) {
            return (
                <>
                    <Button onPress={cancelPasswordChange} style={{ height: 50, marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 0, backgroundColor: Colors.common.buttonMistyRose }} full>
                        <Text style={{ color: Colors.common.orangered, fontWeight: "bold", fontSize: 14 }}>Kapat</Text>
                        <View style={{ position: "absolute", right: 20 }}>
                            <Icon style={{ color: Colors.common.orangered }} name="chevron-with-circle-down" type="Entypo" />
                        </View>
                    </Button>
                    <View style={{ backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, }}>

                        <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                            <Input onChangeText={onPasswordChange} secureTextEntry={passwordHidden} placeholder='Şifre *' />
                            <Icon onPress={togglePasswordVisible} style={{ color: Colors.common.gray }} name={passwordHidden ? "ios-eye-off-outline":"ios-eye-outline"  } type="Ionicons" />
                        </Item>
                        <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                            <Input onChangeText={onPasswordConfirmationChange} secureTextEntry={passwordConfirmHidden} placeholder='Şifre Tekrar *' />
                            <Icon onPress={togglePasswordConfirmationVisible} style={{ color: Colors.common.gray }} name={passwordConfirmHidden ?  "ios-eye-off-outline":"ios-eye-outline"} type="Ionicons" />

                        </Item>

                    </View>
                    {
                        progress ? <Spinner /> : 
                        <Button onPress={changePassword} style={{ borderRadius: 10, height: 50, marginLeft: 20, marginRight: 20, marginBottom: 20, marginTop: 10, backgroundColor: Colors.common.loginButton }} full>
                            <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>ŞİFREYİ GÜNCELLE</Text>
                        </Button>
                    }


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
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>Bakiye</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.balance}$</Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>Free margin</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.freeMargin}$</Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#fff", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>Tipi</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.type}</Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#f7f7f6", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>Kaldıraç</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.leverage}</Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#fff", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.common.black }}>Para Birimi</Text>
                            <Text style={{ flex: 1, textAlign: "right", fontSize: 13, color: Colors.common.black, fontWeight: "bold", }}>{Account.currency}</Text>
                        </View>
                    </View>
                    <Button onPress={changeAccountPassword} style={{ height: 50, marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 20, backgroundColor: Colors.common.buttonMistyRose }} full>
                        <Text style={{ color: Colors.common.orangered, fontWeight: "bold", fontSize: 14 }}>Hesap Şifresini Değiştir</Text>
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