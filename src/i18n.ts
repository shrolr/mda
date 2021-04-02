import NotificationLocaleEn from "./i18n/notifications/en";
import NotificationLocaleTr from "./i18n/notifications/tr";
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import WithdrawslocaleTr from "./i18n/withdraws/tr";
import WithdrawslocaleEn from "./i18n/withdraws/en";
import TabsEn from "./i18n/Tabs/en";
import TabsTr from "./i18n/Tabs/tr";
import WalletslocaleEn from "./i18n/wallets/en";
import WalletslocaleTr from "./i18n/wallets/tr";
import transactionsLocaleEn from "./i18n/transactions/en";
import transactionsLocaleTr from "./i18n/transactions/tr";
import transferlocaleTr from "./i18n/transfer/tr";
import accountsLocaleEn from "./i18n/accounts/en";
import bankaccountsLocaleEn from "./i18n/bankaccounts/en";
import DepositsLocaleEn from "./i18n/deposits/en";
import ErrorslocaleEn from "./i18n/errors/en";
import ProfilelocaleEn from "./i18n/profile/en";
import ErrorslocaleTr from "./i18n/errors/tr";
import ProfilelocaleTr from "./i18n/profile/tr";
import bankaccountsLocaleTr from "./i18n/bankaccounts/tr";
import DepositsLocaleTr from "./i18n/deposits/tr";
import accountsLocaleTr from "./i18n/accounts/tr";
import ToastlocaleEn from "./i18n/toast/en";
import ToastlocaleTr from "./i18n/toast/tr";
import transferlocaleEn from "./i18n/transfer/en";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: "en",
        resources: {
            en: {
                Notification: NotificationLocaleEn,
                Tabs :TabsEn,
                Withdraw:WithdrawslocaleEn,
                Wallet:WalletslocaleEn,
                Transfer:transferlocaleEn,
                Tranactions:transactionsLocaleEn,
                Accounts:accountsLocaleEn,
                BankAccounts:bankaccountsLocaleEn,
                Deposits:DepositsLocaleEn,
                Errors:ErrorslocaleEn,
                Profile:ProfilelocaleEn,
                Toast:ToastlocaleEn,
            },
            tr: {
                Notification: NotificationLocaleTr,
                Tabs :TabsTr,
                Withdraw:WithdrawslocaleTr,
                Wallet:WalletslocaleTr,
                Transfer:transferlocaleTr,
                Tranactions:transactionsLocaleTr,
                Accounts:accountsLocaleTr,
                BankAccounts:bankaccountsLocaleTr,
                Deposits:DepositsLocaleTr,
                Errors:ErrorslocaleTr,
                Profile:ProfilelocaleTr,
                Toast:ToastlocaleTr
            },
        },
        debug: true,
        // cache: {
        //   enabled: true
        // },
        interpolation: {
            escapeValue: false, // not needed for react as it does escape per default to prevent xss!
        },
    });

export default i18n;
