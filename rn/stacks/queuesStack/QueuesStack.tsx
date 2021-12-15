import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button, TouchableOpacity, Text } from "react-native";
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { QueuesNavProps, QueuesParamList } from "./QueuesParamList";
import { QueueInfo } from "./screens/QueueInfo";
import { QueuesList } from "./screens/QueuesList";

interface QueuesStackProps {}

const Stack = createStackNavigator<QueuesParamList>();
const stackHeaderOptions = {
  title: "Queues",
  headerStyle: {
    backgroundColor: "#0e639a",
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  headerTitleStyle: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Inter_600SemiBold",
    fontSize: 25,
  },
};
export const QueuesStack: React.FC<QueuesStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={stackHeaderOptions}
      initialRouteName="QueuesList"
    >
      {/* <Stack.Screen name='QueuesList'  component={QueuesList} /> */}
      <Stack.Screen
        name="QueuesList"
        component={QueuesList}
        options={({ navigation, route }: QueuesNavProps<"QueuesList">) => ({
          title: "Queues",
        })}
      />
      <Stack.Screen
        name="QueueInfo"
        component={QueueInfo}
        options={{ title: "Queue" }}
      />
    </Stack.Navigator>
  );
};
