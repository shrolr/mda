import React from 'react'
import { View, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import { MenuCard, NavBar } from '../../../components'
import { Text } from '../../../components/atom'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import { DepositsStackNavProps } from '../DepositParamList'
import { Card } from 'native-base'
import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";
import { Locales } from '../../../enums'
export default function DepositScreen({ navigation }: DepositsStackNavProps<"Deposits">) {
    const { t } = useTranslation();

    const navigateToDepositsHistory = () => {
        navigation.navigate("DepositsHistory")
    }

    const navigateToNewDepositScreen = () => {
        navigation.navigate("NewDeposit")
    }
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
                <NavBar ImageProp="BarChart" title={t(Locales.Deposits + ":TITLE")} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", height: 84, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
                        <MenuCard shouldNavigate imageUri={require("../../../../assets/images/icons/bank.png")} title={t(Locales.Deposits + ":TITLE")} isTouchable={false} />
                        <MenuCard shouldNavigate onMenuItemClick={navigateToNewDepositScreen} imageUri={require("../../../../assets/images/icons/newdeposit.png")} title={t(Locales.Deposits + ":CREATEDEPOSIT")} isTouchable={true} />
                        <MenuCard shouldNavigate onMenuItemClick={navigateToDepositsHistory} imageUri={require("../../../../assets/images/icons/wall-clock.png")} title={t(Locales.Deposits + ":DEPOSITHISTORY")} isTouchable={true} />
                    </View>
                    <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
                        <Text>
                            {t(Locales.Deposits + ":DEPOSITINFOTEXT1")}
                            {"\n"}{"\n"}
                            {t(Locales.Deposits + ":DEPOSITINFOTEXT2")}
                            {"\n"}{"\n"}
                            {t(Locales.Deposits + ":DEPOSITINFOTEXT3")}
                            {"\n"}{"\n"}
                            {t(Locales.Deposits + ":DEPOSITINFOTEXT4")}

                        </Text>
                    </Card>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
