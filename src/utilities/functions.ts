import { Linking, Platform } from "react-native";
import { DropDownPickerList } from "../models";
import { Accounts } from "../models/ApiModels/Account/AccountListApiModel";

var dayjs = require('dayjs')

const convertUTCDateToLocalDate = (date: Date) => {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);
    let _date = dayjs(newDate).hour(hours).format("DD-MM-YYYY")
    let time = dayjs(newDate).hour(hours).format("HH-mm-ss")

    return { date: _date, time }
}

const downloadMetaTrader = async () => {
    if (Platform.OS === "android") {
        let url = "https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4&hl=tr&gl=US"
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        }
    }
    else if (Platform.OS === "ios") {
        let url = "https://apps.apple.com/us/app/metatrader-4/id496212596"
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        }

    }
}

const validateMoneyInput = (value: string) => {
    if (value === "") return true;

    let pattern = /^[1-9]+(?:\.?\d{0,4}?)$/ig;
    return pattern.test(value);
}

const createDataProviderForAccounts = (mt4RealAccounts: Accounts[], mt5RealAccounts: Accounts[]) => {
    let mtRealAccounts = mt4RealAccounts.concat(mt5RealAccounts)
    let AccountList: DropDownPickerList[] = []
    mtRealAccounts.forEach((account) => {
        let newAccount: DropDownPickerList = {} as DropDownPickerList;
        newAccount.disabled = !account.isActive
        newAccount.label = account.accountName! + " " + account.user
        newAccount.value = account.id
        newAccount.hidden = false
        AccountList.push(newAccount)
    })
    return AccountList
}

export { convertUTCDateToLocalDate, validateMoneyInput, createDataProviderForAccounts, downloadMetaTrader }