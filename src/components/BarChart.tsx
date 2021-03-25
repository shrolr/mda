import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { BarChart } from 'react-native-svg-charts'
import { TransactionGraphInfo } from '../models/ApiModels/Wallet/WalletInfoApiModel';
import { Text } from './atom';
import { Text as TextSvg } from 'react-native-svg'
import { WithdrawGraphInfo } from '../models';
import { convertUTCDateToLocalDate } from '../utilities/functions';


interface IBarChartVerticalWithLabels {
    color: string,
    colorActive: string,
    transactionGraphInfo?: TransactionGraphInfo | WithdrawGraphInfo
}
interface BarChartData {
    y: number
    svg: {
        onPressIn: () => void;
        onPressOut: () => void;
        fill: string;

    };

}


export const BarChartVerticalWithLabels: React.FC<IBarChartVerticalWithLabels> = ({ transactionGraphInfo, color, colorActive }) => {
    const [graphData, setgraphData] = useState<BarChartData[]>([])
    const [selectedItem, setselectedItem] = useState<number | null>(null)

    useEffect(() => {

        mapData()

    }, [transactionGraphInfo])
    useEffect(() => {
        mapData()
    }, [selectedItem])

    const convertToLocalTime = () => {
        if (typeof selectedItem === "number" && transactionGraphInfo) {

            try {
                let localDate =  convertUTCDateToLocalDate(new Date(transactionGraphInfo.labels[selectedItem]))
                return localDate.date + " " + localDate.time
            } catch (error) {

            }
            return transactionGraphInfo.labels[selectedItem]
        }
        return ""
    }
    const ChartIndicator = () => {
        if (typeof selectedItem === "number" && transactionGraphInfo) {
            return (
                <View style={{ alignSelf: "flex-end", marginTop: 0, justifyContent: "center", height: 25, paddingLeft: 10, paddingRight: 10, backgroundColor: "#191919", }}>
                    <Text style={{ fontSize: 6, color: "white", fontWeight: "bold" }}>{convertToLocalTime()}</Text>
                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <View style={{ marginRight: 3, width: 6, height: 5, backgroundColor: color }} />
                        <Text style={{ fontSize: 6, color: "white" }}>Miktar:{transactionGraphInfo.data[selectedItem]}</Text>
                    </View>
                </View>
            )
        }
        return null
    }
    const mapData = () => {
        if (transactionGraphInfo) {
            let arrayData: number[] = [];
            Object.assign(arrayData, transactionGraphInfo.data)
            if (arrayData.length > 0) {
                let startVal = arrayData[0]
                for (let index = 1; index < arrayData.length; index++) {
                    arrayData[index] = startVal + arrayData[index];
                }
                const barChartData = arrayData.map(
                    (item, index) => ({
                        y: item,
                        svg: {
                            onPressIn: () => {
                                setselectedItem(index)
                            },
                            onPressOut: () => {
                                setselectedItem(null)

                            },

                            fill: selectedItem === index ? colorActive : color,
                        }

                    })
                );
                setgraphData(barChartData)
            }
        }
    }

    const findWitdh = () => {
        let count = graphData.length;
        let width = 0;
        if (count < 7) {
            width = 20 * count;
        }
        else {
            width = 150;
        }
        return width + 20
    }

    return (
        <View>
            <ChartIndicator />

            <View style={{ flexDirection: 'row', marginTop: 30, height: 50, width: findWitdh() }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={graphData}
                    yAccessor={({ item }) => item.y}
                    contentInset={{ top: 10, bottom: 10, left: 10, right: 10, }}
                    spacingInner={0.3}
                    spacingOuter={0.2}
                    gridMin={0}

                >

                </BarChart>

            </View>
        </View>

    )


};

