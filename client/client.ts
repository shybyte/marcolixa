/// <reference path="../.typescript/package_defs/all-definitions.d.ts" />

Session.setDefault('counter', 0);

Template['home'].helpers({
});

Template['home'].events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 2);
  }
});

Template.registerHelper('userEmail', function () {
  return (Meteor.user() && Meteor.user().emails) ? Meteor.user().emails[0].address : '';
});
