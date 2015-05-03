Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});

Router.route('/documents', {
  layoutTemplate: 'loggedInLayout',
  name: 'documents',
  data: () => Documents.find()
});

Router.route('/documents/:_id', {
  layoutTemplate: 'loggedInLayout',
  name: 'editDocument',
  data: function () {
    return Documents.findOne(this.params._id);
  }
});