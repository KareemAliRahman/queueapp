import React from 'react';
import { StyleSheet, Text, View, Image }  from 'react-native';

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
  qrcode: string 
}

export const QueueCard: React.FC<QueueCardProps> = (props) => {
return(
  <View style={styles.queueCard}>
    <View style={styles.queueInfo}>
      <Text style={styles.queueName}>{props.queue.name}</Text>
      <Image style={styles.qrcode} source={{uri: props.queue.qrcode}}/>
    </View>
    <View style={{flexDirection: "row"}}>
        <MaterialCommunityIcons style={{flex:1}} name="doctor" size={20} color="teal" />
        <Text style={{flex: 8}}>{Speciality[props.doctor.speciality].split("_").join(" ")}</Text>
    </View>
    <View style={{flexDirection: "row"}}>
        <Entypo style={{flex:1}} name="address" size={20} color="teal" />
        <Text style={{flex:8}} >{props.doctor.address}</Text>
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
    fontWeight: 'bold'
  }
});