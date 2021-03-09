import {  Text,  } from 'native-base';
import React, { useState } from 'react'
import { View } from 'react-native';

import { AuthNavProps } from '../Routes/AuthStackNavigator/AuthParamList';



export default function RegisterScreen({ navigation }: AuthNavProps<"Register">) {
 
    return (

        <View style={{ justifyContent: "center", alignContent: "center", flex: 1 }}>
           
                    <Text>Regiaaster</Text>
           
        </View>

    )
}
