import { User } from "../models";
import { StateContext } from "./state";
export enum ActionType {
  SIGN_IN = 'Log out',
  SIGN_OUT = 'Sign out',
}

export type Action =
  | { type: ActionType.SIGN_IN, payload: { user: User } }
  | { type: ActionType.SIGN_OUT }


export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return { ...state, isAuthenticated: true, user: action.payload.user }
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false }
    default:
      throw new Error('Not among actions');
  }
}