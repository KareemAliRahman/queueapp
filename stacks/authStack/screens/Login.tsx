import React from 'react';
import { Center } from '../../../helper-compnents/Center';
import { AuthNavProps } from '../AuthParamList';
import { Text } from 'react-native';

export function Login({navigation, route} : AuthNavProps<'Login'>){
    return (
      <Center>
        <Text>
          I am a login screen
        </Text>
      </Center>
    );
}