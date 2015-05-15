/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../../../lib/collections.ts" />

var documentsTemplate = Template['documents'];

documentsTemplate.helpers({});

documentsTemplate.events({
  'click .createDocumentButton': () => {
    var newDocument:HtmlDocument = {
      title: '',
      html: '',
      text: '',
      owner: Meteor.userId()
    };
    var newDocumentId = Documents.insert(newDocument);
    Router.go('editDocument', { _id: newDocumentId});
  }

});

