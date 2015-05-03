interface TextDocument {
  _id?: string;
  title: string;
  text: string;
  owner: string; // userId
}

declare var Documents: Mongo.Collection<TextDocument>;
Documents = new Mongo.Collection<TextDocument>('documents');