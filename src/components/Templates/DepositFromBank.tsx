import { Button, Card, Icon, Input, Item, Spinner, Switch, Toast } from 'native-base';
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
import { DepositsParamList } from '../../Routes/DepositStackNavigator/DepositParamList';
import { CustomerDepositAccountTypeEnum, PostDepositRequestModel } from '../../types/post';
import { SystemDepositAccounts } from '../../models/ApiModels/Deposit/SystemDepositAccounts';
import { TFunction } from 'react-i18next';
import { Locales } from '../../enums';
import { createDataProviderForAccounts, validateMoneyInput } from '../../utilities/functions';

interface IDepositFromBank {
    navigation: StackNavigationProp<DepositsParamList, "NewDeposit">
    t: TFunction<"translation">
}
// TO DO IMPORTANT when drop down menu appears list ıtems zIndex are behind to buttons zIndex
// Some item from list item will not appear on the screen
// use dropdown menu list ref to give margin when its open

export const DepositFromBank: React.FC<IDepositFromBank> = ({ t, navigation }) => {
    const { context } = useStateContext()
    const [progressing, setprogressing] = useState(false)
    const [sourceAccount, setsourceAccount] = useState<number>()
    const [selectedSystemAccount, setselectedSystemAccount] = useState<number>()
    const [currency, setCurrency] = useState("")
    const [amount, setamount] = useState<number>()
    const [comment, setcomment] = useState<string>("")
    const [transferToWallet, settransferToWallet] = useState(false)
    const [accounts, setaccounts] = useState<DropDownPickerList[]>([])
    const [mtAccounts, setmtAccounts] = useState<DropDownPickerList[]>([])
    const [targetMtAccount, settargetMtAccount] = useState<number | null>(null)

    const [systemAccounts, setsystemAccounts] = useState<DropDownPickerList[]>([])

    useEffect(() => {
        let userDepositAccounts: DropDownPickerList[] = [];
        context.depositAccounts.forEach((_data) => {
            let data: DropDownPickerList = {} as DropDownPickerList;
            data.disabled = false;
            data.label = _data.accountName;
            data.value = _data.id
            userDepositAccounts.push(data)
        })
        setaccounts(userDepositAccounts)
        setmtAccounts(createDataProviderForAccounts(context.mt4RealAccounts, context.mt5RealAccounts))

        let systemDepositAccounts: DropDownPickerList[] = [];
        context.systemDepositAccounts.forEach((_data) => {
            let data: DropDownPickerList = {} as DropDownPickerList;
            data.disabled = false;
            data.label = _data.accountName;
            data.value = _data.id
            systemDepositAccounts.push(data)
        })
        setsystemAccounts(systemDepositAccounts)

    }, [context.depositAccounts, context.systemDepositAccounts, context.mt4RealAccounts, context.mt5RealAccounts])
    const onTransferRequest = () => {
        if (selectedSystemAccount === undefined) {
            Toast.show({ text: t(Locales.Deposits + ":BANKACCOUNTINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (sourceAccount === undefined) {
            Toast.show({ text: t(Locales.Deposits + ":USERDEPOSITACCOUNTINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (amount === undefined) {
            Toast.show({ text: t(Locales.Deposits + ":AMOUNTINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (currency === "") {
            Toast.show({ text: t(Locales.Deposits + ":CURRENCYINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }
        if (transferToWallet === false && targetMtAccount === null) {
            Toast.show({ text: t(Locales.Deposits + ":ACCOUNTINPUTERROR"), buttonText: 'Ok', type: "warning", })
            return
        }

        

        const filterAccounts = context.depositAccounts.filter((_account) => _account.id === sourceAccount)
        const filterSystemAccounts = context.systemDepositAccounts.filter((_account) => _account.id === selectedSystemAccount)

        if (filterAccounts.length === 1 && filterSystemAccounts.length === 1) {

            const selectedAccount = filterAccounts[0];
            const selectedSystemAccountObject = filterSystemAccounts[0]
            let postWithdrawRequestModel: PostDepositRequestModel = {
                AccountId: transferToWallet ? null : targetMtAccount,
                Amount: amount,
                Comment: comment,
                Currency: currency,
                CustomerId: context.user!.customerAccountInfo.customerId,
                CustomerDepositAccountId: selectedAccount.id,
                DepositAccountId: selectedSystemAccountObject.id,
                IsWalletDeposit: transferToWallet,
                TypeId: selectedAccount.type === CustomerDepositAccountTypeEnum.BankAccount ? 1 : 2,
                statusId: 1,
            };
            setprogressing(true)
            ApiCalls.postDeposit(postWithdrawRequestModel).then((response) => {
                setprogressing(false)
                if (response instanceof NetworkResponse) {
                    Toast.show({ text: t(Locales.Toast + ":POSTDEPOSITSUCCESS"), buttonText: 'Ok', type: "success", })

                    navigation.navigate("DepositsHistory")

                }
                else {
                    Toast.show({ text: t(Locales.Toast + ":POSTDEPOSITFAILED"), buttonText: 'Ok', type: "danger", })
                }

            })


        }



    }
    const onChangeSourceAccounts = (item: DropDownPickerList, index: number) => {
        if (typeof item.value === "number") {
            setsourceAccount(item.value)
        }
        else {
            setsourceAccount(parseInt(item.value))
        }
    }
    const onChangeMetaTraderAccounts = (item: DropDownPickerList, index: number) => {
        if (typeof item.value === "number") {
            settargetMtAccount(item.value)
        }
        else {
            settargetMtAccount(parseInt(item.value))
        }
    }

    const onChangeSystemAccounts = (item: DropDownPickerList, index: number) => {
        if (typeof item.value === "number") {
            setselectedSystemAccount(item.value)
        }
        else {
            setselectedSystemAccount(parseInt(item.value))
        }
    }
    const onChangeCurrency = (item: DropDownPickerList, index: number) => {
        setCurrency(item.value.toString())
    }

    const onCommentChange = ((comment: string) => {
        setcomment(comment)
    })
    const onSwitchChange = (value: boolean) => {
        settransferToWallet(value)

    }
    const onAmountChange = ((amount: string) => {
        if (amount === "") {
            setamount(undefined)
        }
        if (validateMoneyInput(amount)) {
            setamount(parseInt(amount))
        }

    })
    const newBankAccount = () => {
        navigation.navigate("NewDepositBankAccount")
    }
    if(progressing){
        return(
            <Spinner />
        )
    }
    return (
        <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, backgroundColor: Colors.common.transferCardBg }}>
            <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 12, textAlign: "center" }}>{t(Locales.Deposits + ":BANKPAYMENT")}</Text>
                <View style={{ height: 3, backgroundColor: Colors.common.contentDivider, marginTop: 20, marginBottom: 20 }} />

                <DropDownPicker
                    items={systemAccounts}
                    placeholder={t(Locales.Deposits + ":DEPOSITACCOUNTINFO")}
                    onChangeItem={onChangeSystemAccounts}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
                <View style={{ marginTop: 20 }} />

                <DropDownPicker
                    items={accounts}
                    placeholder={t(Locales.Deposits + ":USERDEPOSITACCOUNTINFO")}
                    onChangeItem={onChangeSourceAccounts}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
                {
                    !transferToWallet &&
                    <>
                        <View style={{ marginTop: 20 }} />

                        <DropDownPicker
                            items={mtAccounts}
                            placeholder={t(Locales.Deposits + ":ACCOUNTINFO")}
                            onChangeItem={onChangeMetaTraderAccounts}
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                        />
                    </>
                }

                <View style={{ marginTop: 20 }} />

                <Pressable onPress={newBankAccount}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 15, marginBottom: 0 }}>
                        <Image source={require("../../../assets/images/icons/circle-plus.png")} resizeMode="contain" style={{ height: 20, width: 20 }} />
                        <Text style={{ marginLeft: 5, color: "#0877D5", fontWeight: "bold", fontSize: 12, textAlign: "center" }}>{t(Locales.Deposits + ":ADDUSERDEPOSITACCOUNT")}</Text>

                    </View>
                </Pressable>
                <View style={{ marginTop: 10, marginBottom: 10 }} />
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

                <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                    <Input onChangeText={onAmountChange} value={amount ? amount?.toString() : ""} keyboardType="number-pad" placeholder={t(Locales.Deposits + ":AMOUNT")} />
                    <Image source={require("../../../assets/images/icons/presentation.png")} resizeMode="contain" style={{ marginRight: 20, height: 13, width: 13 }} />

                </Item>

                <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                    <Input onChangeText={onCommentChange} placeholder={t(Locales.Deposits + ":COMMENT")} />
                    <Image source={require("../../../assets/images/icons/message.png")} resizeMode="contain" style={{ marginRight: 20, height: 13, width: 13 }} />

                </Item>

                <View style={{ justifyContent: "flex-end", alignItems: "center", paddingTop: 20, paddingBottom: 10, flexDirection: "row" }}>
                    <Switch thumbColor="white" trackColor={{ true: "#0877D5", false: "gray" }} onValueChange={onSwitchChange} value={transferToWallet} />
                    <Text style={{ marginLeft: 5, color: "#0877D5" }} >{t(Locales.Deposits + ":ISWALLETDEPOSIT")}</Text>
                </View>

                <Button onPress={onTransferRequest} style={{ borderRadius: 5, height: 50, marginBottom: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} full>
                    <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>{t(Locales.Deposits + ":SUBMIT")}</Text>

                </Button>
            </Card>
        </View>
    )


};