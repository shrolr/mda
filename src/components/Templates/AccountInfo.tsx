import { Button, Card, Icon, Input, Item, Toast } from 'native-base';
import React, { useState } from 'react'
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useStateContext } from '../../context/state';
import ApiCalls from '../../network/ApiCalls';
import { UpdateAccountInformation } from '../../types/post/UpdateAccountInformation';
import { Text } from '../atom';

interface IAccountInfo {

}

export const AccountInfo: React.FC<IAccountInfo> = () => {
    const { context } = useStateContext()
    const [isEditinPhone, setisEditingPhone] = useState(false)
    const [isEditingEmail, setisEditingEmail] = useState(false)
    const [email, setemail] = useState(context.user!.customerAccountInfo.email)
    const [phone, setPhone] = useState(context.user!.customerAccountInfo.mobilePhone)
    const [MobilePhoneInputError, setMobilePhoneInputError] = useState(false)
    const [emailInputError, setEmailInputError] = useState(false);

    const onEditMailPress = () => {
        setisEditingEmail(true)
    }
    const onEditPhonePress = () => {
        setisEditingPhone(true)
    }
    const cancelEditing = () => {
        setisEditingEmail(false)
        setisEditingPhone(false)
    }
    const onUpdateUserInfo = () => {
        // TO DO handle UpdateUserInfo
        if (MobilePhoneInputError || emailInputError) {
            Toast.show({ text: "hata" })
        }
        else {
            let updateAccountInformation: UpdateAccountInformation = { email: email, mobilePhone: phone }
            ApiCalls.updateUserIdentifiers(updateAccountInformation, context.user!.customerAccountInfo.customerId)
            // update user acc info
            // handle response
        }
        
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

        setemail(email)
    }
    return (
        <Card style={{ marginLeft: 20, marginTop: 15, paddingBottom: 40, marginRight: 20, borderRadius: 10, overflow: "hidden" }}>
            <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.walletHeader, alignItems: "center", flexDirection: "row" }}>
                <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 18 }}>{"Hesap Bilgileri"}</Text>
                <Image source={require("../../../assets/images/icons/secure.png")} resizeMode="contain" style={{ marginRight: 20, height: 20, width: 20 }} />
            </View>
            <View style={{ backgroundColor: "#fff", paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, alignItems: "center" }}>
                <ImageBackground style={{ justifyContent: "flex-end", alignItems: "flex-end", marginBottom: 10, height: 82, width: 82 }} source={{ uri: context.user?.customerInfo.picture }} resizeMode="contain" >
                    <Image source={require("../../../assets/images/icons/camera.png")} resizeMode="contain" style={{ height: 25, width: 25 }} />
                </ImageBackground>
                <Text style={{ fontFamily: "Roboto", fontSize: 12, fontWeight: "bold", textAlign: "right", color: Colors.common.black }}>{context.user?.customerAccountInfo.displayName}</Text>
            </View>

            <TouchableOpacity onPress={onEditMailPress} style={{ alignItems: "center", marginRight: 20, marginLeft: 20, flexDirection: "row", height: 40, backgroundColor: "#F7F7F6", marginTop: 20 }}>
                <View style={{ height: 40, width: 50, backgroundColor: "#E5E5E5", alignItems: "center", justifyContent: "center" }}>
                    <Image source={require("../../../assets/images/icons/email.png")} resizeMode="contain" style={{ height: 13, width: 17 }} />
                </View>
                {
                    isEditingEmail ?
                        <Item error={emailInputError} style={{ marginRight: 50 }}>
                            <Input defaultValue={context.user?.customerAccountInfo.email} onChangeText={onEmailChange} autoFocus />
                            <Image source={require("../../../assets/images/icons/edit.png")} resizeMode="contain" style={{ tintColor: isEditinPhone ? "gray" : "#FF4E1F", marginRight: 20, height: 13, width: 13 }} />
                        </Item>
                        :
                        <Text style={{ marginLeft: 20, flex: 1 }}>{context.user?.customerAccountInfo.email}</Text>
                }
                {
                    isEditingEmail ? null :
                        <Image source={require("../../../assets/images/icons/edit.png")} resizeMode="contain" style={{ tintColor: isEditinPhone ? "gray" : "#FF4E1F", marginRight: 20, height: 13, width: 13 }} />

                }
            </TouchableOpacity>
            <TouchableOpacity onPress={onEditPhonePress} style={{ alignItems: "center", marginRight: 20, marginLeft: 20, flexDirection: "row", height: 40, backgroundColor: "#F7F7F6", marginTop: 20 }}>
                <View style={{ height: 40, width: 50, backgroundColor: "#E5E5E5", alignItems: "center", justifyContent: "center" }}>
                    <Image source={require("../../../assets/images/icons/phone-call.png")} resizeMode="contain" style={{ height: 13, width: 17 }} />
                </View>
                {
                    isEditinPhone ?
                        <Item error={MobilePhoneInputError} style={{ marginRight: 50 }}>
                            <Input defaultValue={context.user?.customerAccountInfo.mobilePhone} onChangeText={onPhoneChange} autoFocus />
                            <Image source={require("../../../assets/images/icons/edit.png")} resizeMode="contain" style={{ tintColor: isEditinPhone ? "gray" : "#FF4E1F", marginRight: 20, height: 13, width: 13 }} />
                        </Item>
                        :
                        <Text style={{ marginLeft: 20, flex: 1 }}>{context.user?.customerAccountInfo.mobilePhone}</Text>
                }
                {
                    isEditinPhone ? null :
                        <Image source={require("../../../assets/images/icons/edit.png")} resizeMode="contain" style={{ tintColor: isEditinPhone ? "gray" : "#FF4E1F", marginRight: 20, height: 13, width: 13 }} />
                }
            </TouchableOpacity>
            {
                (isEditingEmail || isEditinPhone) && <View style={{ marginTop: 10, height: 44, justifyContent: "space-evenly", flexDirection: "row", }}>
                    <Button onPress={cancelEditing} style={{ flex: 3, borderRadius: 10, height: 44, marginLeft: 20, marginRight: 10, marginBottom: 20, marginTop: 10, backgroundColor: Colors.common.buttonMistyRose }} full>
                        <Text style={{ color: Colors.common.orangered, fontWeight: "bold", fontSize: 14 }}>İPTAL</Text>
                    </Button>
                    <Button onPress={onUpdateUserInfo} style={{ flex: 4, borderRadius: 10, height: 44, marginLeft: 10, marginRight: 20, marginBottom: 20, marginTop: 10, backgroundColor: Colors.common.loginButton }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}> GÜNCELLE</Text>
                    </Button>
                </View>
            }


        </Card>
    )


};