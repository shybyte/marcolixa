/// <reference path="../../../.typescript/package_defs/all-definitions.d.ts" />
/// <reference path="../../../lib/collections.ts" />

var editTemplate = Template['editDocument'];

editTemplate.onRendered(function () {
  var $iFrame = this.$('iframe');
  var l = window.location;
  var iFrameWindow = $iFrame.get(0).contentWindow;
  var currentData:any = Template.currentData();
  var documentUrl = l.protocol + '//' + l.host + '/api/documents/' + currentData._id;

  window.addEventListener('message', (event) => {
    var messageData = event.data;
    if (messageData === 'marcolixEditorIsLoaded') {
      iFrameWindow.postMessage({
        documentUrl: documentUrl,
        credentials: {
          userId: Meteor.userId(),
          authToken: localStorage.getItem('Meteor.loginToken')
        }
      }, '*');
    }
  });

  var editorUrl = l.protocol + '//' + l.hostname + ':3333';
  $iFrame.attr('src', editorUrl);

});

