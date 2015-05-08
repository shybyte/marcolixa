/// <reference path="../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../.typescript/restivus.d.ts" />

Restivus.configure({
  useAuth: true,
  prettyJson: true,
  enableCors: true,
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

var DOCUMENT_FORBIDDEN = {
  statusCode: 403,
  body: {
    status: 'documentIsNotYours'
  }
};

function doWithDocument(restivusThis, handler:(document:HtmlDocument) => any):any {
  var document = Documents.findOne(restivusThis.urlParams.id);
  if (document) {
    if (document.owner === restivusThis.userId) {
      return handler(document);
    } else {
      return DOCUMENT_FORBIDDEN
    }
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
          $set: {
            title: this.bodyParams.title,
            html: this.bodyParams.html,
          }
        });
        return {status: 'success'};
      });
    }
  },
  options: {
    authRequired: false,
    action: function () {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'x-auth-token, x-user-id, X-Requested-With'
        },
        statusCode: 200,
        body: {}
      }
    }
  }
});

Restivus.addRoute('token/validate', {authRequired: true}, {
  get: () => ({
    status: 'success'
  }),
});

