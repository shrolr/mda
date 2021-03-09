import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MarketParamList } from "./MarketParamList";
import MarketScreen from "../../Screens/MarketScreen";


interface MarketStackProps { }

const Stack = createStackNavigator<MarketParamList>();

export const MarketStack: React.FC<MarketStackProps> = ({ }) => {
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
    }} initialRouteName="Market">
      <Stack.Screen name="Market" component={MarketScreen} />


    </Stack.Navigator>
  );
};
