import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from "react-native";

import AppTabNavigator from './AppNavigator'

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{
        flex: 1, backgroundColor: '#f2f2f2'
      }}>
        <AppTabNavigator />
      </SafeAreaView>
    )
  }
}
