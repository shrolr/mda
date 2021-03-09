import React, { useState } from 'react'
import { Text } from 'react-native';
import { Coin } from '../models';
import { MarketStackNavProps } from '../Routes/VideoStackNavigator/MarketParamList';

export default function TransactionsHistoryScreen({ navigation }: MarketStackNavProps<"Market">) {

    const initPage = () => {
        fetchUserTranscationsHistory()
        fetchCanceledUserTranscationsHistory()
    }
    const fetchUserTranscationsHistory = () => {
    }
    const fetchCanceledUserTranscationsHistory = () => {
    }
    
    const showTranscationDetail = () => {

    }


    
    return (
        <Text>TransactionsHistoryScreen </Text>
    )
}
