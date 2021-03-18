import { Button, Card, Icon, Input, Item, Spinner, Toast } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import { Text } from '../atom';
import DropDownPicker from 'react-native-dropdown-picker';
import { useStateContext } from '../../context/state';
import { DropDownPickerList, NetworkResponse } from '../../models';
import { TransferTypeEnum } from '../../enums';
import ApiCalls from '../../network/ApiCalls';
import { TransferWalletToAccountRequest } from '../../types/post/TransferWalletToAccountRequest';
import { StackNavigationProp } from '@react-navigation/stack';
import { DepositsParamList } from '../../Routes/DepositStackNavigator/DepositParamList';

interface IWalletToAccountTransfer {
    navigation: StackNavigationProp<DepositsParamList, "DepositsHistory">

}

// TO DO IMPORTANT when drop down menu appears list ıtems zIndex are behind to buttons zIndex
// Some item from list item will not appear on the screen
// use dropdown menu list ref to give margin when its open
// TO DO NEED TO STORE WALLET INFO
const throttle = require('lodash.throttle');

export const WalletToAccountTransfer: React.FC<IWalletToAccountTransfer> = ({navigation}) => {
    const [accounts, setaccounts] = useState<DropDownPickerList[]>([])
    const { context } = useStateContext()
    const [progressing, setprogressing] = useState(false)
    const [sourceAccount, setsourceAccount] = useState<number>()

    const [currency, setCurrency] = useState("")
    const [amount, setamount] = useState<number>()
    useEffect(() => {
        let mtRealAccounts = context.mt4RealAccounts.concat(context.mt5RealAccounts)
        let AccountList: DropDownPickerList[] = []
        mtRealAccounts.forEach((account) => {
            let newAccount: DropDownPickerList = {} as DropDownPickerList;
            newAccount.disabled = !account.isActive
            newAccount.label = account.accountName! + " " + account.user
            newAccount.value = account.id
            newAccount.hidden = false
            AccountList.push(newAccount)
        })
        setaccounts(AccountList)
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

    const onChangeCurrency = (item: DropDownPickerList, index: number) => {
        setCurrency(item.value.toString())
    }

    const TransferRequest = () => {
        console.log(sourceAccount,amount,currency)
        if (sourceAccount && amount && currency !== "") {

            let transferAccountToAccountRequest: TransferWalletToAccountRequest = {
                sourceAccountId: null,
                targetAccountId: sourceAccount,
                currency: currency,
                walletId: 3,
                typeId: TransferTypeEnum.WalletToAccount,
                amount: amount,
                customerId: context.user!.customerAccountInfo.id,
            }
            console.log(transferAccountToAccountRequest)
            ApiCalls.postTransfer(transferAccountToAccountRequest).then((response) => {
                if (response instanceof NetworkResponse) {
                    Toast.show({ text: "Başarılı yönlendiriliyor", type: "success",duration:3000 })
                    navigation.replace("DepositsHistory")

                }
                else {
                    Toast.show({ text: "fail", type: "danger" })
                    setprogressing(false)
                }
            })
        }
        else {
            // show error
            Toast.show({ text: "error", type: "warning" })
            setprogressing(false)

        }

    }
    let transferRequest = throttle(TransferRequest, 2000)
    const onTransferRequest = () => {
        setprogressing(true)
        transferRequest()
    }

    const onAmountChange = ((amount: string) => {
        try {
            setamount(parseInt(amount))
        } catch (error) {
            // show warning amount must be number
            Toast.show({ text: "amount must be number", type: "warning" })

        }
    })
    return (
        <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, backgroundColor: Colors.common.transferCardBg }}>
            <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 12, textAlign: "center" }}>Cüzdandan Hesaba Transfer</Text>
                <View style={{ height: 3, backgroundColor: Colors.common.contentDivider, marginTop: 20, marginBottom: 20 }} />
                <DropDownPicker
                    items={accounts}
                    placeholder="Kaynak Hesap"
                    onChangeItem={onChangeSourceAccounts}
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
                    placeholder="Para Birimi"
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
                <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                    <Input onChangeText={onAmountChange} keyboardType="numeric" placeholder='Miktar *' />
                    <Icon style={{ fontSize: 18, color: Colors.common.gray }} name={"bar-chart"} type="Feather" />
                </Item>
                {
                    progressing ? <Spinner /> : <Button onPress={onTransferRequest} style={{ borderRadius: 5, height: 50, marginBottom: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>TRANSFER ET</Text>

                    </Button>
                }
            </Card>
        </View>
    )


};