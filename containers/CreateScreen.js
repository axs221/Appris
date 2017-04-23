import React, { Component } from 'react';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import * as reminders from '../api/reminders';

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
    const { navigate } = this.props.navigation;

    reminders
      .create({ ...this.state })
      .then(() => navigate('Home'));
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
