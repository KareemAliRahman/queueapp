import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { SettingsParamList } from './SettingsParamList';
import { Settings } from './screens/Settings'

interface SettingsStackProps {}

const Stack = createStackNavigator<SettingsParamList>();

export const SettingsStack: React.FC<SettingsStackProps> = ({}) => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Settings'>
            <Stack.Screen name='Settings'  component={Settings} />
        </Stack.Navigator>
    );
}
