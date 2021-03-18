import React, { useEffect } from 'react'
import { View } from 'react-native';
import { ActionType } from '../context/reducer';
import { useStateContext } from '../context/state';
import { DropDownPickerList, AccountTypesNetworkResponse, NetworkResponseFail, WalletInfoNetworkResponse, AccountListNetworkResponse } from '../models';
import ApiCalls from '../network/ApiCalls';

interface ITestComponent {

}

export const TestComponent: React.FC<ITestComponent> = () => {
    let { context, dispatch } = useStateContext()
    useEffect(() => {
        ApiCalls.setToken(context.user!.token)
        ApiCalls.getNotificationInfo(context.user!.customerInfo.id)
        ApiCalls.getWalletInfo(context.user!.customerAccountInfo.id)
        ApiCalls.getWalletTransactionsInfo(context.user!.customerAccountInfo.id)
        loadToContext()
    }, [])
    const loadToContext = () => {
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
        ApiCalls.getWalletInfo(context.user!.customerAccountInfo.id).then((response)=> {
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