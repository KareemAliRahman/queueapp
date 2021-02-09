import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Queue } from "../../helper-compnents/QueueCard"

export type MyQueuesParamList = {
  NewQueue: undefined,
  MyQueueInfo: {queue: Queue},
  MyQueuesList: undefined 
}

export type MyQueuesNavProps<T extends keyof MyQueuesParamList> ={
  navigation: StackNavigationProp<MyQueuesParamList, T>,
  route: RouteProp<MyQueuesParamList, T>
}