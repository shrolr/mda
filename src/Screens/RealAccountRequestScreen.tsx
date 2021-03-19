import React, { useEffect, useState } from 'react'
import { StatusBar, View, SafeAreaView, FlatList, ListRenderItem } from 'react-native';
import { AccountRequestListItem, NavBar } from '../components';
import { TopBar } from '../components/Organisms/TopBar';
import Colors from '../constants/Colors';
import { useStateContext } from '../context/state';
import { AccountRequestListResponse  } from '../models';
import { AccountRequestList } from '../models/ApiModels/Account/AccountRequestListApiModel';
import ApiCalls from '../network/ApiCalls';
import { AccountStackNavProps } from '../Routes/AccountStackNavigator/AccountParamList';

export default function RealAccountRequestScreen({ navigation }: AccountStackNavProps<"RealAccountRequest">) {
    const { context } = useStateContext()

    const [accountRequests, setaccountRequests] = useState<AccountRequestList[]>()
    useEffect(() => {
        ApiCalls.getCustomerAccountRequests(5).then((response) => {
            if (response instanceof AccountRequestListResponse ) {



                setaccountRequests(response.data)
                console.log(response.data.length)
            }
        })
    }, [])
    const _renderDepositHistory: ListRenderItem<AccountRequestList> = ({ item, index }) => (
        <AccountRequestListItem item={item} index={index} />
    )

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
                <NavBar name="wallet" type="Ionicons" title="Gerçek Hesap Talebi" />
                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}
                        data={accountRequests}
                        renderItem={_renderDepositHistory}
                        keyExtractor={(item) => item.id.toString()}

                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
