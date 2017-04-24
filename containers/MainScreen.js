import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

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

export class MainScreen extends Component {
  static navigationOptions = {
    title: 'RemindMe!',
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
        <Text style={styles.welcome}>
          Welcome to RemindMe!
        </Text>

        <View style={{flexDirection: 'column', justifyContent: 'space-around', height: 120}}>
          <Button
            onPress={() => navigate('Create')}
            title="Create Reminder"
            color="#101080"
            accessibilityLabel="Click to create a new reminder"
          />

          <Button
            onPress={() => navigate('List')}
            title="Show Reminders"
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
