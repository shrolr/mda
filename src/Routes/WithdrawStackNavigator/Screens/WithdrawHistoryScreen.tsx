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
import { useTranslation } from 'react-i18next'
import { Locales } from '../../../enums'


export default function WithdrawHistoryScreen({ navigation }: WithdrawStackNavProps<"WithdrawHistory">) {
    const { t } = useTranslation();

    const { context } = useStateContext()
    const [withdraws, setwithdraws] = useState<WithdrawHistory[]>()
    useEffect(() => {
        ApiCalls.getUserWithdrawList(context.user!.customerAccountInfo.customerId).then((response) => {
            if (response instanceof WithdrawHistoryNetworkResponse) {
                setwithdraws(response.data.payload)

            }
        })
    }, [])
    const _renderDepositHistory: ListRenderItem<WithdrawHistory> = ({ item, index }) => (
        <TransactionsHistoryListItem Type="WithdrawHistory" item={item} index={index} />
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
                <NavBar  ImageProp="history" title={t(Locales.Withdraw + ":WITHDRAWHISTORY")}  />
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
