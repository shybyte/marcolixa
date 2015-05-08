/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />

var documentsTemplate = Template['documents'];

documentsTemplate.helpers({
});

documentsTemplate.events({
  'click .createDocumentButton': () => {
    Documents.insert({
      title: 'New Document',
      text: 'This is some dummy text.',
      owner: Meteor.userId()
    });
  }

});

