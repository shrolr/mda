import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "./HomeParamList";
import HomeScreen from "../../Screens/HomeScreen";
import WalletScreen from "../../Screens/WalletScreen";
import WalletInfoScreen from "../../Screens/WalletInfoScreen";

interface HomeStackProps { }

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0984e3',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',

        },
        title: "",
        headerBackTitle: "Geri"

      }}
      initialRouteName="Wallet">
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Wallet" component={WalletScreen} />
      <Stack.Screen options={{ headerShown: false }} name="WalletInfoScreen" component={WalletInfoScreen} />



    </Stack.Navigator>
  );
};
