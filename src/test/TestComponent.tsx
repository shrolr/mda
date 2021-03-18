import React, { useEffect } from 'react'
import { View } from 'react-native';
import { ActionType } from '../context/reducer';
import { useStateContext } from '../context/state';
import { DropDownPickerList, AccountTypesNetworkResponse, NetworkResponseFail, WalletInfoNetworkResponse, AccountListNetworkResponse, WithdrawAccountsNetworkResponsel } from '../models';
import ApiCalls from '../network/ApiCalls';
import { PostCustomerWithdrawAccountRequestModel } from '../types/post/PostCustomerWithdrawAccountRequestModel';

interface ITestComponent {

}



export const TestComponent: React.FC<ITestComponent> = () => {
    let { context, dispatch } = useStateContext()
    useEffect(() => {
        ApiCalls.setToken(context.user!.token)

        ApiCalls.getNotificationInfo(context.user!.customerInfo.id)
        ApiCalls.getWalletInfo(context.user!.customerAccountInfo.id)
        ApiCalls.getWalletTransactionsInfo(context.user!.customerAccountInfo.id)
        ApiCalls.getUserWithdrawList(context.user!.customerAccountInfo.id)
        loadToContext()
    }, [])
    const loadToContext = () => {
        //let UserWithdrawAccount: PostCustomerWithdrawAccountRequestModel = { AccountName: "test", Address: "test adres", AccountNumber: "1234", BankName: "garanti test", Currency: "USD", CustomerId: 4, Details: "detay", Iban: "123123", Label: "label", Swift: "SWıFT3", TypeId: 2 }
      //  ApiCalls.postUserWithdrawAccount(UserWithdrawAccount)

      ApiCalls.getUserWithdrawAccounts(context.user!.customerAccountInfo.id).then((response)=> {
        if (response instanceof WithdrawAccountsNetworkResponsel ) {
            let withdrawAccounts = response.data;
            dispatch!({ type: ActionType.SET_USER_WITHDRAW_ACCOUNTS, payload: { withdrawAccounts } })
        }
      })

        ApiCalls.getAccountTypes().then((response) => {
            if (response instanceof AccountTypesNetworkResponse) {
                let accountTpyes: DropDownPickerList[] = [];
                response.data.forEach((_data) => {
                    let data: DropDownPickerList = {} as DropDownPickerList;
                    data.disabled = !_data.isActive;
                    data.label = _data.name;
                    data.value = _data.id
                    accountTpyes.push(data)
                })
                dispatch!({ type: ActionType.SET_ACCOUNT_TYPES, payload: { accountTpyes } })
            }
        })
        ApiCalls.getWalletInfo(context.user!.customerAccountInfo.id).then((response) => {
            if (response instanceof WalletInfoNetworkResponse) {
                let walletInfo = response.data;
                dispatch!({ type: ActionType.SET_WALLET_INFO, payload: { walletInfo } })
            }
        })

        ApiCalls.getCustomerAccounts(context.user!.customerInfo.id).then((response) => {
            if (response instanceof AccountListNetworkResponse) {
                let accounts = response.data;
                dispatch!({ type: ActionType.SET_USER_ACCOUNTS, payload: { accounts } })
            }
        })



    }
    return <View />


};