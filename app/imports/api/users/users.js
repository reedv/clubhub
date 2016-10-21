/**
 * Created by reedvilanueva on 10/20/16.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Users = new Mongo.Collection('Users');

/**
 * Create the schema for Stuff
 */
export const UsersSchema = new SimpleSchema({
  userName: {
    label: 'userName',
    type: String,
    optional: false,
    max: 200,
  },
  password: {
    label: 'password',
    type: String,
    optional: false,
    max: 200,
  },
  clubs: {
    label: 'clubs',
    type: [String],
    optional: true,
    max: 200,
  },
  isClubAdmin: {
    label: 'isClubAdmin',
    type: Boolean,
    optional: false,
  },
  isSiteAdmin: {
    label: 'isSiteAdmin',
    type: Boolean,
    optional: false,
  },


});

Users.attachSchema(UsersSchema);
