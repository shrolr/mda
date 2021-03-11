import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountParamList } from "./AccountParamList";
import AccountScreen from "../../Screens/AccountScreen";


interface AccountStackProps { }

const Stack = createStackNavigator<AccountParamList>();

export const AccountStack: React.FC<AccountStackProps> = ({ }) => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#0984e3',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',

      },
      title: "Piyasalar",
      headerBackTitle: "Geri"
    }} initialRouteName="Account">
      <Stack.Screen options={{ headerShown: false }} name="Account" component={AccountScreen} />


    </Stack.Navigator>
  );
};
