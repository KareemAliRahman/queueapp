import React, { useContext } from "react";
import { Center } from "../../../helper-compnents/Center";
import { Button, View } from "react-native";
import { SettingsNavProps } from "../SettingsParamList";
import { AuthContext } from "../../../providers/AuthProvider";

export function Settings({ navigation, route }: SettingsNavProps<"Settings">) {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{ marginTop: 20, marginStart: 8, marginEnd: 8 }}>
      <Button
        title="logout"
        onPress={() => {
          console.log("logging out");
          logout();
        }}
      />
    </View>
  );
}
