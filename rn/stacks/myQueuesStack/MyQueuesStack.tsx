import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MyQueuesNavProps, MyQueuesParamList } from './MyQueuesParamList';
import { MyQueueInfo } from './screens/MyQueueInfo';
import { MyQueuesList } from './screens/MyQueuesList';
import { NewQueue } from './screens/NewQueue';
import { Ionicons } from '@expo/vector-icons'; 
import { NavigationRouteContext } from '@react-navigation/native';

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
            <Stack.Screen name='MyQueuesList'  component={MyQueuesList} 
                    options={({navigation, route}: MyQueuesNavProps<'MyQueuesList'>) => ({
                        title: "My Queues",
                        headerTitleStyle: styles.headerTitle,
                        headerRight: () => (
                          <TouchableOpacity
                            onPress={() => navigation.navigate('NewQueue')}
                          >
                              <Ionicons name="add-circle-sharp" size={30} color="#fff" />
                          </TouchableOpacity>
                        ),
                      })}
                    />
            <Stack.Screen name='MyQueueInfo'  component={MyQueueInfo} options={{title: "My Queue",
                headerTitleStyle: styles.headerTitle}} />
            <Stack.Screen name='NewQueue'  component={NewQueue} options={{title: "New", 
                headerTitleStyle: styles.headerTitle}}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 20
    },
});