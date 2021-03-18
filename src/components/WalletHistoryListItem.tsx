import React from 'react'
import { View  } from 'react-native';
import Colors from '../constants/Colors';
import { WalletTransactionApiModel } from '../models/ApiModels/Wallet/WalletInfoApiModel';
import { convertUTCDateToLocalDate } from '../utilities/functions';
import { Text } from './atomix';

interface IWalletHistoryListItem {
    index: number;
    item:WalletTransactionApiModel
}

export const WalletHistoryListItem: React.FC<IWalletHistoryListItem> = ({ index,item }) => {
    var localDate = convertUTCDateToLocalDate(new Date(item.createdDate))

    return (
        <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10,    backgroundColor: index % 2 === 0 ?  "#dfdfdf" : "#fff" }}>
            <View style={{justifyContent: "center", alignItems:"center"}}>
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor:Colors.common.orangered, height: 30, width: 30, borderRadius: 15 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: Colors.common.white }}>{item.id}</Text>
                </View>
                <Text style={{ fontSize: 8, textAlign: "center", marginTop: 5 }}>{localDate.date}{"\n"}{localDate.time} </Text>
            </View>
            <View style={{flex:1, justifyContent: "center", marginLeft: 10,  }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.type}</Text>
                <Text style={{ fontSize: 10, color: Colors.common.gray }}>{item.status}</Text>
            </View>
            <View style={{ justifyContent: "center", }}>
                <Text style={{ fontSize: 16, color: Colors.common.orangered, fontWeight: "bold", }}>+ {item.amount} $</Text>
            </View>
        </View>
    )


};