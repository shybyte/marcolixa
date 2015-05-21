/// <reference path="../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../.typescript/collection-timestampable.d.ts" />

interface HtmlDocument {
  _id?: string;
  title: string;
  html: string;
  text: string;
  owner: string; // userId
  issueCount: number;
  createdAt?: string;  // automatically set by collection-timestampable
  updatedAt: Date;
  deleted?: boolean;
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

Documents.attachBehaviour('timestampable', {
  createdAt: 'createdAt',
  updatedAt: false,
  createdBy: false,
  updatedBy: false
});

Documents.allow({
  insert: ownsDocument,
  update: ownsDocument
});

Dictionary.allow({
  insert: ownsDocument,
  remove: ownsDocument
});