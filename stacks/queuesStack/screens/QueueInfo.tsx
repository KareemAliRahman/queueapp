import { Center } from '../../../helper-compnents/Center';
import { Text } from 'react-native';
import { QueuesNavProps } from '../QueuesParamList';

export function QueueInfo({navigation, route} : QueuesNavProps<'QueueInfo'>){
    return (
      <Center>
        <Text>
          I am a QueueInfo screen
        </Text>
      </Center>
    );
}