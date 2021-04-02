import React, { useState } from 'react'
import { View, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import { NavBar } from '../../../components'
import { TopBar } from '../../../components/Organisms/TopBar'
import { DepositFromBank } from '../../../components/Templates'
import Colors from '../../../constants/Colors'
import { DepositsStackNavProps } from '../DepositParamList'


import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";
import { Locales } from '../../../enums'
export default function NewDepositScreen({ navigation }: DepositsStackNavProps<"NewDeposit">) {
    const { t, i18n } = useTranslation();


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
                <NavBar  ImageProp="new-deposit" title={t(Locales.Deposits + ":CREATEDEPOSIT")} />

                <ScrollView style={{ flex: 1 }}>

                    <DepositFromBank t={t} navigation={navigation} />

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
