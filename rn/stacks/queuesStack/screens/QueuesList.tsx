import React, { useEffect, useContext, useState } from "react";
import { QueuesNavProps } from "../QueuesParamList";
import { View, TouchableOpacity, FlatList } from "react-native";
import { QueueCard } from "../../../helper-compnents/QueueCard";
import { Queue } from "../../../helper-compnents/QueueCard";
import { authenticated, httpAllQueues } from "../../../api/api";
import { AuthContext } from "../../../providers/AuthProvider";

export function QueuesList({
  navigation,
  route,
}: QueuesNavProps<"QueuesList">) {
  const { authenticate, accessToken } = useContext(AuthContext);
  const [queues, setQueues] = useState<Queue[]>([]);

  const getQueues = async () => {
    const queuesResponse = await authenticated(
      authenticate,
      httpAllQueues,
      accessToken
    );
    const queues: Queue[] = queuesResponse.parsedBody?.queues;
    setQueues(queues);
    return queues;
  };

  useEffect(() => {
    getQueues()
      .then((queues) => {
        setQueues(queues);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []); // empty dependency array to prevent useless re-renders

  const queueCardRender = ({ item }: { item: Queue }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("QueueInfo", {
            queue: item,
          });
        }}
      >
        <QueueCard queue={item}></QueueCard>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        style={{ width: "100%" }}
        data={queues}
        keyExtractor={(item, idx) => item.name + idx}
        renderItem={queueCardRender}
      />
    </View>
  );
}
