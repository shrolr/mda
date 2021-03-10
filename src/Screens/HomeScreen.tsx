import { View } from "native-base";
import React, { useState } from "react";
import { StatusBar, Text } from "react-native";
import { TopBar } from "../components/TopBar";
import Colors from "../constants/Colors";
import { HomeStackNavProps } from "../Routes/HomeStackNavigator/HomeParamList";


function HomeScreen({ navigation }: HomeStackNavProps<"Home">) {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor={Colors.common.statusBarColor}
        barStyle="light-content"
        showHideTransition="slide"
      />
      <TopBar />
      <Text>Home</Text>

    </View>
  )
}

export default HomeScreen;
