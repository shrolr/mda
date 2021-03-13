import { Card, Icon, View } from "native-base";
import React, { useState } from "react";
import { ScrollView, StatusBar, Text, Image, ImageBackground } from "react-native";
import { AccountInfo, ChartCard, GraphCard, MenuCard, NavBar, PersonalInfo } from "../components";
import { TopBar } from "../components/TopBar";
import Colors from "../constants/Colors";
import { Tabs } from "../enums";
import { HomeStackNavProps } from "../Routes/HomeStackNavigator/HomeParamList";

function ProfileScreen({ navigation }: HomeStackNavProps<"ProfileScreen">) {
  const [tabState, setTabState] = useState<Tabs>(Tabs.PersonalInfo)
  const switchToPersonalInfoTab = () => {
    setTabState(Tabs.PersonalInfo)
  }
  const switchToAccountInfoTab = () => {
    setTabState(Tabs.AccountInfo)
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
      <NavBar name="wallet" type="Ionicons" title="Profil" />

      <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", height: 84, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
          <MenuCard onMenuItemClick={switchToAccountInfoTab} shouldNavigate={false} isActive={tabState === Tabs.AccountInfo} imageUri={require("../../assets/images/icons/wallet.png")} title="HESAP BİLGİLERİ" isTouchable={false} />
          <MenuCard onMenuItemClick={switchToPersonalInfoTab} shouldNavigate={false} isActive={tabState === Tabs.PersonalInfo} imageUri={require("../../assets/images/icons/settings.png")} title="KİŞİSEL BİLGİLER" isTouchable={true} />
        </View>
        {
          tabState === Tabs.AccountInfo && <AccountInfo />
        }
        {
          tabState === Tabs.PersonalInfo && <PersonalInfo />
        }

      </ScrollView>
    </View>
  )
}

export default ProfileScreen;
