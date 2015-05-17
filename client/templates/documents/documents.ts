/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../../../lib/collections.ts" />


var SEARCH_QUERY_SESSION_KEY = 'documentSearchQuery';

var documentsTemplate = Template['documents'];

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var SHOW_RECENTLY_UPDATED_FIRST = {sort: {updatedAt: -1}};


documentsTemplate.helpers({
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

documentsTemplate.events({
  'click .createDocumentButton': () => {
    var newDocument:HtmlDocument = {
      title: '',
      html: '',
      text: '',
      owner: Meteor.userId(),
      issueCount: 0
    };
    var newDocumentId = Documents.insert(newDocument);
    Router.go('editDocument', {_id: newDocumentId});
  },
  'click .glyphicon-remove': () => {
    Session.set(SEARCH_QUERY_SESSION_KEY, '');
  },
  'keyup .searchField': search,
  'cut .searchField': search,
  'paste .searchField': search
});


documentsTemplate.onRendered(function () {
  this.$('.searchField').focus();
});
