import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "./HomeParamList";
import HomeScreen from "./Screens/HomeScreen";
import WalletScreen from "./Screens/WalletScreen";
import WalletInfoScreen from "./Screens/WalletInfoScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import TransferScreen from "./Screens/TransferScreen";
import NewTransferScreen from "./Screens/NewTransferScreen";
import TransferHistoryScreen from "./Screens/TransferHistoryScreen";
import NotificationScreen from "./Screens/NotificationScreen";

interface HomeStackProps { }

const Stack = createNativeStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
  return (
    <Stack.Navigator
       
      initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Wallet" component={WalletScreen} />
      <Stack.Screen options={{ headerShown: false }} name="WalletInfoScreen" component={WalletInfoScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen options={{ headerShown: false }} name="NewTransfer" component={NewTransferScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Transfer" component={TransferScreen} />
      <Stack.Screen options={{ headerShown: false }} name="TransferHistory" component={TransferHistoryScreen} />
      <Stack.Screen options={{ headerShown: false }} name="NotificationScreen" component={NotificationScreen} />



    </Stack.Navigator>
  );
};
