import React, { useState } from 'react'
import { View, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import { DepositCards, NavBar } from '../../../components'
import { AccountToAccountTransfer, AccountToWalletTransfer, WalletToAccountTransfer } from '../../../components/Templates'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import { Locales, TransferOptions } from '../../../enums'
import { HomeStackNavProps } from '../HomeParamList'
import { useTranslation } from 'react-i18next'

// TO DO CHANGE NAME DEPOSIT OPTİONS TO TRANSFER OPTION

export default function NewTransferScreen({ navigation }: HomeStackNavProps<"NewTransfer">) {
    const { t } = useTranslation();

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
                <NavBar    title={t(Locales.Transfer + ":ACCOUNTTOWALLET")} />

                <ScrollView style={{ flex: 1 }}>

                    <View style={{ paddingLeft: 20, paddingTop: 20, paddingRight: 20 }}>
                        <DepositCards onMenuItemClick={onMenuItemClick} id={TransferOptions.walletToBank} isActive={selectedOption === TransferOptions.walletToBank} title={t(Locales.Transfer + ":WALLETTOACCOUNT")} transferFrom="wallet" transferTo="bank" />
                        <DepositCards onMenuItemClick={onMenuItemClick} id={TransferOptions.bankToWallet} isActive={selectedOption === TransferOptions.bankToWallet} title={t(Locales.Transfer + ":ACCOUNTTOWALLET")} transferFrom="bank" transferTo="wallet" />
                        <DepositCards onMenuItemClick={onMenuItemClick} id={TransferOptions.bankToBank} isActive={selectedOption === TransferOptions.bankToBank} title={t(Locales.Transfer + ":ACCOUNTTOACCOUNT")} transferFrom="bank" transferTo="bank" />

                    </View>
                    {
                        selectedOption === TransferOptions.walletToBank && <WalletToAccountTransfer t={t} navigation={navigation} />
                    }
                    {
                        selectedOption === TransferOptions.bankToWallet && <AccountToWalletTransfer t={t} navigation={navigation}  />
                    }
                    {
                        selectedOption === TransferOptions.bankToBank && <AccountToAccountTransfer t={t} navigation={navigation} />
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
