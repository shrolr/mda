import React, { useState } from 'react'
import { View, Image, Pressable, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import { DepositStatusEnum } from '../../enums';
import { NetworkResponse } from '../../models';
import { NotificationApiModel } from '../../models/ApiModels/Notifications/NotificationApiModel';
import ApiCalls from '../../network/ApiCalls';
import { convertUTCDateToLocalDate } from '../../utilities/functions';
import { Text } from '../atom';

interface INotificationListItem {
    index: number;
    item: NotificationApiModel;
}
// TO DO FİX dates

export const NotificationListItem: React.FC<INotificationListItem> = ({ index, item }) => {
    const [shouldRefresh, setshouldRefresh] = useState(false)

    var localDate = convertUTCDateToLocalDate(new Date(item.createdDate))


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
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item.type}</Text>
                <Text style={{ fontSize: 7, color: Colors.common.gray }}>{item.status}</Text>
                <Text style={{ marginTop: 5, fontSize: 8, color: Colors.common.gray }}>{item.messageType}</Text>
                <Text style={{ fontSize: 8, marginTop: 5 }}>{localDate.date}{" "}{localDate.time}</Text>

            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Pressable >
                    <Image source={require("../../../assets/images/icons/cancel.png")} style={{ tintColor: Colors.common.cancelGray, height: 15, width: 15 }} />
                </Pressable>


            </View>
        </View>
    )


};