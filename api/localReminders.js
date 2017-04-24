import Realm from 'realm';

const realm = new Realm({
  schema: [{name: 'Reminder', properties: {id: 'string'}}]
});

export function hasScheduled(id) {
  const reminders = realm.objects('Reminder');
  const reminder = reminders.filtered(`id = "${id}"`);

  return reminder !== null && Object.keys(reminder).length > 0;
}

export function markScheduled(id) {
  realm.write(() => {
    realm.create('Reminder', {id: id});
  });
}
