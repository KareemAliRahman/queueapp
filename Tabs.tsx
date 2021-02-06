import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'
import { TabsParamList } from './TabsParamList';
import { QueuesStack } from './stacks/queuesStack/QueuesStack';
import { MyQueuesStack } from './stacks/myQueuesStack/MyQueuesStack';
import { SettingsStack } from './stacks/settingsStack/SettingsStack';
import { StyleSheet } from 'react-native';

interface TabsProps{};

const tabs = createBottomTabNavigator<TabsParamList>();

export const Tabs: React.FC<TabsProps> = ({}) => {
    return(
        <tabs.Navigator initialRouteName='QueuesStack'
                
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'QueuesStack') {
                            iconName = focused ? 'search' : 'search';
                        } else if (route.name === 'MyQueuesStack') {
                            iconName = focused ? 'list' : 'list';
                        } else if (route.name === 'SettingsStack') {
                            iconName = focused ? 'settings-outline' :  'settings-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    // activeTintColor: '#0e7a9a', //default apple system blue
                    activeTintColor: '#fff',
                    inactiveTintColor: '#0c3652',
                    style: styles.tabs
                }}
            >
            <tabs.Screen options={{title:'Queues'}} name='QueuesStack'  component={QueuesStack} />
            <tabs.Screen options={{title:'My Queues'}} name='MyQueuesStack'  component={MyQueuesStack} />
            <tabs.Screen options={{title:'Settings'}}  name='SettingsStack'  component={SettingsStack} />
        </tabs.Navigator>
    );
}

const styles = StyleSheet.create({
    tabs:{
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        backgroundColor: '#0e639a',
    }
});