import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DepositsParamList } from "./DepositParamList";
import DepositScreen from "./Screens/DepositScreen";
import DepositHistoryScreen from "./Screens/DepositHistoryScreen";
import NewDepositScreen from "./Screens/NewDepositScreen";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';


interface DepositStackProps { }

const Stack = createNativeStackNavigator<DepositsParamList>();

export const DepositStack: React.FC<DepositStackProps> = ({ }) => {
  return (
    <Stack.Navigator  initialRouteName="Deposits">
      <Stack.Screen   options={{headerShown: false}} name="Deposits" component={DepositScreen} />
      <Stack.Screen   options={{headerShown: false}} name="DepositsHistory" component={DepositHistoryScreen} />
      <Stack.Screen   options={{headerShown: false}} name="NewDeposit" component={NewDepositScreen} />

    </Stack.Navigator>
  );
};
