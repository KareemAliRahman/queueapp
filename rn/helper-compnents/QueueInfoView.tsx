import React from "react";
import { Queue } from "./QueueCard";
import { StyleSheet, Text, View, Image } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

interface QueueInfoViewProps {
  queue: Queue;
}

export const QueueInfoView: React.FC<QueueInfoViewProps> = (props) => {
  return (
    <View style={styles.queueInfoContainer}>
      <Image style={styles.qrcode} source={{ uri: props.queue.qrcode }} />
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
      {props.queue.description && (
        <View style={styles.textLine}>
          <Octicons name="info" size={15} color="#0e639a" />
          <Text style={styles.textInfo}>{props.queue.description}</Text>
        </View>
      )}
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
};

const styles = StyleSheet.create({
  queueInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginHorizontal: 4,
    marginTop: 6,
    paddingStart: 8,
    paddingEnd: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  qrcode: {
    width: 350,
    height: 350,
  },
  queueName: {
    fontWeight: "bold",
    color: "#0e639a",
    alignSelf: "flex-start",
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
  },
  textInfo: {
    fontFamily: "Inter_500Medium",
    marginStart: 10,
  },
  textLine: {
    flexDirection: "row",
    alignItems: "center",
  },
});
