import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DepositsParamList } from "./DepositParamList";
import DepositScreen from "../../Screens/DepositScreen";
import DepositHistoryScreen from "../../Screens/DepositHistoryScreen";


interface DepositStackProps { }

const Stack = createStackNavigator<DepositsParamList>();

export const DepositStack: React.FC<DepositStackProps> = ({ }) => {
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
    }} initialRouteName="Deposits">
      <Stack.Screen   options={{headerShown: false}} name="Deposits" component={DepositScreen} />
      <Stack.Screen   options={{headerShown: false}} name="DepositsHistory" component={DepositHistoryScreen} />

    </Stack.Navigator>
  );
};
