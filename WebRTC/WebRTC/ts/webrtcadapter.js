var WildEmitter = require('wildemitter');
var webrtcSupport = require('webrtcsupport');
var mockconsole = require('mockconsole');
var contactPeer = require('./contactpeer');
var signalling_1 = require('./signalling');
/**
 * WebRTC adapter controls the interaction between the
 * signalling provider and the contact peers
 * implementation.
 */
var WebRtcAdapter = (function () {
    /**
     * WebRTC adapter prototype.
     *
     * @param {Object}   webRtcOptions  A collection of options.
     *
     * @example
     *  options = {
     *      debug: true,
     *      uniqueID: "uniqueID",
     *      applicationID: "applicationID",
     *      signallingURL: "wss://127.0.0.1:443",
     *      peerConnectionConfiguration: {
     *          iceServers: [
     *		        {
     *                  "urls": "stun:stun.l.google.com:19302"
     *			    },
     *              {
     *			        "urls": "turn:127.0.0.1:19305?transport=udp",
     *			        "username": "username",
     *			        "credential": "password"
     *		        },
     *		        {
     *			        "urls": "turn:127.0.0.1:19305?transport=tcp",
     *			        "username": "username",
     *			        "credential": "password"
     *		        }
     *	        ]
     *      },
     *      peerConnectionConstraints: {
     *          optional: []
     *      },
     *      receiveOfferMedia: {
     *          offerToReceiveAudio: 1,
     *          offerToReceiveVideo: 1
     *      }
     *  }
     */
    function WebRtcAdapter(webRtcOptions) {
        this.webRtcOptions = webRtcOptions;
        // local.
        var self = this;
        var closed = false;
        var item;
        // Call emitter constructor.
        WildEmitter.call(this);
        // Set the webRTC options.
        var options = webRtcOptions || {};
        // Assign this contact details.
        var uniqueID = webRtcOptions.uniqueID;
        var applicationID = webRtcOptions.applicationID;
        // Store all contact peers.
        var contactPeers = [];
        // The local stream.
        var localStream = null;
        var localStreamVideoElement = null;
        // MediaRecorder
        var mediaRecorder = null;
        // Configuration.
        var config = this.config = {
            debug: false,
            // Peer connection configuration.
            peerConnectionConfiguration: {
                iceServers: [
                    {
                        "urls": "stun:stun.l.google.com:19302"
                    }
                ]
            },
            // Peer connection constraints.
            peerConnectionConstraints: {
                optional: []
            },
            // Receive offer media config.
            receiveOfferMedia: {
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            },
            // Signalling URL.
            signallingURL: "wss://127.0.0.1:443"
        };
        // Log nothing by default, following "the rule of silence":
        // http://www.linfo.org/rule_of_silence.html
        var logger = function () {
            // Assume that if you're in debug mode and you didn't
            // pass in a logger, you actually want to log as much as
            // possible.
            if (webRtcOptions.debug) {
                return webRtcOptions.logger || console;
            }
            else {
                // Use your logger which should have its own logic
                // for output. Return the no-op.
                return webRtcOptions.logger || mockconsole;
            }
        }();
        // Set options, override existing.
        for (item in options) {
            if (options.hasOwnProperty(item)) {
                this.config[item] = options[item];
            }
        }
        // Check for support
        if (!webrtcSupport.support) {
            logger.error("Your browser does not support WebRTC");
        }
        // Signalling configuration.
        var configSignalling = {
            signallingURL: config.signallingURL,
            parent: self
        };
        // Create the websocket signalling provider.
        var signalling = new signalling_1.Signalling(configSignalling);
        // log events in debug mode
        if (this.config.debug) {
            // Capture all events.
            this.on('*', function (event, val1, val2, val3) {
                var logger;
                // if you didn't pass in a logger and you explicitly turning on debug
                // we're just going to assume you're wanting log output with console
                if (self.config.logger === mockconsole) {
                    logger = console;
                }
                else {
                    logger = self.logger;
                }
                // Log the event.
                logger.log('event:', event, val1, val2);
            });
        }
    }
    /**
     * Change client settings.
     *
     * @param {string}      uniqueID        The contact unique id.
     * @param {string}      applicationID   The contact application id.
     * @param {boolean}     available       True if this client is avaliable for contact; else false.
     * @param {boolean}     broadcast       True if this client allows the unique id to be broadcast; else false.
     * @param {boolean}     broadcastAppID  True if this client allows the application id to be broadcast; else false.
     * @param {string}      accessToken     The access token.
     */
    WebRtcAdapter.prototype.changeClientSettings = function (uniqueID, applicationID, available, broadcast, broadcastAppID, accessToken) {
        // Assign this client details.
        this.uniqueID = uniqueID;
        this.applicationID = applicationID;
        // Change client settings
        this.signalling.changeClientSettings(uniqueID, applicationID, available, broadcast, broadcastAppID, accessToken);
    };
    /**
     * Get the client unique id.
     *
     * @return {string} Returns the client unique id.
     */
    WebRtcAdapter.prototype.getUniqueID = function () {
        // Get this contact details.
        var contactUniqueID = this.uniqueID;
        return contactUniqueID;
    };
    /**
     * Get the client application id.
     *
     * @return {string} Returns the client application id.
     */
    WebRtcAdapter.prototype.getApplicationID = function () {
        // Get this contact details.
        var contactApplicationID = this.applicationID;
        return contactApplicationID;
    };
    /**
     * Send started typing to contact.
     *
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     */
    WebRtcAdapter.prototype.startedTypingMessage = function (uniqueID, applicationID) {
        // Send the message to the peer.
        this.signalling.startedTypingMessage(uniqueID, applicationID);
    };
    /**
     * Send stopped typing to contact.
     *
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     */
    WebRtcAdapter.prototype.stoppedTypingMessage = function (uniqueID, applicationID) {
        // Send the message to the peer.
        this.signalling.stoppedTypingMessage(uniqueID, applicationID);
    };
    /**
     * Get the contact unique list.
     */
    WebRtcAdapter.prototype.contactUniqueIDList = function () {
        this.signalling.contactUniqueIDList();
    };
    /**
     * Get the contact application list.
     */
    WebRtcAdapter.prototype.contactApplicationIDList = function () {
        this.signalling.contactApplicationIDList();
    };
    /**
     * Get the contact group list.
     */
    WebRtcAdapter.prototype.contactGroupList = function () {
        this.signalling.contactGroupList();
    };
    /**
     * Create a new contact.
     *
     * @param {Object}   opts       A collection of options.
     *
     * @example
     *  options = {
     *      uniqueID: "uniqueID",
     *      applicationID: "applicationID",
     *      isData: false,
     *      receiveOfferMedia: {
     *          offerToReceiveAudio: 1,
     *          offerToReceiveVideo: 1
     *      }
     *  }
     *
     * @return {ContactPeer} Returns the contact.
     */
    WebRtcAdapter.prototype.createContactPeer = function (opts) {
        var peer = null;
        opts.parent = this;
        opts.signalling = this.signalling;
        // Create a contact peer.
        peer = new contactPeer.ContactPeer(opts);
        // Add the contact peer to the collection
        // of contact peers.
        this.contactPeers.push(peer);
        // Return the current contact peer.
        return peer;
    };
    /**
     * Remove all contacts.
     */
    WebRtcAdapter.prototype.removeContactPeers = function () {
        // Get all peers.
        this.getContactPeers().forEach(function (peer) {
            // Close the connection.
            peer.close();
        });
    };
    /**
     * Remove the contact.
     *
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     * @param {boolean}  isData         True if contact is only data channel; else false.
     */
    WebRtcAdapter.prototype.removeContactPeer = function (uniqueID, applicationID, isData) {
        // Get all peers.
        this.getContactPeers().forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {
                // Close the connection.
                peer.close();
            }
        });
    };
    /**
     * Get all contacts.
     *
     * @return {Array} Returns the contact list.
     */
    WebRtcAdapter.prototype.getContactPeers = function () {
        return this.contactPeers.filter(function (peer) {
            // Return the peers.
            return true;
        });
    };
    /**
     * Get the contact.
     *
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     * @param {boolean}  isData         True if contact is only data channel; else false.
     *
     * @return {ContactPeer} Returns the contact.
     */
    WebRtcAdapter.prototype.getContactPeer = function (uniqueID, applicationID, isData) {
        return this.contactPeers.filter(function (peer) {
            // Return the contact.
            return (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData);
        });
    };
    /**
     * Is the contact in the contact list.
     *
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     *
     * @return {ContactPeer} Returns the contact; else null.
     */
    WebRtcAdapter.prototype.isContactPeer = function (uniqueID, applicationID) {
        return this.contactPeers.filter(function (peer) {
            // Return the contact.
            return (peer.uniqueID === uniqueID && peer.applicationID === applicationID);
        });
    };
    /**
     * Send the client state to all contacts.
     *
     * @param {string}  state         The state to sent.
     */
    WebRtcAdapter.prototype.sendStateToAllContacts = function (state) {
        this.contactPeers.forEach(function (peer) {
            // Send the state to the peer.
            peer.sendState(state);
        });
    };
    /**
     * Send a message to all contacts.
     *
     * @param {string}  message         The message to sent.
     */
    WebRtcAdapter.prototype.sendMessageToAllContacts = function (message) {
        this.contactPeers.forEach(function (peer) {
            // Send the message to the peer.
            peer.sendMessage(message);
        });
    };
    /**
     * Send a message to the contact.
     *
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     * @param {string}  message         The message to sent.
     * @param {boolean}  isData         True if contact is only data channel; else false.
     */
    WebRtcAdapter.prototype.sendMessageToContact = function (uniqueID, applicationID, message, isData) {
        this.contactPeers.forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {
                // Send the message to the peer.
                peer.sendMessage(message);
            }
        });
    };
    /**
     * Send a details to all contacts.
     *
     * @param {string}  details         The details to sent.
     */
    WebRtcAdapter.prototype.sendDetailsToAllContacts = function (details) {
        this.contactPeers.forEach(function (peer) {
            // Send the details to the peer.
            peer.sendDetails(details);
        });
    };
    /**
     * Send a details to the contact.
     *
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     * @param {string}  details         The details to sent.
     * @param {boolean}  isData         True if contact is only data channel; else false.
     */
    WebRtcAdapter.prototype.sendDetailsToContact = function (uniqueID, applicationID, details, isData) {
        this.contactPeers.forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {
                // Send the details to the peer.
                peer.sendDetails(details);
            }
        });
    };
    /**
     * Send end of call to all contacts.
     */
    WebRtcAdapter.prototype.sendEndCallToAllContacts = function () {
        this.contactPeers.forEach(function (peer) {
            // Send the message to the peer.
            peer.sendEndCall();
        });
    };
    /**
     * Send end of call to the contact.
     *
     * @param {string}  uniqueID         The contact unique id.
     * @param {string}  applicationID    The contact application id.
     * @param {boolean}  isData          True if contact is only data channel; else false.
     */
    WebRtcAdapter.prototype.sendEndCallToContact = function (uniqueID, applicationID, isData) {
        this.contactPeers.forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {
                // Send the message to the peer.
                peer.sendEndCall();
            }
        });
    };
    /**
     * Set the file transfer information for the contact.
     *
     * @param {string}  uniqueID            The contact unique id.
     * @param {string}  applicationID       The contact application id.
     * @param {boolean}  isData             True if contact is only data channel; else false.
     * @param {string}  fileName            The file name to send.
     * @param {number}  fileSize            The file size.
     * @param {string}  fileType            The file type.
     * @param {number}  fileLastModified    The file last modified date.
     */
    WebRtcAdapter.prototype.setContactFileInfo = function (uniqueID, applicationID, isData, fileName, fileSize, fileType, fileLastModified) {
        this.contactPeers.forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {
                // Send the message to the peer.
                peer.setFileInfo(fileName, fileSize, fileType, fileLastModified);
            }
        });
    };
    /**
     * Send is contact avaliable request.
     *
     * @param {string}  uniqueID         The contact unique id.
     * @param {string}  applicationID    The contact application id.
     * @param {boolean}  isData          True if contact is only data channel; else false.
     */
    WebRtcAdapter.prototype.isContactAvailable = function (uniqueID, applicationID, isData) {
        this.contactPeers.forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {
                // Send the message to the peer.
                peer.isAvailable();
            }
        });
    };
    /**
     * Close this adapter.
     */
    WebRtcAdapter.prototype.close = function () {
        if (this.closed)
            return;
        this.closed = true;
        try {
            // Close the local stream.
            this.closeStream();
            this.localStream = null;
            this.localStreamVideoElement = null;
        }
        catch (e) {
            // Log the error.
            this.logger.error("Error closing stream: " + e);
        }
        try {
            // Close the singalling
            this.signalling.close();
            this.signalling = null;
        }
        catch (e) {
            // Log the error.
            this.logger.error("Error closing signalling: " + e);
        }
        try {
            // Stop recording.
            this.stopRecording();
        }
        catch (e) {
            // Log the error.
            this.logger.error("Error stopping recording: " + e);
        }
        // Close all contacts
        this.removeContactPeers();
    };
    /**
     * Mute the audio and video tracks for the local stream.
     *
     * @param {boolean}     mute   True to mute; else false.
     */
    WebRtcAdapter.prototype.muteAudioVideo = function (mute) {
        // For each contact.
        this.contactPeers.forEach(function (peer) {
            // Mute the local stream.
            peer.muteAudioVideo(mute);
        });
    };
    /**
     * Close the local stream.
     */
    WebRtcAdapter.prototype.closeStream = function () {
        // If local stream.
        if (this.localStream) {
            // Stop all tracks.
            this.localStream.getTracks().forEach(function (track) {
                track.stop();
            });
            // If video element.
            if (this.localStreamVideoElement) {
                this.localStreamVideoElement.srcObject = null;
            }
        }
    };
    /**
     * Create the local audio and video stream.
     *
     * @param {boolean}     audio   True to enable audio in local stream; else false.
     * @param {boolean}     video   True to enable video in local stream; else false.
     */
    WebRtcAdapter.prototype.createStream = function (audio, video) {
        // Create local refs.
        var localLogger = this.logger;
        // Get the local stream.
        navigator.mediaDevices.getUserMedia({ "audio": audio, "video": video }).then(function (stream) {
            // Init the local video stream.
            this.localStream = stream;
            this.localStreamVideoElement.srcObject = this.localStream;
        }).catch(function (error) {
            localLogger.error(error);
        });
    };
    /**
     * Create a local capture media, screen or application window (Note only for Firefox).
     *
     * @param {string}     captureMediaSource   The capture media source ('screen' or 'window').
     */
    WebRtcAdapter.prototype.createStreamCapture = function (captureMediaSource) {
        // Create local refs.
        var localLogger = this.logger;
        // Capture constraints
        var constraints = {
            video: {
                mediaSource: captureMediaSource,
                width: { max: '1920' },
                height: { max: '1080' },
                frameRate: { max: '10' }
            }
        };
        // Get the local stream.
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            // Init the local video stream.
            this.localStream = stream;
            this.localStreamVideoElement.srcObject = this.localStream;
        }).catch(function (error) {
            localLogger.error(error);
        });
    };
    /**
     * Create the local media stream.
     *
     * @param {string}     constraints   The media constraints.
     * @link  https://w3c.github.io/mediacapture-main/getusermedia.html#media-track-constraints
     * @example
     *      qvga =  video: {width: {exact: 320}, height: {exact: 240}}
     *      vga =   video: {width: {exact: 640}, height: {exact: 480}}
     *      hd =    video: {width: {exact: 1280}, height: {exact: 720}}
     *      fullHd =video: {width: {exact: 1920}, height: {exact: 1080}}
     *      fourK = video: {width: {exact: 4096}, height: {exact: 2160}}
     *
     *              audio: {deviceId: audioSource ? {exact: audioSource} : undefined}
     *              video: {deviceId: videoSource ? {exact: videoSource} : undefined}
     */
    WebRtcAdapter.prototype.createStreamEx = function (constraints) {
        // Create local refs.
        var localLogger = this.logger;
        // Get the local stream.
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            // Init the local video stream.
            this.localStream = stream;
            this.localStreamVideoElement.srcObject = this.localStream;
        }).catch(function (error) {
            localLogger.error(error);
        });
    };
    /**
     * Set the local stream to the video element.
     *
     * @param {object}      videoElement   The local video element.
     *
     * @return {boolean}    True if the stream has been added; else false.
     */
    WebRtcAdapter.prototype.setLocalStreamToVideoElement = function (videoElement) {
        // If stream exists.
        if (this.localStream) {
            // Assign the video element.
            this.localStreamVideoElement = videoElement;
            this.localStreamVideoElement.srcObject = this.localStream;
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Get all audio input devices.
     *
     * @return {Array}    The array of audio input devices.
     */
    WebRtcAdapter.prototype.getAudioInputDevices = function () {
        // Create local refs.
        var localLogger = this.logger;
        var devices = [];
        // Get the local devices.
        navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
            // For each device.
            for (var i = 0; i !== deviceInfos.length; ++i) {
                // Current device.
                var deviceInfo = deviceInfos[i];
                // If audio input.
                if (deviceInfo.kind === 'audioinput') {
                    devices.push(deviceInfo);
                }
            }
        }).catch(function (error) {
            localLogger.error(error);
        });
        // Return the list.
        return devices;
    };
    /**
     * Get all audio output devices.
     *
     * @return {Array}    The array of audio output devices.
     */
    WebRtcAdapter.prototype.getAudioOutputDevices = function () {
        // Create local refs.
        var localLogger = this.logger;
        var devices = [];
        // Get the local devices.
        navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
            // For each device.
            for (var i = 0; i !== deviceInfos.length; ++i) {
                // Current device.
                var deviceInfo = deviceInfos[i];
                // If audio output.
                if (deviceInfo.kind === 'audiooutput') {
                    devices.push(deviceInfo);
                }
            }
        }).catch(function (error) {
            localLogger.error(error);
        });
        // Return the list.
        return devices;
    };
    /**
     * Get all video input devices.
     *
     * @return {Array}    The array of video input devices.
     */
    WebRtcAdapter.prototype.getVideoInputDevices = function () {
        // Create local refs.
        var localLogger = this.logger;
        var devices = [];
        // Get the local devices.
        navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
            // For each device.
            for (var i = 0; i !== deviceInfos.length; ++i) {
                // Current device.
                var deviceInfo = deviceInfos[i];
                // If video input.
                if (deviceInfo.kind === 'videoinput') {
                    devices.push(deviceInfo);
                }
            }
        }).catch(function (error) {
            localLogger.error(error);
        });
        // Return the list.
        return devices;
    };
    /**
     * Set the local video element.
     *
     * @param {object}      videoElement   The local video element.
     */
    WebRtcAdapter.prototype.setLocalVideoElement = function (videoElement) {
        // Assign the video element.
        this.localStreamVideoElement = videoElement;
    };
    /**
     * Get the local stream.
     *
     * @return {MediaStream} Returns the local stream.
     */
    WebRtcAdapter.prototype.getStream = function () {
        // Get this local stream.
        var stream = this.localStream;
        return stream;
    };
    /**
     * Start recording local stream.
     *
     * @param {string}      [recordingOptions]    The recording options.
     * @param {number}      timeInterval        The time interval (milliseconds).
     */
    WebRtcAdapter.prototype.startRecording = function (recordingOptions, timeInterval) {
        // If stream exists.
        if (this.localStream) {
            // Get this local stream.
            var stream = this.localStream;
            try {
                // Create media recorder.
                this.mediaRecorder = new MediaRecorder(stream, recordingOptions);
            }
            catch (e) {
                // Log the error.
                this.logger.error("Error creating MediaRecorder: " + e);
            }
            // If media recorder created.
            if (this.mediaRecorder) {
                // Create local refs.
                var localSelf = this;
                // On stop recording.
                this.mediaRecorder.onstop = function (evt) {
                    localSelf.emit('adapterRecordingStopped', "Adapter has stopped recording.", localSelf, evt);
                };
                // Recorded data is available.
                this.mediaRecorder.ondataavailable = function (event) {
                    // If data exists.
                    if (event.data && event.data.size > 0) {
                        // Send the chunck on data.
                        localSelf.emit('adapterRecordingData', "Adapter has recording data.", localSelf, event.data);
                    }
                };
                // Collect 10ms of data.
                this.mediaRecorder.start(timeInterval);
            }
        }
    };
    /**
     * Stop recording local stream.
     */
    WebRtcAdapter.prototype.stopRecording = function () {
        // If media recorder created.
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
            this.mediaRecorder = null;
        }
    };
    /**
     * Pause recording local stream.
     */
    WebRtcAdapter.prototype.pauseRecording = function () {
        // If media recorder created.
        if (this.mediaRecorder) {
            this.mediaRecorder.pause();
        }
    };
    /**
     * Resume  recording local stream.
     */
    WebRtcAdapter.prototype.resumeRecording = function () {
        // If media recorder created.
        if (this.mediaRecorder) {
            this.mediaRecorder.resume();
        }
    };
    return WebRtcAdapter;
})();
exports.WebRtcAdapter = WebRtcAdapter;
