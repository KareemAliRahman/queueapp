import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AdminInfoCardProps {
  adminfname: String;
  adminlname: String;
}

export const AdminInfoCard: React.FC<AdminInfoCardProps> = (props) => {
  return (
    <View style={styles.adminInfoContainer}>
      <Text style={{ fontFamily: "Inter_500Medium" }}>Created by:</Text>
      <Text style={styles.adminName}>
        {props.adminfname + " " + props.adminlname}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  adminInfoContainer: {
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
  adminName: {
    fontWeight: "bold",
    color: "#0e639a",
    alignSelf: "flex-start",
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
  },
});
