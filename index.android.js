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
  ListScreen,
  MainScreen
} from './containers';

import * as reminders from './api/reminders';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification );
    reminders.remove(notification.id);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

const RemindMe = StackNavigator({
  Main: {screen: MainScreen},

  Create: {screen: CreateScreen},
  List: {screen: ListScreen},
});

AppRegistry.registerComponent('RemindMe', () => RemindMe);
