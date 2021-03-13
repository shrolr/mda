import { Button, Card, Icon, Input, Item } from 'native-base';
import React, { useState } from 'react'
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import { Text } from '../atomix';
import DropDownPicker from 'react-native-dropdown-picker';

interface IWalletToBankTransfer {

}

// TO DO IMPORTANT when drop down menu appears list ıtems zIndex are behind to buttons zIndex
// Some item from list item will not appear on the screen
// use dropdown menu list ref to give margin when its open
const dummyData = [
    { label: 'USA', value: 'usa' },
    { label: 'UK', value: 'uk', },
    { label: 'France', value: 'france' },
]
export const WalletToBankTransfer: React.FC<IWalletToBankTransfer> = () => {
    const [accounts, setaccounts] = useState<{ label: string; value: string; }[]>(dummyData)
    const [currencies, setcurrencies] = useState<{ label: string; value: string; }[]>(dummyData)
    const onTransferRequest = () => {

    }
    return (
        <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, backgroundColor: Colors.common.transferCardBg }}>
            <Card style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 12, textAlign: "center" }}>Cüzdan Hesaba Transfer</Text>
                <View style={{ height: 3, backgroundColor: Colors.common.contentDivider, marginTop: 20, marginBottom: 20 }} />
                <DropDownPicker
                    items={accounts}
                    placeholder="Kaynak Hesap"

                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
                <View style={{ marginTop: 10, marginBottom: 10 }} />
                <DropDownPicker
                    items={currencies}
                    placeholder="Para Birimi"
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />

                <Item style={{ height: 35, borderTopEndRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderTopStartRadius: 5, borderBottomEndRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomStartRadius: 5, paddingLeft: 10, borderRadius: 10, marginTop: 20 }} rounded>
                    <Input placeholder='Miktar *' />
                    <Icon style={{ fontSize: 18, color: Colors.common.gray }} name={"bar-chart"} type="Feather" />
                </Item>

                <Button  onPress={onTransferRequest} style={{ borderRadius: 5, height: 50, marginBottom: 20, marginTop: 40, backgroundColor: Colors.common.buttonOrange }} full>
                    <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>TRANSFER ET</Text>

                </Button>
            </Card>
        </View>
    )


};