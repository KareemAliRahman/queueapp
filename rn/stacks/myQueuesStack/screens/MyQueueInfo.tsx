import React from 'react';
import { Center } from '../../../helper-compnents/Center';
import { Text } from 'react-native';
import { MyQueuesNavProps } from '../MyQueuesParamList';

export function MyQueueInfo({navigation, route} : MyQueuesNavProps<'MyQueueInfo'>){
    return (
      <Center>
        <Text>
          I am a MyQueueInfo screen
        </Text>
      </Center>
    );
}