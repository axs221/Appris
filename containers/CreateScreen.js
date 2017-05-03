import React, { Component } from 'react';

import {
  Button,
  DatePickerAndroid,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TimePickerAndroid,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import * as reminders from '../api/reminders';

export class CreateScreen extends Component {
  static navigationOptions = {
    title: 'Create a Reminder',
  };

  constructor(props) {
    super(props);

    const now = new Date();
    const date = new Date();
    date.setHours(0,0,0,0);

    this.state = {
      date,
      dateText: `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
      hour: now.getHours(),
      message: '',
      minute: now.getMinutes(),
      timeText: 'pick a time',
    };
  }

  scheduleNotification() {
    const { navigate } = this.props.navigation;

    reminders
      .create({ ...this.state })
      .then(() => navigate('List'));
  }

  showTimePicker = async (options) => {
  const {action, minute, hour} = await TimePickerAndroid.open();

  var newState = {};

    if (action === TimePickerAndroid.timeSetAction) {
      newState['timeText'] = this.formatTime(hour, minute);
      newState['hour'] = hour;
      newState['minute'] = minute;
    }

    this.setState(newState);
  };

  /**
  * Returns e.g. '3:05'.
  */
  formatTime(hour, minute) {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
  }

  showDatePicker = async (options = {}) => {
    var newState = {};

    const {action, year, month, day} = await DatePickerAndroid.open(options);

    if (action === DatePickerAndroid.dismissedAction) {
      newState['dateText'] = 'dismissed';
    } else {
      var date = new Date(year, month, day);
      newState['dateText'] = date.toLocaleDateString();
      newState['date'] = date;
    }

    this.setState(newState);
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <Text>Message</Text>
        <TextInput
          returnKeyType={'next'}
          autoFocus={true}
          style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(message) => this.setState({message})}
          onSubmitEditing={this.showTimePicker.bind(this)}
          value={this.state.message}
        />

        <TouchableWithoutFeedback
          onPress={this.showTimePicker.bind(this)}>
          <View>
            <Text style={styles.text}>{this.state.timeText}</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={this.showDatePicker.bind(this, {
            date: new Date(),
            minDate: new Date(),
          })}>
          <View>
            <Text style={styles.text}>{this.state.dateText}</Text>
          </View>
        </TouchableWithoutFeedback>

        <Button
          onPress={this.scheduleNotification.bind(this)}
          title="Schedule Reminder!"
          color="#997788"
          accessibilityLabel="Schedule reminder message at date and time selected"
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
  },
  text: {
    fontSize: 18,
    margin: 8,
    padding: 8,
    width: 250,
    borderWidth: 1
  }
});
