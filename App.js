import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigator from './components/BottomTabNavigator';

export default class App extends React.Component {
  render() {
    return (
      <BottomTabNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
