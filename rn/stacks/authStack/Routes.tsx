import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./AuthStack";
import { ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../providers/AuthProvider";
import { Center } from "../../helper-compnents/Center";
import { Tabs } from "../../Tabs";
import { cos } from "react-native-reanimated";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login, accessToken, authenticate } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  //Effect to handle already logged in user
  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(async (user) => {
        if (user) {
          try {
            await authenticate();
          } catch (e) {
            console.log(e.message);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // empty dependency array to prevent useless re-renders

  if (loading) {
    return (
      <Center>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {!user ? <AuthStack /> : <Tabs />}
    </NavigationContainer>
  );
};
