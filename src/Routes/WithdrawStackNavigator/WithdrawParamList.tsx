import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type WithdrawParamList = {
  Withdraw: undefined;
  WithdrawHistory:undefined;
  NewWithdraw:undefined;
};

export type WithdrawStackNavProps<T extends keyof WithdrawParamList> = {
  navigation: StackNavigationProp<WithdrawParamList, T>;
  route: RouteProp<WithdrawParamList, T>;
};