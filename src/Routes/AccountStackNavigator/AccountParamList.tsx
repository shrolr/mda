import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type AccountParamList = {
  Account: undefined;
  
};

export type AccountStackNavProps<T extends keyof AccountParamList> = {
  navigation: StackNavigationProp<AccountParamList, T>;
  route: RouteProp<AccountParamList, T>;
};
