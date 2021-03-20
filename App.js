import MainNavigator from './src/containers/main/MainNavigator';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

console.disableYellowBox = true;

function App() {
  return <NavigationContainer>{<MainNavigator />}</NavigationContainer>;
}

export default App;
