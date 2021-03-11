import React from 'react'
import { View, StatusBar } from 'react-native'
import { MenuCard, NavBar } from '../components'
import { Text } from '../components/atomix'
import { TopBar } from '../components/TopBar'
import Colors from '../constants/Colors'
import { DepositsStackNavProps } from '../Routes/DepositStackNavigator/DepositParamList'
import { Card } from 'native-base'


export default function DepositScreen({ navigation }: DepositsStackNavProps<"Deposits">) {

    const navigateToDepositsHistory = ( )=>{
        navigation.navigate("DepositsHistory")
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
                 <View style={{ flexDirection: "row", height: 100, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
                    <MenuCard imageUri={require("../../assets/images/icons/bank.png")} title="Para Yatırma" isTouchable={false}  />
                    <MenuCard imageUri={require("../../assets/images/icons/newdeposit.png")} title="Yeni Para Yatırma" isTouchable={true}  />
                    <MenuCard onMenuItemClick={navigateToDepositsHistory} imageUri={require("../../assets/images/icons/wall-clock.png")} title="Yatırım Geçmişi" isTouchable={true}  />
                </View>
                <Card style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:20, marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                    <Text>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                </Card>
         </View>
    )
}
