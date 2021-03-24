import React, { useState } from 'react'
import { View, Image, Pressable, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import { TransferStatusEnum, WithdrawStatusEnum } from '../../enums';
import { NetworkResponse, TransferList } from '../../models';
import { WalletTransactionApiModel } from '../../models/ApiModels/Wallet/WalletInfoApiModel';
import { WithdrawHistory } from '../../models/ApiModels/Withdraw/WithdrawHistory';
import ApiCalls from '../../network/ApiCalls';
import { convertUTCDateToLocalDate } from '../../utilities/functions';
import { Text } from '../atom';

interface ITransactionsHistoryListItem {
    index: number;
    item: WithdrawHistory | WalletTransactionApiModel | TransferList
    Type: "WithdrawHistory" | "WalletTransactionApiModel" | "TransferList"
}


export const TransactionsHistoryListItem: React.FC<ITransactionsHistoryListItem> = ({ Type, index, item }) => {
    var localDate = convertUTCDateToLocalDate(new Date(item.createdDate))
    const [shouldRefresh, setshouldRefresh] = useState(false)
    const cancelRequest = () => {
        Alert.alert(
            "Cancel Request",
            "Are you sure to cancel",
            [
                {
                    text: "İşlemi iptal Et",
                    onPress: () => onConfirmCancelRequest(),
                    style: "destructive"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }

    const onConfirmCancelRequest = () => {
        switch (Type) {
            case "TransferList":
                console.log("TransferList sil", item)
                ApiCalls.putTransfer({ StatusId: TransferStatusEnum.Cancelled }, item.id).then((response) => {
                    if (response instanceof NetworkResponse) {
                        item.status = "Cancelled"
                        setshouldRefresh(!shouldRefresh)
                    }
                })
                break;
            case "WithdrawHistory":
                ApiCalls.putWithdraw({ StatusId: WithdrawStatusEnum.Cancelled }, item.id).then((response) => {
                    console.log(response)
                    if (response instanceof NetworkResponse) {
                        item.status = "Cancelled"
                        setshouldRefresh(!shouldRefresh)
                    }
                })
                break;
            default:
                break;
        }

    }
    return (
        <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: index % 2 === 0 ? "#dfdfdf" : "#fff" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                {item.status === "Cancelled" ?
                    <Image source={require("../../../assets/images/icons/deposit_info_red.png")} style={{ height: 20, width: 20 }} />
                    :
                    <Image source={require("../../../assets/images/icons/deposit_info_green.png")} style={{ height: 20, width: 20 }} />
                }
                <Text style={{ fontSize: 8, textAlign: "center", marginTop: 5 }}>{localDate.date}{"\n"}{localDate.time}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 10, }}>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item.type}</Text>
                <Text style={{ fontSize: 9, color: Colors.common.gray }}>{item.status}</Text>
                <Text style={{ fontSize: 8, marginTop: 5, marginBottom: 5, }}>{localDate.date}{"  "}{localDate.time}</Text>

            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Text style={{ marginRight: 10, fontSize: 12, color: Colors.common.orangered, fontWeight: "bold", }}>+ {item.amount} $</Text>
                {
                    item.status === "Pending" ?
                        <Pressable onPress={cancelRequest}>
                            <Image source={require("../../../assets/images/icons/cancel.png")} style={{ tintColor: Colors.common.cancelGray, height: 15, width: 15 }} />
                        </Pressable> : null
                }

            </View>
        </View>
    )


};