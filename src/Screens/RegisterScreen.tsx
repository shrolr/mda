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
import { RegisterRequest } from '../types/post';


export default function RegisterScreen({ navigation }: AuthNavProps<"Register">) {
    const { t } = useTranslation();

    const { dispatch } = useStateContext();
    const [lastNameInputError, setLastNameInputError] = useState(false);
    const [firstNameInputError, setFirstNameInputError] = useState(false);
    const [INVALIDMEAIL, setEmailInputError] = useState(false)
    const [firstNameInput, setFirstNameInput] = useState("");

    const [lastNameInput, setLastNameInput] = useState("");
    const [password, setpassword] = useState("")
    const [passwordConfirmation, setpasswordConfirmation] = useState("")
    const [emailInput, setEmailInput] = useState("");
    const [phone, setPhone] = useState("")
    const [MobilePhoneInputError, setMobilePhoneInputError] = useState(false)


    const onPasswordChange = (password: string) => {
        setpassword(password)
    }
    const onPasswordConfirmationChange = (password: string) => {
        setpasswordConfirmation(password)
    }
    const onRegisterPress = async () => {
        if (passwordConfirmation !== password) {
            Toast.show({ text: t(Locales.Register + ":PASSWORDMISMATCHERROR"), buttonText: 'Ok', type: "danger", })
            return
        }
        if (password.length < 6) {
            Toast.show({ text: t(Locales.Register + ":PASSWORDMINLENGTHERROR"), buttonText: 'Ok', type: "danger", })
            return

        }
        if (emailInput.length < 4 || INVALIDMEAIL) {
            Toast.show({ text: t(Locales.Register + ":EMAILVALIDATIONERROR"), buttonText: 'Ok', type: "danger", })
            return
            // 
        }
        if (MobilePhoneInputError) {
            Toast.show({ text: t(Locales.Register + ":EMAILVALIDATIONERROR"), buttonText: 'Ok', type: "danger", })
            return
            // MOBILEPHONEVALIDATIONERROR
        }
        let register: RegisterRequest = {
            firstname: firstNameInput,
            lastname: lastNameInput,
            email: emailInput,
            mobilePhone: phone,
            password,
            ref: null,
            typeId: 1,
        }
        ApiCalls.register(register).then((response) => {
            if (response instanceof NetworkResponseFail) {
                console.log("response error", response)
                if (response.status === 102) {
                    Toast.show({ text: t(Locales.Register + ":EMAILDUPLICATEERROR") + "\n" + t(Locales.Register + ":MOBILEPHONEDUPLICATEERROR"), buttonText: 'Ok', type: "danger", duration:5000})
                }
                 
            } else {
                //                Toast.show({ text: t(Locales.Register + ":VERIFICATIONINFO"), buttonText: 'Ok', type: "success", })
              
                navigation.navigate("Validation", { identifier: emailInput })
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
    const onEmailChange = (email: string) => {
        let pattern = /^\S+@\S+\.\S+$/;
        if (pattern.test(email)) {
            setEmailInputError(false);
        } else {
            setEmailInputError(true);
        }

        setEmailInput(email)
    }
    const goBackToLogin = ()=> {
        navigation.navigate("Login")
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
                        <Input autoCapitalize="none" autoCorrect={false} keyboardType="email-address" onChangeText={onEmailChange} placeholder={"email"} />
                    </Item>
                    {
                        INVALIDMEAIL && <Text style={{ paddingLeft: 10, color: Colors.common.fontOrangeRed, marginTop: 5 }}>{t(Locales.Register + ":EMAILVALIDATIONERROR")}</Text>
                    }
                    <Item error={MobilePhoneInputError} style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input keyboardType="phone-pad" placeholder={t(Locales.Profile + ":MOBILEPHONE")} onChangeText={onPhoneChange} />
                    </Item>
                    {
                        MobilePhoneInputError && <Text style={{ paddingLeft: 10, color: Colors.common.fontOrangeRed, marginTop: 5 }}>{t(Locales.Register + ":MOBILEPHONEVALIDATIONERROR")}</Text>
                    }
                    <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onPasswordChange} secureTextEntry placeholder={t(Locales.Login + ":PASSWORDLABEL")} />
                    </Item>
                    <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                        <Input onChangeText={onPasswordConfirmationChange} secureTextEntry placeholder={t(Locales.Login + ":PASSWORDLABEL")} />
                    </Item>


                    <Button onPress={onRegisterPress} style={{ marginTop: 20, borderRadius: 10, backgroundColor: Colors.common.loginButton }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 16 }}>{t(Locales.Login + ":REGISTER")}</Text>
                    </Button>
                    <Pressable onPress={goBackToLogin} style={{ marginTop: 20 }}>
                        <Text style={{ textAlign: "center", color: Colors.common.textOrange }}><Text style={{color:Colors.common.fontGray}}>{t(Locales.Register + ":ALREADYHASACCOUNT")} </Text>  {t(Locales.Register + ":LOGIN")}</Text>
                    </Pressable>
                </View>
            </ImageBackground>

        </View>
    )
}
