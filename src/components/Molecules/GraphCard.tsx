
import React from 'react'
import { View, Image } from 'react-native';
import { Card, Icon } from 'native-base';
import Colors from '../../constants/Colors';
import { BarChartVerticalWithLabels } from '../BarChart';
import { Text } from '../atom';
import { TransactionGraphInfo } from '../../models/ApiModels/Wallet/WalletInfoApiModel';
import { WithdrawGraphInfo } from '../../models';
import { TFunction } from 'react-i18next';
import { Locales } from '../../enums';

interface IGraphCard {
    color: string;
    title: string;
    balance: number;
    t: TFunction<"translation">;
    colorActive: string;
    TransactionGraphInfo: TransactionGraphInfo | undefined | WithdrawGraphInfo
}
export const GraphCard: React.FC<IGraphCard> = ({ t, colorActive, color, title, TransactionGraphInfo, balance }) => {
    return (
        <Card style={{ height: 184, marginLeft: 10, marginTop: 15, marginRight: 10, borderRadius: 10, overflow: "hidden" }}>
            <View style={{ paddingLeft: 20, height: 40, backgroundColor: colorActive, alignItems: "center", flexDirection: "row" }}>
                <Image resizeMode="contain" style={{ height: 20, width: 20, marginRight: 5 }} source={require("../../../assets/images/icons/chart-rising.png")} />
                <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 18 }}>{title}</Text>
                <Icon style={{ marginRight: 10, fontSize: 16, color: "white", alignSelf: "center" }} type="Entypo" name="dots-three-vertical" />
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, flexDirection: "row" }}>
                <View style={{ flex: 1, marginTop: 0, }}>
                    <Text style={{ fontSize: 13, color: Colors.common.gray }}>{t(Locales.Accounts + ":WIDGETWALLETCOUNTERTITLE")}</Text>
                    <Text style={{ fontSize: 30, fontWeight: "bold", }}>{balance} $</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <BarChartVerticalWithLabels transactionGraphInfo={TransactionGraphInfo} colorActive={colorActive} color={color} />
                </View>
            </View>
        </Card>
    )


};