import { Button, Icon } from 'native-base';
import React from 'react'
import { View, Text, Image } from 'react-native';
import Colors from '../constants/Colors';
import { useStateContext } from '../context/state';

interface ISideBar {
}

export const SideBar: React.FC<ISideBar> = () => {
    const { context } = useStateContext();

    return (
        <View style={{ paddingLeft: 20, paddingTop: 20, paddingRight: 20, marginTop: 70, backgroundColor: 'rgba(52, 52, 52, 0.95)', flex: 1 }}>
            <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, textAlign: "right", color: Colors.common.white }}>Dude Tester</Text>
                    <Text style={{ fontSize: 9, textAlign: "right", color: Colors.common.gray }}>IB Hesabı</Text>
                </View>
                <View style={{ alignItems: "flex-end", }}>
                    <Image source={{ uri: "https://www.peterbe.com/avatar.random.png" }} resizeMode="contain" style={{ marginLeft: 10, height: 30, width: 30 }} />

                </View>

            </View>
            <View style={{ height: 0.5, marginTop: 10, marginBottom: 30, backgroundColor: Colors.common.white }} />
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <Icon style={{ marginRight: 10, fontSize: 16, color: "gray", alignSelf: "center" }} type="Feather" name="home" />
                    <Text style={{ color: Colors.common.white }}>Ana Sayfa</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 15 }}>
                    <Icon style={{ marginRight: 10, fontSize: 16, color: "gray", alignSelf: "center" }} type="Feather" name="home" />
                    <Text style={{ color: Colors.common.white }}>Cüzdan</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Icon style={{ marginRight: 10, fontSize: 16, color: "gray", alignSelf: "center" }} type="Feather" name="home" />
                    <Text style={{ color: Colors.common.white }}>Hesaplar</Text>
                </View>
                <Text style={{ marginTop: 20, color: Colors.common.gray }}>Parasal İşlemler</Text>

            </View>

            <View style={{ paddingTop: 20, paddingBottom: 30, marginTop: 10, backgroundColor: Colors.common.sideBarGrayBg, marginLeft: -20, marginRight: -20, paddingLeft: 30, paddingRight: 30 }}>
                <View style={{ flexDirection: "row" }}>
                    <Icon style={{ marginRight: 10, fontSize: 16, color: "gray", }} type="Feather" name="home" />
                    <View>
                        <Text style={{ color: Colors.common.white }}>Yatırımlar</Text>

                        <View style={{ flexDirection: "row", marginTop: 10, }}>
                            <Icon style={{ marginRight: 10, fontSize: 12, color: "gray", alignSelf: "center" }} type="Feather" name="home" />
                            <Text style={{ fontSize: 9, color: Colors.common.white }}>Para Yatırma</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10, }}>
                            <Icon style={{ marginRight: 10, fontSize: 12, color: "gray", alignSelf: "center" }} type="Feather" name="home" />
                            <Text style={{ fontSize: 9, color: Colors.common.white }}>Yeni Para Yatırma</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10, }}>
                            <Icon style={{ marginRight: 10, fontSize: 12, color: "gray", alignSelf: "center" }} type="Feather" name="home" />
                            <Text style={{ fontSize: 9, color: Colors.common.white }}>Para Yatırım Geçmişi</Text>
                        </View>
                    </View>
                </View>


            </View>
            <View style={{ height: 0.5, marginTop: 10, marginBottom: 30, backgroundColor: Colors.common.white }} />
            <Button  style={{height:35, borderRadius: 5, backgroundColor: Colors.common.menuBackgroundColor }} full>
                <Icon style={{ marginLeft:0,fontSize: 13, color: "black", alignSelf: "center" }} type="AntDesign" name="download" />

                <Text style={{ color: Colors.common.black, fontWeight: "bold", fontSize: 12 }}>META TRADER</Text>
            </Button>
        </View>
    )

};