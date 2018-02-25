import util = require('util');
import WildEmitter = require('wildemitter');
import webrtcSupport = require('webrtcsupport');
import mockconsole = require('mockconsole');
import localMedia = require('localmedia');
import { WebRtcAdapter } from './webrtcadapter';
import { ContactPeer } from './contactpeer';

/**
 * WebRTC controls the interaction between the
 * adapter and user configuration.
 */     
export class WebRTC {

    // Global.
    webrtcadapter: WebRtcAdapter;
    closed: boolean;
    logger: any;
    parent: any;
    config: any;

    /**
     * WebRTC prototype.
     * 
     * @param {Object}   webRtcOptions  A collection of options.
     *         
     * @example                         
     *  options = { 
     *      debug: true,
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

        let options = webRtcOptions || {};

        let config = this.config = {
            debug: false,
    
            // Receive offer media config.
            receiveOfferMedia: {
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            },
    
            // Local video settings.
            localVideo: {
                autoplay: true,
                mirror: true,
                muted: true
            }
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

        // set our config from options
        for (item in options) {
            if (options.hasOwnProperty(item)) {
                this.config[item] = options[item];
            }
        }

        // attach detected support for convenience
        let capabilities = webrtcSupport;

        // Call WildEmitter constructor.
        WildEmitter.call(this);

        // instantiate our main WebRTC helper
        // using same logger from logic here
        webRtcOptions.logger = logger;
        webRtcOptions.debug = false;

        // Create the webrtc adapter.
        let webrtcadapter = new WebRtcAdapter(webRtcOptions);

        // Proxy events from WebRtcAdapter
        this.webrtcadapter.on('*', function () {
            self.emit.apply(self, arguments);
        });

        // log all events in debug mode
        if (config.debug) {
            this.on('*', this.logger.log.bind(this.logger, 'WebRTC event:'));
        }

        // Signalling event.
        this.webrtcadapter.on('signallingEventOpen', function (text, signalling, arg) {
            let argum = {
                open: true,
                text: text
            };
            self.emit('connectionOpen', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventError', function (text, signalling, arg) {
            let argum = {
                error: true,
                data: arg.data,
                text: text
            };
            self.emit('connectionError', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventClose', function (text, signalling, arg) {
            let argum = {
                close: true,
                text: text
            };
            self.emit('connectionClose', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventErrorDetails', function (text, signalling, arg) {
            let argum = {
                error: arg,
                text: text
            };
            self.emit('signalError', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventApplications', function (text, signalling, arg) {
            let argum = {
                list: arg,
                text: text
            };
            self.emit('signalApplications', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventUniques', function (text, signalling, arg) {
            let argum = {
                list: arg,
                text: text
            };
            self.emit('signalUniques', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventGroups', function (text, signalling, arg) {
            let argum = {
                list: arg,
                text: text
            };
            self.emit('signalGroups', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventSettings', function (text, signalling, arg) {
            let argum = {
                setting: arg,
                text: text
            };
            self.emit('signalSettings', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventAvailable', function (text, signalling, arg) {

            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                available: arg.contactAvailable,
                text: text
            };

            // Emit the message.
            self.emit('signalAvailable', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventSelfAvailable', function (text, signalling, arg) {

            let argum = {
                available: arg.contactAvailable,
                text: text
            };

            // Emit the message.
            self.emit('signalSelfAvailable', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventMessage', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                message: arg.contactMessage,
                text: text
            };

            // Emit the message.
            self.emit('signalMessage', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventState', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                state: arg.contactState,
                text: text
            };

            // Emit the message.
            self.emit('signalState', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventDetails', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
            contact.setContactDetails(arg.clientDetails);
            
            let argum = {
                contact: contact,
                details: arg.clientDetails,
                text: text
            };

            // Emit the message.
            self.emit('signalDetails', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventJoinConferenceOffer', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                conference: arg.conference,
                text: text
            };

            // Emit the message.
            self.emit('signalJoinConferenceOffer', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventJoinConferenceAnswer', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                conference: arg.conference,
                text: text
            };

            // Emit the message.
            self.emit('signalJoinConferenceAnswer', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventSDP', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = null;

            // If file transfer or data channel.
            if (arg.isData) {
                // Get data contact.
                contact = this.createContactData(arg.contactUniqueID, arg.contactApplicationID);
            }
            else {
                contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            }

            // Set the remote description.
            contact.setRemoteDescription(arg.sdp)
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventCandidate', function (text, signalling, arg) {

            // Get the contact.
            let contact = null;

            // If file transfer or data channel.
            if (arg.isData) {
                // Get data contact.
                contact = this.createContactData(arg.contactUniqueID, arg.contactApplicationID);
            }
            else {
                contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            }

            // Set the ICE candidate.
            contact.addIceCandidate(arg.candidate)
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventOffer', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                text: text
            };

            // Emit the message.
            self.emit('signalOffer', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventAnswer', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                text: text
            };

            // Emit the message.
            self.emit('signalAnswer', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventFileOffer', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContactData(arg.contactUniqueID, arg.contactApplicationID);
            contact.setFileInfo(arg.name, arg.size, arg.type, arg.lastModified);
            let argum = {
                contact: contact,
                name: arg.name,
                size: arg.size,
                text: text
            };

            // Emit the message.
            self.emit('signalFileOffer', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventFileAnswer', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContactData(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                text: text
            };

            // Emit the message.
            self.emit('signalFileAnswer', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventNoAnswer', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                text: text
            };

            // Emit the message.
            self.emit('signalNoAnswer', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventEndCall', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                text: text
            };

            // Emit the message.
            self.emit('signalEndCall', argum);
        });

        // Signalling event.
        this.webrtcadapter.on('signallingEventTypingMessage', function (text, signalling, arg) {
            
            // Get the contact.
            let contact = this.createContact(arg.contactUniqueID, arg.contactApplicationID);
            let argum = {
                contact: contact,
                typing: arg.typing,
                text: text
            };

            // Emit the message.
            self.emit('signalTyping', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventICEStateChange', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                state: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactICEStateChange', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventRemoveStream', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                remove: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactRemoveStream', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventAddStream', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                add: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactAddStream', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventAddTrack', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                add: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactAddStream', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventDataChannelReceivedSize', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                size: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactReceiveSize', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventDataChannelReceiveComplete', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                buffer: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactReceiveComplete', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventDataChannelOpen', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                open: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactReceiveOpen', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventDataChannelClose', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                close: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactReceiveClose', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventDataChannelError', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                error: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactReceiveError', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventDataChannelSentSize', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                size: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactSentSize', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventDataChannelSentComplete', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                buffer: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactSentComplete', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventClose', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                close: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactClose', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactEventSessionError', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                session: arg,
                text: text
            };

            // Emit the message.
            self.emit('contactSessionError', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactRecordingData', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                data: arg,
                text: text
            };

            // Emit the message.
            self.emit('peerRecordingData', argum);
        });

        // Contact event.
        this.webrtcadapter.on('peerContactRecordingStopped', function (text, contact, arg) {
            
            let argum = {
                contact: contact,
                evt: arg,
                text: text
            };

            // Emit the message.
            self.emit('peerRecordingStopped', argum);
        });

        // Adapter event.
        this.on('adapterRecordingData', function (text, adapter, arg) {
            
            let argum = {
                data: arg,
                text: text
            };

            // Emit the message.
            self.emit('recordingData', argum);
        });

        // Adapter event.
        this.on('adapterRecordingStopped', function (text, adapter, arg) {
            
            let argum = {
                evt: arg,
                text: text
            };

            // Emit the message.
            self.emit('recordingStopped', argum);
        });
    }

    /**
     * WebRTC prototype constructor.
     */
    WebRTC = Object.create(WildEmitter.prototype, {
        constructor: {
            value: WebRTC
        }
    });

    /**
     * Create a new contact if it does not exist, else return existing contact.
     * 
     * @param {string}      contactUniqueID        The contact unique id.
     * @param {string}      contactApplicationID   The contact application id.
     * 
     * @return {ContactPeer} Returns the contact.
     */
    createContact(contactUniqueID: string, contactApplicationID: string): ContactPeer {

        // Get the contact.
        let contact = this.webrtcadapter.getContactPeer(contactUniqueID, contactApplicationID, false);
        if (contact[0]) {
            // Return the contact.
            return contact[0];
        }
        else {
            // Options.
            var options = { 
                uniqueID: contactUniqueID,
                applicationID: contactApplicationID,
                isData: false
            };

            // Create a new contact.
            let contactpeer = this.webrtcadapter.createContactPeer(options);
            return contactpeer;
        }
    }

    /**
     * Create a new data contact if it does not exist, else return existing contact.
     * 
     * @param {string}      contactUniqueID        The contact unique id.
     * @param {string}      contactApplicationID   The contact application id.
     * 
     * @return {ContactPeer} Returns the contact.
     */
    createContactData(contactUniqueID: string, contactApplicationID: string): ContactPeer {

        // Get the contact.
        var contact = this.webrtcadapter.getContactPeer(contactUniqueID, contactApplicationID, true);
        if (contact[0]) {
            // Return the contact.
            return contact[0];
        }
        else {
            // Options.
            var options = { 
                uniqueID: contactUniqueID,
                applicationID: contactApplicationID,
                isData: true
            };

            // Create a new contact.
            let contactpeer = this.webrtcadapter.createContactPeer(options);
            return contactpeer;
        }
    }

    /**
     * Remove the contact if it exists.
     * 
     * @param {string}      contactUniqueID        The contact unique id.
     * @param {string}      contactApplicationID   The contact application id.
     */
    removeContact(contactUniqueID: string, contactApplicationID: string): void {

        // Get the contact.
        let contact = this.webrtcadapter.getContactPeer(contactUniqueID, contactApplicationID, false);
        if (contact[0]) {

            // Remove contact.
            this.webrtcadapter.removeContactPeer(contactUniqueID, contactApplicationID, false);
        }
    }

    /**
     * Remove the data contact if it exists.
     * 
     * @param {string}      contactUniqueID        The contact unique id.
     * @param {string}      contactApplicationID   The contact application id.
     */
    removeContactData(contactUniqueID: string, contactApplicationID: string): void {

        // Get the contact.
        let contact = this.webrtcadapter.getContactPeer(contactUniqueID, contactApplicationID, true);
        if (contact[0]) {

            // Remove contact.
            this.webrtcadapter.removeContactPeer(contactUniqueID, contactApplicationID, true);
        }
    }

    /**
     * Is the contact in the contact list.
     * 
     * @param {string}  contactUniqueID        The contact unique id.
     * @param {string}  contactApplicationID   The contact application id.
     * 
     * @return {boolean} True if the contact is in the list; else false.
     */
    isContactPeer(contactUniqueID: string, contactApplicationID: string): boolean {

        // Get the contact.
        let contact = this.webrtcadapter.isContactPeer(contactUniqueID, contactApplicationID);
        if (contact[0]) {
            // Found one.
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Close the webRTC interface.
     */
    close(): void {

        if (this.closed) return;
        this.closed = true;
        
        try {
            // Close the interface.
            this.webrtcadapter.close();
        }
        catch (e) {
            // Log the error.
            this.logger.error("Error closing the WebRTC interface: " + e);
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

        // Change client settings
        this.webrtcadapter.changeClientSettings(uniqueID, applicationID, available, broadcast, broadcastAppID);
    }

    /**
     * Create the local audio and video stream.
     *
     * @param {boolean}     audio   True to enable audio in local stream; else false.
     * @param {boolean}     video   True to enable video in local stream; else false.
     */
    createStream(audio: boolean, video: boolean): void {

        // Create stream.
        this.webrtcadapter.createStream(audio, video);
    }

    /**
     * Create a local capture media, screen or application window (Note only for Firefox).
     *
     * @param {string}     captureMediaSource   The capture media source ('screen' or 'window').
     */
    createStreamCapture(captureMediaSource: any): void {

        // Create stream.
        this.webrtcadapter.createStreamCapture(captureMediaSource);
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

        // Create stream.
        this.webrtcadapter.createStreamEx(constraints);
    }

    /**
     * Set the local video element.
     * 
     * @param {object}      videoElement   The local video element.
     */
    setLocalVideoElement(videoElement: any): void {

        // Assign the video element.
        this.webrtcadapter.setLocalVideoElement(videoElement);
    }

    /**
     * Close the local stream.
     */
    closeStream(): void {
        
        // Close stream.
        this.webrtcadapter.closeStream();
    }
}