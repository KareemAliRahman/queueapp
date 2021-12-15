import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

interface QueueCardProps {
  queue: Queue;
}

export type Queue = {
  queue_id: number;
  name: string;
  description: string;
  organization: string;
  adminfname: string;
  adminlname: string;
  qrcode: string;
  address: string;
  queue_startsAt: Date;
};

export const QueueCard: React.FC<QueueCardProps> = (props) => {
  return (
    <View style={styles.queueCard}>
      <View style={styles.queueInfo}>
        <View style={{ alignContent: "stretch" }}>
          <Text style={styles.queueName}>{props.queue.name}</Text>
          <View style={styles.textLine}>
            <Feather name="hash" size={15} color="#0e639a" />
            <Text style={styles.textInfo}>{props.queue.queue_id}</Text>
          </View>
          {props.queue.organization && (
            <View style={styles.textLine}>
              <Octicons name="organization" size={15} color="#0e639a" />
              <Text style={styles.textInfo}>{props.queue.organization}</Text>
            </View>
          )}
        </View>
        <Image style={styles.qrcode} source={{ uri: props.queue.qrcode }} />
      </View>
      <View style={styles.textLine}>
        <Ionicons name="time" size={15} color="#0e639a" />
        <Text style={styles.textInfo}>
          {props.queue.queue_startsAt.toLocaleString()}
        </Text>
      </View>
      <View style={styles.textLine}>
        <Ionicons name="location" size={15} color="#0e639a" />
        <Text style={styles.textInfo}>{props.queue.address}</Text>
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
};

const styles = StyleSheet.create({
  queueCard: {
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qrcode: {
    width: 100,
    height: 100,
  },
  queueName: {
    fontWeight: "bold",
    color: "#0e639a",
    alignSelf: "flex-start",
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
  },
  textInfo: {
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    fontFamily: "Inter_500Medium",
    marginStart: 10,
  },
  textLine: {
    flexDirection: "row",
    alignItems: "center",
  },
});
