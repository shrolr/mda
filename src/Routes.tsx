import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppTabs } from "./Routes/AppTabNavigator/AppTabs";
import { AuthStack } from "./Routes/AuthStackNavigator/AuthStack";
import { useStateContext } from "./context/state";

import * as SecureStore from 'expo-secure-store';
import { ActionType } from "./context/reducer";
import { Spinner } from "native-base";
import { IUserResponse } from "./interfaces";
import ApiCalls from "./network/ApiCalls";
import { LoginNetworkResponse } from "./models";


interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({ }) => {
  const { context, dispatch } = useStateContext();
  const [loading, setloading] = useState(true)
  useEffect(() => {
    loginWithToken()
  }, [])
  const loginWithToken = async () => {
    let result = await SecureStore.getItemAsync("auth");
    setloading(false)
    if (result) {
      let user: IUserResponse = JSON.parse(result)
      await ApiCalls.setToken(user.token) 
      ApiCalls.getUserInfoWithToken().then((response)=> {
        if(response instanceof LoginNetworkResponse ){
          dispatch!({ type: ActionType.SIGN_IN, payload: { user: response.data } })
        }
      })
      
    }
  }
  if (loading) {
    return <Spinner style={{ flex: 1 }} />
  }
  return (
    <NavigationContainer >
      { context.isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
