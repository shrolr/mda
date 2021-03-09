import React, { useState } from 'react'
import { View, Text, ImageBackground, Image } from 'react-native'
import Colors from '../constants/Colors';
import { Button, Input, Item } from 'native-base';

import { AuthNavProps } from '../Routes/AuthStackNavigator/AuthParamList';
import ApiCalls from '../network/ApiCalls';
import { LoginRequest } from '../types/post/LoginRequest';


export default function LoignScreen({ navigation }: AuthNavProps<"Login">) {

  const [state, setstate] = useState({ password: "", email: "" })
  const onChangeText = (email: string) => {
    setstate({email,password:state.password})
  }
  const onPasswordChange = (password: string) => {
    setstate({email:state.email,password})
  }
  const onLoginPress = () => {
    let LoginRequest:LoginRequest = {identifier:state.email,password:state.password}
    ApiCalls.login(LoginRequest).then((result)=> {
      console.log(result)
    })
  }
  return (
    <View style={{ justifyContent: "center", flex: 1 }}>
      <ImageBackground style={{ flex: 1, justifyContent: "center" }} source={{ uri: "https://picsum.photos/1080/1920" }}>

        <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 50, backgroundColor: Colors.light.background, borderRadius: 10, marginLeft: 20, marginRight: 20 }}>
          <View>
            <Image source={{ uri: "https://i.hizliresim.com/TtqzTs.png" }} resizeMode="contain" style={{ alignSelf: "center", height: 100, width: 250 }} />
          </View>
          <View style={{ height: 0.01, marginTop: 30, marginBottom: 30, backgroundColor: Colors.common.gray }} />
          <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>Giriş yap</Text>
          <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 30 }} rounded>
            <Input autoCapitalize="none" autoCorrect={false} keyboardType="email-address"  onChangeText={onChangeText} placeholder='E-mail' />
          </Item>
          <Item style={{ paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
            <Input onChangeText={onPasswordChange} secureTextEntry placeholder='Password' />
          </Item>
          <View style={{ marginTop: 30, marginBottom: 30, flexDirection: "row" }}>
            <Text style={{ color: Colors.common.lightBlue }}>Beni Hatırla</Text>
            <Text style={{ flex: 1, textAlign: "right", color: Colors.common.textOrange }}>Şifremi Unuttum</Text>
          </View>
          <Button onPress={onLoginPress} style={{ borderRadius: 10, backgroundColor: Colors.common.loginButton }} full>
            <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 16 }}>Giriş Yap</Text>
          </Button>
        </View>
      </ImageBackground>

    </View>
  )
}
