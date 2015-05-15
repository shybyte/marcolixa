/// <reference path="../.typescript/package_defs/all-definitions.d.ts" />

Meteor.startup(function () {
  console.log('Started!!!');
});

Meteor.publish('documents', function () {
  return Documents.find({owner: this.userId});
});
