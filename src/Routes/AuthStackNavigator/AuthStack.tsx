import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList } from "./AuthParamList";
import RegisterScreen from "../../Screens/RegisterScreen";
import LoignScreen from "../../Screens/LoginScreen";

interface AuthStackProps { }

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({ }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        options={{
          headerTitle: "Sign In",
        }}
        name="Login"
        component={LoignScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Register",
        }}
        name="Register"
        component={RegisterScreen}
      />
       
    </Stack.Navigator>
  );
};
