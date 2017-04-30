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
      dataSource: this.ds.cloneWithRows(this.props.navigation && this.props.navigation.state.params.showAll ? reminders.all : reminders.today())
    };

    reminders.startListening()
      .then(() => this.setState({
        dataSource: this.ds.cloneWithRows(this.props.navigation && this.props.navigation.state.params.showAll ? reminders.all : reminders.today())
      }));
  }

  remove(reminder) {
    reminders
      .remove(reminder)
      .then(() => this.setState({
        dataSource: this.ds.cloneWithRows(this.props.navigation && this.props.navigation.state.params.showAll ? reminders.all : reminders.today())
      }));
  }

  render() {
    return (
      <ScrollView style={{margin: 10}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(reminder) => {
            return (
              <View style={styles.row}>
                <View style={{'flexDirection': 'column', 'flex': 1, 'alignItems': 'flex-start'}}>
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
      </ScrollView>
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
  }
});
