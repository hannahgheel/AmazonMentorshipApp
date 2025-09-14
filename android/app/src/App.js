import React from 'react';
import 'react-native-gesture-handler';
import '@react-native-firebase/app';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}