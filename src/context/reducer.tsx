import { IUserResponse } from "../interfaces";
import { DropDownPickerList } from "../models";
import { Accounts } from "../models/ApiModels/Account/AccountListApiModel";
import { DepositAccount } from "../models/ApiModels/Deposit/DepositAccountList";
import { SystemDepositAccounts } from "../models/ApiModels/Deposit/SystemDepositAccounts";
import { CustomerNotificationInfoModel } from "../models/ApiModels/Notifications/NotificationApiModel";
import { WalletInfoData } from "../models/ApiModels/Wallet/WalletInfoApiModel";
import { WithdrawAccount } from "../models/ApiModels/Withdraw/WithdrawAccountList";
import { StateContext } from "./state";
export enum ActionType {
  SIGN_IN = 'Log out',
  SIGN_OUT = 'Sign out',
  SET_ACCOUNT_TYPES = 'SET ACCOUNT TYPES',
  SET_USER_ACCOUNTS = 'SET USER ACCOUNTS',
  SET_WALLET_INFO = 'SET WALLET INFO',
  SET_USER_WITHDRAW_ACCOUNTS = 'SET USER WITHDRAW ACCOUNTS',
  SET_USER_DEPOSIT_ACCOUNTS = 'SET USER DEPOSIT ACCOUNTS',
  SET_SYSTEM_DEPOSIT_ACCOUNTS = "SET SYSTEM DEPOSIT ACCOUNTS",
  SET_NOTIFICATIONS = "SET NOTIFICATIONS",
  SET_LOCALE = "SET LOCALE",
}

export type Action =
  | { type: ActionType.SIGN_IN, payload: { user: IUserResponse } }
  | { type: ActionType.SIGN_OUT }
  | { type: ActionType.SET_ACCOUNT_TYPES, payload: { accountTpyes: DropDownPickerList[] } }
  | { type: ActionType.SET_USER_ACCOUNTS, payload: { accounts: Accounts[] } }
  | { type: ActionType.SET_WALLET_INFO, payload: { walletInfo: WalletInfoData  } }
  | { type: ActionType.SET_USER_WITHDRAW_ACCOUNTS, payload: { withdrawAccounts: WithdrawAccount[] } }
  | { type: ActionType.SET_USER_DEPOSIT_ACCOUNTS, payload: { depositAccounts: DepositAccount[] } }
  | { type: ActionType.SET_SYSTEM_DEPOSIT_ACCOUNTS, payload: { systemDepositAccounts: SystemDepositAccounts[] } }
  | { type: ActionType.SET_NOTIFICATIONS, payload: { notifications: CustomerNotificationInfoModel } }
  | { type: ActionType.SET_LOCALE, payload: { locale: "en" | "tr" } }



export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return { ...state, isAuthenticated: true, user: action.payload.user }
    case ActionType.SIGN_OUT:
      return {
        ...state, isAuthenticated: false,
        user:undefined,
        token:"",
        mt4RealAccounts: [],
        mt5RealAccounts: [],
        mt4DemoAccounts: [],
        mt5DemoAccounts: [],
        systemDepositAccounts: [],
        withdrawAccounts: [],
        depositAccounts: [],
      }
    case ActionType.SET_ACCOUNT_TYPES:
      return { ...state, accountTpyes: action.payload.accountTpyes }
    case ActionType.SET_WALLET_INFO:
      return { ...state, walletInfo: action.payload.walletInfo }
    case ActionType.SET_LOCALE:
      return { ...state, locale: action.payload.locale }
    case ActionType.SET_USER_WITHDRAW_ACCOUNTS:
      return { ...state, withdrawAccounts: action.payload.withdrawAccounts }
    case ActionType.SET_USER_DEPOSIT_ACCOUNTS:
      return { ...state, depositAccounts: action.payload.depositAccounts }
    case ActionType.SET_SYSTEM_DEPOSIT_ACCOUNTS:
      return { ...state, systemDepositAccounts: action.payload.systemDepositAccounts }
    case ActionType.SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload.notifications }
    case ActionType.SET_USER_ACCOUNTS:
      let accounts = action.payload.accounts
      let mt4RealAccounts = (accounts.filter((item) => item.tradingPlatform === "MetaTrader4" && item.isDemo === false))
      let mt4DemoAccounts = (accounts.filter((item) => item.tradingPlatform === "MetaTrader4" && item.isDemo === true))
      let mt5DemoAccounts = (accounts.filter((item) => item.tradingPlatform === "MetaTrader5" && item.isDemo === true))
      let mt5RealAccounts = (accounts.filter((item) => item.tradingPlatform === "MetaTrader5" && item.isDemo === false))
      return { ...state, mt4RealAccounts, mt4DemoAccounts, mt5DemoAccounts, mt5RealAccounts }
    default:
      throw new Error('Not among actions');
  }
}