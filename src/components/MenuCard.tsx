import { Icon } from 'native-base';
import React from 'react'
import { TouchableOpacity, View, Image, ImageSourcePropType } from 'react-native';
import Colors from '../constants/Colors';
import { Text } from './atomix';

interface IMenuCard {
    isTouchable: boolean;
    title: string;
    imageUri: ImageSourcePropType;
    onMenuItemClick?:() => void
}
export const MenuCard: React.FC<IMenuCard> = ({onMenuItemClick, isTouchable, imageUri, title }) => {
    if (isTouchable) {
        return (
            <TouchableOpacity onPress={onMenuItemClick} style={{ flex: 1 }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10, flex: 1, borderWidth: 2, backgroundColor: "#fff", borderColor: Colors.common.borderOrange, borderRadius: 5 }}>
                <Image source={imageUri} resizeMode="contain" style={{tintColor:Colors.common.black,   height: 25, width: 25 }} />
                <Text style={{marginTop:10,textAlign:"center", color: Colors.common.black, fontSize: 11, fontWeight: "bold" }}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginRight: 10, flex: 1, backgroundColor: Colors.common.walletTabBg, borderRadius: 5 }}>
                <Image source={imageUri} resizeMode="contain" style={{tintColor:Colors.common.white,   height: 25, width: 25 }} />
                <Text style={{marginTop:10,textAlign:"center", color: Colors.common.white, fontSize: 11, fontWeight: "bold" }}>{title}</Text>
            </View>
        </View>
    )

};