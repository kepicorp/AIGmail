InboxSDK.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
InboxSDK.loadScript('https://unpkg.com/@reactivex/rxjs@6.0.0/dist/global/rxjs.umd.js');

var currentMessageView = null;
var _sdk = null;
//var contentPanelViews = [];
//var contentPanelView = null;
//var contentPanelElement = null;

InboxSDK.load(2, 'sdk_payment-nlp_0e9250b655').then(function (sdk) {
    _sdk = sdk;
    // your app code using 'sdk' goes in here
    $(document).ready(function () {
        sdk.Conversations.registerMessageViewHandler(function (messageView) {

            messageView.on('load', function (event) {
                currentMessageView = event.messageView;
                console.log('message view loaded');
            });

            messageView.on('destroy', function (event) {
                // console.log('message view going away, time to clean up');
            });

            let interval = rxjs.interval(200);
            let pipe = interval.pipe(
                // Turn the stream into results of querying for the tablist element
                rxjs.operators.switchMap(() => rxjs.of(document.querySelector('.brC-bsf-aT5-aOt'))),
                // As soon as the tablist element gets the right role, finish the stream
                rxjs.operators.first(x => x && x.attributes.role && x.attributes.role.nodeValue == "tablist"),
                rxjs.operators.timeout(10000),
            );
            pipe.subscribe(this.mountSidebar);
        });
    });
});

function mountSidebar() {
    _sdk.Conversations.registerThreadViewHandler(threadView => {
        //console.log(threadView);
        let messageViews = threadView.getMessageViewsAll();
        let theMessageView = null;
        

        //console.log(messageViews);

        // maybe don't need this
        messageViews.forEach(function (element) {
            if (element == currentMessageView)
                theMessageView = element;
        });

        theMessageView = messageViews[messageViews.length - 1];

        //console.log(theMessageView.getBodyElement());
        let textContent = extractContent(theMessageView.getBodyElement().outerHTML).toString();
        textContent = textContent.replace(/ +(?= )/g,'').trim();
        let words = textContent.match(/\S+/g) || [];
        let combinedWords = words.join(" ");
        combinedWords = combinedWords
        .replace(/"/g, '')
        .replace(/</g, '')
        .replace(/>/g, '')
        .replace(/:/g, '')
        .replace(/,/g, '');

        console.log(combinedWords);
        theMessageView["predictionStack"] = [];
        let thePromise = makePrediction(theMessageView, combinedWords);

        thePromise.then(function (value) {
            console.log("GOT MESSAGEVIEW PREDICTION");
            console.log(theMessageView.predictionStack);

            let prediction = theMessageView.predictionStack[theMessageView.predictionStack.length - 1];
            
            console.log(prediction);
            if(!prediction)
                return;
            
            theMessageView["latestPrediction"] = prediction;

            console.log(prediction);
            highlightElements(prediction);


            //if(!contentPanelView) {
               let contentPanelElement = document.createElement("div");
            //}

            contentPanelElement.innerHTML = createPaymentContent(prediction.amount, prediction.accountA, prediction.accountB, prediction.currency);

            let contentPanelView = threadView.addSidebarContentPanel({
                title: 'Finastra Payment NLP',
                el: contentPanelElement,
                iconUrl: "https://ci5.googleusercontent.com/proxy/FQhGIUcBML3N2vjtotwLisLrXT4zHG2i0RG-FekcaDCxFpzNPefPZVxXsmZ_N9iuCTk-eztTm6zjXV0D09mxG7A1R9fLhj_FID5mbDbOkuOFAJ_Xig=s48"
            });
            
            //contentPanelViews.push(contentPanelView);

            console.log(threadView);

            contentPanelView.on('activate', function (event) {
                mdlTest();

                var snackbarContainer = document.querySelector('#demo-snackbar-example');
                var sendPaymentButton = document.getElementById("sendPayment");


                sendPaymentButton.addEventListener("click", function () {
                    makePayment(theMessageView);

                    var data = {
                        message: 'Payment sent.',
                        timeout: 3000,
                        actionHandler: null,
                        actionText: ''
                      };
                      snackbarContainer.MaterialSnackbar.showSnackbar(data);
                });
            });
            contentPanelView.on('destroy', function (event) {
                console.log("content panel view destroyed");
                console.log(this);

                this.remove();
                //this = null;
            });
        });

        threadView.on('destroy', function (event) {
            console.log("Thread view going away");

            //if(!!contentPanelView)
             //   contentPanelView.remove();

            //contentPanelView = null;
        });
    });
}


function highlightElements(prediction) {
    let elements = $("div[data-message-id]");
    console.log(prediction);

    if (!!elements && !!elements.array) {
        elements.array.forEach(element => {
            // console.log("calling highlighter loop array");
            if(!!prediction.accountA)
                highlightElement(prediction.accountA, element, "rgb(149, 183, 237)");
            if(!!prediction.accountB)    
                highlightElement(prediction.accountB, element, "rgb(245, 247, 150)");
            if(!!prediction.amount)
                highlightElement(prediction.amount, element, "rgb(158, 247, 159)");
            if(!!prediction.currency)
                highlightElement(prediction.currency, element, "rgb(167, 66, 245)");

            //openPaymentWidget();
        });
    }

    else if (!!elements && !!elements[0]) {
        // console.log("calling highlighter individual element");
        if(!!prediction.accountA)
            highlightElement(prediction.accountA, elements[0], "rgb(149, 183, 237)");
        if(!!prediction.accountB)    
            highlightElement(prediction.accountB, elements[0], "rgb(245, 247, 150)");
        if(!!prediction.amount)
            highlightElement(prediction.amount, elements[0], "rgb(158, 247, 159)");
        if(!!prediction.currency)
            highlightElement(prediction.currency, elements[0], "rgb(167, 66, 245)");

        //openPaymentWidget();
    }
}