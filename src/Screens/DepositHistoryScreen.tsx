import React from 'react'
import { View, StatusBar } from 'react-native'
import { NavBar } from '../components'
import { TopBar } from '../components/TopBar'
import Colors from '../constants/Colors'
import { DepositsStackNavProps } from '../Routes/DepositStackNavigator/DepositParamList'
import { DepositsHistoryListItem } from '../components/DepositsHistoryListItem'


export default function DepositHistoryScreen({ navigation }: DepositsStackNavProps<"DepositsHistory">) {

    const navigate = () => {
        navigation.navigate("Deposits")
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.common.statusBarColor}
                barStyle="light-content"
                showHideTransition="slide"
            />
            <TopBar />
            <NavBar name="wallet" type="Ionicons" title="Para Yatırma" />
            <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>

                <DepositsHistoryListItem index={0} />
                <DepositsHistoryListItem index={1} />
                <DepositsHistoryListItem index={2} />
            </View>
        </View>
    )
}
