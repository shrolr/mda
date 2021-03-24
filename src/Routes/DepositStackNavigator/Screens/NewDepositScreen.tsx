import React, { useState } from 'react'
import { View, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import { NavBar } from '../../../components'
import { TopBar } from '../../../components/Organisms/TopBar'
import { DepositFromBank } from '../../../components/Templates'
import Colors from '../../../constants/Colors'
import { DepositsStackNavProps } from '../DepositParamList'


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
                <NavBar  ImageProp="new-deposit" title="Yeni Para Yatırma" />

                <ScrollView style={{ flex: 1 }}>

                    <DepositFromBank navigation={navigation} />

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
