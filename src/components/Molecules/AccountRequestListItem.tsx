import React, { useState } from 'react'
import { View, Image, Pressable } from 'react-native';
import Colors from '../../constants/Colors';
import { useStateContext } from '../../context/state';
import { AccountRequestStatusEnum } from '../../enums';
import { NetworkResponse } from '../../models';
import { AccountRequestList } from '../../models/ApiModels/Account/AccountRequestListApiModel';
import ApiCalls from '../../network/ApiCalls';
import { PutAccountRequest } from '../../types/post/PutAccountRequest';
import { convertUTCDateToLocalDate } from '../../utilities/functions';
import { Text } from '../atom';

interface IAccountRequestListItem {
    index: number;
    item: AccountRequestList
}

// TO DO handle cancel request ,
export const AccountRequestListItem: React.FC<IAccountRequestListItem> = ({ index, item }) => {
    var localDate = convertUTCDateToLocalDate(new Date(item.createdDate))
    var updatedDateLocal = convertUTCDateToLocalDate(new Date(item.updatedDate || item.createdDate))

    const [updateView, setUpdateView] = useState(false);
    const { context } = useStateContext()
    const cancelRequest = () => {
        let Pending = AccountRequestStatusEnum.Pending;
        if (item.status === AccountRequestStatusEnum[Pending]) {
            let customerId = 2 // context.user!.customerAccountInfo.customerId;
            let putAccountRequest: PutAccountRequest = { customerId, statusId: AccountRequestStatusEnum.Cancelled }
            ApiCalls.putAccountRequest(putAccountRequest, item.id).then((response) => {
                if (response instanceof NetworkResponse) {
                    // to do show toast
                    item.status = AccountRequestStatusEnum[AccountRequestStatusEnum.Cancelled]
                    setUpdateView(!updateView)
                    console.log("status suc", putAccountRequest)
                }
                else {
                    // show error

                    console.log("error")
                }
            })
        }
    }
    return (
        <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: index % 2 === 0 ? "#dfdfdf" : "#fff" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../../assets/images/icons/deposit_info_green.png")} style={{ height: 20, width: 20 }} />

                <Text style={{ fontSize: 8, textAlign: "center", marginTop: 5 }}>{localDate.date}{"\n"}{localDate.time}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 10, }}>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>Acc req</Text>
                <Text style={{ fontSize: 9, color: Colors.common.gray }}>{item.status}</Text>
                <Text style={{ fontSize: 8, marginTop: 5, marginBottom: 5, }}>{updatedDateLocal.date}{"  "}{updatedDateLocal.time}</Text>

            </View>
            { item.status !== "Cancelled" &&
                <Pressable style={{ alignItems: "center", justifyContent: "center" }} onPress={cancelRequest}>
                    <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                        <Image source={require("../../../assets/images/icons/cancel.png")} resizeMode="contain" style={{ paddingLeft: 10, paddingRight: 10, tintColor: Colors.common.cancelGray, height: 15, width: 15 }} />

                    </View>
                </Pressable>
            }

        </View>
    )


};