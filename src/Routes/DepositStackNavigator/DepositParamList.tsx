import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type DepositsParamList = {
  Deposits: undefined;
  DepositsHistory:undefined;
  NewDeposit:undefined;
  NewDepositBankAccount:undefined;
};

export type DepositsStackNavProps<T extends keyof DepositsParamList> = {
  navigation: StackNavigationProp<DepositsParamList, T>;
  route: RouteProp<DepositsParamList, T>;
};
