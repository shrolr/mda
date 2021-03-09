import React  from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppTabs } from "./Routes/AppTabNavigator/AppTabs";
import { AuthStack } from "./Routes/AuthStackNavigator/AuthStack";


interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({ }) => {
  const  isAuthenticated  = false;
  return (
    <NavigationContainer>
      { isAuthenticated  ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
