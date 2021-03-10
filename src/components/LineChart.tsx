import React from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import Colors from '../constants/Colors'

class LineChart extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, 0, 24, 85, 91, 35, 53, 53, 24, 50, 0, 80 ]

        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ Colors.common.textOrange }
                    fill={ 'white' }
                />
            ))
        }

        const Line = ({ line }) => (
            <Path
                d={ line }
                stroke={  Colors.common.textOrange }
                fill={ 'none' }
            />
        )

        return (
            <AreaChart
                style={{ height: 200,  }}
                data={ data }
                svg={{ fill: 'rgba(240, 147, 69, 0.1)' }}
                contentInset={{ top: 20, bottom: 30 }}
            >
                <Line/>
                <Decorator/>
            </AreaChart>
        )
    }

}

export default LineChart