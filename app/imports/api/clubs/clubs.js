/**
 * Created by reedvilanueva on 10/23/16.
 */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Clubs = new Mongo.Collection('Clubs');

/**
 * Create the schema for Stuff
 */
export const ClubsSchema = new SimpleSchema({
  clubName: {  // assumes that usernames will be uniq. else need to store user's _id
    label: 'clubName',
    type: String,
    optional: false,
    max: 200,
  },
  bio: {
    label: 'bio',
    type: String,
    optional: false,
    max: 200,
  },
  events: {
    label: 'events',
    type: [String],  // TODO: should eventually be a custom event object
    optional: true,
    max: 200,
  },
  url: {
    label: 'url',
    type: String,
    optional: true,
  },

});
Clubs.attachSchema(ClubsSchema);


// for testing: for testing logic of user discovering and joining a club
const joinableNullClub = {
  clubName: 'joinableNull Club',
  bio: 'Cross over children. All are welcome',
  events: ['Bad B-Movies', 'Chair Stackathon'],
  url: 'https://join.us'
};
Clubs.insert(joinableNullClub);
