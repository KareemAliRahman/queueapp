import { Center } from '../../../helper-compnents/Center';
import { Text } from 'react-native';
import { QueuesNavProps } from '../QueuesParamList';

export function QueuesList({navigation, route} : QueuesNavProps<'QueuesList'>){
    return (
      <Center>
        <Text>
          I am a QueuesList screen
        </Text>
      </Center>
    );
}