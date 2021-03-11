import React from 'react'
import { View, Image } from 'react-native';
import Colors from '../constants/Colors';
import { Text } from './atomix';

interface IDepositsHistoryListItem {
    index: number;
}
// <Image source={require("../../assets/images/icons/deposit_info_red.png")}   style={{  height: 20, width: 20 }} />

export const DepositsHistoryListItem: React.FC<IDepositsHistoryListItem> = ({ index }) => {

    return (
        <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: index % 2 === 0 ? "#dfdfdf" : "#fff" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../assets/images/icons/deposit_info_green.png")}   style={{  height: 20, width: 20 }} />

                <Text style={{ fontSize: 8, textAlign: "center", marginTop: 5 }}>18-01-2021{"\n"}14:46:32 </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 10, }}>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>Cüzdandan Çekim</Text>
                <Text style={{ fontSize: 7, color: Colors.common.gray }}>Tamamlandı</Text>
                <Text style={{ marginTop: 5, fontSize: 8, color: Colors.common.gray }}>Cevap Yorumu: Roger That1</Text>
                <Text style={{ fontSize: 8, marginTop: 5 }}>18-01-2021 14:46:32 </Text>

            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Text style={{ marginRight: 10, fontSize: 12, color: Colors.common.orangered, fontWeight: "bold", }}>+ 1000 $</Text>
                <Image source={require("../../assets/images/icons/cancel.png")} resizeMode="contain" style={{ tintColor: Colors.common.cancelGray, height: 15, width: 15 }} />

            </View>
        </View>
    )


};