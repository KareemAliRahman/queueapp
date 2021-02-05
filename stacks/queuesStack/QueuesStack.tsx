import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { QueuesParamList } from './QueuesParamList';
import { NewQueue } from './screens/NewQueue';
import { QueueInfo } from './screens/QueueInfo';
import { QueuesList } from './screens/QueuesList';

interface QueuesStackProps{}

const Stack = createStackNavigator<QueuesParamList>();

export const QueuesStack: React.FC<QueuesStackProps> = ({}) => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='QueuesList'>
            <Stack.Screen name='QueuesList'  component={QueuesList} />
            <Stack.Screen name='QueueInfo'  component={QueueInfo} />
            <Stack.Screen name='NewQueue'  component={NewQueue} />
        </Stack.Navigator>
    );
};
