import { Center } from '../../../helper-compnents/Center';
import { Text } from 'react-native';
import { MyQueuesNavProps } from '../MyQueuesParamList';

export function MyQueuesList({navigation, route} : MyQueuesNavProps<'MyQueuesList'>){
    return (
      <Center>
        <Text>
          I am a MyQueuesList screen
        </Text>
      </Center>
    );
}