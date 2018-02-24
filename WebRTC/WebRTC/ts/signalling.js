"use strict";
exports.__esModule = true;
var WildEmitter = require("wildemitter");
/**
 * Signalling class used to signal other contacted
 * clients, this signalling class uses WebSockets
 * for the signalling transport.
 */
var Signalling = /** @class */ (function () {
    /**
     * Signalling prototype.
     *
     * @param {Object}   signalOptions  A collection of options.
     *
     * @example
     *  options = {
     *      signallingURL: "wss://127.0.0.1:443"
     *  }
     */
    function Signalling(signalOptions) {
        this.signalOptions = signalOptions;
        // local.
        var self = this;
        var closed = false;
        var parent = signalOptions.parent;
        var item;
        // Set options.
        var options = signalOptions || {};
        // Call emitter constructor.
        WildEmitter.call(this);
        // Get the parent logger.
        var logger = parent.logger;
        // Configuration.
        var config = this.config = {
            signallingURL: "wss://127.0.0.1:443"
        };
        // Set options, override existing.
        for (item in options) {
            if (options.hasOwnProperty(item)) {
                config[item] = options[item];
            }
        }
        try {
            // Create a new WebSocket client for signalling.
            var webSocket = new WebSocket(config.signallingURL);
        }
        catch (e) {
            logger.error("Error connecting to WebSocket: " + e);
        }
        // If created.
        if (this.webSocket) {
            // Open new connection handler.
            this.webSocket.onopen = function (openEvent) {
                // Send open connection alert.
                parent.emit('signallingEventOpen', "Signalling has opened.", this, openEvent);
            };
            // Error handler.
            this.webSocket.onerror = function (errorEvent) {
                // Send error connection alert.
                parent.emit('signallingEventError', "Signalling has encountered and unknown error.", this, errorEvent);
            };
            // Connection closed handler.
            this.webSocket.onclose = function (closeEvent) {
                // Send close connection alert.
                parent.emit('signallingEventClose', "Signalling has closed.", this, closeEvent);
            };
            // Incomming messsage handler.
            this.webSocket.onmessage = function (messageEvent) {
                var signal = null;
                // Get the signl from the WebSocket.
                signal = JSON.parse(messageEvent.data);
                // If a valid response.
                if (signal.response) {
                    // If error.
                    if (signal.error) {
                        // Get the error message.
                        parent.emit('signallingEventErrorDetails', "Signalling has encountered an error.", this, signal.error);
                    }
                    else if (signal.applications) {
                        parent.emit('signallingEventApplications', "Signalling has applications", this, signal.applications);
                    }
                    else if (signal.uniques) {
                        parent.emit('signallingEventUniques', "Signalling has uniques", this, signal.uniques);
                    }
                    else if (signal.groups) {
                        parent.emit('signallingEventGroups', "Signalling has groups", this, signal.groups);
                    }
                    else {
                        // If settings have been applied.
                        if (signal.settings && signal.settings === true) {
                            // The client settings.
                            parent.emit('signallingEventSettings', "Signalling settings have been applied.", this, signal.settings);
                        }
                        else if (signal.contactAvailable) {
                            // Get the contact details.
                            var uniqueID = signal.contactUniqueID;
                            var applicationID = signal.contactApplicationID;
                            // Details.
                            var details = {
                                contactUniqueID: uniqueID,
                                contactApplicationID: applicationID,
                                contactAvailable: signal.contactAvailable
                            };
                            // Send signal.
                            parent.emit('signallingEventAvailable', "Signalling contact available.", this, details);
                        }
                        else if (signal.contactMessage) {
                            // A message from a contact.
                            // Get the contact details.
                            var uniqueID = signal.contactUniqueID;
                            var applicationID = signal.contactApplicationID;
                            // Details.
                            var details = {
                                contactUniqueID: uniqueID,
                                contactApplicationID: applicationID,
                                contactMessage: signal.contactMessage
                            };
                            // Send message.
                            parent.emit('signallingEventMessage', "Signalling contact message.", this, details);
                        }
                        else if (signal.clientState) {
                            // A message from a contact.
                            // Get the contact details.
                            var uniqueID = signal.contactUniqueID;
                            var applicationID = signal.contactApplicationID;
                            // Details.
                            var details = {
                                contactUniqueID: uniqueID,
                                contactApplicationID: applicationID,
                                contactState: signal.state
                            };
                            // Send message.
                            parent.emit('signallingEventState', "Signalling contact state.", this, details);
                        }
                        else {
                            // If the client is available
                            if (signal.available && signal.available === true) {
                                // Get the contact details.
                                var uniqueID = signal.contactUniqueID;
                                var applicationID = signal.contactApplicationID;
                                var isDataChannel = false;
                                // If this is a file transfer or data channel.
                                if (signal.fileTransferOffer || signal.fileTransferAnswer || signal.isData) {
                                    var isDataChannel_1 = true;
                                }
                                // A SDP signal has been received.
                                if (signal.sdp) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID,
                                        sdp: signal.sdp,
                                        isData: isDataChannel
                                    };
                                    // Send SDP data.
                                    parent.emit('signallingEventSDP', "Signalling an SDP signal has been received.", this, details);
                                }
                                // Add the peer ICE candidate.
                                if (signal.candidate) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID,
                                        candidate: signal.candidate,
                                        type: signal.type,
                                        isData: isDataChannel
                                    };
                                    // Send candidate data.
                                    parent.emit('signallingEventCandidate', "Signalling a candidate signal has been received.", this, details);
                                }
                                // If a call request offer was sent.
                                if (signal.callOffer) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID
                                    };
                                    // Send offer data.
                                    parent.emit('signallingEventOffer', "Signalling an offer signal has been received.", this, details);
                                }
                                // If the call response answer was sent.
                                if (signal.callAnswer) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID
                                    };
                                    // Send answer data.
                                    parent.emit('signallingEventAnswer', "Signalling an answer signal has been received.", this, details);
                                }
                                // If a join conference request offer was sent.
                                if (signal.joinConferenceOffer) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID,
                                        conference: signal.conferenceCall
                                    };
                                    // Send offer data.
                                    parent.emit('signallingEventJoinConferenceOffer', "Signalling a join conference offer signal has been received.", this, details);
                                }
                                // If the join conference response answer was sent.
                                if (signal.joinConferenceAnswer) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID,
                                        conference: signal.conferenceCall
                                    };
                                    // Send answer data.
                                    parent.emit('signallingEventJoinConferenceAnswer', "Signalling a join conference answer signal has been received.", this, details);
                                }
                                // If a file transfer request offer was sent.
                                if (signal.fileTransferOffer) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID,
                                        name: signal.name,
                                        size: signal.size,
                                        type: signal.type,
                                        lastModified: signal.lastModified,
                                        fileTransfer: signal.fileTransferOffer
                                    };
                                    // Send file transfer offer data.
                                    parent.emit('signallingEventFileOffer', "Signalling a file transfer offer signal has been received.", this, details);
                                }
                                // If file transfer response answer was sent.
                                if (signal.fileTransferAnswer) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID,
                                        fileTransfer: signal.fileTransferAnswer
                                    };
                                    // Send file answer data.
                                    parent.emit('signallingEventFileAnswer', "Signalling a file answer signal has been received.", this, details);
                                }
                                // The client did not accept the call request.
                                if (signal.noanswer) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID,
                                        noanswer: signal.noanswer
                                    };
                                    // Send file answer data.
                                    parent.emit('signallingEventNoAnswer', "Signalling the peer contact did not answer.", this, details);
                                }
                                // The remote client closed, ended the call.
                                if (signal.endCallRemote) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID,
                                        endCallRemote: signal.endCallRemote
                                    };
                                    // Send file answer data.
                                    parent.emit('signallingEventEndCall', "Signalling the peer contact ended the call.", this, details);
                                }
                                // If contact typing a message.
                                if (signal.contactTypingMessage) {
                                    // Details.
                                    var details = {
                                        contactUniqueID: uniqueID,
                                        contactApplicationID: applicationID,
                                        contactTypingMessage: signal.contactTypingMessage,
                                        typing: signal.typing
                                    };
                                    // If typing.
                                    if (signal.typing && signal.typing === true) {
                                        // The client is typing a message.
                                        parent.emit('signallingEventTypingMessage', "Signalling the contact is typing a message.", this, details);
                                    }
                                    else {
                                        // The client has stopped typing.
                                        parent.emit('signallingEventTypingMessage', "Signalling the contact has stopped typing.", this, details);
                                    }
                                }
                                else {
                                    // Details.
                                    var details = {
                                        contactAvailable: signal.available
                                    };
                                    // The client is available.
                                    parent.emit('signallingEventSelfAvailable', "Signalling the contact is available.", this, details);
                                }
                            }
                            else {
                                // Details.
                                var details = {
                                    contactAvailable: signal.available
                                };
                                // The client is not available.
                                parent.emit('signallingEventSelfAvailable', "Signalling the contact is not available.", this, details);
                            }
                        }
                    }
                }
                else {
                    // Unknown error from the WebSocket.
                    parent.emit('signallingEventErrorDetails', "Signalling has encountered an unknown error.", this, null);
                }
            };
        }
        ;
    }
    /**
     * Change this client details.
     *
     * @param {string}      uniqueID        The client unique id.
     * @param {string}      applicationID   The client application id.
     * @param {boolean}     available       True if this client is avaliable for contact; else false.
     * @param {boolean}     broadcast       True if this client allows the unique id to be broadcast; else false.
     * @param {boolean}     broadcastAppID  True if this client allows the application id to be broadcast; else false.
     */
    Signalling.prototype.changeClientSettings = function (uniqueID, applicationID, available, broadcast, broadcastAppID) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "uniqueID": uniqueID,
            "applicationID": applicationID,
            "available": available,
            "broadcast": broadcast,
            "broadcastAppID": broadcastAppID
        }));
    };
    /**
     * Send the current state of the client to the contact.
     *
     * @param {string}  contactUniqueID         The contact unique id.
     * @param {string}  contactApplicationID    The contact application id.
     * @param {string}  state                   The client state.
     */
    Signalling.prototype.sendClientState = function (contactUniqueID, contactApplicationID, state) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "clientState": true,
            "state": state
        }));
    };
    /**
     * Send a message to this contact.
     *
     * @param {string}  contactUniqueID         The contact unique id.
     * @param {string}  contactApplicationID    The contact application id.
     * @param {string}  message                 The message to send.
     */
    Signalling.prototype.sendMessage = function (contactUniqueID, contactApplicationID, message) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "contactMessage": message
        }));
    };
    /**
     * Send ICE candidate details to this contact.
     *
     * @param {string}  contactUniqueID         The contact unique id.
     * @param {string}  contactApplicationID    The contact application id.
     * @param {string}  candidate               The candidate details.
     * @param {boolean} isData                  Is the candidate a data channel.
     */
    Signalling.prototype.iceCandidate = function (contactUniqueID, contactApplicationID, candidate, isData) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "candidate": candidate,
            "type": "candidate",
            "isData": isData
        }));
    };
    /**
     * Send do not want to answer to this contact.
     *
     * @param {string}  contactUniqueID         The contact unique id.
     * @param {string}  contactApplicationID    The contact application id.
     */
    Signalling.prototype.noAnswer = function (contactUniqueID, contactApplicationID) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "noanswer": true
        }));
    };
    /**
     * Send end of call to this contact.
     *
     * @param {string}  contactUniqueID         The contact unique id.
     * @param {string}  contactApplicationID    The contact application id.
     */
    Signalling.prototype.sendEndCallToContact = function (contactUniqueID, contactApplicationID) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "endCallRemote": true
        }));
    };
    /**
     * Send a request asking if the contact is available.
     *
     * @param {string}  contactUniqueID         The contact unique id.
     * @param {string}  contactApplicationID    The contact application id.
     */
    Signalling.prototype.contactAvailable = function (contactUniqueID, contactApplicationID) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "contactAvailable": true
        }));
    };
    /**
     * Send the offer to this contact.
     *
     * @param {string}                  contactUniqueID         The contact unique id.
     * @param {string}                  contactApplicationID    The contact application id.
     * @param {RTCSessionDescription}   sdpOfferRequest         The SDP offer.
     */
    Signalling.prototype.sendOffer = function (contactUniqueID, contactApplicationID, sdpOfferRequest) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "callOffer": true,
            "sdp": sdpOfferRequest
        }));
    };
    /**
     * Send the answer to this contact.
     *
     * @param {string}                  contactUniqueID         The contact unique id.
     * @param {string}                  contactApplicationID    The contact application id.
     * @param {RTCSessionDescription}   sdpAnswerResponse       The SDP answer.
     */
    Signalling.prototype.sendAnswer = function (contactUniqueID, contactApplicationID, sdpAnswerResponse) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "callAnswer": true,
            "sdp": sdpAnswerResponse
        }));
    };
    /**
     * Send to the contact a message indicating that this client is joining the conference.
     *
     * @param {string}                  contactUniqueID         The contact unique id.
     * @param {string}                  contactApplicationID    The contact application id.
     * @param {RTCSessionDescription}   sdpOfferRequest         The SDP offer.
     */
    Signalling.prototype.sendJoinConferenceOffer = function (contactUniqueID, contactApplicationID, sdpOfferRequest) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "joinConferenceOffer": true,
            "conferenceCall": true,
            "sdp": sdpOfferRequest
        }));
    };
    /**
     * Send to the contact a message indicating that this client has joined the conference.
     *
     * @param {string}                  contactUniqueID         The contact unique id.
     * @param {string}                  contactApplicationID    The contact application id.
     * @param {RTCSessionDescription}   sdpAnswerResponse       The SDP answer.
     */
    Signalling.prototype.sendJoinConferenceAnswer = function (contactUniqueID, contactApplicationID, sdpAnswerResponse) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "joinConferenceAnswer": true,
            "conferenceCall": true,
            "sdp": sdpAnswerResponse
        }));
    };
    /**
     * Send a message to the contact that this contact has started typing.
     *
     * @param {string}     contactUniqueID          The contact unique id.
     * @param {string}     contactApplicationID     The contact application id.
     */
    Signalling.prototype.startedTypingMessage = function (contactUniqueID, contactApplicationID) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "contactTypingMessage": true,
            "typing": true
        }));
    };
    /**
     * Send a message to the contact that this contact has stopped typing.
     *
     * @param {string}     contactUniqueID          The contact unique id.
     * @param {string}     contactApplicationID     The contact application id.
     */
    Signalling.prototype.stoppedTypingMessage = function (contactUniqueID, contactApplicationID) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "contactTypingMessage": true,
            "typing": false
        }));
    };
    /**
     * Send the file transfer offer to this contact.
     *
     * @param {string}                  contactUniqueID         The contact unique id.
     * @param {string}                  contactApplicationID    The contact application id.
     * @param {RTCSessionDescription}   sdpOfferRequest         The SDP offer.
     * @param {string}                  fileName                The file name to send.
     * @param {number}                  fileSize                The file size.
     * @param {string}                  fileType                The file type.
     * @param {number}                  fileLastModified        The file last modified date.
     */
    Signalling.prototype.sendFileTransferOffer = function (contactUniqueID, contactApplicationID, sdpOfferRequest, fileName, fileSize, fileType, fileLastModified) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "fileTransferOffer": true,
            "name": fileName,
            "size": fileSize,
            "type": fileType,
            "lastModified": fileLastModified,
            "sdp": sdpOfferRequest
        }));
    };
    /**
     * Send the file transfer answer to this contact.
     *
     * @param {string}                  contactUniqueID         The contact unique id.
     * @param {string}                  contactApplicationID    The contact application id.
     * @param {RTCSessionDescription}   sdpAnswerResponse       The SDP answer.
     */
    Signalling.prototype.sendFileTransferAnswer = function (contactUniqueID, contactApplicationID, sdpAnswerResponse) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "fileTransferAnswer": true,
            "sdp": sdpAnswerResponse
        }));
    };
    /**
     * Send do not want the file transfer answer to this contact.
     *
     * @param {string}     contactUniqueID          The contact unique id.
     * @param {string}     contactApplicationID     The contact application id.
     */
    Signalling.prototype.noFileTransferAnswer = function (contactUniqueID, contactApplicationID) {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send(JSON.stringify({
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "noanswer": true
        }));
    };
    /**
     * Sent a request to get the list of uniques.
     */
    Signalling.prototype.contactUniqueIDList = function () {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send("uniqueids");
    };
    /**
     * Sent a request to get the list of applications.
     */
    Signalling.prototype.contactApplicationIDList = function () {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send("applicationids");
    };
    /**
     * Sent a request to get the list of groups.
    */
    Signalling.prototype.contactGroupList = function () {
        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN)
            return;
        // Send to the signalling provider.
        this.webSocket.send("uniqueapplication");
    };
    /**
     * Close the current signalling connection.
    */
    Signalling.prototype.close = function () {
        if (this.closed)
            return;
        this.closed = true;
        // Close the WebSocket connection.
        if (this.webSocket) {
            // If the socket is not open.
            if (this.webSocket.readyState !== this.webSocket.OPEN)
                return;
            try {
                // Close.
                this.webSocket.close();
                this.webSocket = null;
            }
            catch (e) {
                // Log the error.
                this.logger.error("Error closing signalling: " + e);
            }
        }
    };
    return Signalling;
}());
exports.Signalling = Signalling;
