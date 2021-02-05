import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthStack } from './stacks/authStack/AuthStack';
import { Routes } from './stacks/authStack/Routes';

export default function App() {
  return(<AuthStack>
      <Routes/>
  </AuthStack>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
