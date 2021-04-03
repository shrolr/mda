import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList } from "./AuthParamList";
import RegisterScreen from "../../Screens/RegisterScreen";
import LoignScreen from "../../Screens/LoginScreen";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

interface AuthStackProps { }

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({ }) => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      stackAnimation: "none",
    }}
      mode="modal"
      initialRouteName="Login"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoignScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}

        name="Register"
        component={RegisterScreen}
      />

    </Stack.Navigator>
  );
};
