/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../../../lib/collections.ts" />

var documentsTemplate = Template['documentCard'];

documentsTemplate.helpers({
  issueCountText: function () {
    return this.issueCount + (this.issueCount === 1 ? ' Issue' : ' Issues');
  }
});

documentsTemplate.events({
  'click .glyphicon-trash': function (event) {
    event.preventDefault();
    Documents.remove(this._id);
  }
});

