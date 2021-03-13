import { Card, Icon, View } from "native-base";
import React, { useState } from "react";
import { ScrollView, StatusBar, Text } from "react-native";
import { ChartCard, GraphCard, MenuCard } from "../components";
import { TopBar } from "../components/TopBar";
import Colors from "../constants/Colors";
import { HomeStackNavProps } from "../Routes/HomeStackNavigator/HomeParamList";

function ProfileScreen({ navigation }: HomeStackNavProps<"ProfileScreen">) {

  const navigateToDepositsHistory = () => {
    navigation.navigate("Wallet")
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.common.statusBarColor}
        barStyle="light-content"
        showHideTransition="slide"
      />
      <TopBar />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", height: 84, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
          <MenuCard imageUri={require("../../assets/images/icons/wallet.png")} title="HESAP" isTouchable={false} />
          <MenuCard onMenuItemClick={navigateToDepositsHistory} imageUri={require("../../assets/images/icons/settings.png")} title="KİŞİSEL" isTouchable={true} />
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen;
