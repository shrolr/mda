import React from 'react'
import { StyleProp, Text as RNTEXT, TextStyle } from 'react-native';

interface IText {
    style?: StyleProp<TextStyle>
}

export const Text: React.FC<IText> = ({ style,children }) => {
 
    return <RNTEXT style={[{fontFamily:"Roboto"},style]}>{children}</RNTEXT>

};