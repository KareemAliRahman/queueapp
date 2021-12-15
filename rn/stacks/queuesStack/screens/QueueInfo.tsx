import React from "react";
import { QueuesNavProps } from "../QueuesParamList";
import { QueueInfoView } from "../../../helper-compnents/QueueInfoView";
import { ScrollView } from "react-native-gesture-handler";
import { AdminInfoCard } from "../../../helper-compnents/AdminInfoCard";

export function QueueInfo({ navigation, route }: QueuesNavProps<"QueueInfo">) {
  return (
    <ScrollView>
      <QueueInfoView queue={route.params.queue} />
      <AdminInfoCard
        adminfname={route.params.queue.adminfname}
        adminlname={route.params.queue.adminlname}
      />
    </ScrollView>
  );
}
