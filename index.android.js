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

const Appris = StackNavigator({
  Main: {screen: MainScreen},

  Create: {screen: CreateScreen},
  List: {
    path: ':limitToToday',
    screen: ListScreen
  },
});

AppRegistry.registerComponent('Appris', () => Appris);
