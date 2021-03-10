import React from 'react'
import { StatusBar, View } from 'react-native';
import { NavBar, WalletHistoryListItem } from '../components';
import { TopBar } from '../components/TopBar';
import Colors from '../constants/Colors';
import { HomeStackNavProps } from '../Routes/HomeStackNavigator/HomeParamList';




export default function WalletInfoScreen({ navigation }: HomeStackNavProps<"WalletInfoScreen">) {



    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.common.statusBarColor}
                barStyle="light-content"
                showHideTransition="slide"
            />
            <TopBar />
            <NavBar name="gear" type="FontAwesome" title="Cüzdan İşlemleri" />
            <View style={{ flex: 1,paddingLeft:20,paddingRight:20,paddingTop:20 }}>
            <WalletHistoryListItem index={0} />
            <WalletHistoryListItem index={1} />
            <WalletHistoryListItem index={2} />
            <WalletHistoryListItem index={3} />

            </View>
        </View>
    )
}
