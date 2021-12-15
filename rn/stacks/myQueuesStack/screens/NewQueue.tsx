import React from "react";
import { Center } from "../../../helper-compnents/Center";
import { Text } from "react-native";
import { QueuesNavProps } from "../QueuesParamList";

export function NewQueue({ navigation, route }: QueuesNavProps<"NewQueue">) {
  return (
    <Center>
      <Text>I am a NewQueue screen</Text>
    </Center>
  );
}
