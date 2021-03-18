import React, { useState } from 'react'
import { View, StatusBar, Image, ScrollView, SafeAreaView } from 'react-native'
import { DepositCards, NavBar } from '../components'
import { BankToBankTransfer, BankToWalletTransfer, WalletToBankTransfer } from '../components/Molecules'
import { TopBar } from '../components/TopBar'
import Colors from '../constants/Colors'
import { DepositOptions } from '../enums'
import { DepositsStackNavProps } from '../Routes/DepositStackNavigator/DepositParamList'


export default function NewDepositScreen({ navigation }: DepositsStackNavProps<"DepositsHistory">) {

    const [selectedOption, setselectedOption] = useState<DepositOptions>(DepositOptions.walletToBank)
    const onMenuItemClick = (depositOptions: DepositOptions) => {
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
                        <DepositCards onMenuItemClick={onMenuItemClick} id={DepositOptions.walletToBank} isActive={selectedOption === DepositOptions.walletToBank} title={"Cüzdandan Hesaba Transfer"} transferFrom="wallet" transferTo="bank" />
                        <DepositCards onMenuItemClick={onMenuItemClick} id={DepositOptions.bankToWallet} isActive={selectedOption === DepositOptions.bankToWallet} title={"Hesaptan Cüzdana Transfer"} transferFrom="bank" transferTo="wallet" />
                        <DepositCards onMenuItemClick={onMenuItemClick} id={DepositOptions.bankToBank} isActive={selectedOption === DepositOptions.bankToBank} title={"Hesaptan Hesaba Transfer"} transferFrom="bank" transferTo="bank" />

                    </View>
                    {
                        selectedOption === DepositOptions.walletToBank && <WalletToBankTransfer />
                    }
                    {
                        selectedOption === DepositOptions.bankToWallet && <BankToWalletTransfer />
                    }
                    {
                        selectedOption === DepositOptions.bankToBank && <BankToBankTransfer />
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
