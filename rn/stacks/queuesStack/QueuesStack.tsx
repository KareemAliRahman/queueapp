import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { QueuesParamList } from './QueuesParamList';
import { NewQueue } from './screens/NewQueue';
import { QueueInfo } from './screens/QueueInfo';
import { QueuesList } from './screens/QueuesList';

interface QueuesStackProps{}

const Stack = createStackNavigator<QueuesParamList>();
const stackHeaderOptions = 
{
    title: 'Queues',
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
export const QueuesStack: React.FC<QueuesStackProps> = ({}) => {
    return(
        <Stack.Navigator screenOptions={stackHeaderOptions} initialRouteName='QueuesList'>
            <Stack.Screen name='QueuesList'  component={QueuesList} />
            <Stack.Screen name='QueueInfo'  component={QueueInfo} />
            <Stack.Screen name='NewQueue'  component={NewQueue} />
        </Stack.Navigator>
    );
};
