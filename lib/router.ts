Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: () => [Meteor.subscribe('documents'), Meteor.subscribe('dictionary')]
});


Router.route('/', {name: 'home'});

Router.route('/documents', {
  layoutTemplate: 'loggedInLayout',
  name: 'documents'
});

Router.route('/documents/:_id', {
  layoutTemplate: 'loggedInLayout',
  name: 'editDocument',
  data: function () {
    return Documents.findOne(this.params._id);
  }
});

Router.route('/dictionary', {
  layoutTemplate: 'loggedInLayout',
  name: 'dictionary',
  data: () => _.sortBy(Dictionary.find().fetch(), (entry:DictionaryEntry) => entry.text.toLowerCase())
});

Router.onBeforeAction(function () {
  return AccountsEntry.signInRequired ? AccountsEntry.signInRequired(this) : this.next();
}, {except: ['home', 'entrySignIn', 'entrySignUp', 'entryForgotPassword', 'entryResetPassword']});

Router.onBeforeAction(function () {
  return Meteor.userId() ? Router.go('documents') : this.next();
}, {only: ['entrySignIn']});