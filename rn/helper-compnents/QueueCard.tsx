import React from 'react';
import { StyleSheet, Text, View, Image }  from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

interface QueueCardProps {
  queue: Queue
}

export type Queue = {
  queue_id: number,
  name: string,
  description: string,
  organization: string,
  adminfname: string,
  adminlname: string,
  qrcode: string,
  address: string,
  startsAt: Date
}

export const QueueCard: React.FC<QueueCardProps> = (props) => {
  return(
    <View style={styles.queueCard}>
      <View style={styles.queueInfo}>
        <View style={styles.textInfo}>
          <Text style={styles.queueName}>{props.queue.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Feather name="hash" size={24} color="#0e639a" />
            <Text>{props.queue.queue_id}</Text>
          </View>  
          <View style={{flex: 10, flexDirection: 'row'}}>
            <Octicons name="organization" size={24} color="#0e639a" />
            <Text style={{flex: 8}}>{props.queue.organization}</Text>
          </View>  
        </View>
        <Image style={styles.qrcode} source={{uri: props.queue.qrcode}}/>
      </View>
      <View style={{flexDirection: "row"}}>
          <MaterialIcons name="queue" size={24} color="#0e639a" />
          <Text style={{flex: 8}}>{props.queue.startsAt}</Text>
      </View>
      <View style={{flexDirection: "row"}}>
          <Text style={{flex:8}} >{props.queue.address}</Text>
      </View>
    </View>
  );
    // return (
    //   <View style={styles.queueCard}>
    //     <Text>I am a queue card</Text>
    //     <Text>I am a queue card</Text>
    //     <Text>{props.queue.adminfname}
    //     </Text>
    //     <Image style={styles.qrcode} source={{uri: props.queue.qrcode }}/>
    //     {/* <Text>{props.queue.qrcode}</Text> */}
    //     <Text>I am a queue card</Text>
    //   </View>
    // );
}

const styles = StyleSheet.create({
  queueCard: {
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginHorizontal: 4,
    marginVertical: 6,
    paddingStart: 8,
    paddingEnd: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  queueInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qrcode: {
    width: 100, 
    height: 100
  },
  queueName: {
    fontWeight: 'bold',
    color: '#0e639a',
    alignSelf: 'flex-start',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20
  },
  textInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});