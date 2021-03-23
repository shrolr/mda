import React, { useEffect, useState } from 'react'
import { View, StatusBar, SafeAreaView, FlatList, ListRenderItem } from 'react-native'
import { NavBar, TransactionsHistoryListItem } from '../../../components'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import { WithdrawStackNavProps } from '../WithdrawParamList'
import { useStateContext } from '../../../context/state'
import ApiCalls from '../../../network/ApiCalls'
import { WithdrawHistoryNetworkResponse } from '../../../models'
import { WithdrawHistory } from '../../../models/ApiModels/Withdraw/WithdrawHistory'


export default function WithdrawHistoryScreen({ navigation }: WithdrawStackNavProps<"WithdrawHistory">) {

    const { context } = useStateContext()
    const [withdraws, setwithdraws] = useState<WithdrawHistory[]>()
    useEffect(() => {
        ApiCalls.getUserWithdrawList(context.user!.customerInfo.id).then((response) => {
            if (response instanceof WithdrawHistoryNetworkResponse) {
                console.log(response.data.payload)
                setwithdraws(response.data.payload)

            }
        })
    }, [])
    const _renderDepositHistory: ListRenderItem<WithdrawHistory> = ({ item, index }) => (
        <TransactionsHistoryListItem item={item} index={index} />
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
                <NavBar name="wallet" type="Ionicons" title="Çekimler" />
                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}
                        data={withdraws}
                        renderItem={_renderDepositHistory}
                        keyExtractor={(item) => item.id.toString()}

                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
