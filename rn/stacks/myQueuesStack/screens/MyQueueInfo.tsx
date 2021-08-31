import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { AdminInfoCard } from '../../../helper-compnents/AdminInfoCard';
import { QueueInfoView } from '../../../helper-compnents/QueueInfoView';
import { MyQueuesNavProps } from '../MyQueuesParamList';

export function MyQueueInfo({navigation, route} : MyQueuesNavProps<'MyQueueInfo'>) {
  return (
    <ScrollView>
      <QueueInfoView queue={route.params.queue} />
      <AdminInfoCard adminfname={route.params.queue.adminfname}
                      adminlname={route.params.queue.adminlname} />
    </ScrollView>
  );
}