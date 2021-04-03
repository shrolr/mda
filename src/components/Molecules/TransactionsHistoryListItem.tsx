import React, { useState } from 'react'
import { View, Image, Pressable, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import { Locales, TransferStatusEnum, WithdrawStatusEnum } from '../../enums';
import { NetworkResponse, TransferList } from '../../models';
import { WalletTransactionApiModel } from '../../models/ApiModels/Wallet/WalletInfoApiModel';
import { WithdrawHistory } from '../../models/ApiModels/Withdraw/WithdrawHistory';
import ApiCalls from '../../network/ApiCalls';
import { convertUTCDateToLocalDate } from '../../utilities/functions';
import { Text } from '../atom';
import i18n from 'i18n-js';
import { useTranslation } from 'react-i18next';
import { Spinner, Toast } from 'native-base';

interface ITransactionsHistoryListItem {
    index: number;
    item: WithdrawHistory | WalletTransactionApiModel | TransferList
    Type: "WithdrawHistory" | "WalletTransactionApiModel" | "TransferList"
}


export const TransactionsHistoryListItem: React.FC<ITransactionsHistoryListItem> = ({ Type, index, item }) => {
    const { t } = useTranslation();
    const [loading, setloading] = useState(false)
    var localDate = convertUTCDateToLocalDate(new Date(item.createdDate))
    const [shouldRefresh, setshouldRefresh] = useState(false)
    const cancelRequest = () => {
        onConfirmCancelRequest()
    }
    const onConfirmCancelRequest = () => {
        let status = item.status;
        setloading(true)
        switch (Type) {
            case "TransferList":
                ApiCalls.putTransfer({ StatusId: TransferStatusEnum.Cancelled }, item.id).then((response) => {
                    if (response instanceof NetworkResponse) {
                        item.status = "Cancelled"
                        setshouldRefresh(!shouldRefresh)
                        Toast.show({ text: t(Locales.Toast + ":PUTUSERWITHDRAWACCOUNTSUCCESS"), buttonText: 'Ok', type: "success", })
                    }
                    else {
                        Toast.show({ text: t(Locales.Toast + ":PUTUSERWITHDRAWACCOUNTFAILED"), buttonText: 'Ok', type: "danger", })
                        item.status = status
                    }
                   setloading(false)
                })
                break;
            case "WithdrawHistory":
                ApiCalls.putWithdraw({ StatusId: WithdrawStatusEnum.Cancelled }, item.id).then((response) => {
                    if (response instanceof NetworkResponse) {
                        item.status = "Cancelled"
                        setshouldRefresh(!shouldRefresh)
                        Toast.show({ text: t(Locales.Toast + ":PUTUSERWITHDRAWACCOUNTSUCCESS"), buttonText: 'Ok', type: "success", })

                        
                    }
                    else {
                        Toast.show({ text: t(Locales.Toast + ":PUTUSERWITHDRAWACCOUNTFAILED"), buttonText: 'Ok', type: "danger", })

                        item.status = status
                    }
                    setloading(false)

                })
                break;
            default:
                break;
        }

    }
    const findLocale = () => {
        switch (Type) {
            case 'WalletTransactionApiModel':
                return t(Locales.Wallet + ":" + item.type.toUpperCase())
            case "TransferList":
                return t(Locales.Transfer + ":" + item.type.toUpperCase())
            case "WithdrawHistory":
                return t(Locales.Withdraw + ":" + item.type.toUpperCase())
            default:
                break;
        }
    }
    const findLocaleStatus = () => {
        switch (Type) {
            case 'WalletTransactionApiModel':
                return t(Locales.Transfer + ":" + item.status.toUpperCase())
            case "TransferList":
                return t(Locales.Transfer + ":" + item.status.toUpperCase())
            case "WithdrawHistory":
                return t(Locales.Withdraw + ":" + item.status.toUpperCase())
            default:
                break;
        }
    }
    if (loading) {
        return (
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:"center",height:60,  backgroundColor: index % 2 === 0 ? "#dfdfdf" : "#fff" }}>
                <Spinner size="small" />
            </View>
        )
    }
    return (
        <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: index % 2 === 0 ? "#dfdfdf" : "#fff" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                {(item.status === "Cancelled" || item.status === "Rejected") &&
                    <Image source={require("../../../assets/images/icons/deposit_info_red.png")} style={{ height: 20, width: 20 }} />
                }
                {
                    item.status === "Confirmed" &&
                    <Image source={require("../../../assets/images/icons/deposit_info_green.png")} style={{ height: 20, width: 20 }} />
                }
                {
                    item.status === "Pending" &&
                    <Image source={require("../../../assets/images/icons/pending.png")} style={{ height: 20, width: 20 }} />
                }

                <Text style={{ fontSize: 8, textAlign: "center", marginTop: 5 }}>{localDate.date}{"\n"}{localDate.time}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 10, }}>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>{findLocale()}</Text>
                <Text style={{ fontSize: 9, color: Colors.common.gray }}>{findLocaleStatus()}</Text>
                <Text style={{ fontSize: 8, marginTop: 5, marginBottom: 5, }}>{localDate.date}{"  "}{localDate.time}</Text>

            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Text style={{ marginRight: 10, fontSize: 12, color: Colors.common.orangered, fontWeight: "bold", }}>+ {item.amount} $</Text>
                {
                    item.status === "Pending" ?
                        <Pressable style={{ padding: 5 }} onPress={cancelRequest}>
                            <Image source={require("../../../assets/images/icons/cancel.png")} style={{ tintColor: Colors.common.cancelGray, height: 15, width: 15 }} />
                        </Pressable> : null
                }


            </View>
        </View>
    )


};