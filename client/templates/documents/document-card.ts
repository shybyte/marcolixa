/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../../../lib/collections.ts" />

var documentsTemplate = Template['documentCard'];

documentsTemplate.helpers({});

documentsTemplate.events({
  'click .glyphicon-trash': function (event) {
    event.preventDefault();
    Documents.remove(this._id);
  }
});

