import { Button, Card, Icon, Input, Item, Spinner, Toast } from 'native-base';
import React, { createRef, useEffect, useState } from 'react'
import Colors from '../../constants/Colors';
import { MetaTraderVersion } from '../../enums';
import { Text } from '../atom';
import ActionSheet from "react-native-actions-sheet";
import { View, Image, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useStateContext } from '../../context/state';
import { NewAccountRequest } from '../../types/post/NewAccountRequest';
import { DropDownPickerList, NetworkResponse } from '../../models';
import ApiCalls from '../../network/ApiCalls';

interface ICreateDemoMetaTraderAccount {
    version: MetaTraderVersion
}
const actionSheetRef = createRef<ActionSheet>();
let newDemoAccountRequest: NewAccountRequest = {} as NewAccountRequest;

export const CreateDemoMetaTraderAccount: React.FC<ICreateDemoMetaTraderAccount> = ({ version }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    let { context } = useStateContext()
    const onPress = () => {
        newDemoAccountRequest.customerId = context.user!.customerInfo.id
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
    const onChangeLevarage = (item: DropDownPickerList, index: number) => {
        if (typeof item.value === "number") {
            newDemoAccountRequest.leverageId = item.value
        }
        else {
            newDemoAccountRequest.leverageId = parseInt(item.value)
        }
    }
    const onChangeInitialDeposit = (item: DropDownPickerList, index: number) => {
        if (typeof item.value === "number") {
            newDemoAccountRequest.initialDeposit = item.value
        }
        else {
            newDemoAccountRequest.initialDeposit = parseInt(item.value)
        }
    }
    const cancelActionSheet = () => {
        actionSheetRef.current?.setModalVisible(false)
    }
    const updateAccountList = () => {
        // TO DO FETCH ACC LİST
    }
    const newAccount = () => {
        if (newDemoAccountRequest.currency === undefined || newDemoAccountRequest.leverageId === undefined || newDemoAccountRequest.typeId === undefined || newDemoAccountRequest.initialDeposit === undefined) {
            // TO DO SHOW USER INFO ABOUT empty inputs
            return
        }
        setLoading(true)
         
        ApiCalls.postAccount(newDemoAccountRequest).then((response) => {
            actionSheetRef.current?.setModalVisible(false)

            setLoading(false)
            if (response instanceof NetworkResponse) {
                // success
                Toast.show({type:"success",text:"başarılı",buttonText:"ok"})
                updateAccountList()
            }
            else {
                // show error alert
                Toast.show({type:"warning",text:"hata",buttonText:"ok"})
            }
        })
    }
    const renderForDemoAccount = () => {
        return (
            <Card style={{ height: 450, marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.walletHeader, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 18 }}>{"Yeni Demo Hesap"}</Text>
                </View>
                <View style={{ height: 40, paddingLeft: 20, paddingRight: 20, marginTop: 20, }}>
                    <DropDownPicker
                        onChangeItem={onChangeAccountType}
                        items={context.accountTpyes}
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
                        onChangeItem={onChangeCurrency}
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
                    <DropDownPicker
                        onChangeItem={onChangeLevarage}
                        items={context.leveragesDefault}
                        placeholder="Kaldıraç"
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
                        onChangeItem={onChangeInitialDeposit}
                        items={context.initialDepositDefault}
                        placeholder="Başlangıç Yatırımı"
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingTop: 5, paddingBottom: 5, marginTop: 50, }}>
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
    const onClose = () =>{
        setLoading(false)
        setError(false)
    }
    const renderLoading = () => {
        return (
            <View  >
                <Spinner />
                <Text style={{textAlign:"center",fontWeight:"bold",fontSize:12,marginBottom:30}}>
                    Account creation in progress
                </Text>
            </View>
        )
    }
    return (
        <>
            <Button onPress={onPress} full style={{ height: 50, marginLeft: 20, marginRight: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} >
                <Icon style={{ color: "black" }} name="pluscircleo" type="AntDesign" />
                <Text style={{ color: Colors.common.black, fontWeight: "bold", fontSize: 16 }}>MetaTrader {version === MetaTraderVersion.MetaTrader4 ? "4" : "5"} demo hesabı aç</Text>
            </Button>
            <ActionSheet onClose={onClose} ref={actionSheetRef}>

                {
                    loading ? renderLoading() : renderForDemoAccount()
                }

            </ActionSheet>
        </>
    )

};