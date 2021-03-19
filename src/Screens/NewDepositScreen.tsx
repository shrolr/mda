import React, { useState } from 'react'
import { View, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import {  NavBar } from '../components'
import { TopBar } from '../components/Organisms/TopBar'
import Colors from '../constants/Colors'
import { DepositsStackNavProps } from '../Routes/DepositStackNavigator/DepositParamList'


export default function NewDepositScreen({ navigation }: DepositsStackNavProps<"NewDeposit">) {

   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.common.statusBarColor }}>
            <View style={{ flex: 1, backgroundColor: Colors.common.backgroundLightWhite }}>

                <StatusBar
                    animated={true}
                    backgroundColor={Colors.common.statusBarColor}
                    barStyle="light-content"
                    showHideTransition="slide"
                />
                <TopBar />
                <NavBar name="wallet" type="Ionicons" title="Yeni Para Yatırma" />

                <ScrollView style={{ flex: 1 }}>

                   
                 
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
