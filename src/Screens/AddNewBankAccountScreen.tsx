import React, { useState } from 'react'
import { View, StatusBar, SafeAreaView, Image, ScrollView } from 'react-native'
import { MenuCard, NavBar } from '../components'
import { Text } from '../components/atom'
import { TopBar } from '../components/Organisms/TopBar'
import Colors from '../constants/Colors'
import { Button, Card, Input, Item, Spinner } from 'native-base'
import { WithdrawStackNavProps } from '../Routes/WithdrawStackNavigator/WithdrawParamList'
import { PostCustomerWithdrawAccountRequestModel } from '../types/post/PostCustomerWithdrawAccountRequestModel'
import DropDownPicker from 'react-native-dropdown-picker'
import { DropDownPickerList, NetworkResponseFail } from '../models'
import { useStateContext } from '../context/state'
import ApiCalls from '../network/ApiCalls'

// to do handle network response show taost 

export default function AddNewBankAccountScreen({ navigation }: WithdrawStackNavProps<"AddNewBankAccountScreen">) {
    const [currency, setCurrency] = useState("")
    const { context } = useStateContext()
    const [isloading, setisloading] = useState(false)
    const [accountName, setaccountName] = useState("")
    const [accountNumber, setaccountNumber] = useState("")
    const [bankName, setbankName] = useState("")
    const [iban, setiban] = useState("")
    const [swift, setswift] = useState("")
    const [adress, setadress] = useState("")
    const [details, setDetails] = useState("")
    const [label, setlabel] = useState("")
    const addNewBankAccount = () => {
        setisloading(true)
        let UserWithdrawAccount: PostCustomerWithdrawAccountRequestModel =
        {
            AccountName: accountName, Address: adress, AccountNumber: accountNumber,
            BankName: bankName, CustomerId: context.user!.customerAccountInfo.customerId, Details: details,
            Iban: iban, Swift: swift,
            Currency: currency, Label: label, TypeId: 2
        }
        console.log(UserWithdrawAccount)
        ApiCalls.postUserWithdrawAccount(UserWithdrawAccount).then((response) => {
            setisloading(false)
            console.log(response)
            if(response instanceof NetworkResponseFail){
                // show error
            }
            else {
                // success show alert clear inputs and go back
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
                <NavBar  ImageProp="new-deposit"   title="Banka Hesabı Ekle" />
                <ScrollView style={{ paddingHorizontal: 20, }}>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onAccountNameChange} placeholder='AccountName *' />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onAccountNumberChange} placeholder='AccountNumber *' />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onBankNameChange} placeholder='BankName *' />
                    </Item>

                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onIbanChange} placeholder='Iban *' />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onSwiftChange} placeholder='Swift *' />
                    </Item>
                    <View style={{ marginTop: 20 }}>
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
                    <View style={{ marginTop: 20 }}>
                        <DropDownPicker

                            items={context.CurrenciesDefault}
                            placeholder="Hesap Tipi"
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                        />
                    </View>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onAdressChange} placeholder='Address *' />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onDetailsChange} placeholder='Detay *' />
                    </Item>
                    <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onLabelChange} placeholder='label *' />
                    </Item>

                    <Button onPress={addNewBankAccount} style={{ borderRadius: 5, height: 50, marginBottom: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>Ekle</Text>

                    </Button>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}
