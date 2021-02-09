import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MyQueuesParamList } from './MyQueuesParamList';
import { MyQueueInfo } from './screens/MyQueueInfo';
import { MyQueuesList } from './screens/MyQueuesList';
import { NewQueue } from './screens/NewQueue';

interface MyQueuesStackProps{}

const Stack = createStackNavigator<MyQueuesParamList>();
const stackHeaderOptions = 
{
    headerStyle: {
        backgroundColor: '#0e639a',
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15
    }
};

export const MyQueuesStack: React.FC<MyQueuesStackProps> = ({}) => {
    return(
        <Stack.Navigator screenOptions={stackHeaderOptions} initialRouteName='MyQueuesList'>
            {/* <Stack.Screen name='MyQueuesList'  component={MyQueuesList} /> */}

            <Stack.Screen name='MyQueuesList'  component={MyQueuesList} 
                    options={{
                        headerTitle: props => (<Text style={styles.headerTitle}>Queues</Text>),
                        headerRight: () => (
                          <TouchableOpacity
                            onPress={() => alert('This is a button!')}
                          ><Text style={styles.headerTitle}>+</Text></TouchableOpacity>
                        ),
                      }}
                    />
            <Stack.Screen name='MyQueueInfo'  component={MyQueueInfo} options={{headerTitle: props => (<Text style={styles.headerTitle}>Queue</Text>)}} />
            <Stack.Screen name='NewQueue'  component={NewQueue} options={{title: "New"}} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 20
    }
});