import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'
import { TabsParamList } from './TabsParamList';
import { QueuesStack } from './stacks/queuesStack/QueuesStack';
import { MyQueuesStack } from './stacks/myQueuesStack/MyQueuesStack';
import { SettingsStack } from './stacks/settingsStack/SettingsStack';

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
                activeTintColor: 'teal',
                inactiveTintColor: 'gray',
                }}
            >
            <tabs.Screen options={{title:'Queues'}} name='QueuesStack'  component={QueuesStack} />
            <tabs.Screen options={{title:'MyQueues'}} name='MyQueuesStack'  component={MyQueuesStack} />
            <tabs.Screen options={{title:'Settings'}}  name='SettingsStack'  component={SettingsStack} />
        </tabs.Navigator>
    );
}
