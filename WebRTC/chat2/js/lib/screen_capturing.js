// Second Step: Listen for postMessage handler
// postMessage is used to exchange "sourceId" between chrome extension and you webpage.
// though, there are tons other options as well, e.g. XHR-signaling, websockets, etc.
window.addEventListener('message', function(event) {
    if (event.origin != window.location.origin) {
        return;
    }

    onMessageCallback(event.data);
});

/**
 * The function that handles received messages.
 * 
 * @param {string}      data   The data.
 */
function onMessageCallback(data) {
    // "cancel" button is clicked
    if (data == 'PermissionDeniedError') {
        chromeMediaSource = 'PermissionDeniedError';
        if (screenCallback) return screenCallback('PermissionDeniedError');
        else throw new Error('PermissionDeniedError');
    }

    // extension notified his presence
    if (data == 'rtcmulticonnection-extension-loaded') {
        chromeMediaSource = 'desktop';
    }

    // extension shared temp sourceId
    if (data.sourceId && screenCallback) {
        screenCallback(sourceId = data.sourceId);
    }
}

// global variables
var chromeMediaSource = 'screen';
var sourceId;
var screenCallback;

/**
 * This method can be used to check if chrome extension is installed & enabled.
 * 
 * @param {object}      callback   The chrome extension callback.
 */
function isChromeExtensionAvailable(callback) {
    if (!callback) return;

    if (chromeMediaSource == 'desktop') return callback(true);

    // ask extension if it is available
    window.postMessage('are-you-there', '*');

    setTimeout(function() {
        if (chromeMediaSource == 'screen') {
            callback(false);
        } else callback(true);
    }, 2000);
}

/**
 * This function can be used to get "source-id" from the extension.
 * 
 * @param {object}      callback   The chrome source id callback.
 */
function getSourceId(callback) {
    if (!callback) throw '"callback" parameter is mandatory.';
    if(sourceId) return callback(sourceId);
    
    screenCallback = callback;
    window.postMessage('get-sourceId', '*');
}

var isFirefox = typeof window.InstallTrigger !== 'undefined';
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isChrome = !!window.chrome && !isOpera;

/**
 * Gets the chrome extension status.
 * 
 * @param {string}      extensionid     The chrome extension id.
 * @param {object}      callback        The chrome extension callback.
 */
function getChromeExtensionStatus(extensionid, callback) {
    if (isFirefox) return callback('not-chrome');

    if (arguments.length != 2) {
        callback = extensionid;
        extensionid = 'fcmgbbaaldepmjhnpeimpclpiphimdif'; // default extension-id
    }

    var image = document.createElement('img');
    image.src = 'chrome-extension://' + extensionid + '/icon.png';
    image.onload = function() {
        chromeMediaSource = 'screen';
        window.postMessage('are-you-there', '*');
        setTimeout(function() {
            if (chromeMediaSource == 'screen') {
                callback(extensionid == extensionid ? 'installed-enabled' : 'installed-disabled');
            } else callback('installed-enabled');
        }, 2000);
    };
    image.onerror = function() {
        callback('not-installed');
    };
}

/**
 * This function explains how to use above methods/objects.
 * 
 * @param {object}      callback   The screen constraints callback.
 */
function getScreenConstraints(callback) {
    var firefoxScreenConstraints = {
        mozMediaSource: 'screen',
        mediaSource: 'screen'
    };
    
    if(isFirefox) return callback(null, firefoxScreenConstraints);

    // this statement defines getUserMedia constraints
    // that will be used to capture content of screen
    var screen_constraints = {
        mandatory: {
            chromeMediaSource: chromeMediaSource,
            maxWidth: screen.width > 1920 ? screen.width : 1920,
            maxHeight: screen.height > 1080 ? screen.height : 1080
        },
        optional: []
    };

    // this statement verifies chrome extension availability
    // if installed and available then it will invoke extension API
    // otherwise it will fallback to command-line based screen capturing API
    if (chromeMediaSource == 'desktop' && !sourceId) {
        getSourceId(function() {
            screen_constraints.mandatory.chromeMediaSourceId = sourceId;
            callback(sourceId == 'PermissionDeniedError' ? sourceId : null, screen_constraints);
        });
        return;
    }

    // this statement sets gets 'sourceId" and sets "chromeMediaSourceId" 
    if (chromeMediaSource == 'desktop') {
        screen_constraints.mandatory.chromeMediaSourceId = sourceId;
    }

    // now invoking native getUserMedia API
    callback(null, screen_constraints);
}