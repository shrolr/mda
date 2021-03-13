import React from 'react'
import { View, StatusBar } from 'react-native'
import { NavBar } from '../components'
import { TopBar } from '../components/TopBar'
import Colors from '../constants/Colors'
import { DepositsHistoryListItem } from '../components/DepositsHistoryListItem'
import { WithdrawStackNavProps } from '../Routes/WithdrawStackNavigator/WithdrawParamList'


export default function WithdrawHistoryScreen({ navigation }: WithdrawStackNavProps<"WithdrawHistory">) {
 

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.common.statusBarColor}
                barStyle="light-content"
                showHideTransition="slide"
            />
            <TopBar />
            <NavBar name="wallet" type="Ionicons" title="Çekimler" />
            <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>

                <DepositsHistoryListItem index={0} />
                <DepositsHistoryListItem index={1} />
                <DepositsHistoryListItem index={2} />
            </View>
        </View>
    )
}
