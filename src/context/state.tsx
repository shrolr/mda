import React, { useContext, useReducer } from 'react';
import { AccountTypesDefault, CurrenciesDefault, initialDepositDefault, leveragesDefault } from '../constants/DefaultNetworkResponses';
import { IUserResponse } from '../interfaces';
import { DropDownPickerList } from '../models';
import { Accounts } from '../models/ApiModels/Account/AccountListApiModel';
import { CustomerNotificationInfoModel } from '../models/ApiModels/Notifications/NotificationApiModel';
import { WalletInfoData } from '../models/ApiModels/Wallet/WalletInfoApiModel';
import { WithdrawAccount } from '../models/ApiModels/Withdraw/WithdrawAccountList';
import { reducer, Action } from './reducer';

export interface StateContext {
  isAuthenticated: boolean;
  token?: string;
  user?: IUserResponse;
  accountTpyes: DropDownPickerList[],
  CurrenciesDefault: DropDownPickerList[],
  leveragesDefault: DropDownPickerList[],
  initialDepositDefault: DropDownPickerList[],
  mt4RealAccounts: Accounts[],
  mt5RealAccounts: Accounts[],
  mt4DemoAccounts: Accounts[],
  mt5DemoAccounts: Accounts[],
  walletInfo:WalletInfoData[],
  withdrawAccounts:WithdrawAccount[],
  notifications?:CustomerNotificationInfoModel,
}

export interface Store {
  context: StateContext;
  dispatch?: React.Dispatch<Action>;
}

const defaultState: StateContext = {
  isAuthenticated: false,
  accountTpyes: AccountTypesDefault,
  CurrenciesDefault: CurrenciesDefault,
  leveragesDefault: leveragesDefault,
  initialDepositDefault: initialDepositDefault,
  mt4RealAccounts:[],
  mt5RealAccounts:[],
  mt4DemoAccounts:[],
  mt5DemoAccounts:[],
  walletInfo:[],
  withdrawAccounts:[],

};
const myContext = React.createContext<Store>({ context: defaultState });

export const useStateContext = () => useContext(myContext);

export const StateProvider: React.FC = ({ children }) => {
  const [context, dispatch] = useReducer(reducer, defaultState);
  return <myContext.Provider value={{ context, dispatch }} children={children} />;
}

