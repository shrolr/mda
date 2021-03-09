import { Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, FlatList, Share, View, TouchableOpacity } from 'react-native'
import { Coin } from '../models'
import { Alarm } from '../models/Alarm'
import { SettingsStackNavProps } from '../Routes/SettingsStackNavigator/SettingsParamList'


export default function SettingsScreen({ navigation, route }: SettingsStackNavProps<"Settings">) {
 
   

    return (
        <Text>Alarm screen</Text>
    )
}
