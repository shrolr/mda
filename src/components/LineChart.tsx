import React, { useEffect, useState } from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import Colors from '../constants/Colors'
import { AccountGraphInfo } from '../models'



interface ILineChart {
    accountGraph: AccountGraphInfo | undefined
    ismt4Active: boolean
}

export const LineChart: React.FC<ILineChart> = ({ ismt4Active, accountGraph }) => {
    const [graphData, setgraphData] = useState<number[]>([])
    useEffect(() => {
        let arrayData: number[] = [];
        if (ismt4Active) {
            Object.assign(arrayData, accountGraph?.metaTrader4.balanceData)
        }
        else {
            Object.assign(arrayData, accountGraph?.metaTrader5.balanceData)
        }
        while (arrayData.length < 15) {
            arrayData.push(0)
        }
        setgraphData(arrayData)
        console.log(arrayData)
    }, [accountGraph, ismt4Active])

    const Decorator = ({ x, y, data }) => {
        return data.map((value, index) => (
            <Circle
                key={index}
                cx={x(index)}
                cy={y(value)}
                r={4}
                strokeWidth={1.5}
                stroke={"#F9E45C"}
                fill={'transparent'}
            />
        ))
    }

    const Line = ({ line }) => (
        <Path
            strokeWidth={2}
            d={line}
            stroke={"#F9E45C"}
            fill={'none'}
        />
    )

    return (
        <AreaChart
            style={{ height: 200, }}
            data={graphData}
            svg={{ fill: '#7F7741' }}
            contentInset={{ left: 5, top: 10, bottom: 30, right: 5, }}
        >
            <Line />
            <Decorator />
        </AreaChart>
    )


}

export default LineChart