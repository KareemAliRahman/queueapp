import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export type MyQueuesParamList = {
  MyQueueInfo: undefined,
  MyQueuesList: undefined 
}

export type MyQueuesNavProps<T extends keyof MyQueuesParamList> ={
  navigation: StackNavigationProp<MyQueuesParamList, T>,
  route: RouteProp<MyQueuesParamList, T>
}