import { Button, Card, Icon, Input, Item, Switch, Toast } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, Image, Pressable } from 'react-native';
import Colors from '../../constants/Colors';
import { Text } from '../atom';
import DropDownPicker from 'react-native-dropdown-picker';
import { useStateContext } from '../../context/state';
import { DropDownPickerList } from '../../models';
import { PostWithdrawRequestModel } from '../../types/post/PostWithdrawRequestModel';
import { CustomerWithdrawAccountTypeEnum } from '../../types/post/PostCustomerWithdrawAccountRequestModel';
import ApiCalls from '../../network/ApiCalls';
import { StackNavigationProp } from '@react-navigation/stack';
import { DepositsParamList } from '../../Routes/DepositStackNavigator/DepositParamList';

interface IDepositFromBank {
    navigation: StackNavigationProp<DepositsParamList, "NewDeposit">
}
// TO DO IMPORTANT when drop down menu appears list ıtems zIndex are behind to buttons zIndex
// Some item from list item will not appear on the screen
// use dropdown menu list ref to give margin when its open

export const DepositFromBank: React.FC<IDepositFromBank> = ({navigation}) => {
    const { context } = useStateContext()
    const [progressing, setprogressing] = useState(false)
    const [sourceAccount, setsourceAccount] = useState<number>()

    const [currency, setCurrency] = useState("")
    const [amount, setamount] = useState<number>()
    const [comment, setcomment] = useState<string>("")
    const [transferToWallet, settransferToWallet] = useState(false)
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
    const onTransferRequest = () => {
        // TO DO validate input 
        if (sourceAccount && amount && comment) {
            const filterAccounts = context.withdrawAccounts.filter((_account) => _account.id === sourceAccount)
            if (filterAccounts.length === 1) {
                const selectedAccount = filterAccounts[0];
                let postWithdrawRequestModel: PostWithdrawRequestModel = {
                    AccountId: selectedAccount.id,
                    Amount: amount,
                    Comment: comment,
                    Currency: currency,
                    CustomerId: context.user!.customerInfo.id,
                    CustomerWithdrawAccountId: selectedAccount.id,
                    IsWalletWithdraw: true,
                    TypeId: selectedAccount.type === CustomerWithdrawAccountTypeEnum.BankAccount ? 1 : 2
                };
                console.log(postWithdrawRequestModel)
                // TO DO HANDLE response
                ApiCalls.postWithdraw(postWithdrawRequestModel)

            }

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
    const onChangeCurrency = (item: DropDownPickerList, index: number) => {
        setCurrency(item.value.toString())
    }

    const onCommentChange = ((comment: string) => {
        setcomment(comment)
    })
    const onSwitchChange =(value:boolean)=>{
        settransferToWallet(value)

    }
    const onAmountChange = ((amount: string) => {
        try {
            setamount(parseInt(amount))
        } catch (error) {
            // show warning amount must be number
            Toast.show({ text: "amount must be number", type: "warning" })

        }
    })
    const newBankAccount = () => {
        //navigation.navigate("AddNewBankAccountScreen")
    }

    return (
        <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, backgroundColor: Colors.common.transferCardBg }}>
            <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 12, textAlign: "center" }}>Banka Hesabından Yatırma</Text>
                <View style={{ height: 3, backgroundColor: Colors.common.contentDivider, marginTop: 20, marginBottom: 20 }} />
                <DropDownPicker
                    items={accounts}
                    placeholder="Banka Hesabı"
                    onChangeItem={onChangeSourceAccounts}
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
                    placeholder="Ticaret Hesabı"
                    onChangeItem={onChangeSourceAccounts}
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
                    placeholder="Kullanıcı Banka Hesabı"
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
                        <Text style={{ marginLeft: 5, color: "#0877D5", fontWeight: "bold", fontSize: 12, textAlign: "center" }}>Yeni Banka Hesabı Ekle</Text>

                    </View>
                </Pressable>
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
                    <Input onChangeText={onAmountChange} placeholder='Yatırılan Miktar *' />
                    <Image source={require("../../../assets/images/icons/presentation.png")} resizeMode="contain" style={{ marginRight: 20, height: 13, width: 13 }} />

                </Item>

                <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                    <Input onChangeText={onCommentChange} placeholder='Yorum *' />
                    <Image source={require("../../../assets/images/icons/message.png")} resizeMode="contain" style={{ marginRight: 20, height: 13, width: 13 }} />

                </Item>

                <View style={{ justifyContent: "flex-end", alignItems: "center", paddingTop: 20, paddingBottom: 10, flexDirection: "row" }}>
                    <Switch thumbColor="white" trackColor={{true:"#0877D5",false:"gray"}} onValueChange={onSwitchChange} value={transferToWallet} />
                    <Text style={{marginLeft:5, color:"#0877D5"}} >Cüzdana Aktar</Text>
                </View>

                <Button onPress={onTransferRequest} style={{ borderRadius: 5, height: 50, marginBottom: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} full>
                    <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>Yatır</Text>

                </Button>
            </Card>
        </View>
    )


};