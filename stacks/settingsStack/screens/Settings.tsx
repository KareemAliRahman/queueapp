import { Center } from '../../../helper-compnents/Center';
import { Text } from 'react-native';
import { SettingsNavProps } from '../SettingsParamList';

export function Settings({navigation, route} : SettingsNavProps<'Settings'>){
    return (
      <Center>
        <Text>
          I am a Settings screen
        </Text>
      </Center>
    );
}