import React, { useState } from 'react'
import { View, Image, LayoutAnimation, Platform, UIManager, Pressable, ImageBackground } from 'react-native';
import { Badge, Icon } from 'native-base';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useIsDrawerOpen } from '@react-navigation/drawer'
import { Text } from '../atom';
import { AppTabs } from '../../enums';
import { useStateContext } from '../../context/state';
import { ActionType } from '../../context/reducer';
import { useTranslation } from 'react-i18next';
import i18n from "../../i18n";
import * as SecureStore from 'expo-secure-store';
import { downloadMetaTrader } from '../../utilities/functions';
interface ITopBar {

}
 
export const TopBar: React.FC<ITopBar> = () => {
    const { t, i18n } = useTranslation();

    const { context, dispatch } = useStateContext()
    const navigation = useNavigation();
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    const isOpen: boolean = useIsDrawerOpen()
    const toggleNavigation = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        navigation.dispatch(DrawerActions.toggleDrawer())
    }
    const navigateToNotification = () => {

        navigation.navigate(AppTabs.AnaSayfa, { screen: "NotificationScreen" });
    }
    const changeLocale = () => {
        if (context.locale === "en") {
            dispatch!({ type: ActionType.SET_LOCALE, payload: { locale: "tr" } })
            i18n.changeLanguage("tr")
            SecureStore.setItemAsync("locale", JSON.stringify({locale:"tr"}))
        }
        else {
            dispatch!({ type: ActionType.SET_LOCALE, payload: { locale: "en" } })
            i18n.changeLanguage("en")
            SecureStore.setItemAsync("locale", JSON.stringify({locale:"en"}))
        }
    }
    
    return (
        <View>
            <View style={{ height: 15, backgroundColor: Colors.common.statusBarColor }} />
            <View style={{ paddingRight: 20, height: 55, flexDirection: "row", backgroundColor: Colors.common.white }}>

                <View style={{ justifyContent: "center", width: 60, backgroundColor: Colors.common.menuBackgroundColor }}>
                    <TouchableWithoutFeedback onPress={toggleNavigation}>
                        {
                            isOpen ?
                                <Icon style={{ color: "white", alignSelf: "center" }} type="FontAwesome" name="close" /> :
                                <Icon style={{ color: "white", alignSelf: "center" }} type="Entypo" name="menu" />

                        }


                    </TouchableWithoutFeedback>
                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Image source={require("../../../assets/images/icons/logo.png")} style={{ marginLeft: 10, height: 35, width: 100 }} />
                </View>
                <Pressable onPress={downloadMetaTrader} style={{ marginLeft: 5, alignSelf: "center", justifyContent: "center", backgroundColor: Colors.common.white, }}>
                    <Image source={require("../../../assets/images/icons/download_orange.png")} style={{ height: 22, width: 22 }} />
                </Pressable>
                <Pressable onPress={navigateToNotification} style={{ marginLeft: 5, alignSelf: "center", justifyContent: "center", backgroundColor: Colors.common.white, }}>
                    <ImageBackground source={require("../../../assets/images/icons/bell.png")} style={{ paddingLeft: 12, paddingTop: 10, marginLeft: 5, height: 20, width: 18 }}>
                        {

                            (typeof context.notifications?.count === 'number') && (context.notifications?.count) > 0 && <View>
                                <View style={{ width: 15, height: 15, justifyContent: "center", backgroundColor: "red", borderRadius: 7.5, alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 8 }}>{context.notifications?.count}</Text>
                                </View>
                            </View>
                        }

                    </ImageBackground>
                </Pressable>
                <Pressable onPress={changeLocale} style={{ marginLeft: 15, flexDirection: "row", alignSelf: "center", justifyContent: "center", backgroundColor: Colors.common.white, }}>
                    {context.locale === "en" ?
                        <Image source={require("../../../assets/images/icons/flag_uk.png")} style={{ marginRight: 5, height: 20, width: 20 }} />
                        :
                        <Image source={require("../../../assets/images/icons/flag_tr.png")} style={{ marginRight: 5, height: 20, width: 20 }} />

                    }
                    <View style={{ width: 20 }}>
                        <Text>{context.locale.toUpperCase()}</Text>
                    </View>
                </Pressable>
            </View>
        </View>

    )


};