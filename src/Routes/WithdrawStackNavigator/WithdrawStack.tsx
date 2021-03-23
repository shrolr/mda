import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WithdrawParamList } from "./WithdrawParamList";
import WithdrawScreen from "./Screens/WithdrawScreen"; 
import WithdrawHistoryScreen from "./Screens/WithdrawHistoryScreen";
import NewWithdrawScreen from "./Screens/NewWithdrawScreen";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import AddNewBankAccountScreen from "../../Screens/AddNewBankAccountScreen";

interface WithdrawStackProps { }

const Stack = createNativeStackNavigator<WithdrawParamList>();

export const WithdrawStack: React.FC<WithdrawStackProps> = ({ }) => {
  return (
    <Stack.Navigator   initialRouteName="Withdraw">
      <Stack.Screen   options={{headerShown: false}} name="Withdraw" component={WithdrawScreen} />
      <Stack.Screen   options={{headerShown: false}} name="WithdrawHistory" component={WithdrawHistoryScreen} />
      <Stack.Screen   options={{headerShown: false}} name="NewWithdraw" component={NewWithdrawScreen} />
      <Stack.Screen   options={{headerShown: false}} name="AddNewBankAccountScreen" component={AddNewBankAccountScreen} />

      
    </Stack.Navigator>
  );
};
