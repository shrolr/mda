import { Button, Card, Icon, Input, Item, Toast } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, Image, Pressable } from 'react-native';
import Colors from '../../constants/Colors';
import { Text } from '../atom';
import DropDownPicker from 'react-native-dropdown-picker';
import { useStateContext } from '../../context/state';
import { DropDownPickerList, NetworkResponse } from '../../models';
import { PostWithdrawRequestModel } from '../../types/post/PostWithdrawRequestModel';
import { CustomerWithdrawAccountTypeEnum } from '../../types/post/PostCustomerDepositAccountRequestModel';
import ApiCalls from '../../network/ApiCalls';
import { StackNavigationProp } from '@react-navigation/stack';
import { WithdrawParamList } from '../../Routes/WithdrawStackNavigator/WithdrawParamList';
import { TFunction } from 'react-i18next';
import { validateMoneyInput } from '../../utilities/functions';
import { Locales } from '../../enums';

interface IWithdrawFromWallet {
    navigation: StackNavigationProp<WithdrawParamList, "Withdraw">
    t: TFunction<"translation">
}
// TO DO IMPORTANT when drop down menu appears list ıtems zIndex are behind to buttons zIndex
// Some item from list item will not appear on the screen
// use dropdown menu list ref to give margin when its open
const throttle = require('lodash.throttle');

export const WithdrawFromWallet: React.FC<IWithdrawFromWallet> = ({ t, navigation }) => {
    const { context } = useStateContext()
    const [progressing, setprogressing] = useState(false)
    const [sourceAccount, setsourceAccount] = useState<number>()

    const [currency, setCurrency] = useState("")
    const [amount, setamount] = useState<number>()
    const [comment, setcomment] = useState<string>("")

    useEffect(() => {
        let userWithdrawAccounts: DropDownPickerList[] = [];
        context.withdrawAccounts.forEach((_data) => {
            let data: DropDownPickerList = {} as DropDownPickerList;
            data.disabled = false;
            data.label = _data.accountName;
            data.value = _data.id
            userWithdrawAccounts.push(data)
        })
        setaccounts(userWithdrawAccounts)
    }, [context.withdrawAccounts])
    const [accounts, setaccounts] = useState<DropDownPickerList[]>([])
    const onTransferRequestThrottleFunction = () => {
        if (sourceAccount === undefined) {
            Toast.show({ text: t(Locales.Withdraw + ":USERWITHDRAWACCOUNTINPUTERROR"), buttonText: 'Ok', type: "warning", })

            return
        }
        if (currency === "") {
            Toast.show({ text: t(Locales.Withdraw + ":CURRENCYINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (amount === undefined) {
            Toast.show({ text: t(Locales.Withdraw + ":AMOUNTINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }

        const filterAccounts = context.withdrawAccounts.filter((_account) => _account.id === sourceAccount)
        if (filterAccounts.length === 1) {
            const selectedAccount = filterAccounts[0];
            let postWithdrawRequestModel: PostWithdrawRequestModel = {
                AccountId: selectedAccount.id,
                Amount: amount,
                Comment: comment,
                Currency: currency,
                CustomerId: context.user!.customerAccountInfo.customerId,
                CustomerWithdrawAccountId: selectedAccount.id,
                IsWalletWithdraw: true,
                TypeId: selectedAccount.type === CustomerWithdrawAccountTypeEnum.BankAccount ? 1 : 2
            };
            // TO DO HANDLE response
            ApiCalls.postWithdraw(postWithdrawRequestModel).then((response) => {
                if (response instanceof NetworkResponse) {
                    Toast.show({ text: t(Locales.Toast + ":POSTWITHDRAWSUCCESS"), buttonText: 'Ok', type: "success", })
                    navigation.navigate("WithdrawHistory")
                }
                else {
                    Toast.show({ text: t(Locales.Toast + ":POSTWITHDRAWFAILED"), buttonText: 'Ok', type: "danger", })

                }
            })

        }



    }

    let onTransferRequest = throttle(onTransferRequestThrottleFunction, 2000)

    const onChangeSourceAccounts = (item: DropDownPickerList, index: number) => {
        if (typeof item.value === "number") {
            setsourceAccount(item.value)
        }
        else {
            setsourceAccount(parseInt(item.value))
        }
    }
    const onChangeCurrency = (item: DropDownPickerList, index: number) => {
        setCurrency(item.value.toString())
    }

    const onCommentChange = ((comment: string) => {
        setcomment(comment)
    })

    const onAmountChange = ((amount: string) => {
        if (amount === "") {
            setamount(undefined)
        }
        if (validateMoneyInput(amount)) {
            setamount(parseInt(amount))
        }

    })
    const newBankAccount = () => {
        navigation.navigate("AddWithDrawBankAccountScreen")
    }

    return (
        <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, backgroundColor: Colors.common.transferCardBg }}>
            <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 12, textAlign: "center" }}>{t(Locales.Withdraw + ":ISWALLETDEPOSIT")}</Text>
                <View style={{ height: 3, backgroundColor: Colors.common.contentDivider, marginTop: 20, marginBottom: 20 }} />
                <DropDownPicker
                    items={accounts}
                    placeholder={t(Locales.Withdraw + ":WITHDRAWACCOUNT")}
                    onChangeItem={onChangeSourceAccounts}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
                <Pressable onPress={newBankAccount}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 15, marginBottom: 0 }}>
                        <Image source={require("../../../assets/images/icons/circle-plus.png")} resizeMode="contain" style={{ height: 20, width: 20 }} />
                        <Text style={{ marginLeft: 5, color: "#0877D5", fontWeight: "bold", fontSize: 12, textAlign: "center" }}>{t(Locales.Withdraw + ":ADDUSERWITHDRAWACCOUNT")}</Text>

                    </View>
                </Pressable>
                <View style={{ marginTop: 10, marginBottom: 10 }} />
                <DropDownPicker
                    onChangeItem={onChangeCurrency}
                    items={context.CurrenciesDefault}
                    placeholder={t(Locales.Withdraw + ":CURRENCY")}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />

                <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                    <Input onChangeText={onAmountChange} value={amount ? amount?.toString() : ""} keyboardType="number-pad" placeholder={t(Locales.Withdraw + ":AMOUNT")} />
                    <Image source={require("../../../assets/images/icons/presentation.png")} resizeMode="contain" style={{ marginRight: 20, height: 13, width: 13 }} />

                </Item>

                <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                    <Input onChangeText={onCommentChange} placeholder={t(Locales.Withdraw + ":COMMENT")} />
                    <Image source={require("../../../assets/images/icons/message.png")} resizeMode="contain" style={{ marginRight: 20, height: 13, width: 13 }} />

                </Item>


                <Button onPress={onTransferRequest} style={{ borderRadius: 5, height: 50, marginBottom: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} full>
                    <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>{t(Locales.Withdraw + ":SUBMIT")}</Text>

                </Button>
            </Card>
        </View>
    )


};