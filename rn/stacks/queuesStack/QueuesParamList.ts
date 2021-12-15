import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Queue } from "../../helper-compnents/QueueCard";

export type QueuesParamList = {
  QueueInfo: { queue: Queue };
  QueuesList: undefined;
};

export type QueuesNavProps<T extends keyof QueuesParamList> = {
  navigation: StackNavigationProp<QueuesParamList, T>;
  route: RouteProp<QueuesParamList, T>;
};
