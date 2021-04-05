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


export default function RegisterScreen({ navigation }: AuthNavProps<"Register">) {
    const { t } = useTranslation();
    const [rememberMe, setrememberMe] = useState(false)

    const [state, setstate] = useState({} as LoginRequest)
    const { dispatch } = useStateContext();
    const [lastNameInputError, setLastNameInputError] = useState(false);
    const [firstNameInputError, setFirstNameInputError] = useState(false);
    const [INVALIDMEAIL, setINVALIDMEAIL] = useState(false)
    const [INVLADPASSOWRD, setINVLADPASSOWRD] = useState(false)
    const [firstNameInput, setFirstNameInput] = useState("");
    const [countryInput, setCountryInput] = useState("");
    const [stateInput, setStateInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [zipcodeInput, setZipCodeInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    const [phone, setPhone] = useState("")
    const [MobilePhoneInputError, setMobilePhoneInputError] = useState(false)
    const onChangeText = (identifier: string) => {
        setstate({ identifier, password: state.password })
    }

    const onPasswordChange = (password: string) => {
        setstate({ identifier: state.identifier, password })
    }
    const onLoginPress = async () => {

        ApiCalls.login(state).then((response) => {
            if (response instanceof NetworkResponseFail) {
                // show error

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
    const onPhoneChange = (phone: string) => {
        let pattern = /^[1-9]\d{1,14}$/;
        if (pattern.test(phone)) {
            setMobilePhoneInputError(false);
        } else {
            setMobilePhoneInputError(true);
        }
        setPhone(phone)
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

                <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 20, backgroundColor: Colors.light.background, borderRadius: 10, marginLeft: 20, marginRight: 20 }}>

                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>{t(Locales.Login + ":REGISTER")}</Text>

                    <Item error={firstNameInputError} style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input onChangeText={(text) => setFirstNameInput(text)} autoCapitalize="none" autoCorrect={false} placeholder={t(Locales.Profile + ":FIRSTNAME")} />
                    </Item>
                    <Item error={lastNameInputError} style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input onChangeText={(text) => setLastNameInput(text)} autoCapitalize="none" autoCorrect={false} placeholder={t(Locales.Profile + ":LASTNAME")} />
                    </Item>

                    <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 30 }} rounded>
                        <Input autoCapitalize="none" autoCorrect={false} keyboardType="email-address" onChangeText={onChangeText} placeholder={"email"} />
                    </Item>
                    {
                        INVALIDMEAIL && <Text style={{ paddingLeft: 10, color: Colors.common.fontOrangeRed, marginTop: 5 }}>{t(Locales.Login + ":INVALIDEMAILERROR")}</Text>
                    }
                    <Item error={MobilePhoneInputError} style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input placeholder={"cep telefonu"} onChangeText={onPhoneChange} />
                    </Item>
                    <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onPasswordChange} secureTextEntry placeholder={t(Locales.Login + ":PASSWORDLABEL")} />
                    </Item>
                    <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onPasswordChange} secureTextEntry placeholder={t(Locales.Login + ":PASSWORDLABEL")} />
                    </Item>


                    <Button onPress={onLoginPress} style={{ marginTop: 20, borderRadius: 10, backgroundColor: Colors.common.loginButton }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 16 }}>{t(Locales.Login + ":REGISTER")}</Text>
                    </Button>
                </View>
            </ImageBackground>

        </View>
    )
}
