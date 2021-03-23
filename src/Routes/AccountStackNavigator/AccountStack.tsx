import React from "react";
import { AccountParamList } from "./AccountParamList";
import AccountScreen from "./Screens/AccountScreen";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import RealAccountRequestScreen from "./Screens/RealAccountRequestScreen";


interface AccountStackProps { }

const Stack = createNativeStackNavigator<AccountParamList>();

export const AccountStack: React.FC<AccountStackProps> = ({ }) => {
  return (
    <Stack.Navigator  initialRouteName="Account">
      <Stack.Screen options={{ headerShown: false }} name="Account" component={AccountScreen} />
      <Stack.Screen options={{ headerShown: false }} name="RealAccountRequest" component={RealAccountRequestScreen} />


    </Stack.Navigator>
  );
};
