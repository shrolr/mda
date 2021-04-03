import { Card, Icon } from 'native-base';
import React, { useState } from 'react'
import { TFunction } from 'react-i18next';
import { View, Text, Pressable } from 'react-native';

import Colors from '../constants/Colors'
import { Locales } from '../enums';
import { AccountGraphInfo } from '../models';
import LineChart from './LineChart';

interface IChartCard {
    accountGraph: AccountGraphInfo | undefined,
    t: TFunction<"translation">
}

export const ChartCard: React.FC<IChartCard> = ({ accountGraph, t }) => {

    const [ismt4Active, setismt4Active] = useState(true)
    const activatemt4 = () => {
        setismt4Active(true)
    }
    const activatemt5 = () => {
        setismt4Active(false)
    }
    return (

        <View style={{ backgroundColor: Colors.common.statusBarColor, paddingTop: 20, paddingLeft: 10, paddingBottom: 20, paddingRight: 10 }}>
            <Card style={{ borderRadius: 5, borderColor: Colors.common.statusBarColor, backgroundColor: Colors.common.chartBlackBg }}>
                <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 10 }}>
                    <Icon style={{ marginRight: 20, fontSize: 16, color: Colors.common.textOrange, alignSelf: "center" }} type="AntDesign" name="areachart" />
                    <View style={{ flex: 1, height: 30,   justifyContent: "center" }}>
                        <Text style={{ color: Colors.common.gray }}>{t(Locales.Accounts + ":TITLE")}</Text>
                    </View>
                    <Pressable onPress={activatemt4} style={{ alignSelf: "center", justifyContent: "center", width: 40, height: 30, }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 14, color: ismt4Active ? "white" : "gray" }} >4</Text>
                    </Pressable>
                    <Pressable onPress={activatemt5} style={{ alignItems: "center", justifyContent: "center", width: 40, height: 30 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 14, color: !ismt4Active ? "white" : "gray" }} >5</Text>
                    </Pressable>
                    <Icon style={{ marginRight: 10, fontSize: 16, color: "white", alignSelf: "center" }} type="Entypo" name="dots-three-vertical" />
                </View>
                <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 10 }}>
                    <Text style={{ fontSize: 13, color: Colors.common.white }}>{t(Locales.Accounts + ":WIDGETACCOUNTCOUNTERTITLE")}</Text>
                    <Text style={{ fontSize: 30, color: "white", fontWeight: "bold", }}>{ismt4Active ? accountGraph?.metaTrader4.freeMarginData : accountGraph?.metaTrader5.freeMarginData} $</Text>
                </View>
                <View style={{ marginBottom: -20, paddingLeft: 10, paddingRight: 10 }}>
                    <LineChart ismt4Active={ismt4Active} accountGraph={accountGraph} />
                </View>
            </Card>
        </View >
    )


};