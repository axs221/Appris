import React, { Component } from 'react';

import {
  Button,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as reminders from '../api/reminders';

export class ListScreen extends Component {
  static navigationOptions = {
    title: 'All Reminders',
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds.cloneWithRows(this.getReminders())
    };

    reminders.startListening()
      .then(() => this.setState({
        dataSource: this.ds.cloneWithRows(this.getReminders())
      }));
  }

  getReminders = () => {
    return (this.props.navigation 
        && this.props.navigation.state.params
        && this.props.navigation.state.params.showAll)
      ? reminders.all || []
      : reminders.today() || [];
  }

  remove(reminder) {
    reminders
      .remove(reminder)
      .then(() => this.setState({
        dataSource: this.ds.cloneWithRows(this.getReminders())
      }));
  }

  render() {
    let index = 0;

    const listView = (!reminders.all || this.getReminders().length > 0) ? (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(reminder) => {
          const rowStyle = {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10
          };

          if (index % 2 === 0) {
            rowStyle.backgroundColor = 'rgba(0, 100, 0, 0.1)';
          }

          index++;

          return (
            <View style={rowStyle}>
              <View style={{
                'flexDirection': 'column',
                'flex': 1,
                'alignItems': 'flex-start',
              }}>
                <Text style={styles.message}>{reminder.message}</Text>
                <Text style={styles.dateTime}>{reminder.dateText} {reminder.hour}:{reminder.minute}</Text>
              </View>
              <Button
                onPress={() => this.remove(reminder.id)}
                title="Delete"
              />
            </View>
          );
        }}
      />
    ) : (
      <Text style={{marginTop: 200, color: '#aaa', fontSize: 18, fontStyle: 'italic'}}>
        No reminders
      </Text>
    );

    return (
      <ScrollView >
        {listView}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  message: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 2,
    marginTop: 15,
    flex: 2,
  },
  dateTime: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888888',
    marginBottom: 5,
    flex: 1,
  }
});
