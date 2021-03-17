import React, { useEffect, useState } from 'react'
import { View, StatusBar, FlatList, ListRenderItem } from 'react-native'
import { NavBar } from '../components'
import { TopBar } from '../components/TopBar'
import Colors from '../constants/Colors'
import { DepositsStackNavProps } from '../Routes/DepositStackNavigator/DepositParamList'
import { DepositsHistoryListItem } from '../components/DepositsHistoryListItem'
import ApiCalls from '../network/ApiCalls'
import { TransferList, TransferListNetworkResponse } from '../models'
import { useStateContext } from '../context/state'


export default function DepositHistoryScreen({ navigation }: DepositsStackNavProps<"DepositsHistory">) {
    const { context } = useStateContext()
    const [deposits, setdeposits] = useState<TransferList[]>()
    useEffect(() => {
        ApiCalls.getTransferList(context.user!.customerAccountInfo.id).then((response) => {
            if (response instanceof TransferListNetworkResponse) {
                setdeposits(response.data.payload)

            }
        })
    }, [])
    const _renderDepositHistory: ListRenderItem<TransferList> = ({ item,index }) => (
        <DepositsHistoryListItem item={item} index={index}  />
    )
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.common.statusBarColor}
                barStyle="light-content"
                showHideTransition="slide"
            />
            <TopBar />
            <NavBar name="wallet" type="Ionicons" title="Transfer Geçmişi" />
            <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                <FlatList

                    data={deposits}
                    renderItem={_renderDepositHistory}
                    keyExtractor={(item) => item.id.toString()}

                />

                
            </View>
        </View>
    )
}
