import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type MarketParamList = {
  Market: undefined;
  
};

export type MarketStackNavProps<T extends keyof MarketParamList> = {
  navigation: StackNavigationProp<MarketParamList, T>;
  route: RouteProp<MarketParamList, T>;
};
