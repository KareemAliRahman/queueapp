import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {AuthParamList} from './AuthParamList';
import {Login} from './screens/Login'
import { Register } from './screens/Register';

interface AuthStackProps{}

const Stack = createStackNavigator<AuthParamList>();

const stackHeaderOptions = 
{
    title: 'queues',
    headerStyle: {
        backgroundColor: '#0e639a',
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        alignSelf: 'center',
        fontFamily: 'LobsterTwo_700Bold',
        fontSize: 25
}};

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
    
    return(
        <Stack.Navigator screenOptions={stackHeaderOptions}>
            <Stack.Screen name='Login'  component={Login} />
            <Stack.Screen name='Register'  component={Register} />
        </Stack.Navigator>
    );
};
