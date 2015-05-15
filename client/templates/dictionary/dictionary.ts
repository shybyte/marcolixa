/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../../../lib/collections.ts" />

var NEW_DICTIONARY_ENTRY_TEXT_SESSION_KEY = 'newDictionaryEntryText';

var dictionaryTemplate = Template['dictionary'];

dictionaryTemplate.helpers({
  newDictionaryEntryText: () => (Session.get(NEW_DICTIONARY_ENTRY_TEXT_SESSION_KEY) || ''),
  addButtonDisabledAttribute: () => (Session.get(NEW_DICTIONARY_ENTRY_TEXT_SESSION_KEY) || '').trim() ? '' : 'disabled'
});

function saveTextToSession(event) {
  Session.set(NEW_DICTIONARY_ENTRY_TEXT_SESSION_KEY, event.target.value);
}

dictionaryTemplate.events({
  'submit .addDictionaryEntryForm': (event, template) => {
    event.preventDefault();
    var text = Session.get(NEW_DICTIONARY_ENTRY_TEXT_SESSION_KEY);
    if (!text.trim()) {
      return;
    }
    var newDictionaryEntry:DictionaryEntry = {
      text: text,
      owner: Meteor.userId()
    };
    Dictionary.insert(newDictionaryEntry);
    Session.set(NEW_DICTIONARY_ENTRY_TEXT_SESSION_KEY, '')
  },
  'keyup .newDictionaryEntryText': saveTextToSession,
  'cut .newDictionaryEntryText': saveTextToSession,
  'paste .newDictionaryEntryText': saveTextToSession
});

dictionaryTemplate.onRendered(function () {
  this.$('.newDictionaryEntryText').focus();
});


Template['dictionaryEntry'].events({
  'click .glyphicon-trash': function (event) {
    event.preventDefault();
    Dictionary.remove(this._id);
  }
});