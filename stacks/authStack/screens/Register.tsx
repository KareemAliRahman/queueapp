import React from 'react';
import { Center } from '../../../helper-compnents/Center';
import { AuthNavProps } from '../AuthParamList';
import { Text } from 'react-native';

export function Register({navigation, route} : AuthNavProps<'Register'>){
    return (
      <Center>
        <Text>
          I am a Register screen
        </Text>
      </Center>
    );
}