import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppTabs } from "./Routes/AppTabNavigator/AppTabs";
import { AuthStack } from "./Routes/AuthStackNavigator/AuthStack";
import { useStateContext } from "./context/state";

import * as SecureStore from 'expo-secure-store';
import { ActionType } from "./context/reducer";
import { Spinner } from "native-base";


interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({ }) => {
  const { context ,dispatch} = useStateContext();
  const [loading, setloading] = useState(true)
  useEffect(() => {
    loginWithToken()
  }, [])
  const loginWithToken = async () => {
    let result = await SecureStore.getItemAsync("auth");
    setloading(false)
    if (result) {
      dispatch!({ type: ActionType.SIGN_IN, payload: { user: JSON.parse(result) } })
    }  
  }
  if (loading) {
    return <Spinner style={{flex:1}} />
  }
  const isAuthenticated = context.isAuthenticated;
  return (
    <NavigationContainer>
      { isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
