import { Button, Card, Input, Item } from 'native-base';
import React, { useState } from 'react'
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Text } from './atomix';

interface IPersonalInfo {

}

export const PersonalInfo: React.FC<IPersonalInfo> = () => {
    const [isEditing, setisEditing] = useState(false)
    const [email, setemail] = useState("")
    const [phone, setPhone] = useState("")
    const onEditClick = () => {
        setisEditing(true)
    }

    const cancelEditing = () => {
        setisEditing(false)
    }
    const onUpdateUserInfo = () => {
        // TO DO handle UpdateUserInfo
         
    }
    const onPhoneChange = (phone: string) => {
        setPhone(phone)
    }
    const onEmailChange = (email: string) => {
        setemail(email)
    }
    return (
        <Card style={{ marginLeft: 20, marginTop: 15, paddingBottom: 40, marginRight: 20, borderRadius: 10, overflow: "hidden" }}>
            <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.walletHeader, alignItems: "center", flexDirection: "row" }}>
                <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 18 }}>{"Kişisel Bilgiler"}</Text>
            </View>

            {
                !isEditing &&
                <TouchableOpacity onPress={onEditClick} style={{ alignItems: "center", marginRight: 20, marginLeft: 20, flexDirection: "row", height: 40, backgroundColor: "#F7F7F6", marginTop: 20 }}>
                    <View style={{ height: 40, width: 50, backgroundColor: "#E5E5E5", alignItems: "center", justifyContent: "center" }}>
                        <Image source={require("../../assets/images/icons/user-circle-regular.png")} resizeMode="contain" style={{ tintColor: "black", height: 20, width: 20 }} />
                    </View>
                    <Text style={{ marginLeft: 20, flex: 1, fontWeight: "bold" }}>Dude Tester</Text>
                    <Image source={require("../../assets/images/icons/edit.png")} resizeMode="contain" style={{ marginRight: 20, height: 13, width: 13 }} />
                </TouchableOpacity>
            }
            { isEditing &&
                <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input defaultValue="" autoCapitalize="none" autoCorrect={false} placeholder='Adınız' />
                    </Item>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input defaultValue=""  autoCapitalize="none" autoCorrect={false} placeholder='Soyadınız' />
                    </Item>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input defaultValue=""  autoCapitalize="none" autoCorrect={false} placeholder='Ülke' />
                    </Item>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input defaultValue=""  autoCapitalize="none" autoCorrect={false} placeholder='Bölge' />
                    </Item>

                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input defaultValue=""  autoCapitalize="none" autoCorrect={false} placeholder='Şehir' />
                    </Item>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input defaultValue=""  autoCapitalize="none" autoCorrect={false} placeholder='Posta kodu' />
                    </Item>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input defaultValue="" autoCapitalize="none" autoCorrect={false} placeholder='Adres' />
                    </Item> 
                </View>
            }

            {
                isEditing &&
                <View style={{ marginTop: 10, height: 44, justifyContent: "space-evenly", flexDirection: "row", }}>
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