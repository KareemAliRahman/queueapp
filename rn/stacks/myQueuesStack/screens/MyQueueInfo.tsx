import React from 'react';
import { QueueInfoView } from '../../../helper-compnents/QueueInfoView';
import { MyQueuesNavProps } from '../MyQueuesParamList';

export function MyQueueInfo({navigation, route} : MyQueuesNavProps<'MyQueueInfo'>) {
    return (
      <QueueInfoView queue={route.params.queue} />
    );
}