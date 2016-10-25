import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Clubs, ClubsSchema} from '../../api/clubs/clubs.js';

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
  let defaultExists = Clubs.findOne({clubName: 'The Null Club'});
  if(!(defaultExists)){
    Clubs.insert(defaultClub);
  }
  // add this user as a member and admin of the default club
  // in this case, need to add username to club fields before adding club to the user fields (so it's uptodate when added)
  // see https://docs.mongodb.com/manual/reference/operator/update/
  // TODO: find if will be any problems using user.username before default onCreateUser code
  // TODO: add function to Clubs collection api that allows user.clubs and club.members to be set simultaneously
  Clubs.update({clubName: 'The Null Club'}, { $addToSet: {members: user.username} });
  Clubs.update({clubName: 'The Null Club'}, { $addToSet: {admins: user.username} });

  // extending Meteor.user collection with custom fields
  // this is the recommended way, see https://guide.meteor.com/accounts.html#adding-fields-on-registration
  // TODO: find how to extend the Meteor.user schema to always include these fields
  const updatedDefault = Clubs.findOne({clubName: 'The Null Club'});
  user.clubs = [updatedDefault];
  user.events = ['The Null Event-1', 'The Null Event-2'];
  user.adminClubs = [updatedDefault];
  user.isSiteAdmin = false;

  // FIXME: the fact that we need to add club to user.clubs after it has beed updated
  //   brings up question that maybe it would be better to just keep club data separate and
  //   have users access it by accessing clubs in Clubs collection for which their username
  //   is in the members or admins array of that club. Else we would need to update every user
  //   document that has someClub in its clubs array whenever someClub's data changes.
  //   I think current best option would be to have user obj. only be aware of the clubNames
  //   (or other) uniq. identifier of clubs they are a part of (or admin) and use that as key
  //   to find the other club info from the Clubs collection as needed.


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