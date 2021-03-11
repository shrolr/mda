import React, { useState } from 'react'
import { Text } from 'react-native';
import { Coin } from '../models';
import { AccountStackNavProps } from '../Routes/AccountStackNavigator/AccountParamList';

export default function TransactionsHistoryScreen({ navigation }: AccountStackNavProps<"Account">) {

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
