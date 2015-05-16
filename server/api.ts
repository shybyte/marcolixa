/// <reference path="../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../.typescript/restivus.d.ts" />
/// <reference path="../.typescript/sanitize-html.d.ts" />
/// <reference path="../.typescript/lodash.d.ts" />

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

function htmlToText(html:string) {
  return sanitizeHtml(html, {allowedTags: []}).replace(/\s+/g, ' ');
}

Restivus.addRoute('documents/:id', {authRequired: true}, {
  get: function ():any {
    return doWithDocument(this, doc => doc);
  },
  patch: {
    action: function () {
      return doWithDocument(this, doc => {
        var body = this.bodyParams;
        var setCommandArgument = lodash.omit({
          title: body.title,
          html: body.html,
          text: body.html ? htmlToText(body.html) : undefined,
          issueCount: body.issueCount
        }, (value) => (value === undefined || value === null));
        Documents.update(doc._id, {$set: setCommandArgument});
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
          'Access-Control-Allow-Headers': 'x-auth-token, x-user-id, X-Requested-With',
          'Access-Control-Allow-Methods': 'PUT, GET, OPTIONS, PATCH'
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

Restivus.addRoute('dictionary', {authRequired: true}, {
  get: function () {
    var dictionaryEntries = Dictionary.find({owner: this.userId}).fetch();
    return {dictionary: dictionaryEntries};
  },
  post: {
    action: function () {
      var newDictionaryEntry:DictionaryEntry = {
        text: this.bodyParams.text,
        owner: this.userId
      };
      ;
      return {
        status: 'success',
        id: Dictionary.insert(newDictionaryEntry)
      };
    }
  },
});
