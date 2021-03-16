import { Card, Icon, View } from "native-base";
import React, { useState } from "react";
import { ScrollView, StatusBar, Text } from "react-native";
import { ChartCard, GraphCard } from "../components";
import { TopBar } from "../components/TopBar";
import Colors from "../constants/Colors";
import { HomeStackNavProps } from "../Routes/HomeStackNavigator/HomeParamList";
import { TestComponent } from "../test";

function HomeScreen({ navigation }: HomeStackNavProps<"Home">) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.common.statusBarColor}
        barStyle="light-content"
        showHideTransition="slide"
      />
      <TopBar />
      <TestComponent />
      <ScrollView style={{flex:1}}>
        <ChartCard />
        <GraphCard title="Cüzdan" color={Colors.common.cardHeader} />
        <GraphCard title="Yatırımlar" color={Colors.common.cardHeaderAlt} />
        <GraphCard title="Çekimler" color={Colors.common.cardHeaderAlt2} />
      </ScrollView>
    </View>
  )
}

export default HomeScreen;
