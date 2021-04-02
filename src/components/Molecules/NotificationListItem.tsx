import React, { useState } from 'react'
import { View, Image, Pressable, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import { DepositStatusEnum } from '../../enums';
import { NetworkResponse } from '../../models';
import { NotificationApiModel } from '../../models/ApiModels/Notifications/NotificationApiModel';
import ApiCalls from '../../network/ApiCalls';
import { convertUTCDateToLocalDate } from '../../utilities/functions';
import { Text } from '../atom';

import { useTranslation } from 'react-i18next';
import i18n from "../../i18n";
interface INotificationListItem {
    index: number;
    item: NotificationApiModel;
}
// TO DO FİX dates
const initI18n = i18n;

export const NotificationListItem: React.FC<INotificationListItem> = ({ index, item }) => {
    const [shouldRefresh, setshouldRefresh] = useState(false)
    const { t, i18n } = useTranslation();

    var localDate = convertUTCDateToLocalDate(new Date(item.createdDate))

    return (
        <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: index % 2 === 0 ? "#dfdfdf" : "#fff" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                {
                    item.status === "NotRead" ?
                        <Image source={require("../../../assets/images/icons/not_readed.png")} style={{ height: 15, width: 15 }} />
                        :
                        <Image source={require("../../../assets/images/icons/readed.png")} style={{ height: 15, width: 15 }} />

                }

            </View>
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 10, }}>
                <Text style={{ fontSize: 12, color: "#27292A", fontWeight: "bold" }}>{i18n.t("Notification:" + item.messageType.toUpperCase())}  </Text>
                <Text style={{ fontSize: 8, }}>{localDate.date}{" "}{localDate.time}</Text>

            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Pressable  >
                    <Image source={require("../../../assets/images/icons/cancel.png")} style={{ tintColor: Colors.common.notificationCancel, height: 15, width: 15 }} />
                </Pressable>


            </View>
        </View>
    )


};