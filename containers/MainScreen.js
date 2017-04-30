import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

import {
  ListScreen
} from './';

import {
  NavigationActions
} from 'react-navigation';

import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as reminders from '../api/reminders';
import * as localReminders from '../api/localReminders';

export class MainScreen extends Component {
  static navigationOptions = {
    title: 'Today',
  };

  constructor(props) {
    super(props);

    const { dispatch } = props.navigation;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    })

    PushNotification.configure({
      onNotification: function(notification) {
        reminders.remove(notification.id);
        dispatch(resetAction)
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ListScreen />

        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 100}}>
          <Button
            onPress={() => navigate('Create')}
            title="Create Reminder"
            color="#101080"
            accessibilityLabel="Click to create a new reminder"
          />

          <Button
            onPress={() => navigate('List', { showAll: true })}
            title="Show All Reminders"
            color="#101080"
            accessibilityLabel="Click to create a new reminder"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f8FF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
