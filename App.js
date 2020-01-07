import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import { createAppContainer } from 'react-navigation';
import Ionicons  from 'react-native-vector-icons/Ionicons';

const iconAndTextColor = "black"

const styles = StyleSheet.create({
  tabBar: {
    borderWidth: 0
  }
})

let bottomTab = createBottomTabNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Ionicons name={"md-search"} size={24} color={tintColor}/>
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Ionicons name={"md-settings"} size={24} color={tintColor}/>
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: "#4ecca3",
    inactiveTintColor: "#eeeeee",
    activeBackgroundColor: "#232931",
    inactiveBackgroundColor: "#393e46",
    tabStyle: styles.tabBar
  }
})



export default createAppContainer(bottomTab)

