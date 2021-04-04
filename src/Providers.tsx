import React, { useEffect, useState } from "react";
import { Routes } from "./Routes";
import { StateProvider } from "./context/state";
import { Root, Spinner } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';
import * as SecureStore from 'expo-secure-store';


enableScreens();
interface ProvidersProps { }

export const Providers: React.FC<ProvidersProps> = ({ }) => {

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    loadFonts()

  }, [])


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
    <Root >
      <StateProvider >
        <Routes  />
      </StateProvider>
    </Root>
  );
};
