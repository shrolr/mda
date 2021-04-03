import React from 'react'
import { FlatList, ListRenderItem, SafeAreaView, StatusBar, View } from 'react-native';
import { NavBar, TransactionsHistoryListItem } from '../../../components';
import { TopBar } from '../../../components/Organisms/TopBar';
import Colors from '../../../constants/Colors';
import { useStateContext } from '../../../context/state';
import { WalletTransactionApiModel } from '../../../models/ApiModels/Wallet/WalletInfoApiModel';
import { HomeStackNavProps } from '../HomeParamList';




export default function WalletInfoScreen({ navigation }: HomeStackNavProps<"WalletInfoScreen">) {
    const { context } = useStateContext()
    const _renderWalletTransactions: ListRenderItem<WalletTransactionApiModel> = ({ item, index }) => (
        <TransactionsHistoryListItem Type="WalletTransactionApiModel" item={item} index={index} />
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
                <NavBar   title="Cüzdan İşlemleri" />
                <View style={{ flex: 1}}>
                    <FlatList
                        contentContainerStyle={{paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}
                        data={context.walletInfo?.transactions}
                        renderItem={_renderWalletTransactions}
                        keyExtractor={(item) => item.id.toString()}

                    />


                </View>
             
            </View>
        </SafeAreaView>
    )
}
