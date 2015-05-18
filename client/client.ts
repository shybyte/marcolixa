/// <reference path="../.typescript/package_defs/all-definitions.d.ts" />

Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/',                    // mandatory - path to redirect to after sign-out
    dashboardRoute: '/documents'       // mandatory - path to redirect to after successful sign-in
  });

  Meteor.subscribe("userData");

});

Template.registerHelper('userEmail', function () {
  var user = Meteor.user();
  if (user && user.emails) {
    return user.emails[0].address;
  }
  if (user && user.services && user.services.google) {
    return user.services.google.email;
  }
  return '';
});