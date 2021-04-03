import { Toast } from 'native-base';
import React, { useState } from 'react'
import { TFunction } from 'react-i18next';
import { View, Image, Pressable, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import { DepositStatusEnum, Locales } from '../../enums';
import { DepositHistory, NetworkResponse } from '../../models';
import ApiCalls from '../../network/ApiCalls';
import { convertUTCDateToLocalDate } from '../../utilities/functions';
import { Text } from '../atom';

interface IDepositsHistoryListItem {
    index: number;
    item: DepositHistory;
    t: TFunction<"translation">
}
 
export const DepositsHistoryListItem: React.FC<IDepositsHistoryListItem> = ({ t, index, item }) => {
    const [shouldRefresh, setshouldRefresh] = useState(false)

    var localDate = convertUTCDateToLocalDate(new Date(item.createdDate))
    const cancelRequest = () => {
        onConfirmCancelRequest()
    }
    const onConfirmCancelRequest = () => {
        ApiCalls.putDeposit({ StatusId: DepositStatusEnum.Cancelled }, item.id).then((response) => {
            if (response instanceof NetworkResponse) {
                item.status = "Cancelled"
                setshouldRefresh(!shouldRefresh)
                Toast.show({ text: t(Locales.Toast + ":PUTDEPOSITSUCCESS"), buttonText: 'Ok', type: "success", })

            }
            else{
                Toast.show({ text: t(Locales.Toast + ":PUTDEPOSITFAILED"), buttonText: 'Ok', type: "success", })

            }
        })



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
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>{t(Locales.Deposits + ":" + item.type.toUpperCase())}</Text>
                <Text style={{ fontSize: 7, color: Colors.common.gray }}>{t(Locales.Deposits + ":" + item.status.toUpperCase())}</Text>
                {
                    item.responseComment && <Text style={{ marginTop: 5, fontSize: 8, color: Colors.common.gray }}>{t(Locales.Deposits + ":RESPONSECOMMENT")} : {item.responseComment}</Text>
                }
                <Text style={{ fontSize: 8, marginTop: 5 }}>{localDate.date}{" "}{localDate.time}</Text>

            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Text style={{ marginRight: 10, fontSize: 12, color: Colors.common.orangered, fontWeight: "bold", }}>+ {item.amount} $</Text>
                {
                    item.status === "Pending" ?
                        <Pressable style={{ padding:5}} onPress={cancelRequest}>
                            <Image source={require("../../../assets/images/icons/cancel.png")} style={{ tintColor: Colors.common.cancelGray, height: 15, width: 15 }} />
                        </Pressable> : null
                }

            </View>
        </View>
    )


};