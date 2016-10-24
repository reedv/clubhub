import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Users} from '../../api/users/users.js';
import {Clubs, ClubsSchema} from '../../api/clubs/clubs.js';
import {check} from 'meteor/check';

/* eslint-disable no-console */

Accounts.onCreateUser(function (options, user) {
  /* From http://docs.meteor.com/api/accounts.html
   A user document can contain any data you want to store about a user.
   Meteor treats the following fields specially:

   1. username: a unique String identifying the user.
   2. emails: an Array of Objects with keys address and verified; an email address
      may belong to at most one user. verified is a Boolean which is true if the user has
      verified the address with a token sent over email.
   3. createdAt: the Date at which the user document was created.
   4. profile: an Object which the user can create and update with any data. Do not store
      anything on profile that you wouldn’t want the user to edit unless you have a deny
      rule on the Meteor.users collection.
   5. services: an Object containing data used by particular login services. For example,
      its reset field contains tokens used by forgot password links, and its resume field
      contains tokens used to keep you logged in between sessions.
   * */

  /* initialize a new user */

  // create a default club to be joined by all users (for testing)
  // FIXME: is this the bet way to have a default collection obj. accessable at startup (may also want to add validation)?

  // NOTE: The const declaration creates a read-only reference to a value.
  // It does not mean the value it holds is immutable, just that the variable
  // identifier cannot be reassigned
  const defaultClub = {
    clubName: 'The Null Club',
    bio: 'This is the null club,\nwere all in it!',
    events: ['nullClub event-1', 'nullClub event-2'],
    url: 'https://theNullClub.org',
  };
  // if the default club has not yet been added to Clubs collection, do so.
  // returns 'undefined' if none found (falsey), else first matched obj. (truthy?)
  let defaultPresent = Clubs.findOne({clubName: 'The Null Club'});
  if(!(defaultPresent)){
    Clubs.insert(defaultClub);
  }

  // create new user profile
  let newUser = {
    userName: user.username,
    clubs: [defaultClub],  // TODO: clubs should be objects denoted by their uniq. _ids (since names can change)
    events: ['The Null Event-1', 'The Null Event-2'],
    isClubAdmin: false,
    adminClubs: [defaultClub],
    isSiteAdmin: false
  };

  Users.insert(newUser);


  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;

  return user;
});

/* When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (!!Meteor.settings.defaultAccount) {
    Accounts.createUser({
      username: Meteor.settings.defaultAccount.username,
      password: Meteor.settings.defaultAccount.password,
    });
  } else {
    console.log('No default user!  Please invoke meteor with a settings file.');
  }
}