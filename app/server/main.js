import '/imports/startup/server';
import '/imports/startup/both';
import '/imports/api/stuff';
import '/imports/api/contacts';
import '/imports/api/users';
import { Accounts } from 'meteor/accounts-base';
import { Users } from './imports/api/users/users.js';  //FIXME: Why can't we reference this?

// FIXME: i don't know if this applies to any defaul account created at startup
// lets us add special behavior when a user is created using an account pkg
Accounts.onCreateUser(function (options, user) {

  // initialize a new user profile
  const userName = user.username,
        password = user.password,
        clubs = [],
        isClubAdmin = false,
        isSiteAdmin = false;
  Users.insert({
    userName: userName,
    password: password,
    clubs: clubs,
    isClubAdmin: isClubAdmin,
    isSiteAdmin: isSiteAdmin,
  });

  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;

  return user;
});

Accounts.createUser({
  username: 'test',
  password: 'testtest',
  profile: {},
});
