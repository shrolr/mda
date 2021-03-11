import React from 'react'
import { View  } from 'react-native';
import Colors from '../constants/Colors';
import { Text } from './atomix';

interface IWalletHistoryListItem {
    index: number;
}

export const WalletHistoryListItem: React.FC<IWalletHistoryListItem> = ({ index }) => {

    return (
        <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10,    backgroundColor: index % 2 === 0 ?  "#dfdfdf" : "#fff" }}>
            <View style={{justifyContent: "center", alignItems:"center"}}>
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor:Colors.common.orangered, height: 30, width: 30, borderRadius: 15 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: Colors.common.white }}>18</Text>
                </View>
                <Text style={{ fontSize: 8, textAlign: "center", marginTop: 5 }}>18-01-2021{"\n"}14:46:32 </Text>
            </View>
            <View style={{flex:1, justifyContent: "center", marginLeft: 10,  }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Cüzdandan Yatırma</Text>
                <Text style={{ fontSize: 10, color: Colors.common.gray }}>Tamamlandı</Text>
            </View>
            <View style={{ justifyContent: "center", }}>
                <Text style={{ fontSize: 16, color: Colors.common.orangered, fontWeight: "bold", }}>+ 1000 $</Text>
            </View>
        </View>
    )


};