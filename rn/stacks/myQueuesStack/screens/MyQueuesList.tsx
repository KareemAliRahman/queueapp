import React, { useEffect , useContext, useState } from 'react';
import {View , TouchableOpacity, FlatList} from 'react-native';
import { QueueCard } from '../../../helper-compnents/QueueCard';
import { Queue } from '../../../helper-compnents/QueueCard';
import { authenticated, httpAllQueues, httpMyQueues } from '../../../api/api';
import { AuthContext } from '../../../providers/AuthProvider';
import { MyQueuesNavProps } from '../MyQueuesParamList';

export function MyQueuesList({navigation, route} : MyQueuesNavProps<'MyQueuesList'>){
  const {authenticate, accessToken} = useContext(AuthContext);
  const [queues, setQueues] = useState<Queue[]>([]);

  const getMyQueues = async () => {
    const queuesResponse  = await authenticated(authenticate, httpMyQueues, accessToken);
    const queues : Queue[] = queuesResponse.parsedBody?.queues;
    setQueues(queues);
    return queues;
  }

  useEffect(() => {
    getMyQueues().then(queues => {
      setQueues(queues);
    }).catch(e => {
      console.log(e.message);
    });
  },[]); // empty dependency array to prevent useless re-renders

  const queueCardRender = ({item} : {item : Queue})  => {
    return(
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('MyQueueInfo',{
                    queue: item});
            }}>
              <QueueCard queue={item}></QueueCard>
        </TouchableOpacity>
    );
  };

  return(
      <View>
          <FlatList
              style={{width: "100%"}}
              data={queues}
              keyExtractor={(item , idx) => item.name + idx}
              renderItem={queueCardRender}/>
      </View>
  );
}