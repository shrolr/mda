import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from "./AppParamList";
import { Image } from 'react-native'
import { HomeStack } from "../HomeStackNavigator/HomeStack";

import { Icon } from "native-base";
import { AccountStack } from "../AccountStackNavigator/AccountStack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SideBar } from "../../components";
import { DepositStack } from "../DepositStackNavigator/DepositStack";
 

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
            return <Image source={require("../../../assets/images/icons/home.png")}  resizeMode="contain" style={{tintColor:color, height: 25, width: 25 }} />

          }
          else if (route.name === "Hesaplarim") {
            return <Image source={require("../../../assets/images/icons/bank.png")}  resizeMode="contain" style={{tintColor:color, height: 25, width: 25 }} />

          }
          else if (route.name === "ParaCekme") {
            iconName = `comment`;
            IconType = "FontAwesome";
          }
          return <Image source={require("../../../assets/images/icons/deposit.png")}  resizeMode="contain" style={{tintColor:color, height: 25, width: 25 }} />

        },
        header: null,
      })}
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#737576',
        inactiveBackgroundColor: '#fff',
        activeBackgroundColor: '#f4f4f4',
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
        }
      }}
    >
      <Tabs.Screen name="AnaSayfa" component={HomeStack} />
      <Tabs.Screen name="Hesaplarim" component={AccountStack} />
      <Tabs.Screen name="ParaYatirma" component={DepositStack} />

    </Tabs.Navigator>
  )
}

export const AppTabs: React.FC<AppTabsProps> = ({ }) => {

  return (
    <>

      <Drawer.Navigator drawerStyle={{
        backgroundColor: 'transparent',
        width: 180,
      }} overlayColor="transparent" drawerContent={(props) => <SideBar />}>

        <Drawer.Screen name="Homex" component={AppTabNavigator} />

      </Drawer.Navigator>

    </>
  );
};
