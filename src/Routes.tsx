import React  from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppTabs } from "./Routes/AppTabNavigator/AppTabs";
import { AuthStack } from "./Routes/AuthStackNavigator/AuthStack";
import { useStateContext } from "./context/state";


interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({ }) => {
  const { context } = useStateContext();

  const  isAuthenticated  = context.isAuthenticated;
  return (
    <NavigationContainer>
      { isAuthenticated  ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
