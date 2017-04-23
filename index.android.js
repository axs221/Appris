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
  StackNavigator
} from 'react-navigation';

import {
  CreateScreen,
  MainScreen
} from './containers';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification );
  },

  popInitialNotification: true,
  requestPermissions: true,
});

const RemindMe = StackNavigator({
  Main: {screen: MainScreen},
  Create: {screen: CreateScreen},
});

AppRegistry.registerComponent('RemindMe', () => RemindMe);
