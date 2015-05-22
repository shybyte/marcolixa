/// <reference path="../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../.typescript/service-configuration.d.ts" />

Meteor.startup(function () {
  Accounts.emailTemplates.siteName = "Marcolix";
  Accounts.emailTemplates.from = "Marcolix <info@marcolix.com>";
  Accounts.config({
    sendVerificationEmail: true
  });
});

Meteor.publish('documents', function () {
  return Documents.find({owner: this.userId, deleted: {$ne: true}});
});

Meteor.publish('dictionary', function () {
  return Dictionary.find({owner: this.userId});
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
      {fields: {'services': 1}});
  } else {
    return this.ready()
  }
});

ServiceConfiguration.configurations.upsert(
  {service: "google"},
  {
    $set: {
      loginStyle: 'redirect',
      clientId: "64294705048-8nfsg85a6q7vr8d07td73fc2a91qu4uo.apps.googleusercontent.com",
      secret: "rStKGYzhooKDAj5xGjRBuUkz"
    }
  }
);

ServiceConfiguration.configurations.upsert(
  {service: "facebook"},
  {
    $set: {
      loginStyle: 'popup',
      appId: "1645997578962574",
      secret: "f2240833f61ed5719169f6531e0a5c0a"
    }
  }
);