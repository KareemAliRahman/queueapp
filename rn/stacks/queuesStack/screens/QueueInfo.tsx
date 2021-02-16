import React from 'react';
import { QueuesNavProps } from '../QueuesParamList';
import { QueueInfoView } from '../../../helper-compnents/QueueInfoView';

export function QueueInfo({navigation, route} : QueuesNavProps<'QueueInfo'>){
    return (
      <QueueInfoView queue={route.params.queue} />
    );
}