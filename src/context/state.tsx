import React, { useContext, useReducer } from 'react';
import {AccountTypesDefault, CurrenciesDefault, initialDepositDefault, leveragesDefault} from '../constants/DefaultNetworkResponses';
import { IUserResponse } from '../interfaces';
import { DropDownPickerList } from '../models';
import { reducer, Action } from './reducer';

export interface StateContext {
  isAuthenticated: boolean;
  token?: string;
  user?:IUserResponse;
  accountTpyes:DropDownPickerList[],
  CurrenciesDefault:DropDownPickerList[],
  leveragesDefault:DropDownPickerList[],
  initialDepositDefault:DropDownPickerList[],
}

export interface Store {
  context: StateContext;
  dispatch?: React.Dispatch<Action>;
}

const defaultState: StateContext = { isAuthenticated: false, accountTpyes:AccountTypesDefault,CurrenciesDefault:CurrenciesDefault,leveragesDefault:leveragesDefault,initialDepositDefault:initialDepositDefault};
const myContext = React.createContext<Store>({ context: defaultState });

export const useStateContext = () => useContext(myContext);

export const StateProvider: React.FC = ({ children }) => {
  const [context, dispatch] = useReducer(reducer, defaultState);
  return <myContext.Provider value={{ context, dispatch }} children={children} />;
}

