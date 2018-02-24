// main

var webrtc = null;

/**
 * Initialise the WebRTC application.
 */
function pageLoad() {

    // WebRTC options.
    var options = { 
        debug: true,
        signallingURL: "wss://[HOST]:[PORT]",
        peerConnectionConfiguration: {
            iceServers: [ 
        		{ 
                    "urls": "stun:[HOST]:[PORT]"
        		},
                {
                    "urls": "turn:[HOST]:[PORT]?transport=udp",
                    "username": "[username]",
                    "credential": "[password]"
                },
                {
                    "urls": "turn:[HOST]:[PORT]?transport=tcp",
                    "username": "[username]",
                    "credential": "[password]"
                }
        	]
        } 
    };

    try {
        // Create the webRTC interface.
        webrtc = new WebRTC(options);

        // Initialise the app.
        init();
    } 
    catch (e) {
        trace("Error: could not create WebRTC interface: " + e);
    }

    // If defined.
    if (webrtc)
    {
        // Connection open
        webrtc.on('connectionOpen', function (arg) {

            // Send open connection alert.
            alertTextElement.innerHTML = "Connection has opened.";
        });

        // Connection close
        webrtc.on('connectionClose', function (arg) {

            // Send close connection alert.
            alertTextElement.innerHTML = "Connection has closed.";
        });

        // Connection error
        webrtc.on('connectionError', function (arg) {

            // Send error connection alert.
            alertTextElement.innerHTML = "Connection error: " + arg.data;
        });

        // Signal error
        webrtc.on('signalError', function (arg) {

            // Send error alert.
            alertTextElement.innerHTML = "Error encountered from signalling: " + arg.error;
        });

        // Signal applications
        webrtc.on('signalApplications', function (arg) {

            // Clear.
            alertTextList.innerHTML = "<b>ApplicationID</b><br>";
            var existsText = alertTextList.innerHTML;

            // For each item.
            for (var u in arg.list) {
                // Add item.
                alertTextList.innerHTML = existsText + arg.list[u].application + "<br>";
                existsText = alertTextList.innerHTML;
            }
        });

        // Signal uniques
        webrtc.on('signalUniques', function (arg) {

            // Clear.
            alertTextList.innerHTML = "<b>UniqueID</b><br>";
            var existsText = alertTextList.innerHTML;

            // For each item.
            for (var u in arg.list) {
                // Add item.
                alertTextList.innerHTML = existsText + arg.list[u].unique + "<br>";
                existsText = alertTextList.innerHTML;
            }
        });

        // Signal groups
        webrtc.on('signalGroups', function (arg) {

            // Clear.
            alertTextList.innerHTML = "<b>UniqueID, ApplicationID</b><br>";
            var existsText = alertTextList.innerHTML;

            // For each item.
            for (var u in arg.list) {
                // Add item.
                alertTextList.innerHTML = existsText + arg.list[u].unique + ", " + arg.list[u].application + "<br>";
                existsText = alertTextList.innerHTML;
            }
        });

        // Settings changed
        webrtc.on('signalSettings', function (arg) {
            
            // The client settings.
            alertTextElement.innerHTML = "Client settings have been applied: " + arg.setting;
        });

        // Contact available signal.
        webrtc.on('signalAvailable', function (arg) {
            
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();

            // If available.
            if (arg.available === true) {
                // The contact has sent a message
                // to the signalling server asking
                // if this client is available.
                // Add the local video stream to the contact stream.
                var localStream = webrtc.webrtcadapter.getStream();
                contact.addStream(localStream);

                // Create the call offer and send the call request.
                contact.sendJoinConferenceOfferRequest();
            }
        });

        // Contact un-available
        webrtc.on('signalSelfAvailable', function (arg) {

            // Is the contact available.
            alertTextBackElement.innerHTML = "The contact is available: " + arg.available;
        });

        // Contact message
        webrtc.on('signalMessage', function (arg) {
            
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();

            // Show message.
            var existsText = alertTextMessageElement.innerHTML;
            alertTextMessageElement.innerHTML = existsText + "<b>" + uniqueID + " from " + applicationID + " wrote:</b> " + arg.message + "<br>";
        });

        // Contact state
        webrtc.on('signalState', function (arg) {
            
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();
            var state = arg.state;
            
            // Get the contact video index.
            var peerIndex = conferenceContactList.indexOf(uniqueID);
            var remoteState = conferenceRemoteStateElement[peerIndex]

            // Set the contact state.
            remoteState.innerHTML = state;
        });

        // Contact did not answer
        webrtc.on('signalNoAnswer', function (arg) {
            
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();

            // Show did not answer.
            alertTextElement.innerHTML = uniqueID + " from " + applicationID + " is not available.";
        });

        // Contact ended the call
        webrtc.on('signalEndCall', function (arg) {
            
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();

            // Remove the remote stream.
            contact.closeStream();

            // Remote contact ended the call.
            alertTextElement.innerHTML = uniqueID + " from " + applicationID + " ended the call.";
        });

        // Contact is typing
        webrtc.on('signalTyping', function (arg) {
            
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();

            // If contact typing a message.
            if (arg.typing && arg.typing === true) {
                alertTextBackElement.innerHTML = uniqueID + " from " + applicationID + " is typing a message.";
            }
            else {
                alertTextBackElement.innerHTML = uniqueID + " from " + applicationID + " has stopped typing.";
            }
        });

        // Contact offer.
        webrtc.on('signalOffer', function (arg) {

            // Answer the contact call.
            var contact = arg.contact;
            answerCall(contact);
        });

        // Contact answer.
        webrtc.on('signalAnswer', function (arg) {

            // Call answered for the contact call.
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();

            // Remote client answered the call.
            alertTextElement.innerHTML = uniqueID + " from " + applicationID + " accepted the call.";
        });

        // Contact offer.
        webrtc.on('signalJoinConferenceOffer', function (arg) {

            // Answer the contact call.
            var contact = arg.contact;
            answerJoinConference(contact);
        });

        // Contact answer.
        webrtc.on('signalJoinConferenceAnswer', function (arg) {

            // Call answered for the contact call.
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();

            // Remote client answered the call.
            alertTextElement.innerHTML = uniqueID + " from " + applicationID + " has joined the conference.";
        });

        // Contact add stream.
        webrtc.on('contactAddStream', function (arg) {

            // Assign this contact remote stream
            // to the remote video element.
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();

            // Get contact list.
            var contacts = isContactInList(contact);
            if (contacts.length <= 0) {
                // Add to list.
                conferenceContactList.push(contact.uniqueID);

                // Create the conference contacts.
                createNewContact(contact.uniqueID, contact.applicationID);
            }

            // Get the contact video index.
            var peerIndex = conferenceContactList.indexOf(uniqueID);
            var remoteVideo = conferenceRemoteVideoElement[peerIndex]

            // Set the stream to the video element.
            contact.setRemoteStreamToVideoElement(remoteVideo, arg.add.stream);
        });

        // Contact file offer.
        webrtc.on('signalFileOffer', function (arg) {

            // Answer the contact file call.
            var contact = arg.contact;
            answerFileTransfer(contact, arg.name, arg.size);
        });

        // Contact file answer.
        webrtc.on('signalFileAnswer', function (arg) {

            // Call answered for the contact file call.
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();

            // Remote client answered the call.
            alertTextElement.innerHTML = uniqueID + " from " + applicationID + " accepted the file transfer.";
        });

        // Contact receive size.
        webrtc.on('contactReceiveSize', function (arg) {

            // Contact details.
            var contact = arg.contact;

            // Set the current file progress.
            sendReceiveProgress.value = arg.size;
        });

        // Contact receive complete.
        webrtc.on('contactReceiveComplete', function (arg) {

            // Contact details.
            var contact = arg.contact;
            
            // Contact receive file complete.
            receiveFileComplete(contact, arg.buffer);
        });

        // Contact sent size.
        webrtc.on('contactSentSize', function (arg) {

            // Contact details.
            var contact = arg.contact;

            // Set the current file progress.
            sendReceiveProgress.value = arg.size;
        });

        // Contact sent complete.
        webrtc.on('contactSentComplete', function (arg) {

            // Contact details.
            var contact = arg.contact;
            
            // Upload a completed.
            statusMessage.textContent = "File upload has completed";
        });

        // Adapter sent recording data.
        webrtc.on('recordingData', function (arg) {

            // If recording buffer.
            if (recordedBlobs) {
                recordedBlobs.push(arg.data);
            }
        });

        // Adapter stopped recording.
        webrtc.on('recordingStopped', function (arg) {

            // Create a Blob from the recorded data.
            var blob = new Blob(recordedBlobs, {type: 'video/webm'});
            var url = window.URL.createObjectURL(blob);

            // Create a new a element.
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'test.webm';

            // Add the a element.
            document.body.appendChild(a);
            a.click();

            // Set download timer.
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        });
    }
};

/**
 * Unload the WebRTC application.
 */
function pageBeforeUnload() {

    // If defined.
    if (webrtc)
    {
        try {
            // Close the connection.
            webrtc.close();
        } 
        catch (e) {
            trace("Error: could not close the WebRTC interface: " + e);
        }
    }
};

var containerDivElement = null;
var conatinerDivRemoteVideoShow = null;
var localVideoElement = null;

var uniqueIDElement = null;
var applicationIDElement = null;
var availableElement = null;
var broadcastElement = null;
var broadcastAppIDElement = null;
var clientStateElement = null;

var contactUniqueIDElement = null;
var contactApplicationIDElement = null;
var contactUniqueIDListButton = null;
var contactApplicationIDListButton = null;
var contactGroupListButton = null;
var alertTextList = null;

var startCamButton = null;
var stopCamButton = null;
var toggleMuteAudioButton = null;
var toggleMuteAllRemoteButton = null;

var videoCallButton = null;
var endCallButton = null;
var alertTextElement = null;
var alertTextBackElement = null;
var alertTextMessageElement = null;
var changeSettingsButton = null;
var clientStateButton = null;

var contactAvailableButton = null;
var contactSendMessageElement = null;
var contactSendMessageButton = null;
var contactSendMessageClearButton = null;
var contactClearListButton = null;

var useVideoElement = null;
var useAudioElement = null;
var useScreenElement = null;
var useWindowElement = null;

var localVolumeControlElement = null;
var remoteVolumeControlElement = null;

var fileInput = null;
var statusMessage = null;
var downloadAnchor = null;
var sendReceiveProgress = null;
var fileInputStartTransferButton = null;
var fileInputStopTransferButton = null;

var recordedBlobs = [];
var startRecodingButton = null;
var stopRecodingButton = null;

var conferenceIndex = 0;
var conferenceContactList = [];
var conferenceApplicationID = null;
var conferenceDialogVideoRemoteDiv = [];
var conferenceResizableRemoteDiv = [];
var conferenceRemoteVideoElement = [];
var conferenceRemoteShowElement = [];
var conferenceRemoteVolumeElement = [];
var conferenceRemoteStateElement = [];
var conferenceRemoteDiv = [];

var isBrowserFirefox = typeof window.InstallTrigger !== 'undefined';
var isBrowserOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isBrowserChrome = !!window.chrome && !isOpera;

/**
 * Initialise the application.
 */
function init() {

    // The container div.
    containerDivElement = document.getElementById("container");
    conatinerDivRemoteVideoShow = document.getElementById("remoteVideoShow");

    // Assign the common conference application ID.
    conferenceApplicationID = "123456789";

    // Get the client details.
    uniqueIDElement = document.getElementById("uniqueID");
    applicationIDElement = document.getElementById("applicationID");
    availableElement = document.getElementById("available");
    broadcastElement = document.getElementById("broadcast");
    broadcastAppIDElement = document.getElementById("broadcastAppID");
    clientStateElement = document.getElementById("clientState");

    // Get the contact details.
    contactUniqueIDElement = document.getElementById("contactUniqueID");
    contactApplicationIDElement = document.getElementById("contactApplicationID");
    contactUniqueIDListButton = document.getElementById("contactUniqueIDListButton");
    contactApplicationIDListButton = document.getElementById("contactApplicationIDListButton");
    contactGroupListButton = document.getElementById("contactGroupListButton");
    alertTextList = document.getElementById("alertTextList");

    // Assign the conference ID.
    applicationIDElement.value = conferenceApplicationID;
    contactApplicationIDElement.value = conferenceApplicationID;

    // Assign the list of possible conference contacts.
    if (conferenceContactList) {
        conferenceContactList.push("drazen");
        conferenceContactList.push("joe");
        conferenceContactList.push("ben");
        conferenceContactList.push("pushkar");
        conferenceContactList.push("graham");
        conferenceContactList.push("tommy");
        conferenceContactList.push("chris");
        conferenceContactList.push("doug");
        conferenceContactList.push("daryush");
        conferenceContactList.push("toby");
        conferenceContactList.push("suzy");
        conferenceContactList.push("jim");
        conferenceContactList.push("john");
        conferenceContactList.push("sarin");
    }

    // For each conference contact.
    conferenceContactList.forEach(function (uniqueID) {

        // Create the conference contacts.
        createConferenceContact(uniqueID, conferenceApplicationID);

        // Create a new contact.
        createNewContact(uniqueID, conferenceApplicationID);
    });

    // Assign the local video element.
    localVideoElement = document.getElementById("localVideo");
    alertTextElement = document.getElementById("alertText");
    alertTextBackElement = document.getElementById("alertTextBack");
    alertTextMessageElement = document.getElementById("alertTextMessage");
    contactSendMessageElement = document.getElementById("contactSendMessage");

    // Call and end call elements.
    startCamButton = document.getElementById("startCamButton");
    stopCamButton = document.getElementById("stopCamButton");
    resetPeerConnectionButton = document.getElementById("resetPeerConnectionButton"); 
    toggleMuteAudioButton = document.getElementById("toggleMuteAudioButton");
    toggleMuteAllRemoteButton = document.getElementById("muteAllRemote");
    videoCallButton = document.getElementById("videoCallButton");
    endCallButton = document.getElementById("endCallButton");
	changeSettingsButton = document.getElementById("changeSettingsButton");
    contactAvailableButton = document.getElementById("contactAvailableButton");
    contactSendMessageButton = document.getElementById("contactSendMessageButton");
    contactSendMessageClearButton = document.getElementById("contactSendMessageClearButton");
    contactClearListButton = document.getElementById("contactClearListButton");
    startRecodingButton = document.getElementById("startRecodingButton");
    stopRecodingButton = document.getElementById("stopRecodingButton");
    clientStateButton = document.getElementById("clientStateButton");
	
	// Get the video audio parms.
	useVideoElement = document.getElementById("useVideo");
    useAudioElement = document.getElementById("useAudio");
    useScreenElement = document.getElementById("useScreen");
    useWindowElement = document.getElementById("useWindow");

    // Volume control.
    localVolumeControlElement = document.getElementById("localVolumeControl");

    // File transfer.
    statusMessage = document.querySelector('span#status');
    fileInput = document.querySelector('input#fileInput');
    downloadAnchor = document.querySelector('a#download');
    sendReceiveProgress = document.querySelector('progress#sendReceiveProgress');
    fileInputStartTransferButton = document.querySelector('input#fileInputStartTransferButton');
    fileInputStopTransferButton = document.querySelector('input#fileInputStopTransferButton');

    // File input event handler.
    fileInput.addEventListener('change', handleFileInputChange, false);
    fileInputStartTransferButton.addEventListener("click", fileInputStartTransfer);
    fileInputStopTransferButton.addEventListener("click", fileInputStopTransfer);

	// Start camera
    startCamButton.addEventListener("click", startLocalVideo);
    stopCamButton.addEventListener("click", closeLocalVideo);

    // Start recording
    startRecodingButton.addEventListener("click", startRecording);
    stopRecodingButton.addEventListener("click", stopRecording);
		
    // Start a new call.
    videoCallButton.addEventListener("click", makeCall);

    // Add an end call handler.
    endCallButton.addEventListener("click", endCall);
	
	// Add a change settings handler.
    changeSettingsButton.addEventListener("click", changeClientSettings);
    clientStateButton.addEventListener("click", changeClientState);
	
	// Add a contact available handler.
    contactAvailableButton.addEventListener("click", contactAvailableRequest);

    // Add a send message to contact handler.
    contactSendMessageButton.addEventListener("click", contactSendMessage);

    // Add a send message to contact handler.
    contactSendMessageClearButton.addEventListener("click", contactClearButton);

    // Add contact list items handler.
    contactUniqueIDListButton.addEventListener("click", contactUniqueIDList);
    contactApplicationIDListButton.addEventListener("click", contactApplicationIDList);
    contactGroupListButton.addEventListener("click", contactGroupList);
    contactClearListButton.addEventListener("click", contactClearList);

    // Mute handler.
    toggleMuteAudioButton.addEventListener("click", toggleMuteAudio);
    toggleMuteAllRemoteButton.addEventListener("click", toggleMuteRemote);

    // Contact typing handler.
    contactSendMessageElement.addEventListener("focus", contactTypingMessageStart);
    contactSendMessageElement.addEventListener("blur", contactTypingMessageStop);

    // Volume control handlers
    localVolumeControlElement.addEventListener('change', setVolumeLocal);
    localVolumeControlElement.addEventListener('input', setVolumeLocal);

    // Set the local video volume to 0.
    localVolumeControlElement.value = 0;
    localVideoElement.volume = 0;
};

/**
 * Create a new contact.
 * 
 * @param {string}          uniqueID        The uniqueID of the contact.
 * @param {applicationID}   applicationID   The applicationID of the contact.
 */
function createNewContact(uniqueID, applicationID) {

    // Create video elements.
    conferenceDialogVideoRemoteDiv.push(document.createElement("div"));
    conferenceDialogVideoRemoteDiv[conferenceIndex].id = "dialogVideoRemote" + conferenceIndex;

    conferenceResizableRemoteDiv.push(document.createElement("div"));
    conferenceResizableRemoteDiv[conferenceIndex].id = "resizableRemote" + conferenceIndex;

    conferenceRemoteVideoElement.push(document.createElement("video"));
    conferenceRemoteVideoElement[conferenceIndex].id = "remoteVideo" + conferenceIndex;
    conferenceRemoteVideoElement[conferenceIndex].autoplay = true;
    conferenceRemoteVideoElement[conferenceIndex].playsInline = true;
    conferenceRemoteVideoElement[conferenceIndex].controls = true;
    conferenceRemoteVideoElement[conferenceIndex].width = "380";
    conferenceRemoteVideoElement[conferenceIndex].height = "340";

    conferenceResizableRemoteDiv[conferenceIndex].appendChild(conferenceRemoteVideoElement[conferenceIndex]);
    conferenceDialogVideoRemoteDiv[conferenceIndex].appendChild(conferenceResizableRemoteDiv[conferenceIndex]);
    containerDivElement.appendChild(conferenceDialogVideoRemoteDiv[conferenceIndex]);

    conferenceRemoteShowElement.push(document.createElement("input"));
    conferenceRemoteShowElement[conferenceIndex].id = "videoRemoteShow" + conferenceIndex;
    conferenceRemoteShowElement[conferenceIndex].type = "button";
    conferenceRemoteShowElement[conferenceIndex].value = uniqueID;
    conferenceRemoteShowElement[conferenceIndex].className = "buttonContact ui-button ui-corner-all ui-widget";

    conferenceRemoteStateElement.push(document.createElement("div"));
    conferenceRemoteStateElement[conferenceIndex].id = "remoteState" + conferenceIndex;
    conferenceRemoteStateElement[conferenceIndex].innerHTML = "Unknown";
    conferenceRemoteStateElement[conferenceIndex].className = "remoteContactsStateClass";

    conferenceRemoteVolumeElement.push(document.createElement("input"))
    conferenceRemoteVolumeElement[conferenceIndex].id = "remoteVolume" + conferenceIndex;
    conferenceRemoteVolumeElement[conferenceIndex].type = "range";
    conferenceRemoteVolumeElement[conferenceIndex].min = "0";
    conferenceRemoteVolumeElement[conferenceIndex].max = "100";
    conferenceRemoteVolumeElement[conferenceIndex].step = "1";
    conferenceRemoteVolumeElement[conferenceIndex].innerHTML = uniqueID;
    conferenceRemoteVolumeElement[conferenceIndex].className = "remoteContactsClass";
    conferenceRemoteVolumeElement[conferenceIndex].addEventListener('change', setVolumeRemote);
    conferenceRemoteVolumeElement[conferenceIndex].addEventListener('input', setVolumeRemote);

    conferenceRemoteDiv.push(document.createElement("div"));
    conferenceRemoteDiv[conferenceIndex].id = "remoteDisplay" + conferenceIndex;
    conferenceRemoteDiv[conferenceIndex].className = "contactList"
    conferenceRemoteDiv[conferenceIndex].appendChild(conferenceRemoteShowElement[conferenceIndex]);
    conferenceRemoteDiv[conferenceIndex].appendChild(conferenceRemoteStateElement[conferenceIndex]);
    conferenceRemoteDiv[conferenceIndex].appendChild(conferenceRemoteVolumeElement[conferenceIndex]);

    conatinerDivRemoteVideoShow.appendChild(conferenceRemoteDiv[conferenceIndex]);

    // Add remote video.
    InitRemoteVideo(
        conferenceResizableRemoteDiv[conferenceIndex].id, 
        conferenceRemoteVideoElement[conferenceIndex].id, 
        conferenceDialogVideoRemoteDiv[conferenceIndex].id,
        conferenceRemoteShowElement[conferenceIndex].id,
        uniqueID,
        applicationID
    )

    // Increment the count.
    conferenceIndex++;
}

/**
 * Start the video and audio.
 */
function startLocalVideo() {

    // Add the local video element.
    webrtc.setLocalVideoElement(localVideoElement);

    // If screen capture or window capture.
    if (useScreenElement.checked || useWindowElement.checked) {
        // Use screen sharing.

        if (useScreenElement.checked) {

            if (isBrowserFirefox) {
                // Capture constraints
                var constraints = {
                    video: {
                        mediaSource: 'screen',
                        width: {max: '1920'},
                        height: {max: '1080'},
                        frameRate: {max: '10'}
                    },
					audio: useAudioElement.checked
                };

                // Start the local screen capture.
                webrtc.createStreamEx(constraints);
            }

            if (isBrowserChrome) {
                
                // Get the screen ID.
                getScreenId(function (error, sourceId, screen_constraints) {
			
					// Capture constraints
					var constraints = {
						audio: false,
						video: {
							mandatory: {
								chromeMediaSourceId: sourceId,
								chromeMediaSource: error ? 'screen' : 'desktop',
								maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
								maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
							},
							optional: []
						}
					};
				
                    // Start the local screen capture.
                    webrtc.createStreamEx(constraints);
                });
            }
        }
        else {

            if (isBrowserFirefox) {
                // Capture constraints
                var constraints = {
                    video: {
                        mediaSource: 'window',
                        width: {max: '1920'},
                        height: {max: '1080'},
                        frameRate: {max: '10'}
                    },
					audio: useAudioElement.checked
                };

                // Start the local window capture.
                webrtc.createStreamEx(constraints);
            }

            if (isBrowserChrome) {

                // Get the screen ID.
                getScreenId(function (error, sourceId, screen_constraints) {
			
					// Capture constraints
					var constraints = {
						audio: false,
						video: {
							mandatory: {
								chromeMediaSourceId: sourceId,
								chromeMediaSource: error ? 'screen' : 'desktop',
								maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
								maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
							},
							optional: []
						}
					};
				
                    // Start the local screen capture.
                    webrtc.createStreamEx(constraints);
                });
            }
        }
    }
    // Video and audio stream.
    else if (useAudioElement.checked || useVideoElement.checked) {
        // Start the local video.
        webrtc.createStream(
            useAudioElement.checked, 
            useVideoElement.checked);
    }
};

/**
 * Close the local stream.
 */
function closeLocalVideo(){
    // Close the local stream.
    webrtc.closeStream();
};

/**
 * Start recording local stream.
 */
function startRecording(){
    // Clear the buffer.
    recordedBlobs = [];

    if (isBrowserFirefox) {
        // Recording mime type.
        var options = {
            mimeType : 'video/webm;codecs=vp8'
        };

        // Is mime type supported.
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not supported');
        }
        else {
            // Collect 10ms of data.
            var timeInterval = 10;
            webrtc.webrtcadapter.startRecording(options, timeInterval);
        }
    }

    if (isBrowserChrome) {
        // Recording mime type.
        var options = {
            mimeType : 'video/webm;codecs=h264,vp9,opus'
        };

        // Is mime type supported.
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not supported');
        }
        else {
            // Collect 10ms of data.
            var timeInterval = 10;
            webrtc.webrtcadapter.startRecording(options, timeInterval);
        }
    }
}

/**
 * Stop recording local stream.
 */
function stopRecording(){
    webrtc.webrtcadapter.stopRecording();
}

/**
 * Make a call to all the contacts.
 */
function makeCall() {

    // If client details set.
    if (uniqueIDElement.value && applicationIDElement.value) {

        // Get all contact peers.
        var contacts = webrtc.webrtcadapter.getContactPeers();

        // For each conference contact.
        contacts.forEach(function (contact) {
            
            var contUniqueID = contact.getUniqueID();
            var contApplicationID = contact.getApplicationID();

            // Not self.
            if (uniqueIDElement.value !== contUniqueID && applicationIDElement.value === contApplicationID) {

                // Is contact avaliable.
                contact.isAvailable();
            }
        });

        // Disable make call button.
        videoCallButton.disabled = true;
    }
};

/**
 * End the call to all the contacts.
 */
function endCall() {

    // Send end call to all contacts,
    // and remove the contacts from the
    // list.
    webrtc.webrtcadapter.sendEndCallToAllContacts();
    webrtc.webrtcadapter.removeContactPeers();

    // Enable make call button.
    videoCallButton.disabled = false;
};

/**
 * Change the client settings.
 */
function changeClientSettings() {

    // Change the client settings.
    webrtc.changeClientSettings(
        uniqueIDElement.value, 
        applicationIDElement.value, 
        availableElement.checked,
        broadcastElement.checked,
        broadcastAppIDElement.checked,
		"access token value");
};

/**
 * Change the client state.
 */
function changeClientState() {

    // If client state set.
    if (clientStateElement.value) {

        // Send.
        var state = clientStateElement.value;
        webrtc.webrtcadapter.sendStateToAllContacts(state);
    }
};

/**
 * Send a message to the contact.
 */
function contactSendMessage() {

    // Client wrote.
    var existsText = alertTextMessageElement.innerHTML;
    alertTextMessageElement.innerHTML = existsText + "<b>You wrote:</b> " + contactSendMessageElement.value + "<br>";

    // Get the contact.
    var contact = getContact();

    // If contact details set.
    if (contactUniqueIDElement.value && contactApplicationIDElement.value) {

        // If no contact
        if (!contact) {
            // Create the contact.
            contact = createContact();
        }

        // If the contact exists.
        if (contact) {

            // If a message text exists.
            if (contactSendMessageElement.value) {
                // Send the message.
                contact.sendMessage(contactSendMessageElement.value);
            }
        }
    }
};

/**
 * Check to see if the contact is avaliable.
 */
function contactAvailableRequest() {

    // Get the contact.
    var contact = getContact();

    // If contact details set.
    if (contactUniqueIDElement.value && contactApplicationIDElement.value) {
        // If no contact
        if (!contact) {
            // Create the contact.
            contact = createContact();
        }

        // If the contact exist.
        if (contact) {
            contact.isAvailable();
        }
    }
};

/**
 * Answer the call from the contact.
 * 
 * @param {ContactPeer}      contact   The contact.
 */
function answerCall(contact) {

    var acceptCall = false;

    // Ask if the client wants to accept the call.
    acceptCall = window.confirm(contact.uniqueID + " from " + contact.applicationID + 
        " is calling, would you like to accept the call?");

    // If accepted.
    if (acceptCall === true) {

        // Disable make call button.
        videoCallButton.disabled = true;

        // Add the local video stream to the contact stream.
        var localStream = webrtc.webrtcadapter.getStream();
        contact.addStream(localStream);

        // Send a call response to the contact.
        contact.sendAnswerResponse();
    }
    else {
        // Send no answer.
        contact.noAnswer();
    }
};

/**
 * Answer the call from the contact.
 * 
 * @param {ContactPeer}      contact   The contact.
 */
function answerJoinConference(contact) {

    // Add the local video stream to the contact stream.
    var localStream = webrtc.webrtcadapter.getStream();
    contact.addStream(localStream);

    // Send a call response to the contact.
    contact.sendJoinConferenceAnswerResponse();
};

/**
 * Is the contact in the list.
 * 
 * @param {ContactPeer}      contact   The contact.
 * 
 * @return {Array} Returns the contacts; else null.
 */
function isContactInList(contact) {
    return conferenceContactList.filter(function (uniqueID) {

        // Return the contact.
        return (contact.uniqueID === uniqueID);
    });
}

/**
 * Create the contact.
 * 
 * @param {string}      uniqueID       The uniqueID.
 * @param {string}      applicationID  The applicationID.
 * 
 * @return {ContactPeer} Returns the contact; else null.
 */
function createConferenceContact(uniqueID, applicationID) {

    // Create the contact.
    var contact = webrtc.createContact(
        uniqueID, 
        applicationID
    );
    
    // If the contact exist.
    if (contact) {
        return contact;
    }
    else {
        return null;
    }
};

/**
 * Create the contact.
 * 
 * @return {ContactPeer} Returns the contact; else null.
 */
function createContact() {

    // Create the contact.
    var contact = webrtc.createContact(
        contactUniqueIDElement.value, 
        contactApplicationIDElement.value
    );
    
    // If the contact exist.
    if (contact) {
        return contact;
    }
    else {
        return null;
    }
};

/**
 * Create the data contact.
 * 
 * @return {ContactPeer} Returns the contact; else null.
 */
function createContactData() {

    // Create the contact.
    var contact = webrtc.createContactData(
        contactUniqueIDElement.value, 
        contactApplicationIDElement.value
    );
    
    // If the contact exist.
    if (contact) {
        return contact;
    }
    else {
        return null;
    }
};

/**
 * Get the contact.
 * 
 * @return {ContactPeer} Returns the contact; else null.
 */
function getContact() {

    // Get the contact.
    var contact = webrtc.webrtcadapter.getContactPeer(
        contactUniqueIDElement.value, 
        contactApplicationIDElement.value,
        false);
    
    // If the contact exist.
    if (contact[0]) {
        return contact[0];
    }
    else {
        return null;
    }
};

/**
 * Get the data contact.
 * 
 * @return {ContactPeer} Returns the contact; else null.
 */
function getContactData() {

    // Get the contact.
    var contact = webrtc.webrtcadapter.getContactPeer(
        contactUniqueIDElement.value, 
        contactApplicationIDElement.value,
        true);
    
    // If the contact exist.
    if (contact[0]) {
        return contact[0];
    }
    else {
        return null;
    }
};

/**
 * Clear the text send a message to the contact.
 */
function contactClearButton() {
    alertTextMessageElement.innerHTML = "";
};

/**
 * Clear the contact list.
 */
function contactClearList() {
    alertTextList.innerHTML = "";
};

/**
 * Get the contact unique list.
 */
function contactUniqueIDList() {
    webrtc.webrtcadapter.contactUniqueIDList();
}

/**
 * Get the contact application list.
 */
function contactApplicationIDList() {
    webrtc.webrtcadapter.contactApplicationIDList();
}

/**
 * Get the contact group list.
 */
function contactGroupList() {
    webrtc.webrtcadapter.contactGroupList();
}

/**
 * Send a message to the contact that this
 * client is typing a message to the contact.
 */
function contactTypingMessageStart() {

    // Get the contact.
    var contact = getContact();

    // If contact details set.
    if (contactUniqueIDElement.value && contactApplicationIDElement.value) {
        // If no contact
        if (!contact) {
            // Create the contact.
            contact = createContact();
        }

        // If the contact exist.
        if (contact) {
            var contUniqueID = contact.getUniqueID();
            var contApplicationID = contact.getApplicationID();

            // Send started typing.
            webrtc.webrtcadapter.startedTypingMessage(
                contUniqueID, 
                contApplicationID
            );
        }
    }
};

/**
 * Send a message to the contact that this
 * client has stopped typing a message to the contact.
 */
function contactTypingMessageStop() {

    // Get the contact.
    var contact = getContact();

    // If contact details set.
    if (contactUniqueIDElement.value && contactApplicationIDElement.value) {
        // If no contact
        if (!contact) {
            // Create the contact.
            contact = createContact();
        }

        // If the contact exist.
        if (contact) {
            var contUniqueID = contact.getUniqueID();
            var contApplicationID = contact.getApplicationID();

            // Send stopped typing.
            webrtc.webrtcadapter.stoppedTypingMessage(
                contUniqueID, 
                contApplicationID
            );
        }
    }
};

/**
 * Set the local video volume
 */
function setVolumeLocal(elem) {
    if (localVideoElement) {  
        try {
            localVideoElement.volume = elem.currentTarget.value / 100;
        } 
        catch (e) {
            trace("Error can not set the local volume: " + e);
        } 
    }    
};

/**
 * Set the remote video volume
 */
function setVolumeRemote(elem) {

    // Get the contact video index.
    var peerIndex = conferenceContactList.indexOf(elem.currentTarget.innerHTML);
    var remoteVideo = conferenceRemoteVideoElement[peerIndex]

    if (remoteVideo) {
        try {
            remoteVideo.volume = elem.currentTarget.value / 100;
        } 
        catch (e) {
            trace("Error can not set the remote volume: " + e);
        } 
    }
};

/**
 * Toggle mute audio and video.
 */
function toggleMuteAudio() {

    var mute = toggleMuteAudioButton.checked;
    webrtc.webrtcadapter.muteAudioVideo(mute);
};

/**
 * Toggle mute all remote audio.
 */
function toggleMuteRemote() {

    var mute = toggleMuteAllRemoteButton.checked;

    // For each conference volumn.
    conferenceRemoteVolumeElement.forEach(function (elem) {

        // If mute.
        if (mute) {
            elem.value = 0;
        }
        else {
            elem.value = 50;
        }

        // Get the contact video index.
        var peerIndex = conferenceContactList.indexOf(elem.innerHTML);
        var remoteVideo = conferenceRemoteVideoElement[peerIndex]
        if (remoteVideo) {
            try {
                remoteVideo.volume = elem.value / 100;
            } 
            catch (e) {} 
        }
    });
};

/**
 * File input change handler.
 */
function handleFileInputChange() {

    // Get only the first file in the list.
    var file = fileInput.files[0];

    // No file.
    if (!file) {
        trace("No file has been chosen.");
    }
    else {
        // Re-enable the file select
        fileInputStartTransferButton.disabled = false;
        sendReceiveProgress.value = 0;
        sendReceiveProgress.max = file.size;
    }
};

/**
 * Start the file transfer.
 */
function fileInputStartTransfer() {

    // Get only the first file in the list.
    var file = fileInput.files[0];

    // No file.
    if (!file) {
        trace("No file has been chosen.");
    }
    else {
        // Handle 0 size files.
        statusMessage.textContent = "";
        downloadAnchor.textContent = "";

        // Get the contact.
        var contact = getContactData();

        // If contact details set.
        if (contactUniqueIDElement.value && contactApplicationIDElement.value) {

            // If no contact
            if (!contact) {
                // Create the contact.
                contact = createContactData();
            }

            // If the contact exists.
            if (contact) {
                // Create the call offer and send the call request.
                contact.sendFileTransferOfferRequest(file);

                // Disable the file select.
                fileInput.disabled = true;
                fileInputStartTransferButton.disabled = true;
            }
        }
    }
};

/**
 * Stop the file transfer.
 */
function fileInputStopTransfer() {
    trace("Stopped file transfer.");

    // Get the contact.
    var contact = getContactData();

    // If contact details set.
    if (contactUniqueIDElement.value && contactApplicationIDElement.value) {

        // If the contact exists.
        if (contact) {

            // End the call local.
            contact.close();
        }
    }

    // Re-enable the file select
    sendReceiveProgress.value = 0;
    fileInput.disabled = false;
    fileInputStartTransferButton.disabled = false;
};

/**
 * Answer the file transfer from the contact.
 * 
 * @param {ContactPeer}     contact   The contact.
 * @param {string}          fileName   The file name.
 * @param {number}          fileSize   The file size.
 */
function answerFileTransfer(contact, fileName, fileSize) {

    var acceptCall = false;

    // Ask if the client wants to accept the file transfer.
    acceptCall = window.confirm(contact.uniqueID + " from " + contact.applicationID + 
        " would like to send you a file: " + [fileName, "size: " + fileSize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")].join(", "));
    
    // If accept.
    if (acceptCall === true) {

        // Disable the file select
        fileInput.disabled = true;
        fileInputStartTransferButton.disabled = true;
        statusMessage.textContent = "";
        downloadAnchor.textContent = "";

        // Set progress max.
        sendReceiveProgress.max = fileSize;

        // Send a call response to the contact.
        contact.sendFileTransferAnswerResponse();
    }
    else {
        // Send no answer.
        contact.noAnswer();
    }
};

/**
 * Contact receive file complete.
 * 
 * @param {ContactPeer}     contact     The contact.
 * @param {Array}           buffer      The data file buffer.
 */
function receiveFileComplete(contact, buffer) {

    // Createa blob stream.
    var received = new window.Blob(buffer);
  
    // Start
    downloadAnchor.href = URL.createObjectURL(received);
    downloadAnchor.download = contact.fileName;
    downloadAnchor.textContent = "Click to download \'" + contact.fileName + "\' (" + contact.fileSize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " bytes)";
    downloadAnchor.style.display = 'block';

    statusMessage.textContent = "File download has completed";
};

/**
 * Write the trace to the console.
 * 
 * @param {string}      text        The text to write to the log.
 */
function trace(text) {
    if (text[text.length - 1] === "\n") {
        text = text.substring(0, text.length - 1);
    }
    // Write the log.
    console.log(text);
};
