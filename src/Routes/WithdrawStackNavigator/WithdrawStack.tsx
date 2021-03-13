import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WithdrawParamList } from "./WithdrawParamList";
import WithdrawScreen from "../../Screens/WithdrawScreen"; 
import WithdrawHistoryScreen from "../../Screens/WithdrawHistoryScreen";
import NewWithdrawScreen from "../../Screens/NewWithdrawScreen";

interface WithdrawStackProps { }

const Stack = createStackNavigator<WithdrawParamList>();

export const WithdrawStack: React.FC<WithdrawStackProps> = ({ }) => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#0984e3',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',

      },
      title: "",
      headerBackTitle: "Geri"
    }} initialRouteName="Withdraw">
      <Stack.Screen   options={{headerShown: false}} name="Withdraw" component={WithdrawScreen} />
      <Stack.Screen   options={{headerShown: false}} name="WithdrawHistory" component={WithdrawHistoryScreen} />
      <Stack.Screen   options={{headerShown: false}} name="NewWithdraw" component={NewWithdrawScreen} />


    </Stack.Navigator>
  );
};
