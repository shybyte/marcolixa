/// <reference path="../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../.typescript/restivus.d.ts" />

Restivus.configure({
  useAuth: true,
  prettyJson: true,
  auth: {
    token: 'services.resume.loginTokens.hashedToken',
    user: function () {
      var token = this.request.headers['x-auth-token'];
      return {
        userId: this.request.headers['x-user-id'],
        token: token ? Accounts['_hashLoginToken'](token) : null
      };
    }
  },
});

Restivus.addRoute('documents', {authRequired: true}, {
  get: function () {
    var documents = Documents.find({owner: this.userId}).fetch();
    return {documents: documents};
  }
});

var DOCUMENT_NOT_FOUND = {
  statusCode: 404,
  body: {
    status: 'documentNotFound'
  }
};

function doWithDocument(restivusThis, handler:(document:HtmlDocument) => any):any {
  var document = Documents.findOne({owner: restivusThis.userId, _id: restivusThis.urlParams.id});
  if (document) {
    return handler(document);
  } else {
    return DOCUMENT_NOT_FOUND;
  }
}


Restivus.addRoute('documents/:id', {authRequired: true}, {
  get: function ():any {
    return doWithDocument(this, doc => doc);
  },
  put: {
    action: function () {
      return doWithDocument(this, doc => {
        Documents.update(doc._id, {
          title: this.bodyParams.title,
          html: this.bodyParams.html,
        });
        return {status: 'success'};
      });
    }
  }
});

Restivus.addRoute('token/validate', {authRequired: true}, {
  get: () => ({
    status: 'success'
  }),
});