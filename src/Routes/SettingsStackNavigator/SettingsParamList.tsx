import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type SettingsParamList = {
  Settings: undefined;
  Contact:undefined;
  Kunye:undefined;
};

export type SettingsStackNavProps<T extends keyof SettingsParamList> = {
  navigation: StackNavigationProp<SettingsParamList, T>;
  route: RouteProp<SettingsParamList, T>;
};
