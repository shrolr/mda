import { IUserResponse } from "../interfaces";
import { DropDownPickerList } from "../models";
import { StateContext } from "./state";
export enum ActionType {
  SIGN_IN = 'Log out',
  SIGN_OUT = 'Sign out',
  SET_ACCOUNT_TYPES = 'SET ACCOUNT TYPES',
}

export type Action =
  | { type: ActionType.SIGN_IN, payload: { user: IUserResponse } }
  | { type: ActionType.SIGN_OUT }
  | { type: ActionType.SET_ACCOUNT_TYPES, payload: { accountTpyes: DropDownPickerList[] } }


export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return { ...state, isAuthenticated: true, user: action.payload.user }
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false }
    case ActionType.SET_ACCOUNT_TYPES:
      return { ...state, accountTpyes: action.payload.accountTpyes }
    default:
      throw new Error('Not among actions');
  }
}