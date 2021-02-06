import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MyQueuesParamList } from './MyQueuesParamList';
import { MyQueueInfo } from './screens/MyQueueInfo';
import { MyQueuesList } from './screens/MyQueuesList';

interface MyQueuesStackProps{}

const Stack = createStackNavigator<MyQueuesParamList>();

const stackHeaderOptions = 
{
    title: "",
    headerStyle: {
        backgroundColor: '#0e639a',
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15
    },
    headerTintColor: '#fff',
}
export const MyQueuesStack: React.FC<MyQueuesStackProps> = ({}) => {
    return(
        <Stack.Navigator screenOptions={stackHeaderOptions} initialRouteName='MyQueuesList'>
            <Stack.Screen name='MyQueuesList'  component={MyQueuesList} />
            <Stack.Screen name='MyQueueInfo'  component={MyQueueInfo} />
        </Stack.Navigator>
    );
};
