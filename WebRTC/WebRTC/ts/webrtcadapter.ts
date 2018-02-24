// Require packages.
import util = require('util');
import WildEmitter = require('wildemitter');
import webrtcSupport = require('webrtcsupport');
import mockconsole = require('mockconsole');
import localMedia = require('localmedia');
import contactPeer = require('./contactpeer');
import { ISignalling, Signalling } from './signalling';

/**
 * WebRTC adapter controls the interaction between the
 * signalling provider and the contact peers 
 * implementation.
 */     
export class WebRtcAdapter {

    // Global.
    closed: boolean;
    logger: any;
    contactPeers: Array<contactPeer.ContactPeer>;
    signalling: ISignalling;
    parent: any;
    config: any;
    uniqueID: string;
    applicationID: string;
    mediaRecorder: any;
    localStream: MediaStream;
    localStreamVideoElement: any;

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
    constructor(public webRtcOptions) {

        // local.
        let self = this;
        let closed = false;
        let item;

        // Call emitter constructor.
        WildEmitter.call(this);

        // Set the webRTC options.
        let options = webRtcOptions || {};

        // Assign this contact details.
        let uniqueID = webRtcOptions.uniqueID;
        let applicationID = webRtcOptions.applicationID;
	
	    // Store all contact peers.
        let contactPeers = [];

        // The local stream.
        let localStream = null;
        let localStreamVideoElement = null;

        // MediaRecorder
        let mediaRecorder = null;

        // Configuration.
        let config = this.config = {
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
        let logger = function () {
            
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
        let configSignalling = {
            signallingURL: config.signallingURL,
            parent: self
        };

        // Create the websocket signalling provider.
        let signalling = new Signalling(configSignalling);

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
     */
    changeClientSettings(uniqueID: string, applicationID: string, available: boolean, broadcast: boolean, broadcastAppID: boolean): void {

        // Assign this client details.
        this.uniqueID = uniqueID;
        this.applicationID = applicationID;

        // Change client settings
        this.signalling.changeClientSettings(uniqueID, applicationID, available, broadcast, broadcastAppID);
    }

    /**
     * Get the client unique id.
     * 
     * @return {string} Returns the client unique id.
     */
    getUniqueID(): string {

        // Get this contact details.
        let contactUniqueID = this.uniqueID;
        return contactUniqueID;
    }

    /**
     * Get the client application id.
     * 
     * @return {string} Returns the client application id.
     */
    getApplicationID(): string {

        // Get this contact details.
        let contactApplicationID = this.applicationID;
        return contactApplicationID;
    }

    /**
     * Send started typing to contact.
     * 
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     */
    startedTypingMessage(uniqueID: string, applicationID: string): void {

        // Send the message to the peer.
        this.signalling.startedTypingMessage(uniqueID, applicationID);
    }

    /**
     * Send stopped typing to contact.
     * 
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     */
    stoppedTypingMessage(uniqueID: string, applicationID: string): void {
        
        // Send the message to the peer.
        this.signalling.stoppedTypingMessage(uniqueID, applicationID);
    }

    /**
     * Get the contact unique list.
     */
    contactUniqueIDList(): void {

        this.signalling.contactUniqueIDList();
    }

    /**
     * Get the contact application list.
     */
    contactApplicationIDList(): void {

        this.signalling.contactApplicationIDList();
    }

    /**
     * Get the contact group list.
     */
    contactGroupList(): void {

        this.signalling.contactGroupList();
    }

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
    createContactPeer(opts: any): contactPeer.ContactPeer {

        let peer = null;
        opts.parent = this;
        opts.signalling = this.signalling;

        // Create a contact peer.
        peer = new contactPeer.ContactPeer(opts);

        // Add the contact peer to the collection
        // of contact peers.
        this.contactPeers.push(peer);

        // Return the current contact peer.
        return peer;
    }

    /**
     * Remove all contacts.
     */
    removeContactPeers(): void {

        // Get all peers.
        this.getContactPeers().forEach(function (peer) {

            // Close the connection.
            peer.close();
        });
    }

    /**
     * Remove the contact.
     * 
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     * @param {boolean}  isData         True if contact is only data channel; else false.
     */
    removeContactPeer = function (uniqueID: string, applicationID: string, isData: boolean): void {

        // Get all peers.
        this.getContactPeers().forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {

                // Close the connection.
                peer.close();
            }
        });
    }

    /**
     * Get all contacts.
     * 
     * @return {Array} Returns the contact list.
     */
    getContactPeers(): Array<contactPeer.ContactPeer> {
        return this.contactPeers.filter(function (peer) {

            // Return the peers.
            return true;
        });
    }

    /**
     * Get the contact.
     * 
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     * @param {boolean}  isData         True if contact is only data channel; else false.
     * 
     * @return {ContactPeer} Returns the contact.
     */
    getContactPeer(uniqueID: string, applicationID: string, isData: boolean): Array<contactPeer.ContactPeer> {
        return this.contactPeers.filter(function (peer) {

            // Return the contact.
            return (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData);
        });
    }

    /**
     * Is the contact in the contact list.
     * 
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     * 
     * @return {ContactPeer} Returns the contact; else null.
     */
    isContactPeer(uniqueID: string, applicationID: string): Array<contactPeer.ContactPeer> {
        return this.contactPeers.filter(function (peer) {

            // Return the contact.
            return (peer.uniqueID === uniqueID && peer.applicationID === applicationID);
        });
    }

    /**
     * Send the client state to all contacts.
     * 
     * @param {string}  state         The state to sent.
     */
    sendStateToAllContacts(state: string): void {
        this.contactPeers.forEach(function (peer) {

            // Send the state to the peer.
            peer.sendState(state);
        });
    }

    /**
     * Send a message to all contacts.
     * 
     * @param {string}  message         The message to sent.
     */
    sendMessageToAllContacts(message: string): void {
        this.contactPeers.forEach(function (peer) {

            // Send the message to the peer.
            peer.sendMessage(message);
        });
    }

    /**
     * Send a message to the contact.
     * 
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     * @param {string}  message         The message to sent.
     * @param {boolean}  isData         True if contact is only data channel; else false.
     */
    sendMessageToContact(uniqueID: string, applicationID: string, message: string, isData: boolean): void {
        this.contactPeers.forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {

                // Send the message to the peer.
                peer.sendMessage(message);
            }
        });
    }

    /**
     * Send end of call to all contacts.
     */
    sendEndCallToAllContacts(): void {
        this.contactPeers.forEach(function (peer) {

            // Send the message to the peer.
            peer.sendEndCall();
        });
    }

    /**
     * Send end of call to the contact.
     * 
     * @param {string}  uniqueID         The contact unique id.
     * @param {string}  applicationID    The contact application id.
     * @param {boolean}  isData          True if contact is only data channel; else false.
     */
    sendEndCallToContact(uniqueID: string, applicationID: string, isData: boolean): void {
        this.contactPeers.forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {

                // Send the message to the peer.
                peer.sendEndCall();
            }
        });
    }

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
    setContactFileInfo(uniqueID: string, applicationID: string, isData: boolean, fileName: string, fileSize: number, fileType: string, fileLastModified: number) {
        this.contactPeers.forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {

                // Send the message to the peer.
                peer.setFileInfo(fileName, fileSize, fileType, fileLastModified);
            }
        });
    }

    /**
     * Send is contact avaliable request.
     * 
     * @param {string}  uniqueID         The contact unique id.
     * @param {string}  applicationID    The contact application id.
     * @param {boolean}  isData          True if contact is only data channel; else false.
     */
    isContactAvailable(uniqueID: string, applicationID: string, isData: boolean): void {
        this.contactPeers.forEach(function (peer) {
            if (peer.uniqueID === uniqueID && peer.applicationID === applicationID && peer.isData === isData) {

                // Send the message to the peer.
                peer.isAvailable();
            }
        });
    }

    /**
     * Close this adapter.
     */
    close(): void {

        if (this.closed) return;
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
    }

    /**
     * Mute the audio and video tracks for the local stream.
     *
     * @param {boolean}     mute   True to mute; else false.
     */
    muteAudioVideo(mute: boolean): void {

        // For each contact.
        this.contactPeers.forEach(function (peer) {

            // Mute the local stream.
            peer.muteAudioVideo(mute);
        });
    }

    /**
     * Close the local stream.
     */
    closeStream(): void {
        
        // If local stream.
        if (this.localStream) {
                
            // Stop all tracks.
            this.localStream.getTracks().forEach (
                function (track) {
                    track.stop();
                }
            );

            // If video element.
            if (this.localStreamVideoElement) {
                this.localStreamVideoElement.srcObject = null;
            }
        } 
    }

    /**
     * Create the local audio and video stream.
     *
     * @param {boolean}     audio   True to enable audio in local stream; else false.
     * @param {boolean}     video   True to enable video in local stream; else false.
     */
    createStream(audio: boolean, video: boolean): void {

        // Create local refs.
        let localLogger = this.logger;

        // Get the local stream.
        navigator.mediaDevices.getUserMedia({ "audio": audio, "video": video }).then(
            function (stream) {
                // Init the local video stream.
                this.localStream = stream;
                this.localStreamVideoElement.srcObject = this.localStream;

            }).catch(
            function (error) {
                localLogger.error(error);
        });
    }

    /**
     * Create a local capture media, screen or application window (Note only for Firefox).
     *
     * @param {string}     captureMediaSource   The capture media source ('screen' or 'window').
     */
    createStreamCapture(captureMediaSource: string): void {

        // Create local refs.
        let localLogger = this.logger;

        // Capture constraints
        let constraints = {
            video: {
                mediaSource: captureMediaSource,
                width: {max: '1920'},
                height: {max: '1080'},
                frameRate: {max: '10'}
            }
        };

        // Get the local stream.
        navigator.mediaDevices.getUserMedia(constraints).then(
            function (stream) {
                // Init the local video stream.
                this.localStream = stream;
                this.localStreamVideoElement.srcObject = this.localStream;

            }).catch(
            function (error) {
                localLogger.error(error);
        });
    }

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
     */
    createStreamEx(constraints: any): void {

        // Create local refs.
        let localLogger = this.logger;

        // Get the local stream.
        navigator.mediaDevices.getUserMedia(constraints).then(
            function (stream) {
                // Init the local video stream.
                this.localStream = stream;
                this.localStreamVideoElement.srcObject = this.localStream;

            }).catch(
            function (error) {
                localLogger.error(error);
        });
    }

    /**
     * Set the local stream to the video element.
     * 
     * @param {object}      videoElement   The local video element.
     * 
     * @return {boolean}    True if the stream has been added; else false.
     */
    setLocalStreamToVideoElement(videoElement: any): boolean {

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
    }

    /**
     * Set the local video element.
     * 
     * @param {object}      videoElement   The local video element.
     */
    setLocalVideoElement(videoElement: any): void {

        // Assign the video element.
        this.localStreamVideoElement = videoElement;
    }

    /**
     * Get the local stream.
     * 
     * @return {MediaStream} Returns the local stream.
     */
    getStream(): MediaStream {

        // Get this local stream.
        let stream = this.localStream;
        return stream;
    }

    /**
     * Start recording local stream.
     * 
     * @param {string}      [recordingOptions]    The recording options.
     * @param {number}      timeInterval        The time interval (milliseconds).
     */
    startRecording(recordingOptions: any, timeInterval: number): void {

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
                let localSelf = this;

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
    }

    /**
     * Stop recording local stream.
     */
    stopRecording(): void {

        // If media recorder created.
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
            this.mediaRecorder = null;
        }
    }

    /**
     * Pause recording local stream.
     */
    pauseRecording(): void {

        // If media recorder created.
        if (this.mediaRecorder) {
            this.mediaRecorder.pause();
        }
    }

    /**
     * Resume  recording local stream.
     */
    resumeRecording(): void {

        // If media recorder created.
        if (this.mediaRecorder) {
            this.mediaRecorder.resume();
        }
    }
}