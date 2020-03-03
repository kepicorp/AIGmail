var currentCompose = null;

InboxSDK.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');

InboxSDK.load(2, 'sdk_payment-nlp_0e9250b655').then(function(sdk){
    // your app code using 'sdk' goes in here
    $( document ).ready(function() {
    
        sdk.Compose.registerComposeViewHandler(function(composeView){
            console.log("REGISTER COMPOSE VIEW HANDLER");
            composeView["predictionStack"] = [];
            composeView["composeContent"] = null;
            composeView["wordCount"] = 0;
            composeView["currentCaretPosition"] = 0;
            composeView["interval"] = null;
            composeView["latestContentChange"] = Math.floor(Date.now() / 1000);
            composeView["latestPrediction"] = null;

            console.log("icon url: " + chrome.extension.getURL('finastra-icon.png'));
            composeView.addButton({
                title: 'Finastra Payment NLP',
                // iconUrl: chrome.extension.getURL('finastra-icon.png'),
                onClick: handleComposeButtonClick,
                iconUrl: "https://ci5.googleusercontent.com/proxy/FQhGIUcBML3N2vjtotwLisLrXT4zHG2i0RG-FekcaDCxFpzNPefPZVxXsmZ_N9iuCTk-eztTm6zjXV0D09mxG7A1R9fLhj_FID5mbDbOkuOFAJ_Xig=s48"
            });

            composeView.on('bodyChanged', function(event) {
                console.log('bodyChanged');

                let textContent = composeView.getTextContent();
    
                if(textContent == composeView.composeContent) // PREVENT THE INFINITE LOOP
                    return;

                if(!!textContent && !!composeView.composeContent)
                {
                    let diffPosition = findFirstDiffPos(textContent, composeView.composeContent);
                    composeView.currentCaretPosition = (diffPosition >= 0 ? diffPosition : composeView.currentCaretPosition) + 1;
                }
                    
                composeView.composeContent = textContent;

                let currentTimestamp = Math.floor(Date.now() / 1000);
                composeView.latestContentChange = currentTimestamp; 
                         
                console.log(composeView);
            });
        
            composeView.on('destroy', function(event) {
                // console.log('compose view going away, time to clean up');

                clearInterval(composeView.interval);
                composeView.interval = null;
            });

            composeView.interval = setInterval(function() {
                intervalCallback(composeView);
            }, 300);
        });
    });

    function intervalCallback(composeView) {
        //console.log("prediction stack: " + composeView.predictionStack);

        let currentTimestamp = Math.floor(Date.now() / 1000);
        let timeDifference = currentTimestamp - composeView.latestContentChange;
        console.log("TIME DIFFERENCE: " + timeDifference);
        
        let textContent = composeView.getTextContent();
        let words = textContent.match(/\S+/g) || [];

        if(timeDifference > 3 && words.length > 1 && composeView.predictionStack.length == 0)
        {  
            checkAndMakePrediction(composeView, textContent);
        }
        else if(timeDifference > 5 && words.length > 1 && composeView.predictionStack.length !== 0)
        {
            processPrediction(composeView, textContent);
        }
        
    }

    function handleComposeButtonClick(event) {
        console.log("BUTTON CLICK EVENT:");
        console.log(event);

        let composeView = event.composeView;

        let htmlString = createPaymentContent(
            !!composeView.latestPrediction.amount ? composeView.latestPrediction.amount : "Not Found",
            !!composeView.latestPrediction.accountA ? composeView.latestPrediction.accountA : "Not Found",
            !!composeView.latestPrediction.accountB ? composeView.latestPrediction.accountB : "Not Found",
            !!composeView.latestPrediction.currency ? composeView.latestPrediction.currency : "None");

        try {
            sdk.Widgets.showDrawerView(
                {
                    title: 'Finastra Payment NLP',
                    el: createElementFromHTML(htmlString),
                    chrome: true,
                    composeView: event.composeView,
                    closeWithCompose: true
                }
            );

            var snackbarContainer = document.querySelector('#demo-snackbar-example');
            var sendPaymentButton = document.getElementById("sendPayment");

            sendPaymentButton.addEventListener("click", function() {

                makePaymentasync(composeView);

                var data = {
                    message: 'Payment sent.',
                    timeout: 3000,
                    actionHandler: null,
                    actionText: ''
                  };
                  snackbarContainer.MaterialSnackbar.showSnackbar(data);
            });
        }
        catch {
            sdk.Widgets.showDrawerView(
                {
                    title: 'Finastra Payment NLP',
                    el: createElementFromHTML(htmlString),
                    chrome: true,
                }
            );
        }

        mdlTest();     
    }
});


function mdlTest() {    
    let grids = document.getElementsByClassName("mdl-grid");
    let textFields = document.getElementsByClassName("mdl-textfield");
    let buttons = document.getElementsByClassName("mdl-button");
    let snackbars = document.getElementsByClassName("mdl-snackbar");
    let menus = document.getElementsByClassName("mdl-menu");
    let menuItems = document.getElementsByClassName("mdl-menu__item")
    //console.log(grids);

    Array.from(grids).forEach((element) => {
        componentHandler.upgradeElement(element);
    });
    Array.from(textFields).forEach((element) => {
        componentHandler.upgradeElement(element);
    });
    Array.from(buttons).forEach((element) => {
        componentHandler.upgradeElement(element);
    });
    Array.from(snackbars).forEach((element) => {
        componentHandler.upgradeElement(element);
    });
    Array.from(menus).forEach((element) => {
        componentHandler.upgradeElement(element);
    });
    Array.from(menuItems).forEach((element) => {
        componentHandler.upgradeElement(element);
    });

    getmdlSelect.init(".getmdl-select");
}

function checkAndMakePrediction(composeView, textContent) {
    let whitespace = textContent.substring(textContent.trim().length, textContent.length);

    let words = textContent.match(/\S+/g) || [];
    let combinedWords = words.join(" ");
    combinedWords = combinedWords
        .replace(/"/g, '')
        .replace(/</g, '')
        .replace(/>/g, '')
        .replace(/:/g, '')
        .replace(/,/g, '');
    
    console.log("CHECK TO PREDICT");

    if(composeView.wordCount != words.length || composeView.predictionStack.length == 0) {
        console.log("MAKE PREDICTION FOR: " + combinedWords);
        makePrediction(composeView, combinedWords);
    }
}

function processPrediction(composeView, textContent) {
    console.log("PROCESS PREDICTION");

    var el = $("div[aria-label='Message Body']");
    var element = el[0];

    prediction = composeView.predictionStack[composeView.predictionStack.length - 1];
    
    updateComposeWindow(composeView, textContent, prediction);

    let newCaretData = getCaretData(element, composeView.currentCaretPosition);

    if(!!newCaretData.node)
        setCaretPosition(newCaretData);

    composeView.latestPrediction = prediction;
    composeView.predictionStack = [];
}


function updateComposeWindow(composeView, textContent, prediction) {
    console.log("UPDATE COMPOSE WINDOW");
    
    let whitespace = textContent.substring(textContent.trim().length, textContent.length);

    let words = textContent.match(/\S+/g) || [];

    composeView.wordCount = words.length;

    console.log(words);

    let newContent = "";

    for(i = 0; i < words.length; i++) {
        let current = words[i];
        let optionalSpace = true;

        if(i == 0)
            optionalSpace = false;
        
        let createdElement = null;
        if(!!prediction.accountA && current.includes(prediction.accountA))
            createdElement = createHighlightedElement(current, "rgb(149, 183, 237)");
        else if(!!prediction.accountB && current.includes(prediction.accountB))
            createdElement = createHighlightedElement(current, "rgb(245, 247, 150)");
        else if(!!prediction.amount && current.includes(prediction.amount))
            createdElement = createHighlightedElement(current, "rgb(158, 247, 159)");
        else if(!!prediction.currency && current.includes(prediction.currency))
            createdElement = createHighlightedElement(current, "rgb(167, 66, 245)");
        else
            createdElement = createHighlightedElement(current, null);

        newContent = newContent + (optionalSpace ? " " : "") + createdElement;
    }

    newContent = newContent + whitespace;

    composeView.setBodyHTML(newContent);
    //openPaymentWidget();
}