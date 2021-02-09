import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import React from 'react';
import { MyQueuesParamList } from './MyQueuesParamList';
import { MyQueueInfo } from './screens/MyQueueInfo';
import { MyQueuesList } from './screens/MyQueuesList';
import { NewQueue } from './screens/NewQueue';

interface MyQueuesStackProps{}

const Stack = createStackNavigator<MyQueuesParamList>();
const stackHeaderOptions = 
{
    title: 'My Queues',
    headerStyle: {
        backgroundColor: '#0e639a',
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        alignSelf: 'center',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 20
}};
export const MyQueuesStack: React.FC<MyQueuesStackProps> = ({}) => {
    return(
        <Stack.Navigator screenOptions={stackHeaderOptions} initialRouteName='MyQueuesList'>
            <Stack.Screen name='MyQueuesList'  component={MyQueuesList}  />
            <Stack.Screen name='MyQueueInfo'  component={MyQueueInfo} options={{title: "Queue"}} />
            <Stack.Screen name='NewQueue'  component={NewQueue} options={{title: "New"}} />
        </Stack.Navigator>
    );
};
