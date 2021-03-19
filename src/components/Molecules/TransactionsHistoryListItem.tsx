import React from 'react'
import { View, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { TransferList } from '../../models';
import { WalletTransactionApiModel } from '../../models/ApiModels/Wallet/WalletInfoApiModel';
import { WithdrawHistory } from '../../models/ApiModels/Withdraw/WithdrawHistory';
import { convertUTCDateToLocalDate } from '../../utilities/functions';
import { Text } from '../atom';

interface ITransactionsHistoryListItem {
    index: number;
    item: WithdrawHistory | WalletTransactionApiModel | TransferList 
}


export const TransactionsHistoryListItem: React.FC<ITransactionsHistoryListItem> = ({ index, item }) => {
    var localDate = convertUTCDateToLocalDate(new Date(item.createdDate))
  
    return (
        <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: index % 2 === 0 ? "#dfdfdf" : "#fff" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../../assets/images/icons/deposit_info_green.png")} style={{ height: 20, width: 20 }} />

                <Text style={{ fontSize: 8, textAlign: "center", marginTop: 5 }}>{localDate.date}{"\n"}{localDate.time}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 10, }}>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item.type}</Text>
                <Text style={{ fontSize: 9, color: Colors.common.gray }}>{item.status}</Text>
                <Text style={{ fontSize: 8, marginTop: 5, marginBottom: 5, }}>{localDate.date}{"  "}{localDate.time}</Text>

            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Text style={{ marginRight: 10, fontSize: 12, color: Colors.common.orangered, fontWeight: "bold", }}>+ {item.amount} $</Text>
                <Image source={require("../../../assets/images/icons/cancel.png")} resizeMode="contain" style={{ tintColor: Colors.common.cancelGray, height: 15, width: 15 }} />

            </View>
        </View>
    )


};