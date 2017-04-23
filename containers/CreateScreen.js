import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

import {
  Button,
  Text,
  TextInput,
  View
} from 'react-native';

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

