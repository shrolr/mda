import { IUserResponse } from "../interfaces";
import { DropDownPickerList } from "../models";
import { Accounts } from "../models/ApiModels/Account/AccountListApiModel";
import { WalletInfoData } from "../models/ApiModels/Wallet/WalletInfoApiModel";
import { StateContext } from "./state";
export enum ActionType {
  SIGN_IN = 'Log out',
  SIGN_OUT = 'Sign out',
  SET_ACCOUNT_TYPES = 'SET ACCOUNT TYPES',
  SET_USER_ACCOUNTS = 'SET USER ACCOUNTS',
  SET_WALLET_INFO = 'SET WALLET INFO',
}

export type Action =
  | { type: ActionType.SIGN_IN, payload: { user: IUserResponse } }
  | { type: ActionType.SIGN_OUT }
  | { type: ActionType.SET_ACCOUNT_TYPES, payload: { accountTpyes: DropDownPickerList[] } }
  | { type: ActionType.SET_USER_ACCOUNTS, payload: { accounts: Accounts[] } }
  | { type: ActionType.SET_WALLET_INFO, payload: { walletInfo: WalletInfoData[] } }


export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return { ...state, isAuthenticated: true, user: action.payload.user }
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false }
    case ActionType.SET_ACCOUNT_TYPES:
      return { ...state, accountTpyes: action.payload.accountTpyes }
    case ActionType.SET_WALLET_INFO:
      return { ...state, walletInfo: action.payload.walletInfo }
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