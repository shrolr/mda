import { Card, Icon, View } from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StatusBar, Text, Image, ImageBackground, SafeAreaView } from "react-native";
import { AccountInfo, ChartCard, GraphCard, MenuCard, NavBar, PersonalInfo } from "../../../components";
import { TopBar } from "../../../components/Organisms/TopBar";
import Colors from "../../../constants/Colors";
import { ActionType } from "../../../context/reducer";
import { useStateContext } from "../../../context/state";
import { Locales, Tabs } from "../../../enums";
import { LoginNetworkResponse } from "../../../models";
import ApiCalls from "../../../network/ApiCalls";
import { HomeStackNavProps } from "../HomeParamList";

function ProfileScreen({ navigation }: HomeStackNavProps<"ProfileScreen">) {
  const [tabState, setTabState] = useState<Tabs>(Tabs.AccountInfo)
  const { t } = useTranslation();
  const { dispatch } = useStateContext();
  const switchToPersonalInfoTab = () => {
    setTabState(Tabs.PersonalInfo)
  }
  const switchToAccountInfoTab = () => {
    setTabState(Tabs.AccountInfo)
  }
  const updateUserInfo = () => {
    ApiCalls.getUserInfoWithToken().then((response) => {
      if (response instanceof LoginNetworkResponse) {
        dispatch!({ type: ActionType.SIGN_IN, payload: { user: response.data } })
      }
    })

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.common.statusBarColor }}>
      <View style={{ flex: 1, backgroundColor: Colors.common.white }}>


        <StatusBar
          animated={true}
          backgroundColor={Colors.common.statusBarColor}
          barStyle="light-content"
          showHideTransition="slide"
        />
        <TopBar />
        <NavBar ImageProp="profile" title={t(Locales.Profile + ":TITLE")} />

        <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", height: 84, paddingLeft: 20, marginTop: 20, paddingRight: 20 }}>
            <MenuCard onMenuItemClick={switchToAccountInfoTab} shouldNavigate={false} isActive={tabState === Tabs.AccountInfo} imageUri={require("../../../../assets/images/icons/wallet.png")} title={t(Locales.Profile + ":USERACCOUNTDETAILS")} isTouchable={false} />
            <MenuCard onMenuItemClick={switchToPersonalInfoTab} shouldNavigate={false} isActive={tabState === Tabs.PersonalInfo} imageUri={require("../../../../assets/images/icons/settings.png")} title={t(Locales.Profile + ":CUSTOMERINFODETAILS")} isTouchable={true} />
          </View>
          {
            tabState === Tabs.AccountInfo && <AccountInfo updateUserInfo={updateUserInfo} t={t} />
          }
          {
            tabState === Tabs.PersonalInfo && <PersonalInfo updateUserInfo={updateUserInfo} t={t} />
          }

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen;
