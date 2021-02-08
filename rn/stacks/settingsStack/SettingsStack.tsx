import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { SettingsParamList } from './SettingsParamList';
import { Settings } from './screens/Settings'

interface SettingsStackProps {}

const Stack = createStackNavigator<SettingsParamList>();
const stackHeaderOptions = 
{
    title: 'settings',
    headerStyle: {
        backgroundColor: '#0e639a',
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        alignSelf: 'center',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 25
}};


export const SettingsStack: React.FC<SettingsStackProps> = ({}) => {
    return(
        <Stack.Navigator screenOptions={stackHeaderOptions} initialRouteName='Settings'>
            <Stack.Screen name='Settings'  component={Settings} />
        </Stack.Navigator>
    );
}
