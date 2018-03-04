// main

var webrtc = null;

/**
 * Initialise the WebRTC application.
 */
function pageLoad() {

    // WebRTC options.
    var options = { 
        debug: true,
        signallingURL: "wss://192.168.0.200:8822",
        peerConnectionConfiguration: {
            iceServers: [ 
        		{ 
                    "urls": "stun:192.168.0.200:8830"
        		},
                {
                    "urls": "turn:192.168.0.200:8830?transport=udp",
                    "username": "drazen",
                    "credential": "drazen8"
                },
                {
                    "urls": "turn:192.168.0.200:8830?transport=tcp",
                    "username": "drazen",
                    "credential": "drazen8"
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

            // The contact has sent a message
            // to the signalling server asking
            // if this client is available.
            var text = uniqueID + " from " + applicationID + " sent available client request.";
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
            
        });

        // Contact details
        webrtc.on('signalDetails', function (arg) {
            
            var contact = arg.contact;
            var uniqueID = contact.getUniqueID();
            var applicationID = contact.getApplicationID();
            var details = arg.details;
            
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

        // Contact add stream.
        webrtc.on('contactAddStream', function (arg) {

            // Assign this contact remote stream
            // to the remote video element.
            var contact = arg.contact;
            contact.setRemoteStreamToVideoElement(remoteVideoElement, arg.add.stream);
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

var localVideoElement = null;
var remoteVideoElement = null;

var audioInputSelect = null;
var audioOutputSelect = null;
var videoSelect = null;

var uniqueIDElement = null;
var applicationIDElement = null;
var availableElement = null;
var broadcastElement = null;
var broadcastAppIDElement = null;

var contactUniqueIDElement = null;
var contactApplicationIDElement = null;
var contactUniqueIDListButton = null;
var contactApplicationIDListButton = null;
var contactGroupListButton = null;
var alertTextList = null;

var startCamButton = null;
var stopCamButton = null;
var toggleMuteAudioButton = null;

var videoCallButton = null;
var endCallButton = null;
var alertTextElement = null;
var alertTextBackElement = null;
var alertTextMessageElement = null;
var changeSettingsButton = null;

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

var isBrowserFirefox = typeof window.InstallTrigger !== 'undefined';
var isBrowserOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isBrowserChrome = !!window.chrome && !isOpera;

/**
 * Initialise the application.
 */
function init() {

    // Assign the local video element.
    localVideoElement = document.getElementById("localVideo");
    remoteVideoElement = document.getElementById("remoteVideo");
    alertTextElement = document.getElementById("alertText");
    alertTextBackElement = document.getElementById("alertTextBack");
    alertTextMessageElement = document.getElementById("alertTextMessage");
    contactSendMessageElement = document.getElementById("contactSendMessage");

    // Call and end call elements.
    startCamButton = document.getElementById("startCamButton");
    stopCamButton = document.getElementById("stopCamButton");
    resetPeerConnectionButton = document.getElementById("resetPeerConnectionButton"); 
    toggleMuteAudioButton = document.getElementById("toggleMuteAudioButton");
    videoCallButton = document.getElementById("videoCallButton");
    endCallButton = document.getElementById("endCallButton");
	changeSettingsButton = document.getElementById("changeSettingsButton");
    contactAvailableButton = document.getElementById("contactAvailableButton");
    contactSendMessageButton = document.getElementById("contactSendMessageButton");
    contactSendMessageClearButton = document.getElementById("contactSendMessageClearButton");
    contactClearListButton = document.getElementById("contactClearListButton");
    startRecodingButton = document.getElementById("startRecodingButton");
    stopRecodingButton = document.getElementById("stopRecodingButton");

    // Get the client details.
    uniqueIDElement = document.getElementById("uniqueID");
    applicationIDElement = document.getElementById("applicationID");
    availableElement = document.getElementById("available");
    broadcastElement = document.getElementById("broadcast");
    broadcastAppIDElement = document.getElementById("broadcastAppID");

    // Get the contact details.
    contactUniqueIDElement = document.getElementById("contactUniqueID");
    contactApplicationIDElement = document.getElementById("contactApplicationID");
    contactUniqueIDListButton = document.getElementById("contactUniqueIDListButton");
    contactApplicationIDListButton = document.getElementById("contactApplicationIDListButton");
    contactGroupListButton = document.getElementById("contactGroupListButton");
    alertTextList = document.getElementById("alertTextList");
	
	// Get the video audio parms.
	useVideoElement = document.getElementById("useVideo");
    useAudioElement = document.getElementById("useAudio");
    useScreenElement = document.getElementById("useScreen");
    useWindowElement = document.getElementById("useWindow");

    // Volume control.
    localVolumeControlElement = document.getElementById("localVolumeControl");
    remoteVolumeControlElement = document.getElementById("remoteVolumeControl");

    // Selection.
    audioInputSelect = document.getElementById("audioSource");
    audioOutputSelect = document.getElementById("audioOutput");
    videoSelect = document.getElementById("videoSource");

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

    // Contact typing handler.
    contactSendMessageElement.addEventListener("focus", contactTypingMessageStart);
    contactSendMessageElement.addEventListener("blur", contactTypingMessageStop);

    // Volume control handlers
    localVolumeControlElement.addEventListener('change', setVolumeLocal);
    localVolumeControlElement.addEventListener('input', setVolumeLocal);
    remoteVolumeControlElement.addEventListener('change', setVolumeRemote);
    remoteVolumeControlElement.addEventListener('input', setVolumeRemote);

    // Set the local video volume to 0.
    localVolumeControlElement.value = 0;
    localVideoElement.volume = 0;

    // List a  devices.
    webrtc.getAudioInputSources(function(sources) {
        // For each audio input source.
        sources.forEach(function (info) {
            var option = document.createElement('option');
            option.value = info.deviceID;
            option.text = info.deviceText;
            audioInputSelect.appendChild(option);
        });
    });

    webrtc.getAudioOutputSources(function(sources) {
        // For each audio output source.
        sources.forEach(function (info) {
            var option = document.createElement('option');
            option.value = info.deviceID;
            option.text = info.deviceText;
            audioOutputSelect.appendChild(option);
        });
    });

    webrtc.getVideoInputSources(function(sources) {
        // For each video input source.
        sources.forEach(function (info) {
            var option = document.createElement('option');
            option.value = info.deviceID;
            option.text = info.deviceText;
            videoSelect.appendChild(option);
        });
    });
};

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
 * Make a call to the contact.
 */
function makeCall() {

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
            // Add the local video stream to the contact stream.
            var localStream = webrtc.webrtcadapter.getStream();
            contact.addStream(localStream);

            // Create the call offer and send the call request.
            contact.sendOfferRequest();

            // Disable make call button.
            videoCallButton.disabled = true;
        }
    }
};

/**
 * End the call to the contact.
 */
function endCall() {

    // Get the contact.
    var contact = getContact();

    // If contact details set.
    if (contactUniqueIDElement.value && contactApplicationIDElement.value) {

        // If the contact exists.
        if (contact) {

            // Let the remote client known that this client 
            // has ended the call.
            contact.sendEndCall();

            // End the call local.
            contact.close();
        }
    }

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
    if (remoteVideoElement) {
        try {
            remoteVideoElement.volume = elem.currentTarget.value / 100;
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