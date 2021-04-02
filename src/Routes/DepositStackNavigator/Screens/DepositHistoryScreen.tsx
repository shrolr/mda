import React, { useEffect, useState } from 'react'
import { View, StatusBar, FlatList, ListRenderItem, SafeAreaView } from 'react-native'
import { NavBar } from '../../../components'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import { DepositsStackNavProps } from '../DepositParamList'
import { DepositsHistoryListItem } from '../../../components/Molecules/DepositsHistoryListItem'
import ApiCalls from '../../../network/ApiCalls'
import { DepositHistoryNetworkResponse,   DepositHistory  } from '../../../models'
import { useStateContext } from '../../../context/state'


import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";
import { Locales } from '../../../enums'
 export default function DepositHistoryScreen({ navigation }: DepositsStackNavProps<"DepositsHistory">) {
    const { t, i18n } = useTranslation();

    const { context } = useStateContext()
    const [deposits, setdeposits] = useState<DepositHistory[]>()
    useEffect(() => {
        ApiCalls.getUserDepositList(context.user!.customerAccountInfo.customerId).then((response) => {
            if (response instanceof DepositHistoryNetworkResponse) {
                setdeposits(response.data.payload)

            }
        })
    }, [])
    const _renderDepositHistory: ListRenderItem<DepositHistory> = ({ item, index }) => (
        <DepositsHistoryListItem t={t} item={item} index={index} />
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
                <NavBar  ImageProp="history" title={t(Locales.Deposits + ":DEPOSITHISTORY")}/>
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
