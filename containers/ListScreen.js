import React, { Component } from 'react';

import {
  Button,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as reminders from '../api/reminders';

export class ListScreen extends Component {
  static navigationOptions = {
    title: 'Current Reminders',
  };

  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds.cloneWithRows(reminders.all),
    };

    reminders.startListening()
      .then(() => this.setState({
        dataSource: this.ds.cloneWithRows(reminders.all),
      }));
  }

  remove(reminder) {
    reminders
      .remove(reminder)
      .then(() => this.setState({
        dataSource: this.ds.cloneWithRows(reminders.all),
      }));
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(reminder) => {
            console.log('Foo');
            return (
              <View>
                <Text style={styles.listItem}>{reminder.message} {reminder.dateText} {reminder.hour}:{reminder.minute}</Text>
                <Button
                  onPress={() => this.remove(reminder.id)}
                  title="Delete"
                />
              </View>
            );
          }}
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
  listItem: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
