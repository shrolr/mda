import React from 'react'
import { View } from 'react-native'
import { BarChart } from 'react-native-svg-charts'


interface IBarChartVerticalWithLabels {
   color:string
}

export const BarChartVerticalWithLabels: React.FC<IBarChartVerticalWithLabels> = ({ color }) => {
    const data = [5, 15, 20, 19, 15, 10]

    return (
        <View style={{ flexDirection: 'row', marginTop: 30, height: 50, width: 150 }}>
            <BarChart
                style={{ flex: 1 }}
                data={data}
                svg={{ fill: color }}
                contentInset={{ top: 10, bottom: 10, left: 10, right: 10, }}
                spacingInner={0.3}
                spacingOuter={0.2}
                gridMin={0}
            >

            </BarChart>
        </View>
    )


};

