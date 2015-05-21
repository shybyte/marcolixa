/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../../../.typescript/lodash.d.ts" />
/// <reference path="../../../lib/collections.ts" />


var SEARCH_QUERY_SESSION_KEY = 'documentSearchQuery';

var documentsTemplate = Template['documents'];

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var SHOW_RECENTLY_UPDATED_FIRST = {sort: {updatedAt: -1}};

var getDeletedDocument = () => Session.get('deletedDocument');

function isUndoMessageVisible() {
  var deletedDocument = getDeletedDocument();
  return deletedDocument && deletedDocument.showUndo;
}


documentsTemplate.helpers({
  deletedDocument: () => {
    return Session.get('deletedDocument');
  },
  undoDeleteDocumentMessageClass: () =>  isUndoMessageVisible() ? '' : 'hiddenMessage',
  searchQuery: () => Session.get(SEARCH_QUERY_SESSION_KEY),

  filteredDocuments: function () {
    var searchQuery = Session.get(SEARCH_QUERY_SESSION_KEY);
    if (!searchQuery) {
      return Documents.find({}, SHOW_RECENTLY_UPDATED_FIRST);
    }
    var searchRegExp = new RegExp(escapeRegExp(searchQuery), 'i');
    return Documents.find({$or: [{'text': {$regex: searchRegExp}}, {'title': {$regex: searchRegExp}}]}, SHOW_RECENTLY_UPDATED_FIRST);
  }
});


function search(event) {
  Session.set(SEARCH_QUERY_SESSION_KEY, event.target.value);
}

function readFile(file):JQueryPromise<string> {
  var reader = new FileReader();
  var deferred = $.Deferred();

  reader.onload = function (event) {
    deferred.resolve(event.target['result']);
  };

  reader.onerror = function () {
    deferred.reject(this);
  };

  reader.readAsText(file);

  return deferred.promise();
}

function createDocument(text = '', title = '') {
  var newDocument:HtmlDocument = {
    title: title,
    html: lodash.escape(text).replace(/\n/g,'<br/>'),
    text: text,
    owner: Meteor.userId(),
    issueCount: 0,
    updatedAt: new Date()
  };
  var newDocumentId = Documents.insert(newDocument);
  Router.go('editDocument', {_id: newDocumentId});
}

documentsTemplate.events({
  'click .createDocumentCard': (event) => {
    event.preventDefault();
    createDocument();
  },
  'click .uploadFooter': (event) => {
    event.preventDefault();
    event.stopPropagation();
    $('.fileUpload').click();
  },
  'change .fileUpload': (event, template) => {
    var fileUpload = template.find('.fileUpload');
    var file = fileUpload.files[0];
    readFile(file).then((fileContent) => {
      createDocument(fileContent, file.name.replace(/\..*$/, ""));
    });
  },
  'click .glyphicon-remove': () => {
    Session.set(SEARCH_QUERY_SESSION_KEY, '');
  },
  'keyup .searchField': search,
  'cut .searchField': search,
  'paste .searchField': search,
  'click .undoButton': (event) => {
    event.preventDefault();
    var deletedDocument = getDeletedDocument();
    deletedDocument.showUndo = false;
    Session.set('deletedDocument', deletedDocument);
    Documents.update(deletedDocument._id,{$set: {deleted: false}});
  },
});


documentsTemplate.onRendered(function () {
  this.$('.searchField').focus();
});
