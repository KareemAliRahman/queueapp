import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {AuthParamList} from './AuthParamList';
import {Login} from './screens/Login'
import { Register } from './screens/Register';

interface AuthStackProps{}

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
            <Stack.Screen name='Login'  component={Login} />
            <Stack.Screen name='Register'  component={Register} />
        </Stack.Navigator>
    );
};
