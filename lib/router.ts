Router.configure({
  layoutTemplate: 'layout',
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
  data: () => _.sortBy(Dictionary.find().fetch(), (entry: DictionaryEntry) => entry.text.toLowerCase())
});