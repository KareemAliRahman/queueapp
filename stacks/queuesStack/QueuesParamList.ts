import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export type QueuesParamList = {
  NewQueue: undefined,
  QueueInfo: undefined,
  QueuesList: undefined
}

export type QueuesNavProps<T extends keyof QueuesParamList> = {
  navigation: StackNavigationProp<QueuesParamList, T>,
  route: RouteProp<QueuesParamList, T>
}