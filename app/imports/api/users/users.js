/**
 * Created by reedvilanueva on 10/20/16.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Clubs, ClubsSchema } from '../clubs/clubs.js';

/* eslint-disable object-shorthand */

export const Users = new Mongo.Collection('Users');

/**
 * Create the schema for Stuff
 */
export const UsersSchema = new SimpleSchema({
  userName: {  // assumes that usernames will be uniq. else need to store user's _id
    label: 'userName',
    type: String,
    optional: false,
    max: 200,
  },
  clubs: {
    label: 'clubs',
    type: [ClubsSchema],
    optional: true,
    max: 200,
  },
  events: {
    label: 'events',
    type: [String],  // TODO: should eventually be an array of custom 'event' objects
    optional: true,
    max: 200,
  },
  isClubAdmin: {
    label: 'isClubAdmin',
    type: Boolean,
    optional: false,
  },
  adminClubs: {
    label: 'adminClubs',
    type: [ClubsSchema],
    optional: true,
    max: 200,
  },
  isSiteAdmin: {
    label: 'isSiteAdmin',
    type: Boolean,
    optional: false,
  },


});

Users.attachSchema(UsersSchema);
