import React from 'react';
import { StyleSheet, Text, View }  from 'react-native';

interface QueueCardProps {

}

export const QueueCard: React.FC<QueueCardProps> = (props) => {
    return (
      <View style={styles.queueCard}>
        <Text>I am a doctor card</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  queueCard: {

  }
});