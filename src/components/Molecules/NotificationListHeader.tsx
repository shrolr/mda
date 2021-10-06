import React, { useState } from 'react'
import { View, Image, Pressable, Alert } from 'react-native';
import Colors from '../../constants/Colors';

import { convertUTCDateToLocalDate } from '../../utilities/functions';
import { Text } from '../atom';

import { useTranslation } from 'react-i18next';
import i18n from "../../i18n";
import ApiCalls from '../../network/ApiCalls';
import { useStateContext } from '../../context/state';
import { NotificationNetworkResponse } from '../../models';
import { ActionType } from '../../context/reducer';
interface INotificationListHeader {

}
const initI18n = i18n;

export const NotificationListHeader: React.FC<INotificationListHeader> = () => {
    const { t, i18n } = useTranslation();
    const { context, dispatch } = useStateContext()
    const removeUnreadNotifications = () => {
        let ids: number[] = [];
        context.notifications?.notifications.map((notification) => ids.push(notification.id))
        if (ids.length > 0) {
            ApiCalls.updateNotificationListStatus(context.user!.customerAccountInfo.customerId, { ids, statusId: 2 }).then(() => fetchNotifications())
        }
    }

    const fetchNotifications = () => {
        ApiCalls.getNotificationInfo(context.user!.customerAccountInfo.customerId).then((response) => {
            if (response instanceof NotificationNetworkResponse) {

                let notifications = response.data;

                dispatch!({ type: ActionType.SET_NOTIFICATIONS, payload: { notifications } })

            }
        })

    }
    return (
        <View style={{ borderBottomColor: "#efefef", borderBottomWidth: 1, marginBottom: 5, flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: "#fff" }}>
            <View style={{ flex: 1 }} />

            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Pressable onPress={removeUnreadNotifications}  >
                    <Image source={require("../../../assets/images/icons/delete.png")} style={{ tintColor: Colors.common.orangered, height: 20, width: 15.6 }} />
                </Pressable>


            </View>
        </View>
    )


};