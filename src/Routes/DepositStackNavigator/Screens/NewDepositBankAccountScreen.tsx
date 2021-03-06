import { Button, Input, Item, Text, Toast } from 'native-base'
import React, { useState } from 'react'
import { View, StatusBar, SafeAreaView, Image, ScrollView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { NavBar } from '../../../components'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import { useStateContext } from '../../../context/state'
import { Locales } from '../../../enums'
import { DepositAccountsNetworkResponsel, DropDownPickerList, NetworkResponseFail } from '../../../models'
import ApiCalls from '../../../network/ApiCalls'
import { PostCustomerWithdrawAccountRequestModel } from '../../../types/post/PostCustomerDepositAccountRequestModel'
import { DepositsStackNavProps } from '../DepositParamList'


import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";
import { PostCustomerDepositAccountRequestModel } from '../../../types/post/PostCustomerWithdrawAccountRequestModel'
import { ActionType } from '../../../context/reducer'
// to do handle network response show taost 
const throttle = require('lodash.throttle');

export default function NewDepositBankAccountScreen({ navigation }: DepositsStackNavProps<"NewDepositBankAccount">) {
    const { t } = useTranslation();

    const [currency, setCurrency] = useState("")
    const { context ,dispatch} = useStateContext()
    const [isloading, setisloading] = useState(false)
    const [accountName, setaccountName] = useState("")
    const [accountNumber, setaccountNumber] = useState("")
    const [bankName, setbankName] = useState("")
    const [iban, setiban] = useState("")
    const [swift, setswift] = useState("")
    const [adress, setadress] = useState("")
    const [details, setDetails] = useState("")
    const [label, setlabel] = useState("")
    const addNewBankAccountThrottleFunction = () => {
        if (accountName === "") {
            Toast.show({ text: t(Locales.Toast + ":ACCOUNTNAMEINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (accountNumber === "") {
            Toast.show({ text: t(Locales.Toast + ":ACCOUNTNUMBERINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (bankName === "") {
            Toast.show({ text: t(Locales.Toast + ":BANKNAMEINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (label === "") {
            Toast.show({ text: t(Locales.Toast + ":LABELINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (iban === "") {
            Toast.show({ text: t(Locales.Toast + ":IBANINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (swift === "") {
            Toast.show({ text: t(Locales.Toast + ":SWIFTINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (currency === "") {
            Toast.show({ text: t(Locales.Toast + ":CURRENCYINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (currency === "") {
            Toast.show({ text: t(Locales.Toast + ":CURRENCYINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        setisloading(true)
        let UserWithdrawAccount: PostCustomerDepositAccountRequestModel =
        {
            AccountName: accountName, Address: adress, AccountNumber: accountNumber,
            BankName: bankName, CustomerId: context.user!.customerAccountInfo.customerId, Details: details,
            Iban: iban, Swift: swift,
            Currency: currency, Label: label, TypeId: 1
        }
        ApiCalls.postUserDepositAccount(UserWithdrawAccount).then((response) => {
            setisloading(false)
            if (response instanceof NetworkResponseFail) {
                Toast.show({ text: t(Locales.Toast + ":POSTUSERDEPOSITACCOUNTFAILED"), buttonText: 'Ok', type: "danger", })
            }
            else {
                Toast.show({ text: t(Locales.Toast + ":POSTUSERDEPOSITACCOUNTSUCCESS"), buttonText: 'Ok', type: "success", })
                updateAccounts()

            }
        })
    }
    let addNewBankAccount = throttle(addNewBankAccountThrottleFunction, 2000)

    const updateAccounts = () =>{
        ApiCalls.getUserDepositAccounts(context.user!.customerAccountInfo.customerId).then((response) => {
            if (response instanceof DepositAccountsNetworkResponsel) {

                let depositAccounts = response.data;
                dispatch!({ type: ActionType.SET_USER_DEPOSIT_ACCOUNTS, payload: { depositAccounts } })
                navigation.goBack()

            }
        })
    }
    const onChangeCurrency = (item: DropDownPickerList, index: number) => {
        setCurrency(item.value.toString())
    }
    const onAccountNameChange = (text: string) => {
        setaccountName(text)
    }
    const onAccountNumberChange = (text: string) => {
        setaccountNumber(text)
    }
    const onBankNameChange = (text: string) => {
        setbankName(text)
    }
    const onIbanChange = (text: string) => {
        setiban(text)
    }
    const onSwiftChange = (text: string) => {
        setswift(text)
    }
    const onAdressChange = (text: string) => {
        setadress(text)
    }
    const onDetailsChange = (text: string) => {
        setDetails(text)
    }
    const onLabelChange = (text: string) => {
        setlabel(text)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.common.statusBarColor }}>
            <View style={{ flex: 1, backgroundColor: Colors.common.white }}>

                <StatusBar
                    animated={true}
                    backgroundColor={Colors.common.statusBarColor}
                    barStyle="light-content"
                    showHideTransition="slide"
                />
                <TopBar />
                <NavBar ImageProp="new-deposit" title={t(Locales.Deposits + ":ADDUSERDEPOSITACCOUNT")} />
                <ScrollView style={{ paddingHorizontal: 20, }}>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onAccountNameChange} placeholder={t(Locales.Deposits + ":ACCOUNTNAME")} />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onAccountNumberChange} placeholder={t(Locales.Deposits + ":ACCOUNTNUMBER")} />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onBankNameChange} placeholder={t(Locales.Deposits + ":BANKNAME")} />
                    </Item>

                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onIbanChange} placeholder={t(Locales.Deposits + ":IBAN")} />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onSwiftChange} placeholder={t(Locales.Deposits + ":SWIFT")} />
                    </Item>
                    <View style={{ marginTop: 20 }}>
                        <DropDownPicker
                            onChangeItem={onChangeCurrency}
                            items={context.CurrenciesDefault}
                            placeholder={t(Locales.Deposits + ":CURRENCY")}
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                        />
                    </View>

                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onAdressChange} placeholder={t(Locales.Deposits + ":ADDRESS")} />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onDetailsChange} placeholder={t(Locales.Deposits + ":DETAILS")} />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onLabelChange} placeholder={t(Locales.Deposits + ":LABEL")} />
                    </Item>

                    <Button onPress={addNewBankAccount} style={{ borderRadius: 5, height: 50, marginBottom: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>{t(Locales.Deposits + ":SAVE")}</Text>

                    </Button>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}
