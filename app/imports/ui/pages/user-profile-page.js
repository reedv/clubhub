/**
 * Created by reedvilanueva on 10/19/16.
 */

//FIXME: usefule thing to note, all Collection docs. have a _id key that is uniq. to that doc
Template.User_Profile_Page.helpers({
  userData : function(){ return Meteor.user(); },

  firstName: function() {
    return Meteor.user().username;
  },

  userId: function() {
    return Meteor.userId();
  }
});
