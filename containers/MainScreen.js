import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

export class MainScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>

        <View style={{flexDirection: 'column', justifyContent: 'space-around', height: 100}}>
          <Button
            onPress={() => navigate('Create')}
            title="Create Reminder"
            color="#101080"
            accessibilityLabel="Click to create a new reminder"
          />

          <Button
            onPress={() => PushNotification.cancelAllLocalNotifications()}
            title="Cancel Reminders"
            accessibilityLabel="Click to delete all existing reminders"
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
