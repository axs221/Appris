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

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification );
  },

  popInitialNotification: true,
  requestPermissions: true,
});


export class CreateScreen extends Component {
  static navigationOptions = {
    title: 'Create a Reminder',
  };

  constructor(props) {
    super(props);

    this.state = {
      message: 'Remind me to...',
      seconds: '5'
    };
  }

  scheduleNotification() {
    console.log(this.state, new Date(Date.now() + (parseInt(this.state.seconds) * 1000)).toString());

    PushNotification.localNotificationSchedule({
      vibration: 300,
      title: this.state.message,
      message: this.state.message,
      date: new Date(Date.now() + (parseInt(this.state.seconds) * 1000))
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Let's create something!
        </Text>

        <Text>Message</Text>
        <TextInput
          style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(message) => this.setState({message})}
          value={this.state.message}
        />

        <Text>Seconds</Text>
        <TextInput
          style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(seconds) => this.setState({seconds})}
          value={this.state.seconds}
        />

        <Button
          onPress={this.scheduleNotification.bind(this)}
          title="Schedule Reminder!"
          color="#997788"
          accessibilityLabel="Schedule reminder message in number of seconds"
        />
      </View>
    );
  }
}

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


const RemindMe = StackNavigator({
  Main: {screen: MainScreen},
  Create: {screen: CreateScreen},
});

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

AppRegistry.registerComponent('RemindMe', () => RemindMe);
