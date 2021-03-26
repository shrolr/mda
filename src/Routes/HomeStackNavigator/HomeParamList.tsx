import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type HomeParamList = {
  Home: undefined;
  Wallet: undefined;
  WalletInfoScreen:undefined;
  ProfileScreen:undefined;
  Transfer:undefined;
  NewTransfer:undefined;
  TransferHistory:undefined;
  NotificationScreen:undefined;
};

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
