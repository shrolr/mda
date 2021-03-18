import { Card } from 'native-base';
import React from 'react'
import { TouchableWithoutFeedback, View, Image  } from 'react-native';
import Colors from '../../constants/Colors';
import { DepositOptions } from '../../enums';
import { Text } from '../atom';

type TransferOption = "wallet" | "bank"

interface IDepositCards {
    title: string;
    transferFrom: TransferOption;
    transferTo: TransferOption;
    isActive: boolean;
    onMenuItemClick: (depositOptions:DepositOptions) => void
    id:DepositOptions;
}
export const DepositCards: React.FC<IDepositCards> = ({id, onMenuItemClick, transferFrom, transferTo, title, isActive }) => {

    const getImageUri = (type: TransferOption) => {
        if (type === "bank") {
            return (
                require("../../../assets/images/icons/bank.png")
            )
        }
        return (
            require("../../../assets/images/icons/wallet.png")
        )

    }
    const onCardPress = () => {onMenuItemClick(id)}
    return (
        <TouchableWithoutFeedback onPress={onCardPress}>
            <Card style={{ paddingLeft: 20, paddingRight: 20, flexDirection: "row", borderRadius: 5, height: 50, backgroundColor: isActive ? Colors.common.statusBarColor : Colors.common.cardInActive }}>
                <Text style={{ fontWeight: "bold", fontSize: 12, color: isActive ? Colors.common.white : Colors.common.fontGray, alignSelf: "center", flex: 1, }} >{title}</Text>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Image source={getImageUri(transferFrom)} resizeMode="contain" style={{ tintColor: Colors.common.gray, height: 20, width: 20 }} />
                    <Image source={require("../../../assets/images/icons/transfer.png")} resizeMode="contain" style={{ marginLeft: 10, marginRight: 10, height: 15, width: 15 }} />
                    <Image source={getImageUri(transferTo)} resizeMode="contain" style={{ tintColor: Colors.common.gray, height: 20, width: 20 }} />
                </View>
            </Card>
        </TouchableWithoutFeedback>
    )


};

