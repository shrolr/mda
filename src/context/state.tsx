import React, { useContext, useReducer } from 'react';
import { User } from '../models';
import { reducer, Action } from './reducer';

export interface StateContext {
  isAuthenticated: boolean;
  token?: string;
  user?:User;
}

export interface Store {
  context: StateContext;
  dispatch?: React.Dispatch<Action>;
}

const defaultState: StateContext = { isAuthenticated: false, };
const myContext = React.createContext<Store>({ context: defaultState });

export const useStateContext = () => useContext(myContext);

export const StateProvider: React.FC = ({ children }) => {
  const [context, dispatch] = useReducer(reducer, defaultState);
  return <myContext.Provider value={{ context, dispatch }} children={children} />;
}

