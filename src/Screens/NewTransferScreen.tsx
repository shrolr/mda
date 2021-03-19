import React, { useState } from 'react'
import { View, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import { DepositCards, NavBar } from '../components'
import { AccountToAccountTransfer, AccountToWalletTransfer, WalletToAccountTransfer } from '../components/Templates'
import { TopBar } from '../components/Organisms/TopBar'
import Colors from '../constants/Colors'
import { TransferOptions } from '../enums'
import { HomeStackNavProps } from '../Routes/HomeStackNavigator/HomeParamList'


export default function NewTransferScreen({ navigation }: HomeStackNavProps<"NewTransfer">) {

    const [selectedOption, setselectedOption] = useState<TransferOptions>(TransferOptions.walletToBank)
    const onMenuItemClick = (depositOptions: TransferOptions) => {
        setselectedOption(depositOptions)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.common.statusBarColor }}>
            <View style={{ flex: 1, backgroundColor: Colors.common.backgroundLightWhite }}>

                <StatusBar
                    animated={true}
                    backgroundColor={Colors.common.statusBarColor}
                    barStyle="light-content"
                    showHideTransition="slide"
                />
                <TopBar />
                <NavBar name="wallet" type="Ionicons" title="Yeni Transfer" />

                <ScrollView style={{ flex: 1 }}>

                    <View style={{ paddingLeft: 20, paddingTop: 20, paddingRight: 20 }}>
                        <DepositCards onMenuItemClick={onMenuItemClick} id={TransferOptions.walletToBank} isActive={selectedOption === TransferOptions.walletToBank} title={"Cüzdandan Hesaba Transfer"} transferFrom="wallet" transferTo="bank" />
                        <DepositCards onMenuItemClick={onMenuItemClick} id={TransferOptions.bankToWallet} isActive={selectedOption === TransferOptions.bankToWallet} title={"Hesaptan Cüzdana Transfer"} transferFrom="bank" transferTo="wallet" />
                        <DepositCards onMenuItemClick={onMenuItemClick} id={TransferOptions.bankToBank} isActive={selectedOption === TransferOptions.bankToBank} title={"Hesaptan Hesaba Transfer"} transferFrom="bank" transferTo="bank" />

                    </View>
                    {
                        selectedOption === TransferOptions.walletToBank && <WalletToAccountTransfer navigation={navigation} />
                    }
                    {
                        selectedOption === TransferOptions.bankToWallet && <AccountToWalletTransfer navigation={navigation}  />
                    }
                    {
                        selectedOption === TransferOptions.bankToBank && <AccountToAccountTransfer navigation={navigation} />
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
