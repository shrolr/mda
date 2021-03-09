import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "./HomeParamList";
import HomeScreen from "../../Screens/HomeScreen";

interface HomeStackProps { }

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0984e3',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',

        },
        title:"",
        headerBackTitle: "Geri"
        
      }}
      initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
    

    </Stack.Navigator>
  );
};
