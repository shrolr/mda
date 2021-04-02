import { Button, Card, Input, Item, Spinner, Toast } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { Text } from '../atom';
import DropDownPicker from 'react-native-dropdown-picker';
import { useStateContext } from '../../context/state';
import { DropDownPickerList, NetworkResponse } from '../../models';
import { TransferAccountToAccountRequest } from '../../types/post/TransferAccountToAccountRequest';
import ApiCalls from '../../network/ApiCalls';
import { Locales, TransferTypeEnum } from '../../enums';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeParamList } from '../../Routes/HomeStackNavigator/HomeParamList';
import { createDataProviderForAccounts, validateMoneyInput } from '../../utilities/functions';
import { TFunction } from 'react-i18next';

interface IAccountToAccountTransfer {
    navigation: StackNavigationProp<HomeParamList, "NewTransfer">
    t: TFunction<"translation">

}
// TO DO IMPORTANT when drop down menu appears list ıtems zIndex are behind to buttons zIndex
// Some item from list item will not appear on the screen
// use dropdown menu list ref to give margin when its open
const throttle = require('lodash.throttle');

export const AccountToAccountTransfer: React.FC<IAccountToAccountTransfer> = ({ t, navigation }) => {
    const [accounts, setaccounts] = useState<DropDownPickerList[]>([])
    const { context } = useStateContext()
    const [progressing, setprogressing] = useState(false)
    const [sourceAccount, setsourceAccount] = useState<number>()
    const [targetAcoount, settargetAcoount] = useState<number>()
    const [currency, setCurrency] = useState("")
    const [amount, setamount] = useState<number>()
    useEffect(() => {
        setaccounts(createDataProviderForAccounts(context.mt4RealAccounts, context.mt5RealAccounts))

    }, [context.mt4RealAccounts, context.mt5RealAccounts])
    const onChangeSourceAccounts = (item: DropDownPickerList, index: number) => {
        accounts.forEach((account) => account.hidden = false)
        item.hidden = true
        if (typeof item.value === "number") {
            setsourceAccount(item.value)
        }
        else {
            setsourceAccount(parseInt(item.value))
        }
    }
    const onChangeTargetAccounts = (item: DropDownPickerList, index: number) => {
        accounts.forEach((account) => account.hidden = false)
        item.hidden = true
        if (typeof item.value === "number") {
            settargetAcoount(item.value)
        }
        else {
            settargetAcoount(parseInt(item.value))
        }
    }
    const onChangeCurrency = (item: DropDownPickerList, index: number) => {
        setCurrency(item.value.toString())
    }

    const TransferRequest = () => {
        if (sourceAccount === targetAcoount) {
            return
        }

        if (sourceAccount === undefined) {
            Toast.show({ text: t(Locales.Transfer + ":ACCOUNTINPUTERROR"), type: "success", duration: 3000 })
            return
        }
        if (targetAcoount === undefined) {
            Toast.show({ text: t(Locales.Transfer + ":TARGETACCOUNTINPUTERROR"), type: "success", duration: 3000 })
            return
        }
        if (currency === "") {
            Toast.show({ text: t(Locales.Transfer + ":CURRENCYINPUTERROR"), type: "success", duration: 3000 })
            return
        }
        if (amount === undefined) {
            Toast.show({ text: t(Locales.Transfer + ":AMOUNTINPUTERROR"), type: "success", duration: 3000 })
            return
        }
        setprogressing(true)

        let transferAccountToAccountRequest: TransferAccountToAccountRequest = {
            sourceAccountId: sourceAccount,
            walletId: null,
            targetAccountId: targetAcoount,
            currency: currency,
            typeId: TransferTypeEnum.AccountToAccount,
            amount: amount,
            customerId: context.user!.customerAccountInfo.customerId,
        }
        ApiCalls.postTransfer(transferAccountToAccountRequest).then((response) => {
            if (response instanceof NetworkResponse) {
                Toast.show({ text: t(Locales.Toast + ":POSTTRANSFERSUCCESS"), type: "success", duration: 3000 })
                navigation.navigate("TransferHistory")
                setprogressing(false)
            }
            else {
                Toast.show({ text: t(Locales.Toast + ":POSTTRANSFERFAILED"), type: "danger", duration: 3000 })
                setprogressing(false)
            }
        })


    }
    let transferRequest = throttle(TransferRequest, 2000)
    const onTransferRequest = () => {
        transferRequest()
    }

    const onAmountChange = ((amount: string) => {
        if (amount === "") {
            setamount(undefined)
        }
        if (validateMoneyInput(amount)) {
            setamount(parseInt(amount))
        }
    })
    return (
        <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, backgroundColor: Colors.common.transferCardBg }}>
            <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 12, textAlign: "center" }}>{t(Locales.Transfer + ":ACCOUNTTOACCOUNT")}</Text>
                <View style={{ height: 3, backgroundColor: Colors.common.contentDivider, marginTop: 20, marginBottom: 20 }} />
                <DropDownPicker
                    items={accounts}
                    placeholder={t(Locales.Transfer + ":ACCOUNT")}
                    onChangeItem={onChangeSourceAccounts}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15 }}>
                    <Image source={require("../../../assets/images/icons/chevron-double-down.png")} resizeMode="contain" style={{ height: 20, width: 20 }} />

                </View>

                <DropDownPicker
                    items={accounts}
                    placeholder={t(Locales.Transfer + ":TARGETACCOUNT")}
                    onChangeItem={onChangeTargetAccounts}

                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
                <View style={{ marginTop: 10, marginBottom: 10 }} />
                <DropDownPicker
                    onChangeItem={onChangeCurrency}

                    items={context.CurrenciesDefault}
                    placeholder={t(Locales.Transfer + ":CURRENCY")}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />

                <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                    <Input value={amount ? amount.toString() : ""}  onChangeText={onAmountChange} keyboardType="numeric" placeholder={t(Locales.Transfer + ":AMOUNT")} />
                    <Image source={require("../../../assets/images/icons/presentation.png")} style={{ marginRight: 20, height: 13, width: 13 }} />

                </Item>
                {
                    progressing ? <Spinner /> : <Button onPress={onTransferRequest} style={{ borderRadius: 5, height: 50, marginBottom: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>{t(Locales.Transfer + ":TRANSFER")}</Text>

                    </Button>
                }

            </Card>
        </View>
    )


};