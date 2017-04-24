import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import {
  NavigationActions,
  StackNavigator
} from 'react-navigation';

import {
  CreateScreen,
  ListScreen,
  MainScreen
} from './containers';

const RemindMe = StackNavigator({
  Main: {screen: MainScreen},

  Create: {screen: CreateScreen},
  List: {screen: ListScreen},
});

AppRegistry.registerComponent('RemindMe', () => RemindMe);
