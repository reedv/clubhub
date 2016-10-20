/**
 * Created by reedvilanueva on 10/17/16.
 */
import { Contacts } from '../../api/contacts/contacts.js';
import { Meteor } from 'meteor/meteor';

// 'autopublish' pkg has been removed
Meteor.publish('Contacts', function publishContactsData() {
  return Contacts.find();
});
