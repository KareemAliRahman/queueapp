import React from 'react';
import { StyleSheet, Text, View }  from 'react-native';

interface QueueCardProps {
  queue: Queue
}

export type Queue = {
  queue_id: number,
  name: string,
  description: string,
  organization: string,
  adminfname: string,
  adminlname: string
}

export const QueueCard: React.FC<QueueCardProps> = (props) => {
    return (
      <View style={styles.queueCard}>
        <Text>I am a queue card</Text>
        <Text>I am a queue card</Text>
        <Text>{props.queue.adminfname}
        </Text>
        <Text>I am a queue card</Text>
      </View>
    );
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
  }
});