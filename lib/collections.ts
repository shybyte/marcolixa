interface HtmlDocument {
  _id?: string;
  title: string;
  html: string;
  text: string;
  owner: string; // userId
  issueCount: number
}

interface DictionaryEntry {
  _id?: string;
  text: string;
  owner: string; // userId
}

declare var Documents: Mongo.Collection<HtmlDocument>;
Documents = new Mongo.Collection<HtmlDocument>('documents');

declare var Dictionary: Mongo.Collection<DictionaryEntry>;
Dictionary = new Mongo.Collection<DictionaryEntry>('dictionary');

var ownsDocument = (userId, doc) => doc && doc.owner == userId;

Documents.allow({
  insert: ownsDocument,
  remove: ownsDocument
});

Dictionary.allow({
  insert: ownsDocument,
  remove: ownsDocument
});