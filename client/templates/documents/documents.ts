/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../../../lib/collections.ts" />

var documentsTemplate = Template['documents'];

documentsTemplate.helpers({
});

documentsTemplate.events({
  'click .createDocumentButton': () => {
    var newDocument:HtmlDocument = {
      title: 'New Document',
      html: 'This is some dummy text.',
      owner: Meteor.userId()
    };
    Documents.insert(newDocument);
  }

});

