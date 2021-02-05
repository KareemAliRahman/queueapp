import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Center } from './helper-compnents/Center';
import { AuthProvider } from './providers/AuthProvider';
import { Routes } from './stacks/authStack/Routes';

export default function App() {
  return(
    // <Center>
    //   <Text>ksjafokjf;kj</Text>
    // </Center>
    <AuthProvider>
        <Routes/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
