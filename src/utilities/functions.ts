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


const validateMoneyInput = (value: string) => {
    if (value === "") return true;

    let pattern = /^[1-9]+(?:\.?\d{0,4}?)$/ig;
    return pattern.test(value);
}

const createDataProviderForAccounts = (mt4RealAccounts:Accounts[],mt5RealAccounts:Accounts[]) => {
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

export { convertUTCDateToLocalDate, validateMoneyInput,createDataProviderForAccounts }