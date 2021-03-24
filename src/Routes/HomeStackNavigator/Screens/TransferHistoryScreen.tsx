import React, { useEffect, useState } from 'react'
import { View, StatusBar, FlatList, ListRenderItem, SafeAreaView } from 'react-native'
import { NavBar, TransactionsHistoryListItem } from '../../../components'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import ApiCalls from '../../../network/ApiCalls'
import { TransferList, TransferListNetworkResponse } from '../../../models'
import { useStateContext } from '../../../context/state'
import { HomeStackNavProps } from '../HomeParamList'


export default function TransferHistoryScreen({ navigation }: HomeStackNavProps<"TransferHistory">) {
    const { context } = useStateContext()
    const [deposits, setdeposits] = useState<TransferList[]>()
    useEffect(() => {
        ApiCalls.getTransferList(context.user!.customerAccountInfo.id).then((response) => {
            if (response instanceof TransferListNetworkResponse) {
                setdeposits(response.data.payload)

            }
        })
    }, [])
    const _renderDepositHistory: ListRenderItem<TransferList> = ({ item, index }) => (
        <TransactionsHistoryListItem Type="TransferList" item={item} index={index} />
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
                <NavBar   ImageProp="history" title="Transfer Geçmişi" />
                <View style={{ flex: 1}}>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}
                        data={deposits}
                        renderItem={_renderDepositHistory}
                        keyExtractor={(item) => item.id.toString()}

                    />
                </View>
            </View>

        </SafeAreaView>
    )
}
