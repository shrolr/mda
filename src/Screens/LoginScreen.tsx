import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, StatusBar, Pressable } from 'react-native'
import Colors from '../constants/Colors';
import { Button, CheckBox, Input, Item, Toast } from 'native-base';

import { AuthNavProps } from '../Routes/AuthStackNavigator/AuthParamList';
import ApiCalls from '../network/ApiCalls';
import { LoginRequest } from '../types/post/LoginRequest';
import { NetworkResponse, NetworkResponseFail } from '../models';
import { useStateContext } from '../context/state';
import { ActionType } from '../context/reducer';
import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';
import { Locales } from '../enums';

// TO DO CHANGE LOGO URL SOURCE IMPORTANT
// UPDATE NATIVEBASE
export default function LoignScreen({ navigation }: AuthNavProps<"Login">) {
  const { t } = useTranslation();
  const [forgotPassword, setforgotPassword] = useState(false)
  const [rememberMe, setrememberMe] = useState(false)
  const [INVALIDMEAIL, setINVALIDMEAIL] = useState(false)
  const [INVLADPASSOWRD, setINVLADPASSOWRD] = useState(false)
  const [resetPassword, setresetPassword] = useState("")
  const [state, setstate] = useState({} as LoginRequest)
  const { dispatch } = useStateContext();
  const onChangeText = (identifier: string) => {
    setstate({ identifier, password: state.password })
  }
  const navigateToRegister = () => {
    navigation.navigate("Register")
  }

  const onForgotInputChange = (email: string) => {
    setresetPassword(email)
  }
  const onPasswordChange = (password: string) => {
    setstate({ identifier: state.identifier, password })
  }
  const onLoginPress = async () => {
    setINVALIDMEAIL(false)
    setINVLADPASSOWRD(false)
    ApiCalls.login(state).then((response) => {
      if (response instanceof NetworkResponseFail) {
        // show error
        setINVALIDMEAIL(true)
        setINVLADPASSOWRD(true)
      }
      else {
        if (response.data.isAuthenticated) {
          if (rememberMe) {
            SecureStore.setItemAsync("auth", JSON.stringify(response.data))
          }
          dispatch!({ type: ActionType.SIGN_IN, payload: { user: response.data } })
        }

      }
    })
  }
  const onForgotPasswordPress = () => {
    if (resetPassword.length < 4) {
      Toast.show({ text: t(Locales.Login + ":EMAILLENGTHVALIDATIONERROR"), buttonText: 'Ok', type: "warning", })
      return
    }
    ApiCalls.resetPassword("https://albaclient.com", resetPassword).then((response) => {
      if (response instanceof NetworkResponse) {
        Toast.show({ text: t(Locales.Login + ":SUCCESSSUBMITINFO"), buttonText: 'Ok', type: "success", })
      }
      else {
        Toast.show({ text: t(Locales.Login + ":WRONGEMAILERROR"), buttonText: 'Ok', type: "warning", })
      }
    })
  }
  const renderLogin = () => {
    return (
      <>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>{t(Locales.Login + ":LOGINBUTTON")}</Text>
        <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 30 }} rounded>
          <Input autoCapitalize="none" autoCorrect={false} keyboardType="email-address" onChangeText={onChangeText} placeholder={t(Locales.Login + ":EMAILLABEL")} />
        </Item>
        {
          INVALIDMEAIL && <Text style={{ paddingLeft: 10, color: Colors.common.fontOrangeRed, marginTop: 5 }}>{t(Locales.Login + ":INVALIDEMAILERROR")}</Text>
        }
        <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
          <Input onChangeText={onPasswordChange} secureTextEntry placeholder={t(Locales.Login + ":PASSWORDLABEL")} />
        </Item>
        {
          INVLADPASSOWRD && <Text style={{ paddingLeft: 10, color: Colors.common.fontOrangeRed, marginTop: 5 }}>{t(Locales.Login + ":INVALIDPASSWORDERROR")}</Text>
        }
        <View style={{ marginTop: 30, marginBottom: 30, flexDirection: "row" }}>
          <CheckBox onPress={() => setrememberMe(!rememberMe)} checked={rememberMe} />
          <Pressable onPress={() => setrememberMe(!rememberMe)}>
            <Text style={{ marginLeft: 20, color: Colors.common.lightBlue }}>{t(Locales.Login + ":REMEMBERME")}</Text>
          </Pressable>
          <Pressable onPress={() => setforgotPassword(true)} style={{ flex: 1, }}>
            <Text style={{ flex: 1, textAlign: "right", color: Colors.common.textOrange }}>{t(Locales.Login + ":FORGOTPASSWORD")}</Text>
          </Pressable>
        </View>
        <Button onPress={onLoginPress} style={{ borderRadius: 10, backgroundColor: Colors.common.loginButton }} full>
          <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 16 }}>{t(Locales.Login + ":LOGINBUTTON")}</Text>
        </Button>
        <Pressable onPress={navigateToRegister} style={{marginTop:20}}>
          <Text style={{   textAlign: "center", color: Colors.common.textOrange }}>{t(Locales.Login + ":REGISTER")}</Text>
        </Pressable>

      </>
    )
  }
  const renderForgotPassword = () => {
    return (
      <>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>{t(Locales.Login + ":FORGOTPASSWORD")}</Text>
        <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 30 }} rounded>
          <Input autoCapitalize="none" autoCorrect={false} keyboardType="email-address" onChangeText={onForgotInputChange} placeholder={t(Locales.Login + ":EMAILLABEL")} />
        </Item>


        <Button onPress={onForgotPasswordPress} style={{ marginTop: 20, borderRadius: 10, backgroundColor: Colors.common.loginButton }} full>
          <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 16 }}>{t(Locales.Accounts + ":SUBMIT")}</Text>
        </Button>
        <Pressable onPress={() => setforgotPassword(false)} style={{ marginTop: 20, }}  >
          <Text style={{ textAlign: "center", color: Colors.common.fontOrangeRed, fontWeight: "bold", fontSize: 16 }}>{t(Locales.Accounts + ":GOBACK")}</Text>
        </Pressable>
      </>
    )
  }
  return (
    <View style={{ justifyContent: "center", flex: 1 }}>

      <StatusBar
        animated={true}
        backgroundColor={Colors.common.buttonOrange}
        barStyle="light-content"
        showHideTransition="slide"
      />
      <ImageBackground style={{ flex: 1, justifyContent: "center" }} source={require("../../assets/images/icons/login_bg.png")}>

        <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 30, paddingTop: 50, backgroundColor: Colors.light.background, borderRadius: 10, marginLeft: 20, marginRight: 20 }}>
          <View>
            <Image source={{ uri: "https://i.hizliresim.com/TtqzTs.png" }} style={{ alignSelf: "center", height: 60, width: 153 }} />
          </View>
          <View style={{ height: 0.5, marginTop: 30, marginBottom: 30, backgroundColor: Colors.common.gray }} />
          {forgotPassword ? renderForgotPassword() : renderLogin()}
        </View>
      </ImageBackground>

    </View>
  )
}
