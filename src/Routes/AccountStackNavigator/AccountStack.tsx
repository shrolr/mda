import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountParamList } from "./AccountParamList";
import AccountScreen from "../../Screens/AccountScreen";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';


interface AccountStackProps { }

const Stack = createNativeStackNavigator<AccountParamList>();

export const AccountStack: React.FC<AccountStackProps> = ({ }) => {
  return (
    <Stack.Navigator  initialRouteName="Account">
      <Stack.Screen options={{ headerShown: false }} name="Account" component={AccountScreen} />


    </Stack.Navigator>
  );
};
