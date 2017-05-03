import * as firebase from 'firebase';
import * as config from '../config';
import uuid from 'uuid/v4';
import PushNotification from 'react-native-push-notification';
import * as localReminders from './localReminders';

const firebaseConfig = config.firebaseConfig;

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.auth().signInWithEmailAndPassword(config.auth.email, config.auth.password);

const db = firebaseApp.database().ref('reminders');


export let all = null;
export let started = false;

export function getAll() {
  return all
    && all.sort((a, b) => getDate(a).getTime() - getDate(b).getTime());
}

export function getToday() {
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);
  return all && all.filter(n => new Date(n.dateText).getTime() === todaysDate.getTime());
}

function schedule(reminderData) {
  PushNotification.localNotificationSchedule({
    id: reminderData.id,
    vibration: 300,
    message: reminderData.message,
    date: getDate(reminderData)
  });

  localReminders.markScheduled(reminderData.id);
}

function getDate(reminder) {
  return new Date((new Date(reminder.dateText)).getTime()
    + (parseInt(reminder.hour) * 60 * 60 * 1000)
    + (parseInt(reminder.minute) * 60 * 1000))
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
