InboxSDK.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');

var latestPrediction = {};

function createHighlightedElement(content, color) {
  let markup = "";

  if (!!color)
    markup = `<span style="background-color: ${color};">${content}</span>`;
  else
    markup = `<span>${content}</span>`;

  return markup;
}

function highlightElement(word, element, color) {
  var formattedDigit = convertToFormattedDigit(word);

  var rgxp = new RegExp(word, 'g');
  var rgxp2 = new RegExp(formattedDigit, 'g');

  var repl = `<span style="background-color:${color};">${word}</span>`;
  var repl2 = `<span style="background-color:${color};">${formattedDigit}</span>`;

  element.innerHTML = element.innerHTML.replace(rgxp, repl);
  element.innerHTML = element.innerHTML.replace(rgxp2, repl2);
}

function convertToFormattedDigit(word) {
  return word.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstElementChild;
}

//monitorEvents($("div[aria-label='Payment-NLP-Gmail']"));
function openPaymentWidget() {
  let widgetIcon = $("div[aria-label='Payment-NLP-Gmail']");
  let position = widgetIcon.offset();

  if (!!widgetIcon[0])
    click(position.left + 10, position.top + 10, widgetIcon[0]);
}

function click(x, y, element) {
  var downEvent = document.createEvent("MouseEvent");
  var upEvent = document.createEvent("MouseEvent");

  downEvent.initMouseEvent(
    "mousedown",
    true /* bubble */, true /* cancelable */,
    window, null,
    x, y, 0, 0, /* coordinates */
    false, false, false, false, /* modifier keys */
    0 /*left*/, null
  );

  upEvent.initMouseEvent(
    "mouseup",
    true /* bubble */, true /* cancelable */,
    window, null,
    x, y, 0, 0, /* coordinates */
    false, false, false, false, /* modifier keys */
    0 /*left*/, null
  );

  element.dispatchEvent(downEvent);
  element.dispatchEvent(upEvent);
}


function makePrediction(view, text) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:5001/predict",
    //"url": "https://finastraemailpayment.azurewebsites.net/api/Predict?code=ZXz6mNiJlq/Zcpqpw9POaYZQbhrYpKAbxCsGYvBfEVu8OqHMbH1uDQ==",
    "method": "POST",
    "type": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": '*',
    },
    "processData": false,
    "data": `{"email": "${text}"}`
  };

  console.log(settings);
  console.log("MAKE PREDICTION");

  var myPromise = $.ajax(settings).success(function (response) {
    console.log("GOT PREDICTION RESPONSE");
    console.log(response);
    //latestPrediction = response;
    console.log(view);

    if (response == JSON.stringify(response) && response.toString().length > 2)
    {
      console.log('PARSING: '+response)
      json = JSON.parse(response);
      view.predictionStack.push(json);
    }
    //updateComposeWindow(composeView, textContent);
    else if(response.toString().length > 0)
    {
      view.predictionStack.push(response);
    }
  });

  return myPromise;
}

function makePayment(view) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:5001/payment",
    //"url": "http://localhost:7071/api/Payment",
    "method": "POST",
    "type": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": '*',
    },
    "processData": false,
    "data": `{"amount":"${view.latestPrediction.amount}",
             "accountA":"${view.latestPrediction.accountA}",
             "accountB":"${view.latestPrediction.accountB}",
             "currency":"${view.latestPrediction.currency}"}`,
  }
  console.log("MAKE PAYMENT");

  $.ajax(settings).success(function (response) {
    console.log("GOT PAYMENT RESPONSE");
    console.log(response);
  });
}

function makePaymentasync(view) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:5001/payment",
    //"url": "http://localhost:7071/api/Payment",
    "method": "POST",
    "type": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": '*',
    },
    "processData": false,
    "data": `{"amount":"${view.latestPrediction.amount}",
             "accountA":"${view.latestPrediction.accountA}",
             "accountB":"${view.latestPrediction.accountB}",
             "currency":"${view.latestPrediction.currency}"}`,
  }
  console.log("MAKE PAYMENT ASYNC");

  var myPromise = $.ajax(settings).success(function (response) {
    console.log("GOT PAYMENT ASYNC RESPONSE");
    console.log(response);
    myJSON = JSON.parse(response);
    alert('Payment ID: ' + myJSON.paymentResourceId + ' with STATUS :' + myJSON.transactionStatus);
  });

  return myPromise;
}


function getCaretCharacterOffsetWithin(element) {
  var caretOffset = 0;
  var doc = element.ownerDocument || element.document;
  var win = doc.defaultView || doc.parentWindow;
  var sel;
  if (typeof win.getSelection != "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      var range = win.getSelection().getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type != "Control") {
    var textRange = sel.createRange();
    var preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}

function getCaretPosition() {
  if (window.getSelection && window.getSelection().getRangeAt) {
    var sel = window.getSelection();

    var range = sel.rangeCount > 0 ? sel.getRangeAt(0) : sel.createRange();
    var selectedObj = window.getSelection();
    var rangeCount = 0;
    var childNodes = selectedObj.anchorNode.parentNode.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
      if (childNodes[i] == selectedObj.anchorNode) {
        break;
      }
      if (childNodes[i].outerHTML)
        rangeCount += childNodes[i].outerHTML.length;
      else if (childNodes[i].nodeType == 3) {
        rangeCount += childNodes[i].textContent.length;
      }
    }
    return range.startOffset + rangeCount;
  }
  return -1;
}

function getAllTextnodes(el) {
  var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while (n = walk.nextNode()) a.push(n);
  return a;
}

function getCaretData(el, position) {
  var node; nodes = getAllTextnodes(el);
  for (var n = 0; n < nodes.length; n++) {
    if (position > nodes[n].nodeValue.length && nodes[n + 1]) {
      // remove amount from the position, go to next node
      position -= nodes[n].nodeValue.length;
    } else {
      node = nodes[n];
      break;
    }
  }
  // you'll need the node and the position (offset) to set the caret
  return { node: node, position: position };
}

// setting the caret with this info  is also standard
function setCaretPosition(d) {
  var sel = window.getSelection();
  var range = document.createRange();
  range.setStart(d.node, Math.min(d.node.length, d.position));
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
}

function findFirstDiffPos(a, b) {
  // replace &nbsp;
  let first = a.replace(String.fromCharCode(160), " ");
  let second = b.replace(String.fromCharCode(160), " ");

  var shorterLength = Math.min(first.length, second.length);

  for (var i = 0; i < shorterLength; i++) {
    if (first[i] != second[i]) {
      // console.log(first.charCodeAt(i));
      // console.log(second.charCodeAt(i));
      return i;
    }
  }

  if (first.length !== second.length) {
    return shorterLength;
  }

  return -1;
}

function extractContent(html) {
  return (new DOMParser).parseFromString(html, "text/html").
    documentElement.textContent;
}