import { Button, Toast } from 'native-base';
import React, { useEffect, useState } from 'react'
import { StatusBar, View, SafeAreaView, FlatList, ListRenderItem } from 'react-native';
import { AccountRequestListItem, NavBar } from '../../../components';
import { Text } from '../../../components/atom';
import { TopBar } from '../../../components/Organisms/TopBar';
import Colors from '../../../constants/Colors';
import { useStateContext } from '../../../context/state';
import { AccountRequestListResponse, NetworkResponse } from '../../../models';
import { AccountRequestList } from '../../../models/ApiModels/Account/AccountRequestListApiModel';
import ApiCalls from '../../../network/ApiCalls';
import { PostAccountRequest } from '../../../types/post';
import { AccountStackNavProps } from '../AccountParamList';
// TO DO CHECK REAL ACCOUNT REQUEST BUTTONS ACTIVE OR DISABLED 


import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";
import { Locales } from '../../../enums';
const throttle = require('lodash.throttle');

export default function RealAccountRequestScreen({ navigation }: AccountStackNavProps<"RealAccountRequest">) {
    const { context } = useStateContext()
    const { t, i18n } = useTranslation();

    const [accountRequests, setaccountRequests] = useState<AccountRequestList[]>()
    useEffect(() => {
        fetchUserAccountRequests()
    }, [])
    const fetchUserAccountRequests = () => {
        ApiCalls.getCustomerAccountRequests(context.user!.customerAccountInfo.customerId).then((response) => {
            if (response instanceof AccountRequestListResponse) {
                 setaccountRequests(response.data)
            } 
        })
    }
    const _renderAccountRequestHistory: ListRenderItem<AccountRequestList> = ({ item, index }) => (
        <AccountRequestListItem fetchUserAccountRequests={fetchUserAccountRequests}  t={t} item={item} index={index} />
    )

    const onRealAccountRequestThrottleFunction = () => {
        let postAccountRequest: PostAccountRequest = { customerId: context.user!.customerAccountInfo.customerId }
        ApiCalls.postAccountRequest(postAccountRequest).then((response)=>{
            if (response instanceof NetworkResponse) {
                Toast.show({ text: t(Locales.Toast + ":POSTACCOUNTREQUESTSUCCESS"), buttonText: 'Ok', type: "success", })
                fetchUserAccountRequests()
            } else {
                Toast.show({ text: t(Locales.Toast + ":POSTACCOUNTREQUESTFAILED"), buttonText: 'Ok', type: "warning", })

            }
        })
    }
    let onRealAccountRequest = throttle(onRealAccountRequestThrottleFunction, 2000)

    const checkDisabledStatus = () => {
        let status = false;
        accountRequests?.map((val) => {

            if (val.status === "Pending") {
                status = true
                return
            }
        })
        return status
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.common.statusBarColor }}>
            <View style={{ flex: 1, backgroundColor: Colors.common.white }}>

                <StatusBar
                    animated={true}
                    backgroundColor={Colors.common.statusBarColor}
                    barStyle="light-content"
                    showHideTransition="slide"
                />
                <TopBar />
                <NavBar ImageProp="analytics" title={t(Locales.Accounts + ":ACCOUNTREQUEST")} />
                <View style={{ flex: 1 }}>

                    <Button disabled={checkDisabledStatus()} onPress={onRealAccountRequest} style={{ borderRadius: 5, height: 50, marginLeft: 20, marginRight: 20, marginBottom: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}> {t(Locales.Accounts + ":REQUESTNEWACCOUNT")} </Text>

                    </Button>
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}
                        data={accountRequests}
                        renderItem={_renderAccountRequestHistory}
                        keyExtractor={(item) => item.id.toString()}

                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
