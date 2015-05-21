/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../../../lib/collections.ts" />
/// <reference path="../../../.typescript/filesaver.d.ts" />

var documentsTemplate = Template['documentCard'];

documentsTemplate.helpers({
  issueCountText: function () {
    return this.issueCount + (this.issueCount === 1 ? ' Issue' : ' Issues');
  }
});

documentsTemplate.events({
  'click .glyphicon-trash': function (event) {
    event.preventDefault();
    var deletedDocument = Documents.findOne(this._id);
    deletedDocument['showUndo'] = true;
    Session.set('deletedDocument', deletedDocument);
    setTimeout(() => {
      var currentDeletedDocument = Session.get('deletedDocument');
      if (deletedDocument._id != currentDeletedDocument._id) {
        return;
      }
      currentDeletedDocument['showUndo'] = false;
      Session.set('deletedDocument', currentDeletedDocument)
    }, 7000);
    Documents.update(this._id,{$set: {deleted: true}});
  },
  'click .glyphicon-download': function (event) {
    event.preventDefault();
    var blob = new Blob([this.text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, (this.title || 'No Title') + ".txt");
  }
});

