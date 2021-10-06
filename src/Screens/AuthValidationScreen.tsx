import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, StatusBar, Pressable } from 'react-native'
import Colors from '../constants/Colors';
import { Button, CheckBox, Input, Item, Toast } from 'native-base';

import { AuthNavProps } from '../Routes/AuthStackNavigator/AuthParamList';
import ApiCalls from '../network/ApiCalls';
import { useStateContext } from '../context/state';

import { useTranslation } from 'react-i18next';
import { Locales } from '../enums';
import { NetworkResponseFail } from '../models';

// TO DO CHANGE LOGO URL SOURCE IMPORTANT
// UPDATE NATIVEBASE
export default function AuthValidationScreen({ navigation, route }: AuthNavProps<"Validation">) {
  const { t } = useTranslation();

  const { dispatch } = useStateContext();
  const [verificationCodeSended, setverificationCodeSended] = useState(false)
  const [verificationString, setverificationString] = useState("")
  useEffect(() => {
    SendVerificationCodeRequest()
  }, [])
  const verificationInputChange = (text: string) => {
    setverificationString(text)
  }
  const SendVerificationCodeRequest = async () => {
    ApiCalls.requestVerification({ identifier: route.params.identifier })
    Toast.show({ text: t(Locales.Validation + ":VERIFICATIONINFO"), buttonText: 'Ok', type: "success", })
    setverificationCodeSended(true)

  }

  const confirmValidationCode = async () => {
    setverificationCodeSended(true)

    ApiCalls.verifyUser({ verificationString }).then((response) => {
      if (response instanceof NetworkResponseFail) {
        Toast.show({ text: t(Locales.Validation + ":WRONGVALIDATIONCODE"), buttonText: 'Ok', type: "danger", })
      }
      else {
        Toast.show({ text: t(Locales.Validation + ":VALIDATIONSUCCESS"), buttonText: 'Ok', type: "success", })
        navigation.navigate("Login")
      }
    }).catch((error) => {
      Toast.show({ text: t(Locales.Validation + ":WRONGVALIDATIONCODE"), buttonText: 'Ok', type: "danger", })

    })

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
            <Image source={require("./../../assets/images/icons/logo.png")} style={{ alignSelf: "center", height: 60, width: 153 }} />
          </View>
          <View style={{ height: 0.5, marginTop: 30, marginBottom: 30, backgroundColor: Colors.common.gray }} />
          <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>{t(Locales.Validation + ":TITLE")}</Text>
          {verificationCodeSended && <Text style={{ textAlign: "center", fontSize: 12, marginTop: 5 }}>{t(Locales.Validation + ":VERIFICATIONINFO")}</Text>}
          {verificationCodeSended && <Pressable onPress={SendVerificationCodeRequest}><Text style={{ textAlign: "center", fontSize: 12, marginTop: 5, color: Colors.common.orangered }}>{t(Locales.Validation + ":RESETVERIFICATION")}</Text></Pressable>}

          <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 30 }} rounded>
            <Input autoCapitalize="none" autoCorrect={false} keyboardType="email-address" onChangeText={verificationInputChange} placeholder={t(Locales.Validation + ":VERIFICATIONCODE")} />
          </Item>


          <Button onPress={confirmValidationCode} style={{ marginTop: 20, borderRadius: 10, backgroundColor: Colors.common.loginButton }} full>
            <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 16 }}>{t(Locales.Accounts + ":SUBMIT")}</Text>
          </Button>
          <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20, }}  >
            <Text style={{ textAlign: "center", color: Colors.common.fontOrangeRed, fontWeight: "bold", fontSize: 16 }}>{t(Locales.Accounts + ":GOBACK")}</Text>
          </Pressable>
        </View>
      </ImageBackground>

    </View >
  )
}
