interface HtmlDocument {
  _id?: string;
  title: string;
  html: string;
  owner: string; // userId
}

declare var Documents: Mongo.Collection<HtmlDocument>;
Documents = new Mongo.Collection<HtmlDocument>('documents');

var ownsDocument = (userId, doc) => doc && doc.owner == userId;

Documents.allow({
  insert: ownsDocument,
  update: ownsDocument,
  remove: ownsDocument
});