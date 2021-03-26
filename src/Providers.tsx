import React, { useEffect, useState } from "react";
import { Routes } from "./Routes";
import { StateProvider } from "./context/state";
import { Root, Spinner } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';
import i18n from 'i18n-js';
import NotificationLocaleEn from "./i18n/notifications/en";
import NotificationLocaleTr from "./i18n/notifications/tr";

enableScreens();
interface ProvidersProps { }

export const Providers: React.FC<ProvidersProps> = ({ }) => {

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    loadFonts()
    loadLocale()

  }, [])


const loadLocale = () => {
    i18n.translations = {
        en:NotificationLocaleEn,
        tr:NotificationLocaleTr,
    }
    i18n.locale = "tr"
}
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setLoading(false);
  }
  if (loading) {
    return <Spinner />
  }
  return (
    <Root>
      <StateProvider>
        <Routes />
      </StateProvider>
    </Root>
  );
};
