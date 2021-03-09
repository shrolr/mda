import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsParamList } from "./SettingsParamList";
import SettingsScreen from "../../Screens/SettingsScreen";


interface SettingsStackProps { }

const Stack = createStackNavigator<SettingsParamList>();

export const SettingsStack: React.FC<SettingsStackProps> = ({ }) => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#0984e3',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',

      },
      title: "",
      headerBackTitle: "Geri"
    }} initialRouteName="Settings">
      <Stack.Screen options={{title:"Ayarlar"}} name="Settings" component={SettingsScreen} />
  

    </Stack.Navigator>
  );
};
