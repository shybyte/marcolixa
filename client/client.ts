/// <reference path="../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../.typescript/auth-client-callbacks.d.ts" />
/// <reference path="../.typescript/session.d.ts" />

Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/',                    // mandatory - path to redirect to after sign-out
    dashboardRoute: '/documents'       // mandatory - path to redirect to after successful sign-in
  });

  Meteor.subscribe("userData");

});

Accounts.onLogout(function() {
  Session.keys = {};
});

Template.registerHelper('userDisplayName', function () {
  var user = Meteor.user();
  if (!user) {
    return '';
  }

  if (user.emails) {
    return user.emails[0].address;
  }

  if (user.services) {
    if (user.services.google) {
      return user.services.google.email;
    }
    if (user.services.facebook) {
      return user.services.facebook.name;
    }
  } else {
    return '';
  }
});