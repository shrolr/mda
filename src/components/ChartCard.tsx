import { Card, Icon } from 'native-base';
import React from 'react'
import { View, Text } from 'react-native';

import Colors from '../constants/Colors'
import { AccountGraphInfo } from '../models';
import LineChart from './LineChart';

interface IChartCard {
    accountGraph: AccountGraphInfo | undefined
}

export const ChartCard: React.FC<IChartCard> = ({accountGraph }) => {


    return (

        <View style={{ backgroundColor: Colors.common.statusBarColor, paddingTop: 20, paddingLeft: 10, paddingBottom: 20, paddingRight: 10 }}>
            <Card style={{ borderRadius: 5, borderColor: Colors.common.statusBarColor, backgroundColor: Colors.common.chartBlackBg }}>
                <View style={{ flexDirection: "row", paddingTop: 20, paddingBottom: 10, paddingLeft: 20, paddingRight: 10 }}>
                    <Icon style={{ marginRight: 20, fontSize: 16, color: Colors.common.textOrange, alignSelf: "center" }} type="AntDesign" name="areachart" />
                    <Text style={{ flex: 1, color: Colors.common.gray }}>Hesaplar</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 14, color: "gray", marginRight: 20 }} >GERÇEK</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 14, color: "white", marginRight: 20 }} >Demo</Text>
                    <Icon style={{ marginRight: 10, fontSize: 16, color: "white", alignSelf: "center" }} type="Entypo" name="dots-three-vertical" />
                </View>
                <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 10 }}>
                    <Text style={{ fontSize: 13, color: Colors.common.white }}>Aylık Free marjin toplamı</Text>
                    <Text style={{ fontSize: 30, color: "white", fontWeight: "bold", }}>{accountGraph?.metaTrader4.balanceData} $</Text>
                </View>
                <View style={{ marginBottom: -20, paddingLeft: 10, paddingRight: 10 }}>
                    <LineChart accountGraph={accountGraph} />
                </View>
            </Card>
        </View>
    )


};