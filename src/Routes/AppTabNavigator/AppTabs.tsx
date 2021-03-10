import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from "./AppParamList";

import { HomeStack } from "../HomeStackNavigator/HomeStack";

import { Icon } from "native-base";
import { MarketStack } from "../VideoStackNavigator/MarketStack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SideBar } from "../../components";
import { SettingsStack } from "../SettingsStackNavigator/SettingsStack";

interface AppTabsProps { }

const Tabs = createBottomTabNavigator<AppParamList>();
const Drawer = createDrawerNavigator();

type IconTypes = "Entypo" | "AntDesign" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial" | undefined


const AppTabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({

        tabBarIcon: ({ color }) => {
          let IconComponent = Icon;
          let iconName;
          let IconType: IconTypes = "Entypo"
          if (route.name === "AnaSayfa") {
            iconName = `home`;
            IconType = "FontAwesome";
          }
          else if (route.name === "Hesaplarim") {
            iconName = `line-chart`;
            IconType = "FontAwesome";
          }
          else if (route.name === "ParaCekme") {
            iconName = `comment`;
            IconType = "FontAwesome";
          }
          return <IconComponent type={IconType} name={iconName} style={{ fontSize: 25, marginTop: 5, color: color }} />;

        },
        header: null,
      })}
      tabBarOptions={{
        activeTintColor: '#008ccc',
        inactiveTintColor: 'gray',
        inactiveBackgroundColor: '#fff',
        activeBackgroundColor: '#fff',
        style: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
        }
      }}
    >
      <Tabs.Screen name="AnaSayfa" component={HomeStack} />
      <Tabs.Screen name="Hesaplarim" component={MarketStack} />
      <Tabs.Screen name="ParaCekme" component={SettingsStack} />

    </Tabs.Navigator>
  )
}

export const AppTabs: React.FC<AppTabsProps> = ({ }) => {

  return (
    <Drawer.Navigator drawerStyle={{
      backgroundColor: 'transparent',
      width: 180,
    }} overlayColor="transparent" drawerContent={(props) => <SideBar />}>
      <Drawer.Screen name="Homex" component={AppTabNavigator} />

    </Drawer.Navigator>
  );
};
