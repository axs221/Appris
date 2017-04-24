import * as firebase from 'firebase';
import * as config from '../config';
import uuid from 'uuid/v4';
import PushNotification from 'react-native-push-notification';
import * as localReminders from './localReminders';

const firebaseConfig = config.firebaseConfig;

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.auth().signInWithEmailAndPassword(config.auth.email, config.auth.password);

const db = firebaseApp.database().ref('reminders');


export let all = [];
export let started = false;


function schedule(reminderData) {
  PushNotification.localNotificationSchedule({
    id: reminderData.id,
    vibration: 300,
    message: reminderData.message,
    date: new Date((new Date(reminderData.dateText)).getTime()
      + (parseInt(reminderData.hour) * 60 * 60 * 1000)
      + (parseInt(reminderData.minute) * 60 * 1000))
  });

  localReminders.markScheduled(reminderData.id);
}

export function create(reminderData) {
  reminderData.id = parseInt(Math.random() * 1000000).toString();

  schedule(reminderData);

  all.push(reminderData);
  return db.set(all);
}

export function remove(id) {
  all = all.filter(r => r.id !== id);
  return db.set(all);
}

function checkToSchedule(reminder) {
  if (!localReminders.hasScheduled(reminder.id)) {
    schedule(reminder);
  }
}

export function startListening() {
  started = true;

  return new Promise(resolve => {
    db.on('value', (snapshot) => {
      const data = snapshot.val();
      all = data || [];

      all.forEach(checkToSchedule);

      resolve(all);
    });
  });
}

startListening();
