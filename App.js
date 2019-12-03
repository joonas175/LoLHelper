import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import { createAppContainer } from 'react-navigation';

let bottomTab = createBottomTabNavigator({
  Main: MainScreen,
  Settings: SettingsScreen
})

export default createAppContainer(bottomTab)

