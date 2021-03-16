import { Button, Card, Icon, Input, Item } from 'native-base';
import React, { createRef, useState } from 'react'
import Colors from '../constants/Colors';
import { MetaTraderVersion } from '../enums';
import { Text } from './atomix';
import ActionSheet from "react-native-actions-sheet";
import { View, Image, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useStateContext } from '../context/state';

interface ICreateRealMetaTraderAccount {

    version: MetaTraderVersion
}
const actionSheetRef = createRef<ActionSheet>();
const dummyData = [
    { label: 'USA', value: 'usa' },
    { label: 'UK', value: 'uk', },
    { label: 'France', value: 'france' },
]
export const CreateRealMetaTraderAccount: React.FC<ICreateRealMetaTraderAccount> = ({ version }) => {
    let { context } = useStateContext()
    const [currencies, setcurrencies] = useState<{ label: string; value: string; }[]>(dummyData)

    const [passwordVisible, setpasswordVisible] = useState(false)
    const togglePasswordVisible = () => {
        setpasswordVisible(!passwordVisible)
    }

    const onPasswordChange = (password: string) => {
        //setpassword(password)
    }
    const onPress = () => {
        // handle logic
        actionSheetRef.current?.setModalVisible(true)
    }
    const cancelActionSheet = () => {
        actionSheetRef.current?.setModalVisible(false)
        // reset state
    }
    const newAccount = () => {
        console.log("NewAccount", "MetaTrader", version === MetaTraderVersion.MetaTrader4 ? "4" : "5")
    }
    const renderForRealAccount = () => {
        return (
            <Card style={{ height: 380, marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.walletHeader, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 18 }}>{"Yeni Gerçek Hesap"}</Text>
                </View>
                <View style={{ height: 40, paddingLeft: 20, paddingRight: 20, marginTop: 20, }}>
                    <DropDownPicker
                        items={context.accountTpyes!}
                        placeholder="Tipi"
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                    />
                </View>
                <View style={{ height: 40, paddingLeft: 20, paddingRight: 20, marginTop: 20, }}>
                    <DropDownPicker
                        items={context.CurrenciesDefault}
                        placeholder="Para Birimi"
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                    />
                </View>
                <View style={{ height: 40, paddingLeft: 20, paddingRight: 20, marginTop: 20, }}>
                    <Item style={{ height: 40, paddingLeft: 10, borderRadius: 10, }} rounded>
                        <Input onChangeText={onPasswordChange} placeholder='Kullanıcı Adı *' />
                        <Icon onPress={togglePasswordVisible} style={{ fontSize: 18, color: Colors.common.gray }} name={"ios-person"} type="Ionicons" />
                    </Item>
                </View>
                <View style={{ height: 40, paddingLeft: 20, paddingRight: 20, marginTop: 20, }}>

                    <Item style={{ height: 40, paddingLeft: 10, borderRadius: 10, }} rounded>
                        <Input onChangeText={onPasswordChange} secureTextEntry={passwordVisible} placeholder='Şifre *' />
                        <Icon onPress={togglePasswordVisible} style={{ color: Colors.common.gray }} name={!passwordVisible ? "ios-eye-outline" : "ios-eye-off-outline"} type="Ionicons" />

                    </Item>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center",paddingTop:5,paddingBottom:5, marginTop: 30 }}>
                    <Pressable style={{ paddingLeft:10,paddingRight:10, paddingBottom:5,paddingTop:5}} onPress={cancelActionSheet}>
                        <Image source={require("../../assets/images/icons/cancelx.png")} resizeMode="contain" style={{ tintColor: "gray", height: 20, width: 20 }} />
                    </Pressable>
                    <Pressable style={{ paddingLeft:10,paddingRight:10, paddingBottom:5,paddingTop:5}} onPress={newAccount}>
                        <Image source={require("../../assets/images/icons/check.png")} resizeMode="contain" style={{ height: 20, width: 20 }} />
                    </Pressable>
                </View>

            </Card>
        )
    }


    return (
        <>
            <Button onPress={onPress} full style={{ height: 50, marginLeft: 20, marginRight: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} >
                <Icon style={{ color: "black" }} name="pluscircleo" type="AntDesign" />
                <Text style={{ color: Colors.common.black, fontWeight: "bold", fontSize: 16 }}>MetaTrader gerçek hesap aç</Text>
            </Button>
            <ActionSheet ref={actionSheetRef}>

                {
                    renderForRealAccount()
                }

            </ActionSheet>
        </>
    )

};