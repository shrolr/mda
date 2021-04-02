import { Button, Card, Icon, Input, Item, Spinner, Toast } from 'native-base';
import React, { createRef, useState } from 'react'
import Colors from '../../constants/Colors';
import { Locales, MetaTraderVersion } from '../../enums';
import { Text } from '../atom';
import ActionSheet from "react-native-actions-sheet";
import { View, Image, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useStateContext } from '../../context/state';
import { NewAccountRequest } from '../../types/post/NewAccountRequest';
import { AccountListNetworkResponse, DropDownPickerList, NetworkResponse } from '../../models';
import ApiCalls from '../../network/ApiCalls';
import { ActionType } from '../../context/reducer';
import { TFunction } from 'react-i18next';

interface ICreateRealMetaTraderAccount {
    t: TFunction<"translation">
    version: MetaTraderVersion
}
const actionSheetRef = createRef<ActionSheet>();
let newDemoAccountRequest: NewAccountRequest = {} as NewAccountRequest;

export const CreateRealMetaTraderAccount: React.FC<ICreateRealMetaTraderAccount> = ({ t, version }) => {
    let { context, dispatch } = useStateContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [passwordVisible, setpasswordVisible] = useState(false)
    const togglePasswordVisible = () => {
        setpasswordVisible(!passwordVisible)
    }
    const onChangeAccountType = (item: DropDownPickerList, index: number) => {
        if (typeof item.value === "number") {
            newDemoAccountRequest.typeId = item.value
        }
        else {
            newDemoAccountRequest.typeId = parseInt(item.value)
        }
    }
    const onChangeCurrency = (item: DropDownPickerList, index: number) => {
        newDemoAccountRequest.currency = item.value.toString()
    }
    const onPasswordChange = (password: string) => {
        setPassword(password)
    }
    const onUserNameChange = (username: string) => {
        setUsername(username)
    }
    const onPress = () => {
        newDemoAccountRequest.customerId = context.user!.customerAccountInfo.customerId
        newDemoAccountRequest.tradingPlatformId = version
        newDemoAccountRequest.isDemo = true
        newDemoAccountRequest.statusId = 2
        newDemoAccountRequest.username = null;
        newDemoAccountRequest.password = null;
        newDemoAccountRequest.leverageId = undefined;
        newDemoAccountRequest.typeId = undefined;
        newDemoAccountRequest.initialDeposit = undefined;
        newDemoAccountRequest.currency = undefined;

        actionSheetRef.current?.setModalVisible(true)
    }
    const cancelActionSheet = () => {
        actionSheetRef.current?.setModalVisible(false)

    }
    const onClose = () => {
        setLoading(false)
        setError(false)
        setPassword("")
        setUsername("")
    }
    const updateAccountList = () => {
        ApiCalls.getCustomerAccounts(context.user!.customerAccountInfo.customerId).then((response) => {
            if (response instanceof AccountListNetworkResponse) {
                let accounts = response.data;
                dispatch!({ type: ActionType.SET_USER_ACCOUNTS, payload: { accounts } })
            }
        })
        // TO DO FETCH ACC LİST
    }
    const newAccount = () => {
        if (newDemoAccountRequest.currency === undefined) {
            cancelActionSheet()
            Toast.show({ type: "warning", text: t(Locales.Accounts + ":CURRENCYINPUTERROR"), buttonText: "Ok" })
            return
        }
        if (username == "") {
            cancelActionSheet()
            Toast.show({ type: "warning", text: t(Locales.Accounts + ":USERNAMEINPUTERROR"), buttonText: "Ok" })
            return
        }
        if (newDemoAccountRequest.typeId === undefined) {
            cancelActionSheet()
            Toast.show({ type: "warning", text: t(Locales.Accounts + ":TYPEINPUTERROR"), buttonText: "Ok" })
            return
        }
        if ( password === "") {
            cancelActionSheet()
            Toast.show({ type: "warning", text: t(Locales.Accounts + ":PASSWORDINPUTERROR"), buttonText: "Ok" })
            return
        }
        setLoading(true)

        ApiCalls.postAccount(newDemoAccountRequest).then((response) => {
            setLoading(false)
            actionSheetRef.current?.setModalVisible(false)

            if (response instanceof NetworkResponse) {
                // TO DO success
                Toast.show({ type: "success", text: t(Locales.Accounts + ":CONFIRMED"), buttonText: "ok" })
                updateAccountList()
                
            }
            else {
                // show error alert
                
                Toast.show({ type: "danger", text: t(Locales.Accounts + ":PASSWORDHASCHANGED"), buttonText: "Ok" })
            }
        })
    }
    const renderForRealAccount = () => {
        return (
            <Card style={{ height: 380, marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.walletHeader, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 18 }}> {version === MetaTraderVersion.MetaTrader4 ? t(Locales.Accounts + ":CREATEREALMT4") : t(Locales.Accounts + ":CREATEREALMT5")} </Text>
                </View>
                <View style={{ height: 40, paddingLeft: 20, paddingRight: 20, marginTop: 20, }}>
                    <DropDownPicker
                        onChangeItem={onChangeAccountType}
                        items={context.accountTpyes!}
                        placeholder={t(Locales.Accounts + ":TYPE")}
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
                        onChangeItem={onChangeCurrency}
                        items={context.CurrenciesDefault}
                        placeholder={t(Locales.Accounts + ":CURRENCY")}
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
                        <Input onChangeText={onUserNameChange} placeholder={t(Locales.Accounts + ":USERNAME")} />
                        <Icon style={{ fontSize: 18, color: Colors.common.gray }} name={"ios-person"} type="Ionicons" />
                    </Item>
                </View>
                <View style={{ height: 40, paddingLeft: 20, paddingRight: 20, marginTop: 20, }}>

                    <Item style={{ height: 40, paddingLeft: 10, borderRadius: 10, }} rounded>
                        <Input onChangeText={onPasswordChange} secureTextEntry={passwordVisible} placeholder={t(Locales.Accounts + ":PASSWORD")} />
                        <Icon onPress={togglePasswordVisible} style={{ color: Colors.common.gray }} name={!passwordVisible ? "ios-eye-outline" : "ios-eye-off-outline"} type="Ionicons" />
                    </Item>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingTop: 5, paddingBottom: 5, marginTop: 30 }}>
                    <Pressable style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5 }} onPress={cancelActionSheet}>
                        <Image source={require("../../../assets/images/icons/cancelx.png")} resizeMode="contain" style={{ tintColor: "gray", height: 20, width: 20 }} />
                    </Pressable>
                    <Pressable style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5 }} onPress={newAccount}>
                        <Image source={require("../../../assets/images/icons/check.png")} resizeMode="contain" style={{ height: 20, width: 20 }} />
                    </Pressable>
                </View>

            </Card>
        )
    }
    const renderLoading = () => {
        return (
            <View  >
                <Spinner />
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 12, marginBottom: 30 }}>
                    {t(Locales.Accounts + ":LOADING")}
                </Text>
            </View>
        )
    }

    return (
        <>
            <Button onPress={onPress} full style={{ height: 50, marginLeft: 20, marginRight: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} >
                <Icon style={{ color: "black" }} name="pluscircleo" type="AntDesign" />
                <Text style={{ color: Colors.common.black, fontWeight: "bold", fontSize: 16 }}> {version === MetaTraderVersion.MetaTrader4 ? t(Locales.Accounts + ":CREATEREALMT4") : t(Locales.Accounts + ":CREATEREALMT5")} </Text>
            </Button>
            <ActionSheet onClose={onClose} ref={actionSheetRef}>

                {
                    loading ? renderLoading() : renderForRealAccount()
                }

            </ActionSheet>
        </>
    )

};