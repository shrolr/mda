import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "./HomeParamList";
import HomeScreen from "../../Screens/HomeScreen";
import WalletScreen from "../../Screens/WalletScreen";
import WalletInfoScreen from "../../Screens/WalletInfoScreen";
import ProfileScreen from "../../Screens/ProfileScreen";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

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



    </Stack.Navigator>
  );
};
