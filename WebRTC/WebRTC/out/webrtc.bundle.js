(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebRTC = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Require packages.
var util = require('util');
var webrtcSupport = require('webrtcsupport');
var PeerConnection = require('rtcpeerconnection');
var WildEmitter = require('wildemitter');
var FileTransfer = require('filetransfer');

/**
 * Contact peer prototype.
 * 
 * Contact peer container, this holds information to one contact peer.
 * 
 * @param {Object}   contactPeerOptions  A collection of options.
 *            
 * @example                      
 *  options = { 
 *      signalling: Signalling,
 *      uniqueID: "uniqueID",
 *      applicationID: "applicationID",
 *      isData: false,
 *      receiveOfferMedia: {
 *          offerToReceiveAudio: 1,
 *          offerToReceiveVideo: 1
 *      } 
 *  }
 */                                  
function ContactPeer(contactPeerOptions) {

    // local.
    var self = this;

    // Call emitter constructor.
    WildEmitter.call(this);

    this.closed = false;
    var myParent = contactPeerOptions.parent;
    this.parent = myParent;

    // The signalling transport provider.
    var mySignalling = contactPeerOptions.signalling;
    this.signalling = mySignalling;

    // Assign this contact details.
    this.uniqueID = contactPeerOptions.uniqueID;
    this.applicationID = contactPeerOptions.applicationID;
    this.contactDetails = '';

    // Get the parent logger.
    this.logger = myParent.logger;

    // Store all channels.
    var receiveDataChannel = null;
    var sendDataChannel = null;

    var receiveBuffer = [];
    var receivedSize = 0;
    var sentSize = 0;

    this.isData = contactPeerOptions.isData;
    this.fileName = "";
    this.fileSize = 0;
    this.fileType = "";
    this.fileLastModified = 0;
    this.fileToSend = null;

    this.receiveMedia = contactPeerOptions.receiveOfferMedia || myParent.config.receiveOfferMedia;
    this.remoteStream = null;
    this.remoteStreamVideoElement = null;

    // MediaRecorder
    this.mediaRecorder = null;

    try {
        // Create a new peer connection to the STUN and TURN servers
        // with the ICE configuration.
        var myPeerConnection = new RTCPeerConnection(
            myParent.config.peerConnectionConfiguration);

        //var myPeerConnection = new PeerConnection(
        //    myParent.config.peerConnectionConfiguration, myParent.config.peerConnectionConstraints);

        // Assign to local.
        this.peerConnection = myPeerConnection;
    } 
    catch (e) {
        // Log the error.
        this.logger.error("Error connecting to RTCPeerConnection: " + e);
    }

    // If created.
    if (this.peerConnection) {

        // Send any ice candidates to the other peers.
        this.peerConnection.onicecandidate = function (evt) {
            var config = {
                data: evt,
                signalling: mySignalling
            };
            // Send ICE candiate.
            self.onIceCandidateHandler(config);
        };

        // ICE connection state change.
        this.peerConnection.oniceconnectionstatechange = function (evt) {
            myParent.emit('peerContactEventICEStateChange', "Peer ICE connection state changed.", self, evt);
        };

        // When a stream has been removed.
        this.peerConnection.onremovestream = function (evt) {
            myParent.emit('peerContactEventRemoveStream', "Peer connection stream removed.", self, evt);
        };

        /*
        try {
            // Browsers other than FireFox may have a problem
            // with this event.

            // Once remote stream arrives, show it in the remote video element.
            // onremovestream is deprecated.
            this.peerConnection.removeTrack = function (evt) {
                myParent.emit('peerContactEventRemoveStream', "Peer connection stream removed.", self, evt);
            };
        }
        catch (e) { }
        */

        // Once remote stream arrives, show it in the remote video element.
        // onaddstream is deprecated.
        this.peerConnection.onaddstream = function (evt) {
            self.remoteStream = evt.stream;
            myParent.emit('peerContactEventAddStream', "Peer connection stream added.", self, evt);
        };

        /*
        try {
            // Browsers other than FireFox may have a problem
            // with this event.

            // Once remote stream arrives, show it in the remote video element.
            // onaddstream is deprecated.
            this.peerConnection.ontrack = function (evt) {
                self.remoteStream = evt.stream;
                myParent.emit('peerContactEventAddTrack', "Peer connection stream added.", self, evt);
            };
        }
        catch (e) { }
        */

        // Data channel handler.
        this.peerConnection.ondatachannel = function (evt) {

            // Clear the buffer.
            receiveBuffer = [];
            receivedSize = 0;

            // Assign the receive channel.
            receiveDataChannel = evt.channel;
            receiveDataChannel.binaryType = "arraybuffer";

            // On data channel receive message callback.
            receiveDataChannel.onmessage = function (event) { 

                receiveBuffer.push(event.data);
                receivedSize += event.data.byteLength;
                myParent.emit('peerContactEventDataChannelReceivedSize', "Peer connection data channel received size.", self, receivedSize);

                // We are assuming that our signaling protocol told
                // about the expected file size (and name, hash, etc).
                if (receivedSize >= self.fileSize) {
                    myParent.emit('peerContactEventDataChannelReceiveComplete', "Peer connection data channel received complete.", self, receiveBuffer);

                    receiveBuffer = [];
                    receiveDataChannel.close();
                    receiveDataChannel = null;
                }
            };

            // Data channel open.
            receiveDataChannel.onopen = function() {
                // If data channel is active.
                if (receiveDataChannel) {
                    // Receive channel state.
                    var readyState = receiveDataChannel.readyState;
                    myParent.emit('peerContactEventDataChannelOpen', "Peer connection data channel open.", self, readyState);
                }
            };

            // Data channel close.
            receiveDataChannel.onclose = function() { 
                // If data channel is active.
                if (receiveDataChannel) {
                    // Receive channel state.
                    var readyState = receiveDataChannel.readyState;
                    myParent.emit('peerContactEventDataChannelClose', "Peer connection data channel close.", self, readyState);
                }
            };

            // Data channel error.
            receiveDataChannel.onerror = function (error) {
                myParent.emit('peerContactEventDataChannelError', "Peer connection data channel error.", self, error);
            };
        };

        try {
            // Create a data channel from the peer connection.
            this.sendDataChannel = this.peerConnection.createDataChannel("sendReceiveDataChannel_" + this.uniqueID + "_" + this.applicationID);
            this.sendDataChannel.binaryType = "arraybuffer";

            // On open
            this.sendDataChannel.onopen = function () {

                // Get the file.
                var file = self.fileToSend;

                // If file is size zero.
                if (!file || file.size === 0) {
                    return;
                }
            
                // Set send size.
                sentSize = 0;
            
                // If data channel is active.
                if (self.sendDataChannel) {

                    // Send channel state.
                    var readyState = self.sendDataChannel.readyState;
                    myParent.emit('peerContactEventDataChannelOpen', "Peer connection data channel open.", self, readyState);
            
                    // Sent the file data in chunks
                    var chunkSize = 8096;
                    var sliceFile = function(offset) {
                        
                        // Create a file reader.
                        var reader = new window.FileReader();
            
                        // When the file is opened.
                        reader.onload = (function() {
                            return function(e) {
                                // Send the file through the data channel.
                                self.sendDataChannel.send(e.target.result);

                                // Create timeout.
                                if (file.size > offset + e.target.result.byteLength) {
                                    window.setTimeout(sliceFile, 0, offset + chunkSize);
                                }
            
                                // Set the current sent size.
                                sentSize = offset + e.target.result.byteLength;
                                myParent.emit('peerContactEventDataChannelSentSize', "Peer connection data channel sent size.", self, sentSize);
            
                                // If all the data has been sent.
                                if (sentSize >= file.size) {
            
                                    // Close the data channel.
                                    myParent.emit('peerContactEventDataChannelSentComplete', "Peer connection data channel sent complete.", self, null);
                                }
                            };
            
                        })(file);
            
                        // Read the file array into the buffer.
                        var slice = file.slice(offset, offset + chunkSize);
                        reader.readAsArrayBuffer(slice);
                    };
            
                    // Sent the file with no offset.
                    sliceFile(0);
                }
            };

            // On close
            this.sendDataChannel.onclose = function () {
                // If data channel is active.
                if (self.sendDataChannel) {
                    // Sen channel state.
                    var readyState = self.sendDataChannel.readyState;
                    myParent.emit('peerContactEventDataChannelClose', "Peer connection data channel close.", self, readyState);
                }
            };

            // On error
            this.sendDataChannel.onerror = function (error) {
                myParent.emit('peerContactEventDataChannelError', "Peer connection data channel error.", self, error);
            };

            // On message.
            this.sendDataChannel.onmessage = function (event) { };
        }
        catch (e) 
        { 
            // Edge does not support
            // createDataChannel on the
            // RTCPeerConnection object.
            // Log the error.
            this.logger.error("Error creating data channel on RTCPeerConnection: " + e);
        }
    }
}

/**
 * Send a message to this contact.
 * 
 * @param {string}  message     The message to send to the contact.
 */
ContactPeer.prototype.sendMessage = function (message) {

    // Get this contact details.
    var contactUniqueID = this.uniqueID;
    var contactApplicationID = this.applicationID;
    
    // Send the message through the signalling provider.
    this.signalling.sendMessage(contactUniqueID, contactApplicationID, message);
};

/**
 * Send the state to this contact.
 * 
 * @param {string}  state     The state to send to the contact.
 */
ContactPeer.prototype.sendState = function (state) {

    // Get this contact details.
    var contactUniqueID = this.uniqueID;
    var contactApplicationID = this.applicationID;
    
    // Send the state through the signalling provider.
    this.signalling.sendClientState(contactUniqueID, contactApplicationID, state);
};

/**
 * Send the details to this contact.
 * 
 * @param {string}  details     The details to send to the contact.
 */
ContactPeer.prototype.sendDetails = function (details) {

    // Get this contact details.
    var contactUniqueID = this.uniqueID;
    var contactApplicationID = this.applicationID;
    
    // Send the details through the signalling provider.
    this.signalling.sendClientDetails(contactUniqueID, contactApplicationID, details);
};

/**
 * Send do not want to answer to this contact.
 */
ContactPeer.prototype.noAnswer = function () {

    // Get this contact details.
    var contactUniqueID = this.uniqueID;
    var contactApplicationID = this.applicationID;
    
    // Send the message through the signalling provider.
    this.signalling.noAnswer(contactUniqueID, contactApplicationID);
};

/**
 * Send a request asking if this contact is available.
 */
ContactPeer.prototype.isAvailable = function () {

    // Get this contact details.
    var contactUniqueID = this.uniqueID;
    var contactApplicationID = this.applicationID;
    
    // Send the message through the signalling provider.
    this.signalling.contactAvailable(contactUniqueID, contactApplicationID)
};

/**
 * Send end call to this contact.
 */
ContactPeer.prototype.sendEndCall = function () {

    // Get this contact details.
    var contactUniqueID = this.uniqueID;
    var contactApplicationID = this.applicationID;
    
    // Send the message through the signalling provider.
    this.signalling.sendEndCallToContact(contactUniqueID, contactApplicationID)
};

/**
 * Set the contact information.
 * 
 * @param {string}  uniqueID        The contact unique id.
 * @param {string}  applicationID   The contact application id.
 */
ContactPeer.prototype.setContactInfo = function (uniqueID, applicationID) {

    this.uniqueID = uniqueID;
    this.applicationID= applicationID;
};

/**
 * Get the contact unique id.
 * 
 * @return {string} Returns the contact unique id.
 */
ContactPeer.prototype.getUniqueID = function () {

    // Get this contact details.
    var contactUniqueID = this.uniqueID;
    return contactUniqueID;
};

/**
 * Get the contact application id.
 * 
 * @return {string} Returns the contact application id.
 */
ContactPeer.prototype.getApplicationID = function () {

    // Get this contact details.
    var contactApplicationID = this.applicationID;
    return contactApplicationID;
};

/**
 * Set the contact details.
 * 
 * @param {string}  details        The contact details.
 */
ContactPeer.prototype.setContactDetails = function (details) {

    this.contactDetails = details;
};

/**
 * Get the contact details.
 * 
 * @return {string} Returns the contact details.
 */
ContactPeer.prototype.getContactDetails = function () {

    // Get this contact details.
    var contactDetails = this.contactDetails;
    return contactDetails;
};

/**
 * Set the remote stream to the video element.
 * 
 * @param {object}      videoElement   The remote video element.
 * @param {MediaStream}      stream   The remote video stream.
 * 
 * @return {boolean}    True if the stream has been added; else false.
 */
ContactPeer.prototype.setRemoteStreamToVideoElement = function (videoElement, stream) {

    // If stream exists.
    if (this.remoteStream) {
        
        // Assign the video element.
        this.remoteStreamVideoElement = videoElement;
        this.remoteStreamVideoElement.srcObject = this.remoteStream;
        return true;
    }
    else if (stream) {

        // Assign the video element.
        this.remoteStream = stream;
        this.remoteStreamVideoElement = videoElement;
        this.remoteStreamVideoElement.srcObject = stream;
        return true;
    }
    return false;
};

/**
 * Set the remote video element.
 * 
 * @param {object}      videoElement   The remote video element.
 */
ContactPeer.prototype.setRemoteVideoElement = function (videoElement) {

    // Assign the video element.
    this.remoteStreamVideoElement = videoElement;
};

/**
 * Get the contact media stream.
 * 
 * @return {MediaStream} Returns the contact media stream.
 */
ContactPeer.prototype.getStream = function () {

    // Get this contact stream.
    var stream = this.remoteStream;
    return stream;
};

/**
 * Set the file transfer information.
 * 
 * @param {string}  name            The file name to send.
 * @param {number}  size            The file size.
 * @param {string}  type            The file type.
 * @param {number}  lastModified    The file last modified date.
 */
ContactPeer.prototype.setFileInfo = function (name, size, type, lastModified) {
    
    this.fileName = name;
    this.fileSize = size;
    this.fileType = type;
    this.fileLastModified = lastModified;
};

/**
 * Close the contact peer connection.
 */
ContactPeer.prototype.close = function () {

    if (this.closed) return;
    this.closed = true;

    try {
        // Remove the stream.
        this.closeStream();
        this.closeReceiveDataChannel();
        this.closeSendDataChannel();
    }
    catch (e) {
        // Log the error.
        this.logger.error("Error closing streams: " + e);
    }

    this.remoteStream = null;
    this.remoteStreamVideoElement = null;

    try {
        // Close peer connection.
        this.peerConnection.close();
        this.peerConnection = null;
    }
    catch (e) {
        // Log the error.
        this.logger.error("Error closing RTCPeerConnection: " + e);
    }

    try {
        // Stop recording.
        this.stopRecording();
    }
    catch (e) {
        // Log the error.
        this.logger.error("Error stopping recording: " + e);
    }

    // Call the peer stream removed event handler.
    this.parent.emit('peerContactEventClose', "Peer connection has been closed.", this, null);

    try {
        // Get the index of the current peer.
        var peerIndex = this.parent.contactPeers.indexOf(this);
        if (peerIndex > -1) {
            this.parent.contactPeers.splice(peerIndex, 1);
        }
    }
    catch (e) {}
};

/**
 * Close the contact receive data channel.
 */
ContactPeer.prototype.closeReceiveDataChannel = function () {

    // If data channel exists.
    if (this.receiveDataChannel) {
        this.receiveDataChannel.close();
        this.receiveDataChannel = null;
    }
};

/**
 * Close the contact send data channel.
 */
ContactPeer.prototype.closeSendDataChannel = function () {

    // If data channel exists.
    if (this.sendDataChannel) {
        this.sendDataChannel.close();
        this.sendDataChannel = null;
    }
};

/**
 * Add the local media stream to the contact.
 *
 * @param {MediaStream}     stream   Local media stream.
 */
ContactPeer.prototype.addStream = function (stream) {

    // If stream exists.
    if (stream) {
        try {
            // If peer.
            if (this.peerConnection) {
                // Add the local stream to the peer connection.
                this.peerConnection.addStream(stream);
            }
        } 
        catch (e) {
            // Log the error.
            this.logger.error("Error adding stream to RTCPeerConnection: " + e);
        }
    }
};

/**
 * Add the local media stream to the contact.
 *
 * @param {MediaStream}     stream   Local media stream.
 */
ContactPeer.prototype.addStreamTracks = function (stream) {

    // If stream exists.
    if (stream) {
        try {
            // If peer.
            if (this.peerConnection) {
                stream.getTracks().forEach(function(track) {
                    this.peerConnection.addTrack(track, stream);
                });
            }
        } 
        catch (e) {
            // Log the error.
            this.logger.error("Error adding stream tracks to RTCPeerConnection: " + e);
        }
    }
};

/**
 * Remove the local media stream to the contact.
 *
 * @param {MediaStream}     stream   Local media stream.
 */
ContactPeer.prototype.removeStreamTracks = function (stream) {

    // If stream exists.
    if (stream) {
        try {
            // If peer.
            if (this.peerConnection) {
                stream.getTracks().forEach(function(track) {
                    this.peerConnection.removeTrack(track, stream);
                });
            }
        } 
        catch (e) {
            // Log the error.
            this.logger.error("Error removing stream tracks to RTCPeerConnection: " + e);
        }
    }
};

/**
 * Set the contact session description.
 *
 * @param {RTCSessionDescription}     sdp   Session description.
 */
ContactPeer.prototype.setRemoteDescription = function (sdp) {

    // If peer.
    if (this.peerConnection) {
        // Set the contact session description.
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
    }
};

/**
 * Add the ICE candidate.
 *
 * @param {RTCIceCandidateInit}     candidate   Add candidate.
 */
ContactPeer.prototype.addIceCandidate = function (candidate) {

    // If peer.
    if (this.peerConnection) {
        // Add the ICE candidate.
        this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
};

/**
 * On ICE candidate.
 *
 * @param {candidate}     evt   Add candidate.
 */
ContactPeer.prototype.onIceCandidateHandler = function (evt) {
    
    // Get this contact details.
    var contactUniqueID = this.uniqueID;
    var contactApplicationID = this.applicationID;
    var isDataChannel = this.isData;
    
    // Send the message through the signalling provider.
    evt.signalling.iceCandidate(contactUniqueID, contactApplicationID, evt.data.candidate, isDataChannel)
};

/**
 * Mute the audio and video tracks in the media stream.
 *
 * @param {boolean}     mute   True to mute; else false.
 */
ContactPeer.prototype.muteAudioVideo = function (mute) {

    // If peer.
    if (this.peerConnection) {
        // If a sender exists.
        if (this.peerConnection.getSenders) {
            // For each sender track.
            this.peerConnection.getSenders().forEach(function (sender) {
                if (sender.track) {
                    // Disable-enable the sender track.
                    sender.track.enabled = !mute;
                }
            });
        } 
        else {
            // For each local stream.
            this.peerConnection.getLocalStreams().forEach(function (stream) {

                // For each audio stream.
                stream.getAudioTracks().forEach(function (track) {
                    // Disable-enable the local track.
                    track.enabled = !mute;
                });

                // For each video stream.
                stream.getVideoTracks().forEach(function (track) {
                    // Disable-enable the local track.
                    track.enabled = !mute;
                });
            });
        }
    }
};

/**
 * Close the contact media stream.
 */
ContactPeer.prototype.closeStream = function () {

    // If peer.
    if (this.peerConnection) {
        if (this.remoteStream) {
            
            // Stop all tracks.
            this.remoteStream.getTracks().forEach (
                function (track) {
                    track.stop();
                }
            );

            // If video element.
            if (this.remoteStreamVideoElement) {
                this.remoteStreamVideoElement.srcObject = null;
            }
        } 
    }
};

/**
 * Start recording remote stream.
 * 
 * @param {string}      [recordingOptions]    The recording options.
 * @param {number}      timeInterval        The time interval (milliseconds).
 */
ContactPeer.prototype.startRecording = function (recordingOptions, timeInterval) {

    // If stream exists.
    if (this.remoteStream) {
        // Get this local stream.
        var stream = this.remoteStream;

        // Recording mime type.
        var options = {mimeType: 'video/webm'};

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
            // On stop recording.
            this.mediaRecorder.onstop = function (evt) {
                this.parent.emit('peerContactRecordingStopped', "Peer has stopped recording.", this, evt);
            };

            // Recorded data is available.
            this.mediaRecorder.ondataavailable = function (event) {
                // If data exists.
                if (event.data && event.data.size > 0) {
                    // Send the chunck on data.
                    this.parent.emit('peerContactRecordingData', "Peer has recording data.", this, event.data);
                }
            };

            // Collect 10ms of data.
            this.mediaRecorder.start(timeInterval); 
        }
    }
};

/**
 * Stop recording remote stream.
 */
ContactPeer.prototype.stopRecording = function () {

    // If media recorder created.
    if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.mediaRecorder = null;
    }
};

/**
 * Pause recording local stream.
 */
ContactPeer.prototype.pauseRecording = function () {

    // If media recorder created.
    if (this.mediaRecorder) {
        this.mediaRecorder.pause();
    }
};

/**
 * Resume  recording local stream.
 */
ContactPeer.prototype.resumeRecording = function () {

    // If media recorder created.
    if (this.mediaRecorder) {
        this.mediaRecorder.resume();
    }
};

/**
 * Create the offer and send the call request.
 */
ContactPeer.prototype.sendOfferRequest = function () {

    // Create local refs.
    var localUniqueID = this.uniqueID;
    var localApplicationID = this.applicationID;
    var localPC = this.peerConnection;
    var localSig = this.signalling;
    var localLogger = this.logger;
    var localMedaia = this.receiveMedia;
    var localParent = this.parent;

    // If peer.
    if (this.peerConnection) {
        // Create a call offer.
        this.peerConnection.createOffer(
            function (offer) {
                // Create a new RTC session.
                var request = new RTCSessionDescription(offer);
                
                // Set the local call offer session description.
                localPC.setLocalDescription(new RTCSessionDescription(request),
                    function () {

                        // Set the request.
                        localSig.sendOffer(localUniqueID, localApplicationID, request);
                    },
                    function (error) {
                        localLogger.error(error);
                    }
                );
            },
            function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            }, 
            localMedaia
        );
    }
};

/**
 * Create the answer and send the call response.
 */
ContactPeer.prototype.sendAnswerResponse = function () {

    // Create local refs.
    var localUniqueID = this.uniqueID;
    var localApplicationID = this.applicationID;
    var localPC = this.peerConnection;
    var localSig = this.signalling;
    var localLogger = this.logger;
    var localParent = this.parent;

    // If peer.
    if (this.peerConnection) {
        this.peerConnection.createAnswer(
            function (answer) {
                // Create a new RTC session.
                var response = new RTCSessionDescription(answer);
    
                // Set the local call answer session description.
                localPC.setLocalDescription(response,
                    function () {
    
                        // Set the response.
                        localSig.sendAnswer(localUniqueID, localApplicationID, response);
                    },
                    function (error) {
                        localLogger.error(error);
                    }
                );
            },
            function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            }
        );
    }
};

/**
 * Create the file transfer offer and send the call request.
 * 
 * @param {File}     file   The file to send.
 */
ContactPeer.prototype.sendFileTransferOfferRequest = function (file) {

    // Create local refs.
    var localUniqueID = this.uniqueID;
    var localApplicationID = this.applicationID;
    var localPC = this.peerConnection;
    var localSig = this.signalling;
    var localLogger = this.logger;
    var localParent = this.parent;

    // If sent data channel exists.
    if (this.sendDataChannel) {
        // Set the file send.
        this.fileToSend = file;
    }

    // If peer.
    if (this.peerConnection) {
        // Create a call offer.
        this.peerConnection.createOffer(
            function (offer) {
                // Create a new RTC session.
                var request = new RTCSessionDescription(offer);
                
                // Set the local call offer session description.
                localPC.setLocalDescription(new RTCSessionDescription(request),
                    function () {

                        // Set the request.
                        localSig.sendFileTransferOffer(localUniqueID, localApplicationID, request, file.name, file.size, file.type, file.lastModified);
                    },
                    function (error) {
                        localLogger.error(error);
                    }
                );
            },
            function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            }
        );
    }
};

/**
 * Create the file transfer answer and send the call response.
 */
ContactPeer.prototype.sendFileTransferAnswerResponse = function () {

    // Create local refs.
    var localUniqueID = this.uniqueID;
    var localApplicationID = this.applicationID;
    var localPC = this.peerConnection;
    var localSig = this.signalling;
    var localLogger = this.logger;
    var localParent = this.parent;

    // If peer.
    if (this.peerConnection) {
        this.peerConnection.createAnswer(
            function (answer) {
                // Create a new RTC session.
                var response = new RTCSessionDescription(answer);
    
                // Set the local call answer session description.
                localPC.setLocalDescription(response,
                    function () {
    
                        // Set the response.
                        localSig.sendFileTransferAnswer(localUniqueID, localApplicationID, response);
                    },
                    function (error) {
                        localLogger.error(error);
                    }
                );
            },
            function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            }
        );
    }
};

/**
 * Create the join conference offer and send the call request.
 */
ContactPeer.prototype.sendJoinConferenceOfferRequest = function () {

    // Create local refs.
    var localUniqueID = this.uniqueID;
    var localApplicationID = this.applicationID;
    var localPC = this.peerConnection;
    var localSig = this.signalling;
    var localLogger = this.logger;
    var localMedaia = this.receiveMedia;
    var localParent = this.parent;

    // If peer.
    if (this.peerConnection) {
        // Create a call offer.
        this.peerConnection.createOffer(
            function (offer) {
                // Create a new RTC session.
                var request = new RTCSessionDescription(offer);
                
                // Set the local call offer session description.
                localPC.setLocalDescription(new RTCSessionDescription(request),
                    function () {

                        // Set the request.
                        localSig.sendJoinConferenceOffer(localUniqueID, localApplicationID, request);
                    },
                    function (error) {
                        localLogger.error(error);
                    }
                );
            },
            function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            }, 
            localMedaia
        );
    }
};

/**
 * Create the join conference answer and send the call response.
 */
ContactPeer.prototype.sendJoinConferenceAnswerResponse = function () {

    // Create local refs.
    var localUniqueID = this.uniqueID;
    var localApplicationID = this.applicationID;
    var localPC = this.peerConnection;
    var localSig = this.signalling;
    var localLogger = this.logger;
    var localParent = this.parent;

    // If peer.
    if (this.peerConnection) {
        this.peerConnection.createAnswer(
            function (answer) {
                // Create a new RTC session.
                var response = new RTCSessionDescription(answer);
    
                // Set the local call answer session description.
                localPC.setLocalDescription(response,
                    function () {
    
                        // Set the response.
                        localSig.sendJoinConferenceAnswer(localUniqueID, localApplicationID, response);
                    },
                    function (error) {
                        localLogger.error(error);
                    }
                );
            },
            function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            }
        );
    }
};

// Export the prototype.
module.exports = ContactPeer;
},{"filetransfer":5,"rtcpeerconnection":12,"util":20,"webrtcsupport":21,"wildemitter":22}],2:[function(require,module,exports){
// Require packages.
var util = require('util');
var WildEmitter = require('wildemitter');

/**
 * Signalling prototype.
 * 
 * Signalling class used to signal other contacted
 * clients, this signalling class uses WebSockets
 * for the signalling transport.
 * 
 * @param {Object}   signalOptions  A collection of options.
 *        
 * @example                          
 *  options = { 
 *      signallingURL: "wss://127.0.0.1:443" 
 *  }
 */
function Signalling(signalOptions) {

    // local.
    var self = this;
    this.closed = false;
    var myParent = signalOptions.parent;
    var item;
    
    // Set options.
    var options = signalOptions || {};

    // Call emitter constructor.
    WildEmitter.call(this);

    // Get the parent logger.
    this.logger = myParent.logger;

    // Configuration.
    var config = this.config = {
        signallingURL: "wss://127.0.0.1:443"
    };

    // Set options, override existing.
    for (item in options) {
        if (options.hasOwnProperty(item)) {
            this.config[item] = options[item];
        }
    }

    try {
        // Create a new WebSocket client for signalling.
        this.webSocket = new WebSocket(config.signallingURL);
    } 
    catch (e) {
        this.logger.error("Error connecting to WebSocket: " + e);
    }

    // If created.
    if (this.webSocket) {
        // Open new connection handler.
        this.webSocket.onopen = function (openEvent) {
            // Send open connection alert.
            myParent.emit('signallingEventOpen', "Signalling has opened.", this, openEvent);
        };

        // Error handler.
        this.webSocket.onerror = function (errorEvent) {
            // Send error connection alert.
            myParent.emit('signallingEventError', "Signalling has encountered and unknown error.", this, errorEvent);
        };

        // Connection closed handler.
        this.webSocket.onclose = function (closeEvent) {
            // Send close connection alert.
            myParent.emit('signallingEventClose', "Signalling has closed.", this, closeEvent);
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
                    myParent.emit('signallingEventErrorDetails', "Signalling has encountered an error.", this, signal.error);
                }
                else if (signal.applications) {
                    myParent.emit('signallingEventApplications', "Signalling has applications", this, signal.applications);
                }
                else if (signal.uniques) {
                    myParent.emit('signallingEventUniques', "Signalling has uniques", this, signal.uniques);
                }
                else if (signal.groups) {
                    myParent.emit('signallingEventGroups', "Signalling has groups", this, signal.groups);
                }
                else {
                    // If settings have been applied.
                    if (signal.settings && signal.settings === true) {
                        // The client settings.
                        myParent.emit('signallingEventSettings', "Signalling settings have been applied.", this, signal.settings);
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
                        myParent.emit('signallingEventAvailable', "Signalling contact available.", this, details);
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
                        myParent.emit('signallingEventMessage', "Signalling contact message.", this, details);
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
                        myParent.emit('signallingEventState', "Signalling contact state.", this, details);
                    }
                    else if (signal.clientDetails) {
                        // A message from a contact.

                        // Get the contact details.
                        var uniqueID = signal.contactUniqueID;
                        var applicationID = signal.contactApplicationID;

                        // Details.
                        var details = {
                            contactUniqueID: uniqueID,
                            contactApplicationID: applicationID,
                            clientDetails: signal.details
                        };

                        // Send message.
                        myParent.emit('signallingEventDetails', "Signalling contact details.", this, details);
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
                                var isDataChannel = true;
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
                                myParent.emit('signallingEventSDP', "Signalling an SDP signal has been received.", this, details);
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
                                myParent.emit('signallingEventCandidate', "Signalling a candidate signal has been received.", this, details);
                            }

                            // If a call request offer was sent.
                            if (signal.callOffer) {

                                // Details.
                                var details = {
                                    contactUniqueID: uniqueID,
                                    contactApplicationID: applicationID,
                                };

                                // Send offer data.
                                myParent.emit('signallingEventOffer', "Signalling an offer signal has been received.", this, details);
                            }

                            // If the call response answer was sent.
                            if (signal.callAnswer) {
                                
                                // Details.
                                var details = {
                                    contactUniqueID: uniqueID,
                                    contactApplicationID: applicationID,
                                };

                                // Send answer data.
                                myParent.emit('signallingEventAnswer', "Signalling an answer signal has been received.", this, details);
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
                                myParent.emit('signallingEventJoinConferenceOffer', "Signalling a join conference offer signal has been received.", this, details);
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
                                myParent.emit('signallingEventJoinConferenceAnswer', "Signalling a join conference answer signal has been received.", this, details);
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
                                myParent.emit('signallingEventFileOffer', "Signalling a file transfer offer signal has been received.", this, details);
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
                                myParent.emit('signallingEventFileAnswer', "Signalling a file answer signal has been received.", this, details);
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
                                myParent.emit('signallingEventNoAnswer', "Signalling the peer contact did not answer.", this, details);
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
                                myParent.emit('signallingEventEndCall', "Signalling the peer contact ended the call.", this, details);
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
                                    myParent.emit('signallingEventTypingMessage', "Signalling the contact is typing a message.", this, details);
                                }
                                else {
                                    // The client has stopped typing.
                                    myParent.emit('signallingEventTypingMessage', "Signalling the contact has stopped typing.", this, details);
                                }
                            }
                            else {

                                // Details.
                                var details = {
                                    contactAvailable: signal.available
                                };

                                // The client is available.
                                myParent.emit('signallingEventSelfAvailable', "Signalling the contact is available.", this, details);
                            }
                        }
                        else {

                            // Details.
                            var details = {
                                contactAvailable: signal.available
                            };

                            // The client is not available.
                            myParent.emit('signallingEventSelfAvailable', "Signalling the contact is not available.", this, details);
                        }
                    }
                }
            }
            else {
                // Unknown error from the WebSocket.
                myParent.emit('signallingEventErrorDetails', "Signalling has encountered an unknown error.", this, null);
            }
        };
    };
}

/**
 * Change this client details.
 * 
 * @param {string}      uniqueID        The client unique id.
 * @param {string}      applicationID   The client application id.
 * @param {boolean}     available       True if this client is avaliable for contact; else false.
 * @param {boolean}     broadcast       True if this client allows the unique id to be broadcast; else false.
 * @param {boolean}     broadcastAppID  True if this client allows the application id to be broadcast; else false.
 * @param {string}      accessToken     The access token.
 */
Signalling.prototype.changeClientSettings = function (uniqueID, applicationID, available, broadcast, broadcastAppID, accessToken) {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "uniqueID": uniqueID,
            "applicationID": applicationID,
            "available": available,
            "broadcast": broadcast,
            "broadcastAppID": broadcastAppID,
            "accessToken": accessToken
        })
    );
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
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "clientState": true,
            "state": state
        })
    );
};

/**
 * Send the current details of the client to the contact.
 * 
 * @param {string}  contactUniqueID         The contact unique id.
 * @param {string}  contactApplicationID    The contact application id.
 * @param {string}  details                 The client details.
 */
Signalling.prototype.sendClientDetails = function (contactUniqueID, contactApplicationID, details) {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "clientDetails": true,
            "details": details
        })
    );
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
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "contactMessage": message
        })
    );
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
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "candidate": candidate,
            "type": "candidate",
            "isData": isData
        })
    );
};

/**
 * Send do not want to answer to this contact.
 * 
 * @param {string}  contactUniqueID         The contact unique id.
 * @param {string}  contactApplicationID    The contact application id.
 */
Signalling.prototype.noAnswer = function (contactUniqueID, contactApplicationID) {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "noanswer": true
        })
    );
};

/**
 * Send end of call to this contact.
 * 
 * @param {string}  contactUniqueID         The contact unique id.
 * @param {string}  contactApplicationID    The contact application id.
 */
Signalling.prototype.sendEndCallToContact = function (contactUniqueID, contactApplicationID) {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "endCallRemote": true
        })
    );
};

/**
 * Send a request asking if the contact is available.
 * 
 * @param {string}  contactUniqueID         The contact unique id.
 * @param {string}  contactApplicationID    The contact application id.
 */
Signalling.prototype.contactAvailable = function (contactUniqueID, contactApplicationID) {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "contactAvailable": true
        })
    );
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
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "callOffer": true,
            "sdp": sdpOfferRequest
        })
    );
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
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "callAnswer": true,
            "sdp": sdpAnswerResponse
        })
    );
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
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "joinConferenceOffer": true,
            "conferenceCall": true,
            "sdp": sdpOfferRequest
        })
    );
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
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "joinConferenceAnswer": true,
            "conferenceCall": true,
            "sdp": sdpAnswerResponse
        })
    );
};

/**
 * Send a message to the contact that this contact has started typing.
 * 
 * @param {string}     contactUniqueID          The contact unique id.
 * @param {string}     contactApplicationID     The contact application id.
 */
Signalling.prototype.startedTypingMessage = function (contactUniqueID, contactApplicationID) {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "contactTypingMessage": true,
            "typing" : true
        })
    );
};

/**
 * Send a message to the contact that this contact has stopped typing.
 * 
 * @param {string}     contactUniqueID          The contact unique id.
 * @param {string}     contactApplicationID     The contact application id.
 */
Signalling.prototype.stoppedTypingMessage = function (contactUniqueID, contactApplicationID) {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "contactTypingMessage": true,
            "typing" : false
        })
    );
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
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "fileTransferOffer": true,
            "name": fileName,
            "size": fileSize,
            "type": fileType,
            "lastModified": fileLastModified,
            "sdp": sdpOfferRequest
        })
    );
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
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "fileTransferAnswer": true,
            "sdp": sdpAnswerResponse
        })
    );
};

/**
 * Send do not want the file transfer answer to this contact.
 * 
 * @param {string}     contactUniqueID          The contact unique id.
 * @param {string}     contactApplicationID     The contact application id.
 */
Signalling.prototype.noFileTransferAnswer = function (contactUniqueID, contactApplicationID) {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;
    
    // Send to the signalling provider.
    this.webSocket.send(
        JSON.stringify(
        {
            "contactUniqueID": contactUniqueID,
            "contactApplicationID": contactApplicationID,
            "noanswer": true
        })
    );
};

/**
 * Sent a request to get the list of uniques.
 */
Signalling.prototype.contactUniqueIDList = function () {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;

    // Send to the signalling provider.
    this.webSocket.send("uniqueids");
}

/**
 * Sent a request to get the list of applications.
 */
Signalling.prototype.contactApplicationIDList = function () {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;

    // Send to the signalling provider.
    this.webSocket.send("applicationids");
}

/**
 * Sent a request to get the list of groups.
*/
Signalling.prototype.contactGroupList = function () {

    // If the socket is not open.
    if (this.webSocket.readyState !== this.webSocket.OPEN) return;

    // Send to the signalling provider.
    this.webSocket.send("uniqueapplication");
}

/**
 * Close the current signalling connection.
*/
Signalling.prototype.close = function () {

    if (this.closed) return;
    this.closed = true;

    // Close the WebSocket connection.
    if (this.webSocket) {

        // If the socket is not open.
        if (this.webSocket.readyState !== this.webSocket.OPEN) return;

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

// Export the prototype.
module.exports = Signalling;
},{"util":20,"wildemitter":22}],3:[function(require,module,exports){
// Require packages.
var util = require('util');
var WildEmitter = require('wildemitter');
var webrtcSupport = require('webrtcsupport');
var mockconsole = require('mockconsole');
var localMedia = require('localmedia');
var ContactPeer = require('./contactpeer');
var Signalling = require('./signalling');

/**
 * WebRTC adapter prototype.
 * 
 * WebRTC adapter controls the interaction between the
 * signalling provider and the contact peers 
 * implementation.
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
	
	// local.
    var self = this;
    this.closed = false;
    var item;

    // Call emitter constructor.
    WildEmitter.call(this);
    
    // Set the webRTC options.
    var options = webRtcOptions || {};

    // Assign this contact details.
    this.uniqueID = webRtcOptions.uniqueID;
    this.applicationID = webRtcOptions.applicationID;
	
	// Store all contact peers.
    this.contactPeers = [];

    // The local stream.
    this.localStream = null;
    this.localStreamVideoElement = null;

    // MediaRecorder
    this.mediaRecorder = null;
	
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
    this.logger = function () {
		
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
        this.logger.error("Your browser does not support WebRTC");
    }
	
	// Call localMedia constructor, setup 
	// to override members.
    localMedia.call(this, this.config);

    // Signalling configuration.
    var configSignalling = {
        signallingURL: config.signallingURL,
        parent: self
    };

    // Create the websocket signalling provider.
    this.signalling = new Signalling(configSignalling);

    // Override on speaking method in local media.
    this.on('speaking', function () {
        if (!self.hardMuted) {
        }
    });

    // Override on stoppedSpeaking method in local media.
    this.on('stoppedSpeaking', function () {
        if (!self.hardMuted) {
        }
    });

    // Override on volumeChange method in local media.
    this.on('volumeChange', function (volume, treshold) {
        if (!self.hardMuted) {
        }
    });

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

// Inherit local media members.
util.inherits(WebRtcAdapter, localMedia);

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
}

/**
 * Get the contact application list.
 */
WebRtcAdapter.prototype.contactApplicationIDList = function () {

    this.signalling.contactApplicationIDList();
}

/**
 * Get the contact group list.
 */
WebRtcAdapter.prototype.contactGroupList = function () {

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
WebRtcAdapter.prototype.createContactPeer = function (opts) {

    var peer;
    opts.parent = this;
    opts.signalling = this.signalling;

    // Create a contact peer.
    peer = new ContactPeer(opts);

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
    if (self.localStream) {
            
        // Stop all tracks.
        self.localStream.getTracks().forEach (
            function (track) {
                track.stop();
            }
        );

        // If video element.
        if (self.localStreamVideoElement) {
            self.localStreamVideoElement.srcObject = null;
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
    navigator.mediaDevices.getUserMedia({ "audio": audio, "video": video }).then(
        function (stream) {
            // Init the local video stream.
            self.localStream = stream;
            self.localStreamVideoElement.srcObject = self.localStream;

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
WebRtcAdapter.prototype.createStreamCapture = function (captureMediaSource) {

    // Create local refs.
    var localLogger = this.logger;

    // Capture constraints
    var constraints = {
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
            self.localStream = stream;
            self.localStreamVideoElement.srcObject = self.localStream;

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
 * 
 *              audio: {deviceId: audioSource ? {exact: audioSource} : undefined}
 *              video: {deviceId: videoSource ? {exact: videoSource} : undefined}
 */
WebRtcAdapter.prototype.createStreamEx = function (constraints) {

    // Create local refs.
    var localLogger = this.logger;

    // Get the local stream.
    navigator.mediaDevices.getUserMedia(constraints).then(
        function (stream) {
            // Init the local video stream.
            self.localStream = stream;
            self.localStreamVideoElement.srcObject = self.localStream;

        }).catch(
        function (error) {
            localLogger.error(error);
    });
}

/**
 * Create the local media stream from the display media selection.
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
WebRtcAdapter.prototype.createStreamDisplay = function (constraints) {

    // Create local refs.
    var localLogger = this.logger;

    // Get the local stream.
    navigator.getDisplayMedia(constraints).then(
        function (stream) {
            // Init the local video stream.
            self.localStream = stream;
            self.localStreamVideoElement.srcObject = stream;

        }).catch(
        function (error) {
            localLogger.error(error);
    });
}

/**
 * Get all audio input devices.
 * 
 * @param {object}     callback   The callback function.
 */
WebRtcAdapter.prototype.getAudioInputDevices = function (callback) {

    // Create local refs.
    var localLogger = this.logger;
    var devices = [];

    // Get the local devices.
    navigator.mediaDevices.enumerateDevices().then(
        function (deviceInfos) {
            
            // For each device.
            for (var i = 0; i !== deviceInfos.length; ++i) {
                // Current device.
                var deviceInfo = deviceInfos[i];
                
                // If audio input.
                if (deviceInfo.kind === 'audioinput') {
                    devices.push(deviceInfo);
                }
            }

            // Send callback.
            callback(devices);

        }).catch(
        function (error) {
            localLogger.error(error);
    });
}

/**
 * Get all audio output devices.
 * 
 * @param {object}     callback   The callback function.
 */
WebRtcAdapter.prototype.getAudioOutputDevices = function (callback) {

    // Create local refs.
    var localLogger = this.logger;
    var devices = [];

    // Get the local devices.
    navigator.mediaDevices.enumerateDevices().then(
        function (deviceInfos) {
            
            // For each device.
            for (var i = 0; i !== deviceInfos.length; ++i) {
                // Current device.
                var deviceInfo = deviceInfos[i];
                
                // If audio output.
                if (deviceInfo.kind === 'audiooutput') {
                    devices.push(deviceInfo);
                }
            }

            // Send callback.
            callback(devices);

        }).catch(
        function (error) {
            localLogger.error(error);
    });
}

/**
 * Get all video input devices.
 * 
 * @param {object}     callback   The callback function.
 */
WebRtcAdapter.prototype.getVideoInputDevices = function (callback) {

    // Create local refs.
    var localLogger = this.logger;
    var devices = [];

    // Get the local devices.
    navigator.mediaDevices.enumerateDevices().then(
        function (deviceInfos) {
            
            // For each device.
            for (var i = 0; i !== deviceInfos.length; ++i) {
                // Current device.
                var deviceInfo = deviceInfos[i];
                
                // If video input.
                if (deviceInfo.kind === 'videoinput') {
                    devices.push(deviceInfo);
                }
            }

            // Send callback.
            callback(devices);

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
WebRtcAdapter.prototype.setLocalStreamToVideoElement = function (videoElement) {

    // If stream exists.
    if (this.localStream === null) {

        // Assign the video element.
        self.localStreamVideoElement = videoElement;
        self.localStreamVideoElement.srcObject = self.localStream;
        return true;
    }
    else {
        return false;
    }
};

/**
 * Set the local video element.
 * 
 * @param {object}      videoElement   The local video element.
 */
WebRtcAdapter.prototype.setLocalVideoElement = function (videoElement) {

    // Assign the video element.
    self.localStreamVideoElement = videoElement;
};

/**
 * Get the local stream.
 * 
 * @return {MediaStream} Returns the local stream.
 */
WebRtcAdapter.prototype.getStream = function () {

    // Get this local stream.
    var stream = self.localStream;
    return stream;
};

/**
 * Set the local stream.
 * 
 * @param {MediaStream}      stream   The local media stream.
 */
WebRtcAdapter.prototype.setStream = function (stream) {

    // Set the local stream.
    self.localStream = stream;
};

/**
 * Start recording local stream.
 * 
 * @param {string}      [recordingOptions]    The recording options.
 * @param {number}      timeInterval        The time interval (milliseconds).
 */
WebRtcAdapter.prototype.startRecording = function (recordingOptions, timeInterval) {

    // If stream exists.
    if (self.localStream) {
        // Get this local stream.
        var stream = self.localStream;

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

// Export the prototype.
module.exports = WebRtcAdapter;
},{"./contactpeer":1,"./signalling":2,"localmedia":8,"mockconsole":10,"util":20,"webrtcsupport":21,"wildemitter":22}],4:[function(require,module,exports){
// Require packages.
var util = require('util');
var WildEmitter = require('wildemitter');
var webrtcSupport = require('webrtcsupport');
var mockconsole = require('mockconsole');
var localMedia = require('localmedia');
var WebRtcAdapter = require('./webrtcadapter');

/**
 * WebRTC prototype.
 * 
 * WebRTC controls the interaction between the
 * adapter and user configuration.
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
function WebRTC(webRtcOptions) {
	
	// local.
    var self = this;
    this.closed = false;
    var item;
    var options = webRtcOptions || {};

    var config = this.config = {
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
    this.logger = function () {

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
    var myLogger = this.logger;

    // set our config from options
    for (item in options) {
        if (options.hasOwnProperty(item)) {
            this.config[item] = options[item];
        }
    }

    // attach detected support for convenience
    this.capabilities = webrtcSupport;

    // Call WildEmitter constructor.
    WildEmitter.call(this);

    // instantiate our main WebRTC helper
    // using same logger from logic here
    webRtcOptions.logger = myLogger;
    webRtcOptions.debug = false;

    // Create the webrtc adapter.
    this.webrtcadapter = new WebRtcAdapter(webRtcOptions);

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
        var argum = {
            open: true,
            text: text
        };
        self.emit('connectionOpen', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventError', function (text, signalling, arg) {
        var argum = {
            error: true,
            data: arg.data,
            text: text
        };
        self.emit('connectionError', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventClose', function (text, signalling, arg) {
        var argum = {
            close: true,
            text: text
        };
        self.emit('connectionClose', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventErrorDetails', function (text, signalling, arg) {
        var argum = {
            error: arg,
            text: text
        };
        self.emit('signalError', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventApplications', function (text, signalling, arg) {
        var argum = {
            list: arg,
            text: text
        };
        self.emit('signalApplications', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventUniques', function (text, signalling, arg) {
        var argum = {
            list: arg,
            text: text
        };
        self.emit('signalUniques', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventGroups', function (text, signalling, arg) {
        var argum = {
            list: arg,
            text: text
        };
        self.emit('signalGroups', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventSettings', function (text, signalling, arg) {
        var argum = {
            setting: arg,
            text: text
        };
        self.emit('signalSettings', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventAvailable', function (text, signalling, arg) {

        // Get the contact.
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
            contact: contact,
            available: arg.contactAvailable,
            text: text
        };

        // Emit the message.
        self.emit('signalAvailable', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventSelfAvailable', function (text, signalling, arg) {

        var argum = {
            available: arg.contactAvailable,
            text: text
        };

        // Emit the message.
        self.emit('signalSelfAvailable', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventMessage', function (text, signalling, arg) {
        
        // Get the contact.
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
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
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
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
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        contact.setContactDetails(arg.clientDetails);

        var argum = {
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
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
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
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
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
        var contact = null;

        // If file transfer or data channel.
        if (arg.isData) {
            // Get data contact.
            contact = self.createContactData(arg.contactUniqueID, arg.contactApplicationID);
        }
        else {
            contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        }

        // Set the remote description.
        contact.setRemoteDescription(arg.sdp)
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventCandidate', function (text, signalling, arg) {

        // Get the contact.
        var contact = null;

        // If file transfer or data channel.
        if (arg.isData) {
            // Get data contact.
            contact = self.createContactData(arg.contactUniqueID, arg.contactApplicationID);
        }
        else {
            contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        }

        // Set the ICE candidate.
        contact.addIceCandidate(arg.candidate)
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventOffer', function (text, signalling, arg) {
        
        // Get the contact.
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
            contact: contact,
            text: text
        };

        // Emit the message.
        self.emit('signalOffer', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventAnswer', function (text, signalling, arg) {
        
        // Get the contact.
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
            contact: contact,
            text: text
        };

        // Emit the message.
        self.emit('signalAnswer', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventFileOffer', function (text, signalling, arg) {
        
        // Get the contact.
        var contact = self.createContactData(arg.contactUniqueID, arg.contactApplicationID);
        contact.setFileInfo(arg.name, arg.size, arg.type, arg.lastModified);
        var argum = {
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
        var contact = self.createContactData(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
            contact: contact,
            text: text
        };

        // Emit the message.
        self.emit('signalFileAnswer', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventNoAnswer', function (text, signalling, arg) {
        
        // Get the contact.
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
            contact: contact,
            text: text
        };

        // Emit the message.
        self.emit('signalNoAnswer', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventEndCall', function (text, signalling, arg) {
        
        // Get the contact.
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
            contact: contact,
            text: text
        };

        // Emit the message.
        self.emit('signalEndCall', argum);
    });

    // Signalling event.
    this.webrtcadapter.on('signallingEventTypingMessage', function (text, signalling, arg) {
        
        // Get the contact.
        var contact = self.createContact(arg.contactUniqueID, arg.contactApplicationID);
        var argum = {
            contact: contact,
            typing: arg.typing,
            text: text
        };

        // Emit the message.
        self.emit('signalTyping', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventICEStateChange', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            state: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactICEStateChange', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventRemoveStream', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            remove: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactRemoveStream', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventAddStream', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            add: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactAddStream', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventAddTrack', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            add: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactAddStream', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventDataChannelReceivedSize', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            size: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactReceiveSize', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventDataChannelReceiveComplete', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            buffer: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactReceiveComplete', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventDataChannelOpen', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            open: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactReceiveOpen', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventDataChannelClose', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            close: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactReceiveClose', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventDataChannelError', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            error: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactReceiveError', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventDataChannelSentSize', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            size: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactSentSize', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventDataChannelSentComplete', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            buffer: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactSentComplete', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventClose', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            close: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactClose', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactEventSessionError', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            session: arg,
            text: text
        };

        // Emit the message.
        self.emit('contactSessionError', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactRecordingData', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            data: arg,
            text: text
        };

        // Emit the message.
        self.emit('peerRecordingData', argum);
    });

    // Contact event.
    this.webrtcadapter.on('peerContactRecordingStopped', function (text, contact, arg) {
        
        var argum = {
            contact: contact,
            evt: arg,
            text: text
        };

        // Emit the message.
        self.emit('peerRecordingStopped', argum);
    });

    // Adapter event.
    this.on('adapterRecordingData', function (text, adapter, arg) {
        
        var argum = {
            data: arg,
            text: text
        };

        // Emit the message.
        self.emit('recordingData', argum);
    });

    // Adapter event.
    this.on('adapterRecordingStopped', function (text, adapter, arg) {
        
        var argum = {
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
WebRTC.prototype = Object.create(WildEmitter.prototype, {
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
WebRTC.prototype.createContact = function (contactUniqueID, contactApplicationID) {

    // Get the contact.
    var contact = this.webrtcadapter.getContactPeer(contactUniqueID, contactApplicationID, false);
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
        contact = this.webrtcadapter.createContactPeer(options);
        return contact;
    }
};

/**
 * Create a new data contact if it does not exist, else return existing contact.
 * 
 * @param {string}      contactUniqueID        The contact unique id.
 * @param {string}      contactApplicationID   The contact application id.
 * 
 * @return {ContactPeer} Returns the contact.
 */
WebRTC.prototype.createContactData = function (contactUniqueID, contactApplicationID) {

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
        contact = this.webrtcadapter.createContactPeer(options);
        return contact;
    }
};

/**
 * Remove the contact if it exists.
 * 
 * @param {string}      contactUniqueID        The contact unique id.
 * @param {string}      contactApplicationID   The contact application id.
 */
WebRTC.prototype.removeContact = function (contactUniqueID, contactApplicationID) {

    // Get the contact.
    var contact = this.webrtcadapter.getContactPeer(contactUniqueID, contactApplicationID, false);
    if (contact[0]) {

        // Remove contact.
        this.webrtcadapter.removeContactPeer(contactUniqueID, contactApplicationID, false);
    }
};

/**
 * Remove the data contact if it exists.
 * 
 * @param {string}      contactUniqueID        The contact unique id.
 * @param {string}      contactApplicationID   The contact application id.
 */
WebRTC.prototype.removeContactData = function (contactUniqueID, contactApplicationID) {

    // Get the contact.
    var contact = this.webrtcadapter.getContactPeer(contactUniqueID, contactApplicationID, true);
    if (contact[0]) {

        // Remove contact.
        this.webrtcadapter.removeContactPeer(contactUniqueID, contactApplicationID, true);
    }
};

/**
 * Is the contact in the contact list.
 * 
 * @param {string}  uniqueID        The contact unique id.
 * @param {string}  applicationID   The contact application id.
 * 
 * @return {boolean} True if the contact is in the list; else false.
 */
WebRTC.prototype.isContactPeer = function (contactUniqueID, contactApplicationID) {

    // Get the contact.
    var contact = this.webrtcadapter.isContactPeer(contactUniqueID, contactApplicationID);
    if (contact[0]) {
        // Found one.
        return true;
    }
    else {
        return false;
    }
};

/**
 * Close the webRTC interface.
 */
WebRTC.prototype.close = function () {

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
};

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
WebRTC.prototype.changeClientSettings = function (uniqueID, applicationID, available, broadcast, broadcastAppID, accessToken) {

    // Change client settings
    this.webrtcadapter.changeClientSettings(uniqueID, applicationID, available, broadcast, broadcastAppID, accessToken);
};

/**
 * Create the local audio and video stream.
 *
 * @param {boolean}     audio   True to enable audio in local stream; else false.
 * @param {boolean}     video   True to enable video in local stream; else false.
 */
WebRTC.prototype.createStream = function (audio, video) {

    // Create stream.
    this.webrtcadapter.createStream(audio, video);
}

/**
 * Create the local media stream.
 * 
 * @param {string}      audioSource   The audio source.
 * @param {string}      videoSource   The video source.
 */
WebRTC.prototype.createStreamSource = function (audioSource, videoSource) {

    // Create the constraint.
    var constraints = {
        audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
        video: {deviceId: videoSource ? {exact: videoSource} : undefined}
    };

    // Create stream.
    this.webrtcadapter.createStreamEx(constraints);
}

/**
 * Create a local capture media, screen or application window (Note only for Firefox).
 *
 * @param {string}     captureMediaSource   The capture media source ('screen' or 'window').
 */
WebRTC.prototype.createStreamCapture = function (captureMediaSource) {

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
 * 
 *              audio: {deviceId: audioSource ? {exact: audioSource} : undefined}
 *              video: {deviceId: videoSource ? {exact: videoSource} : undefined}
 */
WebRTC.prototype.createStreamEx = function (constraints) {

    // Create stream.
    this.webrtcadapter.createStreamEx(constraints);
}

/**
 * Create the local media stream from the display media selection.
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
WebRTC.prototype.createStreamDisplay = function (constraints) {

    // Create stream.
    this.webrtcadapter.createStreamDisplay(constraints);
}

/**
 * Set the local video element.
 * 
 * @param {object}      videoElement   The local video element.
 */
WebRTC.prototype.setLocalVideoElement = function (videoElement) {

    // Assign the video element.
    this.webrtcadapter.setLocalVideoElement(videoElement);
};

/**
 * Set the local stream to the video element.
 * 
 * @param {object}      videoElement   The local video element.
 * 
 * @return {boolean}    True if the stream has been added; else false.
 */
WebRTC.prototype.setLocalStreamToVideoElement = function (videoElement) {

    // Assign the video element.
    return this.webrtcadapter.setLocalStreamToVideoElement(videoElement);
};

/**
 * Get all audio input sources.
 * 
 * @param {object}     callback   The callback function.
 */
WebRTC.prototype.getAudioInputSources = function (callback) {

    // Get all devices
    var deviceIndex = 1;
    var sources = [];

    // Get the device list.
    this.webrtcadapter.getAudioInputDevices(function(devices) { 
        // For each device.
        devices.forEach(function (device) {

            var info = { 
                deviceID: device.deviceId,
                deviceText: device.label || 'microphone ' + deviceIndex
            };

            // Add to source.
            sources.push(info);
            deviceIndex++;
        });

        // Send callback.
        callback(sources);
    });
}

/**
 * Get all audio output sources.
 * 
 * @param {object}     callback   The callback function.
 */
WebRTC.prototype.getAudioOutputSources = function (callback) {

    // Get all devices
    var deviceIndex = 1;
    var sources = [];

    // Get the device list.
    this.webrtcadapter.getAudioOutputDevices(function(devices) { 
        // For each device.
        devices.forEach(function (device) {

            var info = { 
                deviceID: device.deviceId,
                deviceText: device.label || 'speaker ' + deviceIndex
            };

            // Add to source.
            sources.push(info);
            deviceIndex++;
        });

        // Send callback.
        callback(sources);
    });
}

/**
 * Get all video input sources.
 * 
 * @param {object}     callback   The callback function.
 */
WebRTC.prototype.getVideoInputSources = function (callback) {

    // Get all devices
    var deviceIndex = 1;
    var sources = [];

    // Get the device list.
    this.webrtcadapter.getVideoInputDevices(function(devices) { 
        // For each device.
        devices.forEach(function (device) {

            var info = { 
                deviceID: device.deviceId,
                deviceText: device.label || 'camera ' + deviceIndex
            };

            // Add to source.
            sources.push(info);
            deviceIndex++;
        });

        // Send callback.
        callback(sources);
    });
}

/**
 * Attach audio output device to video element using device/sink ID.
 * 
 * @param {object}      videoElement    The video element.
 * @param {string}      deviceID        The source device id.
 */
WebRTC.prototype.attachSinkIdVideoElement = function (videoElement, deviceID) {

    // If no sink id applied.
    if (typeof videoElement.sinkId !== 'undefined') {

        // Set the device ID.
        videoElement.setSinkId(deviceID)
        .then(function() {
            // Success.
        })
        .catch(function(e) {
    
            // Log the error.
            this.logger.error("Error assigning device ID: " + e);
        });
    } 
    else {
        this.logger.error("Browser does not support output device selection.");
    }
};

/**
 * Take a picture of what is in the video element,
 * using the canvas element as the base context.
 * 
 * @param {object}      videoElement    The video element (get the width and height of the video).
 * @param {object}      canvasElement   The canvas element (set the width and height of the canvas).
 * 
 * @return {object}     The picture data; else null.
 */
WebRTC.prototype.takePicture = function (videoElement, canvasElement) {

    var data = null;
    var width = videoElement.videoWidth;
    var height = videoElement.videoHeight;

    // Get the canvas contaxt.
    var context = canvasElement.getContext('2d');
    canvasElement.width = width;
    canvasElement.height = height;

    // Draw the picture on the cavas.
    context.drawImage(videoElement, 0, 0, width, height);

    // Get the data.
    data = canvasElement.toDataURL('image/png');

    // Return the picture data.
    return data
};

/**
 * Close the local stream.
 */
WebRTC.prototype.closeStream = function () {
    
    // Close stream.
    this.webrtcadapter.closeStream();
};

// Export the prototype.
module.exports = WebRTC;
},{"./webrtcadapter":3,"localmedia":8,"mockconsole":10,"util":20,"webrtcsupport":21,"wildemitter":22}],5:[function(require,module,exports){
var WildEmitter = require('wildemitter');
var util = require('util');

function Sender(opts) {
    WildEmitter.call(this);
    var options = opts || {};
    this.config = {
        chunksize: 16384,
        pacing: 0
    };
    // set our config from options
    var item;
    for (item in options) {
        this.config[item] = options[item];
    }

    this.file = null;
    this.channel = null;
}
util.inherits(Sender, WildEmitter);

Sender.prototype.send = function (file, channel) {
    var self = this;
    this.file = file;
    this.channel = channel;
    var usePoll = typeof channel.bufferedAmountLowThreshold !== 'number';
    var offset = 0;
    var sliceFile = function() {
        var reader = new window.FileReader();
        reader.onload = (function() {
            return function(e) {
                self.channel.send(e.target.result);
                self.emit('progress', offset, file.size, e.target.result);

                if (file.size > offset + e.target.result.byteLength) {
                    if (usePoll) {
                        window.setTimeout(sliceFile, self.config.pacing);
                    } else if (channel.bufferedAmount <= channel.bufferedAmountLowThreshold) {
                        window.setTimeout(sliceFile, 0);
                    } else {
                        // wait for bufferedAmountLow to fire
                    }
                } else {
                    self.emit('progress', file.size, file.size, null);
                    self.emit('sentFile');
                }
                offset = offset + self.config.chunksize;
            };
        })(file);
        var slice = file.slice(offset, offset + self.config.chunksize);
        reader.readAsArrayBuffer(slice);
    };
    if (!usePoll) {
        channel.bufferedAmountLowThreshold = 8 * this.config.chunksize;
        channel.addEventListener('bufferedamountlow', sliceFile);
    }
    window.setTimeout(sliceFile, 0);
};

function Receiver() {
    WildEmitter.call(this);

    this.receiveBuffer = [];
    this.received = 0;
    this.metadata = {};
    this.channel = null;
}
util.inherits(Receiver, WildEmitter);

Receiver.prototype.receive = function (metadata, channel) {
    var self = this;

    if (metadata) {
        this.metadata = metadata;
    }
    this.channel = channel;
    // chrome only supports arraybuffers and those make it easier to calc the hash
    channel.binaryType = 'arraybuffer';
    this.channel.onmessage = function (event) {
        var len = event.data.byteLength;
        self.received += len;
        self.receiveBuffer.push(event.data);

        self.emit('progress', self.received, self.metadata.size, event.data);
        if (self.received === self.metadata.size) {
            self.emit('receivedFile', new window.Blob(self.receiveBuffer), self.metadata);
            self.receiveBuffer = []; // discard receivebuffer
        } else if (self.received > self.metadata.size) {
            // FIXME
            console.error('received more than expected, discarding...');
            self.receiveBuffer = []; // just discard...

        }
    };
};

module.exports = {};
module.exports.support = typeof window !== 'undefined' && window && window.File && window.FileReader && window.Blob;
module.exports.Sender = Sender;
module.exports.Receiver = Receiver;

},{"util":20,"wildemitter":22}],6:[function(require,module,exports){
// cache for constraints and callback
var cache = {};

module.exports = function (constraints, cb) {
    var hasConstraints = arguments.length === 2;
    var callback = hasConstraints ? cb : constraints;
    var error;

    if (typeof window === 'undefined' || window.location.protocol === 'http:') {
        error = new Error('NavigatorUserMediaError');
        error.name = 'HTTPS_REQUIRED';
        return callback(error);
    }

    if (window.navigator.userAgent.match('Chrome')) {
        var chromever = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10);
        var maxver = 33;
        var isCef = !window.chrome.webstore;
        // "known" crash in chrome 34 and 35 on linux
        if (window.navigator.userAgent.match('Linux')) maxver = 35;

        // check that the extension is installed by looking for a
        // sessionStorage variable that contains the extension id
        // this has to be set after installation unless the contest
        // script does that
        if (sessionStorage.getScreenMediaJSExtensionId) {
            chrome.runtime.sendMessage(sessionStorage.getScreenMediaJSExtensionId,
                {type:'getScreen', id: 1}, null,
                function (data) {
                    if (!data || data.sourceId === '') { // user canceled
                        var error = new Error('NavigatorUserMediaError');
                        error.name = 'NotAllowedError';
                        callback(error);
                    } else {
                        constraints = (hasConstraints && constraints) || {audio: false, video: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                maxWidth: window.screen.width,
                                maxHeight: window.screen.height,
                                maxFrameRate: 3
                            }
                        }};
                        constraints.video.mandatory.chromeMediaSourceId = data.sourceId;
                        window.navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                            callback(null, stream);
                        }).catch(function (err) {
                            callback(err);
                        });
                    }
                }
            );
        } else if (window.cefGetScreenMedia) {
            //window.cefGetScreenMedia is experimental - may be removed without notice
            window.cefGetScreenMedia(function(sourceId) {
                if (!sourceId) {
                    var error = new Error('cefGetScreenMediaError');
                    error.name = 'CEF_GETSCREENMEDIA_CANCELED';
                    callback(error);
                } else {
                    constraints = (hasConstraints && constraints) || {audio: false, video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            maxWidth: window.screen.width,
                            maxHeight: window.screen.height,
                            maxFrameRate: 3
                        },
                        optional: [
                            {googLeakyBucket: true},
                            {googTemporalLayeredScreencast: true}
                        ]
                    }};
                    constraints.video.mandatory.chromeMediaSourceId = sourceId;
                    window.navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                        callback(null, stream);
                    }).catch(function (err) {
                        callback(err);
                    });
                }
            });
        } else if (isCef || (chromever >= 26 && chromever <= maxver)) {
            // chrome 26 - chrome 33 way to do it -- requires bad chrome://flags
            // note: this is basically in maintenance mode and will go away soon
            constraints = (hasConstraints && constraints) || {
                video: {
                    mandatory: {
                        googLeakyBucket: true,
                        maxWidth: window.screen.width,
                        maxHeight: window.screen.height,
                        maxFrameRate: 3,
                        chromeMediaSource: 'screen'
                    }
                }
            };
            window.navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                callback(null, stream);
            }).catch(function (err) {
                callback(err);
            });
        } else {
            // chrome 34+ way requiring an extension
            var pending = window.setTimeout(function () {
                error = new Error('NavigatorUserMediaError');
                error.name = 'EXTENSION_UNAVAILABLE';
                return callback(error);
            }, 1000);
            cache[pending] = [callback, hasConstraints ? constraints : null];
            window.postMessage({ type: 'getScreen', id: pending }, '*');
        }
    } else if (window.navigator.userAgent.match('Firefox')) {
        var ffver = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
        if (ffver >= 33) {
            constraints = (hasConstraints && constraints) || {
                video: {
                    mozMediaSource: 'window',
                    mediaSource: 'window'
                }
            };
            window.navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                callback(null, stream);
                var lastTime = stream.currentTime;
                var polly = window.setInterval(function () {
                    if (!stream) window.clearInterval(polly);
                    if (stream.currentTime == lastTime) {
                        window.clearInterval(polly);
                        if (stream.onended) {
                            stream.onended();
                        }
                    }
                    lastTime = stream.currentTime;
                }, 500);
            }).catch(function (err) {
                callback(err);
            });
        } else {
            error = new Error('NavigatorUserMediaError');
            error.name = 'EXTENSION_UNAVAILABLE'; // does not make much sense but...
        }
    }
};

typeof window !== 'undefined' && window.addEventListener('message', function (event) {
    if (event.origin != window.location.origin) {
        return;
    }
    if (event.data.type == 'gotScreen' && cache[event.data.id]) {
        var data = cache[event.data.id];
        var constraints = data[1];
        var callback = data[0];
        delete cache[event.data.id];

        if (event.data.sourceId === '') { // user canceled
            var error = new Error('NavigatorUserMediaError');
            error.name = 'NotAllowedError';
            callback(error);
        } else {
            constraints = constraints || {audio: false, video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    maxWidth: window.screen.width,
                    maxHeight: window.screen.height,
                    maxFrameRate: 3
                },
                optional: [
                    {googLeakyBucket: true},
                    {googTemporalLayeredScreencast: true}
                ]
            }};
            constraints.video.mandatory.chromeMediaSourceId = event.data.sourceId;
            window.navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                callback(null, stream);
            }).catch(function (err) {
                callback(err);
            });
        }
    } else if (event.data.type == 'getScreenPending') {
        window.clearTimeout(event.data.id);
    }
});

},{}],7:[function(require,module,exports){
var WildEmitter = require('wildemitter');

function getMaxVolume (analyser, fftBins) {
  var maxVolume = -Infinity;
  analyser.getFloatFrequencyData(fftBins);

  for(var i=4, ii=fftBins.length; i < ii; i++) {
    if (fftBins[i] > maxVolume && fftBins[i] < 0) {
      maxVolume = fftBins[i];
    }
  };

  return maxVolume;
}


var audioContextType;
if (typeof window !== 'undefined') {
  audioContextType = window.AudioContext || window.webkitAudioContext;
}
// use a single audio context due to hardware limits
var audioContext = null;
module.exports = function(stream, options) {
  var harker = new WildEmitter();


  // make it not break in non-supported browsers
  if (!audioContextType) return harker;

  //Config
  var options = options || {},
      smoothing = (options.smoothing || 0.1),
      interval = (options.interval || 50),
      threshold = options.threshold,
      play = options.play,
      history = options.history || 10,
      running = true;

  //Setup Audio Context
  if (!audioContext) {
    audioContext = new audioContextType();
  }
  var sourceNode, fftBins, analyser;

  analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = smoothing;
  fftBins = new Float32Array(analyser.frequencyBinCount);

  if (stream.jquery) stream = stream[0];
  if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
    //Audio Tag
    sourceNode = audioContext.createMediaElementSource(stream);
    if (typeof play === 'undefined') play = true;
    threshold = threshold || -50;
  } else {
    //WebRTC Stream
    sourceNode = audioContext.createMediaStreamSource(stream);
    threshold = threshold || -50;
  }

  sourceNode.connect(analyser);
  if (play) analyser.connect(audioContext.destination);

  harker.speaking = false;

  harker.setThreshold = function(t) {
    threshold = t;
  };

  harker.setInterval = function(i) {
    interval = i;
  };

  harker.stop = function() {
    running = false;
    harker.emit('volume_change', -100, threshold);
    if (harker.speaking) {
      harker.speaking = false;
      harker.emit('stopped_speaking');
    }
    analyser.disconnect();
    sourceNode.disconnect();
  };
  harker.speakingHistory = [];
  for (var i = 0; i < history; i++) {
      harker.speakingHistory.push(0);
  }

  // Poll the analyser node to determine if speaking
  // and emit events if changed
  var looper = function() {
    setTimeout(function() {

      //check if stop has been called
      if(!running) {
        return;
      }

      var currentVolume = getMaxVolume(analyser, fftBins);

      harker.emit('volume_change', currentVolume, threshold);

      var history = 0;
      if (currentVolume > threshold && !harker.speaking) {
        // trigger quickly, short history
        for (var i = harker.speakingHistory.length - 3; i < harker.speakingHistory.length; i++) {
          history += harker.speakingHistory[i];
        }
        if (history >= 2) {
          harker.speaking = true;
          harker.emit('speaking');
        }
      } else if (currentVolume < threshold && harker.speaking) {
        for (var i = 0; i < harker.speakingHistory.length; i++) {
          history += harker.speakingHistory[i];
        }
        if (history == 0) {
          harker.speaking = false;
          harker.emit('stopped_speaking');
        }
      }
      harker.speakingHistory.shift();
      harker.speakingHistory.push(0 + (currentVolume > threshold));

      looper();
    }, interval);
  };
  looper();


  return harker;
}

},{"wildemitter":22}],8:[function(require,module,exports){
var util = require('util');
var hark = require('hark');
var getScreenMedia = require('getscreenmedia');
var WildEmitter = require('wildemitter');
var mockconsole = require('mockconsole');

function isAllTracksEnded(stream) {
    var isAllTracksEnded = true;
    stream.getTracks().forEach(function (t) {
        isAllTracksEnded = t.readyState === 'ended' && isAllTracksEnded;
    });
    return isAllTracksEnded;
}

function shouldWorkAroundFirefoxStopStream() {
  if (typeof window === 'undefined') {
    return false;
  }
  if (!window.navigator.mozGetUserMedia) {
    return false;
  }
  var match = window.navigator.userAgent.match(/Firefox\/(\d+)\./);
  var version = match && match.length >= 1 && parseInt(match[1], 10);
  return version < 50;
}

function LocalMedia(opts) {
    WildEmitter.call(this);

    var config = this.config = {
        detectSpeakingEvents: false,
        audioFallback: false,
        media: {
            audio: true,
            video: true
        },
        harkOptions: null,
        logger: mockconsole
    };

    var item;
    for (item in opts) {
        if (opts.hasOwnProperty(item)) {
            this.config[item] = opts[item];
        }
    }

    this.logger = config.logger;
    this._log = this.logger.log.bind(this.logger, 'LocalMedia:');
    this._logerror = this.logger.error.bind(this.logger, 'LocalMedia:');

    this.localStreams = [];
    this.localScreens = [];

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this._logerror('Your browser does not support local media capture.');
    }

    this._audioMonitors = [];
    this.on('localStreamStopped', this._stopAudioMonitor.bind(this));
    this.on('localScreenStopped', this._stopAudioMonitor.bind(this));
}

util.inherits(LocalMedia, WildEmitter);


LocalMedia.prototype.start = function (mediaConstraints, cb) {
    var self = this;
    var constraints = mediaConstraints || this.config.media;

    this.emit('localStreamRequested', constraints);

    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        if (constraints.audio && self.config.detectSpeakingEvents) {
            self._setupAudioMonitor(stream, self.config.harkOptions);
        }
        self.localStreams.push(stream);

        stream.getTracks().forEach(function (track) {
            track.addEventListener('ended', function () {
                if (isAllTracksEnded(stream)) {
                    self._removeStream(stream);
                }
            });
        });

        self.emit('localStream', stream);

        if (cb) {
            return cb(null, stream);
        }
    }).catch(function (err) {
            // Fallback for users without a camera
            if (self.config.audioFallback && err.name === 'NotFoundError' && constraints.video !== false) {
                constraints.video = false;
                self.start(constraints, cb);
                return;
            }

        self.emit('localStreamRequestFailed', constraints);

        if (cb) {
            return cb(err, null);
        }
    });
};

LocalMedia.prototype.stop = function (stream) {
    this.stopStream(stream);
    this.stopScreenShare(stream);
};

LocalMedia.prototype.stopStream = function (stream) {
    var self = this;

    if (stream) {
        var idx = this.localStreams.indexOf(stream);
        if (idx > -1) {
            stream.getTracks().forEach(function (track) { track.stop(); });

            //Half-working fix for Firefox, see: https://bugzilla.mozilla.org/show_bug.cgi?id=1208373
            if (shouldWorkAroundFirefoxStopStream()) {
                this._removeStream(stream);
            }
        }
    } else {
        this.localStreams.forEach(function (stream) {
            stream.getTracks().forEach(function (track) { track.stop(); });

            //Half-working fix for Firefox, see: https://bugzilla.mozilla.org/show_bug.cgi?id=1208373
            if (shouldWorkAroundFirefoxStopStream()) {
                self._removeStream(stream);
            }
        });
    }
};

LocalMedia.prototype.startScreenShare = function (constraints, cb) {
    var self = this;

    this.emit('localScreenRequested');

    if (typeof constraints === 'function' && !cb) {
        cb = constraints;
        constraints = null;
    }

    getScreenMedia(constraints, function (err, stream) {
        if (!err) {
            self.localScreens.push(stream);

            stream.getTracks().forEach(function (track) {
                track.addEventListener('ended', function () {
                    var isAllTracksEnded = true;
                    stream.getTracks().forEach(function (t) {
                        isAllTracksEnded = t.readyState === 'ended' && isAllTracksEnded;
                    });

                    if (isAllTracksEnded) {
                        self._removeStream(stream);
                    }
                });
            });

            self.emit('localScreen', stream);
        } else {
            self.emit('localScreenRequestFailed');
        }

        // enable the callback
        if (cb) {
            return cb(err, stream);
        }
    });
};

LocalMedia.prototype.stopScreenShare = function (stream) {
    var self = this;

    if (stream) {
        var idx = this.localScreens.indexOf(stream);
        if (idx > -1) {
            stream.getTracks().forEach(function (track) { track.stop(); });

            //Half-working fix for Firefox, see: https://bugzilla.mozilla.org/show_bug.cgi?id=1208373
            if (shouldWorkAroundFirefoxStopStream()) {
                this._removeStream(stream);
            }
        }
    } else {
        this.localScreens.forEach(function (stream) {
            stream.getTracks().forEach(function (track) { track.stop(); });

            //Half-working fix for Firefox, see: https://bugzilla.mozilla.org/show_bug.cgi?id=1208373
            if (shouldWorkAroundFirefoxStopStream()) {
                self._removeStream(stream);
            }
        });
    }
};

// Audio controls
LocalMedia.prototype.mute = function () {
    this._audioEnabled(false);
    this.emit('audioOff');
};

LocalMedia.prototype.unmute = function () {
    this._audioEnabled(true);
    this.emit('audioOn');
};

// Video controls
LocalMedia.prototype.pauseVideo = function () {
    this._videoEnabled(false);
    this.emit('videoOff');
};
LocalMedia.prototype.resumeVideo = function () {
    this._videoEnabled(true);
    this.emit('videoOn');
};

// Combined controls
LocalMedia.prototype.pause = function () {
    this.mute();
    this.pauseVideo();
};
LocalMedia.prototype.resume = function () {
    this.unmute();
    this.resumeVideo();
};

// Internal methods for enabling/disabling audio/video
LocalMedia.prototype._audioEnabled = function (bool) {
    this.localStreams.forEach(function (stream) {
        stream.getAudioTracks().forEach(function (track) {
            track.enabled = !!bool;
        });
    });
};
LocalMedia.prototype._videoEnabled = function (bool) {
    this.localStreams.forEach(function (stream) {
        stream.getVideoTracks().forEach(function (track) {
            track.enabled = !!bool;
        });
    });
};

// check if all audio streams are enabled
LocalMedia.prototype.isAudioEnabled = function () {
    var enabled = true;
    this.localStreams.forEach(function (stream) {
        stream.getAudioTracks().forEach(function (track) {
            enabled = enabled && track.enabled;
        });
    });
    return enabled;
};

// check if all video streams are enabled
LocalMedia.prototype.isVideoEnabled = function () {
    var enabled = true;
    this.localStreams.forEach(function (stream) {
        stream.getVideoTracks().forEach(function (track) {
            enabled = enabled && track.enabled;
        });
    });
    return enabled;
};

LocalMedia.prototype._removeStream = function (stream) {
    var idx = this.localStreams.indexOf(stream);
    if (idx > -1) {
        this.localStreams.splice(idx, 1);
        this.emit('localStreamStopped', stream);
    } else {
        idx = this.localScreens.indexOf(stream);
        if (idx > -1) {
            this.localScreens.splice(idx, 1);
            this.emit('localScreenStopped', stream);
        }
    }
};

LocalMedia.prototype._setupAudioMonitor = function (stream, harkOptions) {
    this._log('Setup audio');
    var audio = hark(stream, harkOptions);
    var self = this;
    var timeout;

    audio.on('speaking', function () {
        self.emit('speaking');
    });

    audio.on('stopped_speaking', function () {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
            self.emit('stoppedSpeaking');
        }, 1000);
    });
    audio.on('volume_change', function (volume, threshold) {
        self.emit('volumeChange', volume, threshold);
    });

    this._audioMonitors.push({audio: audio, stream: stream});
};

LocalMedia.prototype._stopAudioMonitor = function (stream) {
    var idx = -1;
    this._audioMonitors.forEach(function (monitors, i) {
        if (monitors.stream === stream) {
            idx = i;
        }
    });

    if (idx > -1) {
        this._audioMonitors[idx].audio.stop();
        this._audioMonitors.splice(idx, 1);
    }
};

module.exports = LocalMedia;

},{"getscreenmedia":6,"hark":7,"mockconsole":10,"util":20,"wildemitter":22}],9:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
var methods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",");
var l = methods.length;
var fn = function () {};
var mockconsole = {};

while (l--) {
    mockconsole[methods[l]] = fn;
}

module.exports = mockconsole;

},{}],11:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],12:[function(require,module,exports){
var util = require('util');
var SJJ = require('sdp-jingle-json');
var WildEmitter = require('wildemitter');
var cloneDeep = require('lodash.clonedeep');

function PeerConnection(config, constraints) {
    var self = this;
    var item;
    WildEmitter.call(this);

    config = config || {};
    config.iceServers = config.iceServers || [];

    // make sure this only gets enabled in Google Chrome
    // EXPERIMENTAL FLAG, might get removed without notice
    this.enableChromeNativeSimulcast = false;
    if (constraints && constraints.optional && window.chrome &&
            navigator.appVersion.match(/Chromium\//) === null) {
        constraints.optional.forEach(function (constraint) {
            if (constraint.enableChromeNativeSimulcast) {
                self.enableChromeNativeSimulcast = true;
            }
        });
    }

    // EXPERIMENTAL FLAG, might get removed without notice
    this.enableMultiStreamHacks = false;
    if (constraints && constraints.optional && window.chrome) {
        constraints.optional.forEach(function (constraint) {
            if (constraint.enableMultiStreamHacks) {
                self.enableMultiStreamHacks = true;
            }
        });
    }
    // EXPERIMENTAL FLAG, might get removed without notice
    this.restrictBandwidth = 0;
    if (constraints && constraints.optional) {
        constraints.optional.forEach(function (constraint) {
            if (constraint.andyetRestrictBandwidth) {
                self.restrictBandwidth = constraint.andyetRestrictBandwidth;
            }
        });
    }

    // EXPERIMENTAL FLAG, might get removed without notice
    // bundle up ice candidates, only works for jingle mode
    // number > 0 is the delay to wait for additional candidates
    // ~20ms seems good
    this.batchIceCandidates = 0;
    if (constraints && constraints.optional) {
        constraints.optional.forEach(function (constraint) {
            if (constraint.andyetBatchIce) {
                self.batchIceCandidates = constraint.andyetBatchIce;
            }
        });
    }
    this.batchedIceCandidates = [];

    // EXPERIMENTAL FLAG, might get removed without notice
    // this attemps to strip out candidates with an already known foundation
    // and type -- i.e. those which are gathered via the same TURN server
    // but different transports (TURN udp, tcp and tls respectively)
    if (constraints && constraints.optional && window.chrome) {
        constraints.optional.forEach(function (constraint) {
            if (constraint.andyetFasterICE) {
                self.eliminateDuplicateCandidates = constraint.andyetFasterICE;
            }
        });
    }
    // EXPERIMENTAL FLAG, might get removed without notice
    // when using a server such as the jitsi videobridge we don't need to signal
    // our candidates
    if (constraints && constraints.optional) {
        constraints.optional.forEach(function (constraint) {
            if (constraint.andyetDontSignalCandidates) {
                self.dontSignalCandidates = constraint.andyetDontSignalCandidates;
            }
        });
    }


    // EXPERIMENTAL FLAG, might get removed without notice
    this.assumeSetLocalSuccess = false;
    if (constraints && constraints.optional) {
        constraints.optional.forEach(function (constraint) {
            if (constraint.andyetAssumeSetLocalSuccess) {
                self.assumeSetLocalSuccess = constraint.andyetAssumeSetLocalSuccess;
            }
        });
    }

    // EXPERIMENTAL FLAG, might get removed without notice
    // working around https://bugzilla.mozilla.org/show_bug.cgi?id=1087551
    // pass in a timeout for this
    if (window.navigator.mozGetUserMedia) {
        if (constraints && constraints.optional) {
            this.wtFirefox = 0;
            constraints.optional.forEach(function (constraint) {
                if (constraint.andyetFirefoxMakesMeSad) {
                    self.wtFirefox = constraint.andyetFirefoxMakesMeSad;
                    if (self.wtFirefox > 0) {
                        self.firefoxcandidatebuffer = [];
                    }
                }
            });
        }
    }


    this.pc = new RTCPeerConnection(config, constraints);

    if (typeof this.pc.getLocalStreams === 'function') {
        this.getLocalStreams = this.pc.getLocalStreams.bind(this.pc);
    } else {
        this.getLocalStreams = function () {
            return [];
        };
    }
    
    if (typeof this.pc.getSenders === 'function') {
        this.getSenders = this.pc.getSenders.bind(this.pc);
    } else {
        this.getSenders = function () {
            return [];
        };
    }

    if (typeof this.pc.getRemoteStreams === 'function') {
        this.getRemoteStreams = this.pc.getRemoteStreams.bind(this.pc);
    } else {
        this.getRemoteStreams = function () {
            return [];
        };
    }

    if (typeof this.pc.getReceivers === 'function') {
        this.getReceivers = this.pc.getReceivers.bind(this.pc);
    } else {
        this.getReceivers = function () {
            return [];
        };
    }

    this.addStream = this.pc.addStream.bind(this.pc);

    this.removeStream = function (stream) {
        if (typeof self.pc.removeStream === 'function') {
            self.pc.removeStream.apply(self.pc, arguments);
        } else if (typeof self.pc.removeTrack === 'function') {
            stream.getTracks().forEach(function (track) {
                self.pc.removeTrack(track);
            });
        }
    };

    if (typeof this.pc.removeTrack === 'function') {
        this.removeTrack = this.pc.removeTrack.bind(this.pc);
    }

    // proxy some events directly
    this.pc.onremovestream = this.emit.bind(this, 'removeStream');
    this.pc.onremovetrack = this.emit.bind(this, 'removeTrack');
    this.pc.onaddstream = this.emit.bind(this, 'addStream');
    this.pc.onnegotiationneeded = this.emit.bind(this, 'negotiationNeeded');
    this.pc.oniceconnectionstatechange = this.emit.bind(this, 'iceConnectionStateChange');
    this.pc.onsignalingstatechange = this.emit.bind(this, 'signalingStateChange');

    // handle ice candidate and data channel events
    this.pc.onicecandidate = this._onIce.bind(this);
    this.pc.ondatachannel = this._onDataChannel.bind(this);

    this.localDescription = {
        contents: []
    };
    this.remoteDescription = {
        contents: []
    };

    this.config = {
        debug: false,
        sid: '',
        isInitiator: true,
        sdpSessionID: Date.now(),
        useJingle: false
    };

    this.iceCredentials = {
        local: {},
        remote: {}
    };

    // apply our config
    for (item in config) {
        this.config[item] = config[item];
    }

    if (this.config.debug) {
        this.on('*', function () {
            var logger = config.logger || console;
            logger.log('PeerConnection event:', arguments);
        });
    }
    this.hadLocalStunCandidate = false;
    this.hadRemoteStunCandidate = false;
    this.hadLocalRelayCandidate = false;
    this.hadRemoteRelayCandidate = false;

    this.hadLocalIPv6Candidate = false;
    this.hadRemoteIPv6Candidate = false;

    // keeping references for all our data channels
    // so they dont get garbage collected
    // can be removed once the following bugs have been fixed
    // https://crbug.com/405545
    // https://bugzilla.mozilla.org/show_bug.cgi?id=964092
    // to be filed for opera
    this._remoteDataChannels = [];
    this._localDataChannels = [];

    this._candidateBuffer = [];
}

util.inherits(PeerConnection, WildEmitter);

Object.defineProperty(PeerConnection.prototype, 'signalingState', {
    get: function () {
        return this.pc.signalingState;
    }
});
Object.defineProperty(PeerConnection.prototype, 'iceConnectionState', {
    get: function () {
        return this.pc.iceConnectionState;
    }
});

PeerConnection.prototype._role = function () {
    return this.isInitiator ? 'initiator' : 'responder';
};

// Add a stream to the peer connection object
PeerConnection.prototype.addStream = function (stream) {
    this.localStream = stream;
    this.pc.addStream(stream);
};

// helper function to check if a remote candidate is a stun/relay
// candidate or an ipv6 candidate
PeerConnection.prototype._checkLocalCandidate = function (candidate) {
    var cand = SJJ.toCandidateJSON(candidate);
    if (cand.type == 'srflx') {
        this.hadLocalStunCandidate = true;
    } else if (cand.type == 'relay') {
        this.hadLocalRelayCandidate = true;
    }
    if (cand.ip.indexOf(':') != -1) {
        this.hadLocalIPv6Candidate = true;
    }
};

// helper function to check if a remote candidate is a stun/relay
// candidate or an ipv6 candidate
PeerConnection.prototype._checkRemoteCandidate = function (candidate) {
    var cand = SJJ.toCandidateJSON(candidate);
    if (cand.type == 'srflx') {
        this.hadRemoteStunCandidate = true;
    } else if (cand.type == 'relay') {
        this.hadRemoteRelayCandidate = true;
    }
    if (cand.ip.indexOf(':') != -1) {
        this.hadRemoteIPv6Candidate = true;
    }
};


// Init and add ice candidate object with correct constructor
PeerConnection.prototype.processIce = function (update, cb) {
    cb = cb || function () {};
    var self = this;

    // ignore any added ice candidates to avoid errors. why does the
    // spec not do this?
    if (this.pc.signalingState === 'closed') return cb();

    if (update.contents || (update.jingle && update.jingle.contents)) {
        var contentNames = this.remoteDescription.contents.map(function (c) { return c.name; });
        var contents = update.contents || update.jingle.contents;

        contents.forEach(function (content) {
            var transport = content.transport || {};
            var candidates = transport.candidates || [];
            var mline = contentNames.indexOf(content.name);
            var mid = content.name;
            var remoteContent = self.remoteDescription.contents.find(function (c) {
                return c.name === content.name;
            });

            // process candidates as a callback, in case we need to
            // update ufrag and pwd with offer/answer
            var processCandidates = function () {
                candidates.forEach(
                    function (candidate) {
                    var iceCandidate = SJJ.toCandidateSDP(candidate);
                    self.pc.addIceCandidate(
                        new RTCIceCandidate({
                            candidate: iceCandidate,
                            sdpMLineIndex: mline,
                            sdpMid: mid
                        }), function () {
                            // well, this success callback is pretty meaningless
                        },
                        function (err) {
                            self.emit('error', err);
                        }
                    );
                    self._checkRemoteCandidate(iceCandidate);
                });
                cb();
            };

            if (self.iceCredentials.remote[content.name] && transport.ufrag &&
                self.iceCredentials.remote[content.name].ufrag !== transport.ufrag) {
                if (remoteContent) {
                    remoteContent.transport.ufrag = transport.ufrag;
                    remoteContent.transport.pwd = transport.pwd;
                    var offer = {
                        type: 'offer',
                        jingle: self.remoteDescription
                    };
                    offer.sdp = SJJ.toSessionSDP(offer.jingle, {
                        sid: self.config.sdpSessionID,
                        role: self._role(),
                        direction: 'incoming'
                    });
                    self.pc.setRemoteDescription(new RTCSessionDescription(offer),
                        function () {
                            processCandidates();
                        },
                        function (err) {
                            self.emit('error', err);
                        }
                    );
                } else {
                    self.emit('error', 'ice restart failed to find matching content');
                }
            } else {
                processCandidates();
            }
        });
    } else {
        // working around https://code.google.com/p/webrtc/issues/detail?id=3669
        if (update.candidate && update.candidate.candidate.indexOf('a=') !== 0) {
            update.candidate.candidate = 'a=' + update.candidate.candidate;
        }

        if (this.wtFirefox && this.firefoxcandidatebuffer !== null) {
            // we cant add this yet due to https://bugzilla.mozilla.org/show_bug.cgi?id=1087551
            if (this.pc.localDescription && this.pc.localDescription.type === 'offer') {
                this.firefoxcandidatebuffer.push(update.candidate);
                return cb();
            }
        }

        self.pc.addIceCandidate(
            new RTCIceCandidate(update.candidate),
            function () { },
            function (err) {
                self.emit('error', err);
            }
        );
        self._checkRemoteCandidate(update.candidate.candidate);
        cb();
    }
};

// Generate and emit an offer with the given constraints
PeerConnection.prototype.offer = function (constraints, cb) {
    var self = this;
    var hasConstraints = arguments.length === 2;
    var mediaConstraints = hasConstraints && constraints ? constraints : {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        };
    cb = hasConstraints ? cb : constraints;
    cb = cb || function () {};

    if (this.pc.signalingState === 'closed') return cb('Already closed');

    // Actually generate the offer
    this.pc.createOffer(
        function (offer) {
            // does not work for jingle, but jingle.js doesn't need
            // this hack...
            var expandedOffer = {
                type: 'offer',
                sdp: offer.sdp
            };
            if (self.assumeSetLocalSuccess) {
                self.emit('offer', expandedOffer);
                cb(null, expandedOffer);
            }
            self._candidateBuffer = [];
            self.pc.setLocalDescription(offer,
                function () {
                    var jingle;
                    if (self.config.useJingle) {
                        jingle = SJJ.toSessionJSON(offer.sdp, {
                            role: self._role(),
                            direction: 'outgoing'
                        });
                        jingle.sid = self.config.sid;
                        self.localDescription = jingle;

                        // Save ICE credentials
                        jingle.contents.forEach(function (content) {
                            var transport = content.transport || {};
                            if (transport.ufrag) {
                                self.iceCredentials.local[content.name] = {
                                    ufrag: transport.ufrag,
                                    pwd: transport.pwd
                                };
                            }
                        });

                        expandedOffer.jingle = jingle;
                    }
                    expandedOffer.sdp.split('\r\n').forEach(function (line) {
                        if (line.indexOf('a=candidate:') === 0) {
                            self._checkLocalCandidate(line);
                        }
                    });

                    if (!self.assumeSetLocalSuccess) {
                        self.emit('offer', expandedOffer);
                        cb(null, expandedOffer);
                    }
                },
                function (err) {
                    self.emit('error', err);
                    cb(err);
                }
            );
        },
        function (err) {
            self.emit('error', err);
            cb(err);
        },
        mediaConstraints
    );
};


// Process an incoming offer so that ICE may proceed before deciding
// to answer the request.
PeerConnection.prototype.handleOffer = function (offer, cb) {
    cb = cb || function () {};
    var self = this;
    offer.type = 'offer';
    if (offer.jingle) {
        if (this.enableChromeNativeSimulcast) {
            offer.jingle.contents.forEach(function (content) {
                if (content.name === 'video') {
                    content.application.googConferenceFlag = true;
                }

            });
        }
        if (this.enableMultiStreamHacks) {
            // add a mixed video stream as first stream
            offer.jingle.contents.forEach(function (content) {
                if (content.name === 'video') {
                    var sources = content.application.sources || [];
                    if (sources.length === 0 || sources[0].ssrc !== "3735928559") {
                        sources.unshift({
                            ssrc: "3735928559", // 0xdeadbeef
                            parameters: [
                                {
                                    key: "cname",
                                    value: "deadbeef"
                                },
                                {
                                    key: "msid",
                                    value: "mixyourfecintothis please"
                                }
                            ]
                        });
                        content.application.sources = sources;
                    }
                }
            });
        }
        if (self.restrictBandwidth > 0) {
            if (offer.jingle.contents.length >= 2 && offer.jingle.contents[1].name === 'video') {
                var content = offer.jingle.contents[1];
                var hasBw = content.application && content.application.bandwidth && content.application.bandwidth.bandwidth;
                if (!hasBw) {
                    offer.jingle.contents[1].application.bandwidth = { type: 'AS', bandwidth: self.restrictBandwidth.toString() };
                    offer.sdp = SJJ.toSessionSDP(offer.jingle, {
                        sid: self.config.sdpSessionID,
                        role: self._role(),
                        direction: 'outgoing'
                    });
                }
            }
        }
        // Save ICE credentials
        offer.jingle.contents.forEach(function (content) {
            var transport = content.transport || {};
            if (transport.ufrag) {
                self.iceCredentials.remote[content.name] = {
                    ufrag: transport.ufrag,
                    pwd: transport.pwd
                };
            }
        });
        offer.sdp = SJJ.toSessionSDP(offer.jingle, {
            sid: self.config.sdpSessionID,
            role: self._role(),
            direction: 'incoming'
        });
        self.remoteDescription = offer.jingle;
    }
    offer.sdp.split('\r\n').forEach(function (line) {
        if (line.indexOf('a=candidate:') === 0) {
            self._checkRemoteCandidate(line);
        }
    });
    self.pc.setRemoteDescription(new RTCSessionDescription(offer),
        function () {
            cb();
        },
        cb
    );
};

// Answer an offer with audio only
PeerConnection.prototype.answerAudioOnly = function (cb) {
    var mediaConstraints = {
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: false
            }
        };
    this._answer(mediaConstraints, cb);
};

// Answer an offer without offering to recieve
PeerConnection.prototype.answerBroadcastOnly = function (cb) {
    var mediaConstraints = {
            mandatory: {
                OfferToReceiveAudio: false,
                OfferToReceiveVideo: false
            }
        };
    this._answer(mediaConstraints, cb);
};

// Answer an offer with given constraints default is audio/video
PeerConnection.prototype.answer = function (constraints, cb) {
    var hasConstraints = arguments.length === 2;
    var callback = hasConstraints ? cb : constraints;
    var mediaConstraints = hasConstraints && constraints ? constraints : {
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        };

    this._answer(mediaConstraints, callback);
};

// Process an answer
PeerConnection.prototype.handleAnswer = function (answer, cb) {
    cb = cb || function () {};
    var self = this;
    if (answer.jingle) {
        answer.sdp = SJJ.toSessionSDP(answer.jingle, {
            sid: self.config.sdpSessionID,
            role: self._role(),
            direction: 'incoming'
        });
        self.remoteDescription = answer.jingle;

        // Save ICE credentials
        answer.jingle.contents.forEach(function (content) {
            var transport = content.transport || {};
            if (transport.ufrag) {
                self.iceCredentials.remote[content.name] = {
                    ufrag: transport.ufrag,
                    pwd: transport.pwd
                };
            }
        });
    }
    answer.sdp.split('\r\n').forEach(function (line) {
        if (line.indexOf('a=candidate:') === 0) {
            self._checkRemoteCandidate(line);
        }
    });
    self.pc.setRemoteDescription(
        new RTCSessionDescription(answer),
        function () {
            if (self.wtFirefox) {
                window.setTimeout(function () {
                    self.firefoxcandidatebuffer.forEach(function (candidate) {
                        // add candidates later
                        self.pc.addIceCandidate(
                            new RTCIceCandidate(candidate),
                            function () { },
                            function (err) {
                                self.emit('error', err);
                            }
                        );
                        self._checkRemoteCandidate(candidate.candidate);
                    });
                    self.firefoxcandidatebuffer = null;
                }, self.wtFirefox);
            }
            cb(null);
        },
        cb
    );
};

// Close the peer connection
PeerConnection.prototype.close = function () {
    this.pc.close();

    this._localDataChannels = [];
    this._remoteDataChannels = [];

    this.emit('close');
};

// Internal code sharing for various types of answer methods
PeerConnection.prototype._answer = function (constraints, cb) {
    cb = cb || function () {};
    var self = this;
    if (!this.pc.remoteDescription) {
        // the old API is used, call handleOffer
        throw new Error('remoteDescription not set');
    }

    if (this.pc.signalingState === 'closed') return cb('Already closed');

    self.pc.createAnswer(
        function (answer) {
            var sim = [];
            if (self.enableChromeNativeSimulcast) {
                // native simulcast part 1: add another SSRC
                answer.jingle = SJJ.toSessionJSON(answer.sdp, {
                    role: self._role(),
                    direction: 'outgoing'
                });
                if (answer.jingle.contents.length >= 2 && answer.jingle.contents[1].name === 'video') {
                    var groups = answer.jingle.contents[1].application.sourceGroups || [];
                    var hasSim = false;
                    groups.forEach(function (group) {
                        if (group.semantics == 'SIM') hasSim = true;
                    });
                    if (!hasSim &&
                        answer.jingle.contents[1].application.sources.length) {
                        var newssrc = JSON.parse(JSON.stringify(answer.jingle.contents[1].application.sources[0]));
                        newssrc.ssrc = '' + Math.floor(Math.random() * 0xffffffff); // FIXME: look for conflicts
                        answer.jingle.contents[1].application.sources.push(newssrc);

                        sim.push(answer.jingle.contents[1].application.sources[0].ssrc);
                        sim.push(newssrc.ssrc);
                        groups.push({
                            semantics: 'SIM',
                            sources: sim
                        });

                        // also create an RTX one for the SIM one
                        var rtxssrc = JSON.parse(JSON.stringify(newssrc));
                        rtxssrc.ssrc = '' + Math.floor(Math.random() * 0xffffffff); // FIXME: look for conflicts
                        answer.jingle.contents[1].application.sources.push(rtxssrc);
                        groups.push({
                            semantics: 'FID',
                            sources: [newssrc.ssrc, rtxssrc.ssrc]
                        });

                        answer.jingle.contents[1].application.sourceGroups = groups;
                        answer.sdp = SJJ.toSessionSDP(answer.jingle, {
                            sid: self.config.sdpSessionID,
                            role: self._role(),
                            direction: 'outgoing'
                        });
                    }
                }
            }
            var expandedAnswer = {
                type: 'answer',
                sdp: answer.sdp
            };
            if (self.assumeSetLocalSuccess) {
                // not safe to do when doing simulcast mangling
                var copy = cloneDeep(expandedAnswer);
                self.emit('answer', copy);
                cb(null, copy);
            }
            self._candidateBuffer = [];
            self.pc.setLocalDescription(answer,
                function () {
                    if (self.config.useJingle) {
                        var jingle = SJJ.toSessionJSON(answer.sdp, {
                            role: self._role(),
                            direction: 'outgoing'
                        });
                        jingle.sid = self.config.sid;
                        self.localDescription = jingle;
                        expandedAnswer.jingle = jingle;
                    }
                    if (self.enableChromeNativeSimulcast) {
                        // native simulcast part 2:
                        // signal multiple tracks to the receiver
                        // for anything in the SIM group
                        if (!expandedAnswer.jingle) {
                            expandedAnswer.jingle = SJJ.toSessionJSON(answer.sdp, {
                                role: self._role(),
                                direction: 'outgoing'
                            });
                        }
                        expandedAnswer.jingle.contents[1].application.sources.forEach(function (source, idx) {
                            // the floor idx/2 is a hack that relies on a particular order
                            // of groups, alternating between sim and rtx
                            source.parameters = source.parameters.map(function (parameter) {
                                if (parameter.key === 'msid') {
                                    parameter.value += '-' + Math.floor(idx / 2);
                                }
                                return parameter;
                            });
                        });
                        expandedAnswer.sdp = SJJ.toSessionSDP(expandedAnswer.jingle, {
                            sid: self.sdpSessionID,
                            role: self._role(),
                            direction: 'outgoing'
                        });
                    }
                    expandedAnswer.sdp.split('\r\n').forEach(function (line) {
                        if (line.indexOf('a=candidate:') === 0) {
                            self._checkLocalCandidate(line);
                        }
                    });
                    if (!self.assumeSetLocalSuccess) {
                        var copy = cloneDeep(expandedAnswer);
                        self.emit('answer', copy);
                        cb(null, copy);
                    }
                },
                function (err) {
                    self.emit('error', err);
                    cb(err);
                }
            );
        },
        function (err) {
            self.emit('error', err);
            cb(err);
        },
        constraints
    );
};

// Internal method for emitting ice candidates on our peer object
PeerConnection.prototype._onIce = function (event) {
    var self = this;
    if (event.candidate) {
        if (this.dontSignalCandidates) return;
        var ice = event.candidate;

        var expandedCandidate = {
            candidate: {
                candidate: ice.candidate,
                sdpMid: ice.sdpMid,
                sdpMLineIndex: ice.sdpMLineIndex
            }
        };
        this._checkLocalCandidate(ice.candidate);

        var cand = SJJ.toCandidateJSON(ice.candidate);

        var already;
        var idx;
        if (this.eliminateDuplicateCandidates && cand.type === 'relay') {
            // drop candidates with same foundation, component
            // take local type pref into account so we don't ignore udp
            // ones when we know about a TCP one. unlikely but...
            already = this._candidateBuffer.filter(
                function (c) {
                    return c.type === 'relay';
                }).map(function (c) {
                    return c.foundation + ':' + c.component;
                }
            );
            idx = already.indexOf(cand.foundation + ':' + cand.component);
            // remember: local type pref of udp is 0, tcp 1, tls 2
            if (idx > -1 && ((cand.priority >> 24) >= (already[idx].priority >> 24))) {
                // drop it, same foundation with higher (worse) type pref
                return;
            }
        }
        if (this.config.bundlePolicy === 'max-bundle') {
            // drop candidates which are duplicate for audio/video/data
            // duplicate means same host/port but different sdpMid
            already = this._candidateBuffer.filter(
                function (c) {
                    return cand.type === c.type;
                }).map(function (cand) {
                    return cand.address + ':' + cand.port;
                }
            );
            idx = already.indexOf(cand.address + ':' + cand.port);
            if (idx > -1) return;
        }
        // also drop rtcp candidates since we know the peer supports RTCP-MUX
        // this is a workaround until browsers implement this natively
        if (this.config.rtcpMuxPolicy === 'require' && cand.component === '2') {
            return;
        }
        this._candidateBuffer.push(cand);

        if (self.config.useJingle) {
            if (!ice.sdpMid) { // firefox doesn't set this
                if (self.pc.remoteDescription && self.pc.remoteDescription.type === 'offer') {
                    // preserve name from remote
                    ice.sdpMid = self.remoteDescription.contents[ice.sdpMLineIndex].name;
                } else {
                    ice.sdpMid = self.localDescription.contents[ice.sdpMLineIndex].name;
                }
            }
            if (!self.iceCredentials.local[ice.sdpMid]) {
                var jingle = SJJ.toSessionJSON(self.pc.localDescription.sdp, {
                    role: self._role(),
                    direction: 'outgoing'
                });
                jingle.contents.forEach(function (content) {
                    var transport = content.transport || {};
                    if (transport.ufrag) {
                        self.iceCredentials.local[content.name] = {
                            ufrag: transport.ufrag,
                            pwd: transport.pwd
                        };
                    }
                });
            }
            expandedCandidate.jingle = {
                contents: [{
                    name: ice.sdpMid,
                    creator: self._role(),
                    transport: {
                        transportType: 'iceUdp',
                        ufrag: self.iceCredentials.local[ice.sdpMid].ufrag,
                        pwd: self.iceCredentials.local[ice.sdpMid].pwd,
                        candidates: [
                            cand
                        ]
                    }
                }]
            };
            if (self.batchIceCandidates > 0) {
                if (self.batchedIceCandidates.length === 0) {
                    window.setTimeout(function () {
                        var contents = {};
                        self.batchedIceCandidates.forEach(function (content) {
                            content = content.contents[0];
                            if (!contents[content.name]) contents[content.name] = content;
                            contents[content.name].transport.candidates.push(content.transport.candidates[0]);
                        });
                        var newCand = {
                            jingle: {
                                contents: []
                            }
                        };
                        Object.keys(contents).forEach(function (name) {
                            newCand.jingle.contents.push(contents[name]);
                        });
                        self.batchedIceCandidates = [];
                        self.emit('ice', newCand);
                    }, self.batchIceCandidates);
                }
                self.batchedIceCandidates.push(expandedCandidate.jingle);
                return;
            }

        }
        this.emit('ice', expandedCandidate);
    } else {
        this.emit('endOfCandidates');
    }
};

// Internal method for processing a new data channel being added by the
// other peer.
PeerConnection.prototype._onDataChannel = function (event) {
    // make sure we keep a reference so this doesn't get garbage collected
    var channel = event.channel;
    this._remoteDataChannels.push(channel);

    this.emit('addChannel', channel);
};

// Create a data channel spec reference:
// http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCDataChannelInit
PeerConnection.prototype.createDataChannel = function (name, opts) {
    var channel = this.pc.createDataChannel(name, opts);

    // make sure we keep a reference so this doesn't get garbage collected
    this._localDataChannels.push(channel);

    return channel;
};

PeerConnection.prototype.getStats = function () {
    if (typeof arguments[0] === 'function') {
        var cb = arguments[0];
        this.pc.getStats().then(function (res) {
            cb(null, res);
        }, function (err) {
            cb(err);
        });
    } else {
        return this.pc.getStats.apply(this.pc, arguments);
    }
};

module.exports = PeerConnection;

},{"lodash.clonedeep":9,"sdp-jingle-json":13,"util":20,"wildemitter":22}],13:[function(require,module,exports){
var toSDP = require('./lib/tosdp');
var toJSON = require('./lib/tojson');


// Converstion from JSON to SDP

exports.toIncomingSDPOffer = function (session) {
    return toSDP.toSessionSDP(session, {
        role: 'responder',
        direction: 'incoming'
    });
};
exports.toOutgoingSDPOffer = function (session) {
    return toSDP.toSessionSDP(session, {
        role: 'initiator',
        direction: 'outgoing'
    });
};
exports.toIncomingSDPAnswer = function (session) {
    return toSDP.toSessionSDP(session, {
        role: 'initiator',
        direction: 'incoming'
    });
};
exports.toOutgoingSDPAnswer = function (session) {
    return toSDP.toSessionSDP(session, {
        role: 'responder',
        direction: 'outgoing'
    });
};
exports.toIncomingMediaSDPOffer = function (media) {
    return toSDP.toMediaSDP(media, {
        role: 'responder',
        direction: 'incoming'
    });
};
exports.toOutgoingMediaSDPOffer = function (media) {
    return toSDP.toMediaSDP(media, {
        role: 'initiator',
        direction: 'outgoing'
    });
};
exports.toIncomingMediaSDPAnswer = function (media) {
    return toSDP.toMediaSDP(media, {
        role: 'initiator',
        direction: 'incoming'
    });
};
exports.toOutgoingMediaSDPAnswer = function (media) {
    return toSDP.toMediaSDP(media, {
        role: 'responder',
        direction: 'outgoing'
    });
};
exports.toCandidateSDP = toSDP.toCandidateSDP;
exports.toMediaSDP = toSDP.toMediaSDP;
exports.toSessionSDP = toSDP.toSessionSDP;


// Conversion from SDP to JSON

exports.toIncomingJSONOffer = function (sdp, creators) {
    return toJSON.toSessionJSON(sdp, {
        role: 'responder',
        direction: 'incoming',
        creators: creators
    });
};
exports.toOutgoingJSONOffer = function (sdp, creators) {
    return toJSON.toSessionJSON(sdp, {
        role: 'initiator',
        direction: 'outgoing',
        creators: creators
    });
};
exports.toIncomingJSONAnswer = function (sdp, creators) {
    return toJSON.toSessionJSON(sdp, {
        role: 'initiator',
        direction: 'incoming',
        creators: creators
    });
};
exports.toOutgoingJSONAnswer = function (sdp, creators) {
    return toJSON.toSessionJSON(sdp, {
        role: 'responder',
        direction: 'outgoing',
        creators: creators
    });
};
exports.toIncomingMediaJSONOffer = function (sdp, creator) {
    return toJSON.toMediaJSON(sdp, {
        role: 'responder',
        direction: 'incoming',
        creator: creator
    });
};
exports.toOutgoingMediaJSONOffer = function (sdp, creator) {
    return toJSON.toMediaJSON(sdp, {
        role: 'initiator',
        direction: 'outgoing',
        creator: creator
    });
};
exports.toIncomingMediaJSONAnswer = function (sdp, creator) {
    return toJSON.toMediaJSON(sdp, {
        role: 'initiator',
        direction: 'incoming',
        creator: creator
    });
};
exports.toOutgoingMediaJSONAnswer = function (sdp, creator) {
    return toJSON.toMediaJSON(sdp, {
        role: 'responder',
        direction: 'outgoing',
        creator: creator
    });
};
exports.toCandidateJSON = toJSON.toCandidateJSON;
exports.toMediaJSON = toJSON.toMediaJSON;
exports.toSessionJSON = toJSON.toSessionJSON;

},{"./lib/tojson":16,"./lib/tosdp":17}],14:[function(require,module,exports){
exports.lines = function (sdp) {
    return sdp.split('\r\n').filter(function (line) {
        return line.length > 0;
    });
};

exports.findLine = function (prefix, mediaLines, sessionLines) {
    var prefixLength = prefix.length;
    for (var i = 0; i < mediaLines.length; i++) {
        if (mediaLines[i].substr(0, prefixLength) === prefix) {
            return mediaLines[i];
        }
    }
    // Continue searching in parent session section
    if (!sessionLines) {
        return false;
    }

    for (var j = 0; j < sessionLines.length; j++) {
        if (sessionLines[j].substr(0, prefixLength) === prefix) {
            return sessionLines[j];
        }
    }

    return false;
};

exports.findLines = function (prefix, mediaLines, sessionLines) {
    var results = [];
    var prefixLength = prefix.length;
    for (var i = 0; i < mediaLines.length; i++) {
        if (mediaLines[i].substr(0, prefixLength) === prefix) {
            results.push(mediaLines[i]);
        }
    }
    if (results.length || !sessionLines) {
        return results;
    }
    for (var j = 0; j < sessionLines.length; j++) {
        if (sessionLines[j].substr(0, prefixLength) === prefix) {
            results.push(sessionLines[j]);
        }
    }
    return results;
};

exports.mline = function (line) {
    var parts = line.substr(2).split(' ');
    var parsed = {
        media: parts[0],
        port: parts[1],
        proto: parts[2],
        formats: []
    };
    for (var i = 3; i < parts.length; i++) {
        if (parts[i]) {
            parsed.formats.push(parts[i]);
        }
    }
    return parsed;
};

exports.rtpmap = function (line) {
    var parts = line.substr(9).split(' ');
    var parsed = {
        id: parts.shift()
    };

    parts = parts[0].split('/');

    parsed.name = parts[0];
    parsed.clockrate = parts[1];
    parsed.channels = parts.length == 3 ? parts[2] : '1';
    return parsed;
};

exports.sctpmap = function (line) {
    // based on -05 draft
    var parts = line.substr(10).split(' ');
    var parsed = {
        number: parts.shift(),
        protocol: parts.shift(),
        streams: parts.shift()
    };
    return parsed;
};


exports.fmtp = function (line) {
    var kv, key, value;
    var parts = line.substr(line.indexOf(' ') + 1).split(';');
    var parsed = [];
    for (var i = 0; i < parts.length; i++) {
        kv = parts[i].split('=');
        key = kv[0].trim();
        value = kv[1];
        if (key && value) {
            parsed.push({key: key, value: value});
        } else if (key) {
            parsed.push({key: '', value: key});
        }
    }
    return parsed;
};

exports.crypto = function (line) {
    var parts = line.substr(9).split(' ');
    var parsed = {
        tag: parts[0],
        cipherSuite: parts[1],
        keyParams: parts[2],
        sessionParams: parts.slice(3).join(' ')
    };
    return parsed;
};

exports.fingerprint = function (line) {
    var parts = line.substr(14).split(' ');
    return {
        hash: parts[0],
        value: parts[1]
    };
};

exports.extmap = function (line) {
    var parts = line.substr(9).split(' ');
    var parsed = {};

    var idpart = parts.shift();
    var sp = idpart.indexOf('/');
    if (sp >= 0) {
        parsed.id = idpart.substr(0, sp);
        parsed.senders = idpart.substr(sp + 1);
    } else {
        parsed.id = idpart;
        parsed.senders = 'sendrecv';
    }

    parsed.uri = parts.shift() || '';

    return parsed;
};

exports.rtcpfb = function (line) {
    var parts = line.substr(10).split(' ');
    var parsed = {};
    parsed.id = parts.shift();
    parsed.type = parts.shift();
    if (parsed.type === 'trr-int') {
        parsed.value = parts.shift();
    } else {
        parsed.subtype = parts.shift() || '';
    }
    parsed.parameters = parts;
    return parsed;
};

exports.candidate = function (line) {
    var parts;
    if (line.indexOf('a=candidate:') === 0) {
        parts = line.substring(12).split(' ');
    } else { // no a=candidate
        parts = line.substring(10).split(' ');
    }

    var candidate = {
        foundation: parts[0],
        component: parts[1],
        protocol: parts[2].toLowerCase(),
        priority: parts[3],
        ip: parts[4],
        port: parts[5],
        // skip parts[6] == 'typ'
        type: parts[7],
        generation: '0'
    };

    for (var i = 8; i < parts.length; i += 2) {
        if (parts[i] === 'raddr') {
            candidate.relAddr = parts[i + 1];
        } else if (parts[i] === 'rport') {
            candidate.relPort = parts[i + 1];
        } else if (parts[i] === 'generation') {
            candidate.generation = parts[i + 1];
        } else if (parts[i] === 'tcptype') {
            candidate.tcpType = parts[i + 1];
        }
    }

    candidate.network = '1';

    return candidate;
};

exports.sourceGroups = function (lines) {
    var parsed = [];
    for (var i = 0; i < lines.length; i++) {
        var parts = lines[i].substr(13).split(' ');
        parsed.push({
            semantics: parts.shift(),
            sources: parts
        });
    }
    return parsed;
};

exports.sources = function (lines) {
    // http://tools.ietf.org/html/rfc5576
    var parsed = [];
    var sources = {};
    for (var i = 0; i < lines.length; i++) {
        var parts = lines[i].substr(7).split(' ');
        var ssrc = parts.shift();

        if (!sources[ssrc]) {
            var source = {
                ssrc: ssrc,
                parameters: []
            };
            parsed.push(source);

            // Keep an index
            sources[ssrc] = source;
        }

        parts = parts.join(' ').split(':');
        var attribute = parts.shift();
        var value = parts.join(':') || null;

        sources[ssrc].parameters.push({
            key: attribute,
            value: value
        });
    }

    return parsed;
};

exports.groups = function (lines) {
    // http://tools.ietf.org/html/rfc5888
    var parsed = [];
    var parts;
    for (var i = 0; i < lines.length; i++) {
        parts = lines[i].substr(8).split(' ');
        parsed.push({
            semantics: parts.shift(),
            contents: parts
        });
    }
    return parsed;
};

exports.bandwidth = function (line) {
    var parts = line.substr(2).split(':');
    var parsed = {};
    parsed.type = parts.shift();
    parsed.bandwidth = parts.shift();
    return parsed;
};

exports.msid = function (line) {
    var data = line.substr(7);
    var parts = data.split(' ');
    return {
        msid: data,
        mslabel: parts[0],
        label: parts[1]
    };
};

},{}],15:[function(require,module,exports){
module.exports = {
    initiator: {
        incoming: {
            initiator: 'recvonly',
            responder: 'sendonly',
            both: 'sendrecv',
            none: 'inactive',
            recvonly: 'initiator',
            sendonly: 'responder',
            sendrecv: 'both',
            inactive: 'none'
        },
        outgoing: {
            initiator: 'sendonly',
            responder: 'recvonly',
            both: 'sendrecv',
            none: 'inactive',
            recvonly: 'responder',
            sendonly: 'initiator',
            sendrecv: 'both',
            inactive: 'none'
        }
    },
    responder: {
        incoming: {
            initiator: 'sendonly',
            responder: 'recvonly',
            both: 'sendrecv',
            none: 'inactive',
            recvonly: 'responder',
            sendonly: 'initiator',
            sendrecv: 'both',
            inactive: 'none'
        },
        outgoing: {
            initiator: 'recvonly',
            responder: 'sendonly',
            both: 'sendrecv',
            none: 'inactive',
            recvonly: 'initiator',
            sendonly: 'responder',
            sendrecv: 'both',
            inactive: 'none'
        }
    }
};

},{}],16:[function(require,module,exports){
var SENDERS = require('./senders');
var parsers = require('./parsers');
var idCounter = Math.random();


exports._setIdCounter = function (counter) {
    idCounter = counter;
};

exports.toSessionJSON = function (sdp, opts) {
    var i;
    var creators = opts.creators || [];
    var role = opts.role || 'initiator';
    var direction = opts.direction || 'outgoing';


    // Divide the SDP into session and media sections.
    var media = sdp.split(/\r?\nm=/);
    for (i = 1; i < media.length; i++) {
        media[i] = 'm=' + media[i];
        if (i !== media.length - 1) {
            media[i] += '\r\n';
        }
    }
    var session = media.shift() + '\r\n';
    var sessionLines = parsers.lines(session);
    var parsed = {};

    var contents = [];
    for (i = 0; i < media.length; i++) {
        contents.push(exports.toMediaJSON(media[i], session, {
            role: role,
            direction: direction,
            creator: creators[i] || 'initiator'
        }));
    }
    parsed.contents = contents;

    var groupLines = parsers.findLines('a=group:', sessionLines);
    if (groupLines.length) {
        parsed.groups = parsers.groups(groupLines);
    }

    return parsed;
};

exports.toMediaJSON = function (media, session, opts) {
    var creator = opts.creator || 'initiator';
    var role = opts.role || 'initiator';
    var direction = opts.direction || 'outgoing';

    var lines = parsers.lines(media);
    var sessionLines = parsers.lines(session);
    var mline = parsers.mline(lines[0]);

    var content = {
        creator: creator,
        name: mline.media,
        application: {
            applicationType: 'rtp',
            media: mline.media,
            payloads: [],
            encryption: [],
            feedback: [],
            headerExtensions: []
        },
        transport: {
            transportType: 'iceUdp',
            candidates: [],
            fingerprints: []
        }
    };
    if (mline.media == 'application') {
        // FIXME: the description is most likely to be independent
        // of the SDP and should be processed by other parts of the library
        content.application = {
            applicationType: 'datachannel'
        };
        content.transport.sctp = [];
    }
    var desc = content.application;
    var trans = content.transport;

    // If we have a mid, use that for the content name instead.
    var mid = parsers.findLine('a=mid:', lines);
    if (mid) {
        content.name = mid.substr(6);
    }

    if (parsers.findLine('a=sendrecv', lines, sessionLines)) {
        content.senders = 'both';
    } else if (parsers.findLine('a=sendonly', lines, sessionLines)) {
        content.senders = SENDERS[role][direction].sendonly;
    } else if (parsers.findLine('a=recvonly', lines, sessionLines)) {
        content.senders = SENDERS[role][direction].recvonly;
    } else if (parsers.findLine('a=inactive', lines, sessionLines)) {
        content.senders = 'none';
    }

    if (desc.applicationType == 'rtp') {
        var bandwidth = parsers.findLine('b=', lines);
        if (bandwidth) {
            desc.bandwidth = parsers.bandwidth(bandwidth);
        }

        var ssrc = parsers.findLine('a=ssrc:', lines);
        if (ssrc) {
            desc.ssrc = ssrc.substr(7).split(' ')[0];
        }

        var rtpmapLines = parsers.findLines('a=rtpmap:', lines);
        rtpmapLines.forEach(function (line) {
            var payload = parsers.rtpmap(line);
            payload.parameters = [];
            payload.feedback = [];

            var fmtpLines = parsers.findLines('a=fmtp:' + payload.id, lines);
            // There should only be one fmtp line per payload
            fmtpLines.forEach(function (line) {
                payload.parameters = parsers.fmtp(line);
            });

            var fbLines = parsers.findLines('a=rtcp-fb:' + payload.id, lines);
            fbLines.forEach(function (line) {
                payload.feedback.push(parsers.rtcpfb(line));
            });

            desc.payloads.push(payload);
        });

        var cryptoLines = parsers.findLines('a=crypto:', lines, sessionLines);
        cryptoLines.forEach(function (line) {
            desc.encryption.push(parsers.crypto(line));
        });

        if (parsers.findLine('a=rtcp-mux', lines)) {
            desc.mux = true;
        }

        var fbLines = parsers.findLines('a=rtcp-fb:*', lines);
        fbLines.forEach(function (line) {
            desc.feedback.push(parsers.rtcpfb(line));
        });

        var extLines = parsers.findLines('a=extmap:', lines);
        extLines.forEach(function (line) {
            var ext = parsers.extmap(line);

            ext.senders = SENDERS[role][direction][ext.senders];

            desc.headerExtensions.push(ext);
        });

        var ssrcGroupLines = parsers.findLines('a=ssrc-group:', lines);
        desc.sourceGroups = parsers.sourceGroups(ssrcGroupLines || []);

        var ssrcLines = parsers.findLines('a=ssrc:', lines);
        var sources = desc.sources = parsers.sources(ssrcLines || []);

        var msidLine = parsers.findLine('a=msid:', lines);
        if (msidLine) {
            var msid = parsers.msid(msidLine);
            ['msid', 'mslabel', 'label'].forEach(function (key) {
                for (var i = 0; i < sources.length; i++) {
                    var found = false;
                    for (var j = 0; j < sources[i].parameters.length; j++) {
                        if (sources[i].parameters[j].key === key) {
                            found = true;
                        }
                    }
                    if (!found) {
                        sources[i].parameters.push({ key: key, value: msid[key] });
                    }
                }
            });
        }

        if (parsers.findLine('a=x-google-flag:conference', lines, sessionLines)) {
            desc.googConferenceFlag = true;
        }
    }

    // transport specific attributes
    var fingerprintLines = parsers.findLines('a=fingerprint:', lines, sessionLines);
    var setup = parsers.findLine('a=setup:', lines, sessionLines);
    fingerprintLines.forEach(function (line) {
        var fp = parsers.fingerprint(line);
        if (setup) {
            fp.setup = setup.substr(8);
        }
        trans.fingerprints.push(fp);
    });

    var ufragLine = parsers.findLine('a=ice-ufrag:', lines, sessionLines);
    var pwdLine = parsers.findLine('a=ice-pwd:', lines, sessionLines);
    if (ufragLine && pwdLine) {
        trans.ufrag = ufragLine.substr(12);
        trans.pwd = pwdLine.substr(10);
        trans.candidates = [];

        var candidateLines = parsers.findLines('a=candidate:', lines, sessionLines);
        candidateLines.forEach(function (line) {
            trans.candidates.push(exports.toCandidateJSON(line));
        });
    }

    if (desc.applicationType == 'datachannel') {
        var sctpmapLines = parsers.findLines('a=sctpmap:', lines);
        sctpmapLines.forEach(function (line) {
            var sctp = parsers.sctpmap(line);
            trans.sctp.push(sctp);
        });
    }

    return content;
};

exports.toCandidateJSON = function (line) {
    var candidate = parsers.candidate(line.split(/\r?\n/)[0]);
    candidate.id = (idCounter++).toString(36).substr(0, 12);
    return candidate;
};

},{"./parsers":14,"./senders":15}],17:[function(require,module,exports){
var SENDERS = require('./senders');


exports.toSessionSDP = function (session, opts) {
    var role = opts.role || 'initiator';
    var direction = opts.direction || 'outgoing';
    var sid = opts.sid || session.sid || Date.now();
    var time = opts.time || Date.now();

    var sdp = [
        'v=0',
        'o=- ' + sid + ' ' + time + ' IN IP4 0.0.0.0',
        's=-',
        't=0 0'
    ];

    var contents = session.contents || [];
    var hasSources = false;
    contents.forEach(function (content) {
        if (content.application.sources &&
            content.application.sources.length) {
            hasSources = true;
        }
    });

    if (hasSources) {
        sdp.push('a=msid-semantic: WMS *');
    }

    var groups = session.groups || [];
    groups.forEach(function (group) {
        sdp.push('a=group:' + group.semantics + ' ' + group.contents.join(' '));
    });


    contents.forEach(function (content) {
        sdp.push(exports.toMediaSDP(content, opts));
    });

    return sdp.join('\r\n') + '\r\n';
};

exports.toMediaSDP = function (content, opts) {
    var sdp = [];

    var role = opts.role || 'initiator';
    var direction = opts.direction || 'outgoing';

    var desc = content.application;
    var transport = content.transport;
    var payloads = desc.payloads || [];
    var fingerprints = (transport && transport.fingerprints) || [];

    var mline = [];
    if (desc.applicationType == 'datachannel') {
        mline.push('application');
        mline.push('1');
        mline.push('DTLS/SCTP');
        if (transport.sctp) {
            transport.sctp.forEach(function (map) {
                mline.push(map.number);
            });
        }
    } else {
        mline.push(desc.media);
        mline.push('1');
        if (fingerprints.length > 0) {
            mline.push('UDP/TLS/RTP/SAVPF');
        } else if (desc.encryption && desc.encryption.length > 0) {
            mline.push('RTP/SAVPF');
        } else {
            mline.push('RTP/AVPF');
        }
        payloads.forEach(function (payload) {
            mline.push(payload.id);
        });
    }


    sdp.push('m=' + mline.join(' '));

    sdp.push('c=IN IP4 0.0.0.0');
    if (desc.bandwidth && desc.bandwidth.type && desc.bandwidth.bandwidth) {
        sdp.push('b=' + desc.bandwidth.type + ':' + desc.bandwidth.bandwidth);
    }
    if (desc.applicationType == 'rtp') {
        sdp.push('a=rtcp:1 IN IP4 0.0.0.0');
    }

    if (transport) {
        if (transport.ufrag) {
            sdp.push('a=ice-ufrag:' + transport.ufrag);
        }
        if (transport.pwd) {
            sdp.push('a=ice-pwd:' + transport.pwd);
        }

        var pushedSetup = false;
        fingerprints.forEach(function (fingerprint) {
            sdp.push('a=fingerprint:' + fingerprint.hash + ' ' + fingerprint.value);
            if (fingerprint.setup && !pushedSetup) {
                sdp.push('a=setup:' + fingerprint.setup);
            }
        });

        if (transport.sctp) {
            transport.sctp.forEach(function (map) {
                sdp.push('a=sctpmap:' + map.number + ' ' + map.protocol + ' ' + map.streams);
            });
        }
    }

    if (desc.applicationType == 'rtp') {
        sdp.push('a=' + (SENDERS[role][direction][content.senders] || 'sendrecv'));
    }
    sdp.push('a=mid:' + content.name);

    if (desc.sources && desc.sources.length) {
        (desc.sources[0].parameters || []).forEach(function (param) {
            if (param.key === 'msid') {
                sdp.push('a=msid:' + param.value);
            }
        });
    }

    if (desc.mux) {
        sdp.push('a=rtcp-mux');
    }

    var encryption = desc.encryption || [];
    encryption.forEach(function (crypto) {
        sdp.push('a=crypto:' + crypto.tag + ' ' + crypto.cipherSuite + ' ' + crypto.keyParams + (crypto.sessionParams ? ' ' + crypto.sessionParams : ''));
    });
    if (desc.googConferenceFlag) {
        sdp.push('a=x-google-flag:conference');
    }

    payloads.forEach(function (payload) {
        var rtpmap = 'a=rtpmap:' + payload.id + ' ' + payload.name + '/' + payload.clockrate;
        if (payload.channels && payload.channels != '1') {
            rtpmap += '/' + payload.channels;
        }
        sdp.push(rtpmap);

        if (payload.parameters && payload.parameters.length) {
            var fmtp = ['a=fmtp:' + payload.id];
            var parameters = [];
            payload.parameters.forEach(function (param) {
                parameters.push((param.key ? param.key + '=' : '') + param.value);
            });
            fmtp.push(parameters.join(';'));
            sdp.push(fmtp.join(' '));
        }

        if (payload.feedback) {
            payload.feedback.forEach(function (fb) {
                if (fb.type === 'trr-int') {
                    sdp.push('a=rtcp-fb:' + payload.id + ' trr-int ' + (fb.value ? fb.value : '0'));
                } else {
                    sdp.push('a=rtcp-fb:' + payload.id + ' ' + fb.type + (fb.subtype ? ' ' + fb.subtype : ''));
                }
            });
        }
    });

    if (desc.feedback) {
        desc.feedback.forEach(function (fb) {
            if (fb.type === 'trr-int') {
                sdp.push('a=rtcp-fb:* trr-int ' + (fb.value ? fb.value : '0'));
            } else {
                sdp.push('a=rtcp-fb:* ' + fb.type + (fb.subtype ? ' ' + fb.subtype : ''));
            }
        });
    }

    var hdrExts = desc.headerExtensions || [];
    hdrExts.forEach(function (hdr) {
        sdp.push('a=extmap:' + hdr.id + (hdr.senders ? '/' + SENDERS[role][direction][hdr.senders] : '') + ' ' + hdr.uri);
    });

    var ssrcGroups = desc.sourceGroups || [];
    ssrcGroups.forEach(function (ssrcGroup) {
        sdp.push('a=ssrc-group:' + ssrcGroup.semantics + ' ' + ssrcGroup.sources.join(' '));
    });

    var ssrcs = desc.sources || [];
    ssrcs.forEach(function (ssrc) {
        for (var i = 0; i < ssrc.parameters.length; i++) {
            var param = ssrc.parameters[i];
            sdp.push('a=ssrc:' + (ssrc.ssrc || desc.ssrc) + ' ' + param.key + (param.value ? (':' + param.value) : ''));
        }
    });

    var candidates = transport.candidates || [];
    candidates.forEach(function (candidate) {
        sdp.push(exports.toCandidateSDP(candidate));
    });

    return sdp.join('\r\n');
};

exports.toCandidateSDP = function (candidate) {
    var sdp = [];

    sdp.push(candidate.foundation);
    sdp.push(candidate.component);
    sdp.push(candidate.protocol.toUpperCase());
    sdp.push(candidate.priority);
    sdp.push(candidate.ip);
    sdp.push(candidate.port);

    var type = candidate.type;
    sdp.push('typ');
    sdp.push(type);
    if (type === 'srflx' || type === 'prflx' || type === 'relay') {
        if (candidate.relAddr && candidate.relPort) {
            sdp.push('raddr');
            sdp.push(candidate.relAddr);
            sdp.push('rport');
            sdp.push(candidate.relPort);
        }
    }
    if (candidate.tcpType && candidate.protocol.toUpperCase() == 'TCP') {
        sdp.push('tcptype');
        sdp.push(candidate.tcpType);
    }

    sdp.push('generation');
    sdp.push(candidate.generation || '0');

    // FIXME: apparently this is wrong per spec
    // but then, we need this when actually putting this into
    // SDP so it's going to stay.
    // decision needs to be revisited when browsers dont
    // accept this any longer
    return 'a=candidate:' + sdp.join(' ');
};

},{"./senders":15}],18:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],19:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],20:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":19,"_process":11,"inherits":18}],21:[function(require,module,exports){
// created by @HenrikJoreteg
var prefix;
var version;

if (window.mozRTCPeerConnection || navigator.mozGetUserMedia) {
    prefix = 'moz';
    version = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
} else if (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) {
    prefix = 'webkit';
    version = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
}

var PC = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
var MediaStream = window.webkitMediaStream || window.MediaStream;
var screenSharing = window.location.protocol === 'https:' &&
    ((prefix === 'webkit' && version >= 26) ||
     (prefix === 'moz' && version >= 33))
var AudioContext = window.AudioContext || window.webkitAudioContext;
var videoEl = document.createElement('video');
var supportVp8 = videoEl && videoEl.canPlayType && videoEl.canPlayType('video/webm; codecs="vp8", vorbis') === "probably";
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;

// export support flags and constructors.prototype && PC
module.exports = {
    prefix: prefix,
    browserVersion: version,
    support: !!PC && !!getUserMedia,
    // new support style
    supportRTCPeerConnection: !!PC,
    supportVp8: supportVp8,
    supportGetUserMedia: !!getUserMedia,
    supportDataChannel: !!(PC && PC.prototype && PC.prototype.createDataChannel),
    supportWebAudio: !!(AudioContext && AudioContext.prototype.createMediaStreamSource),
    supportMediaStream: !!(MediaStream && MediaStream.prototype.removeTrack),
    supportScreenSharing: !!screenSharing,
    // constructors
    AudioContext: AudioContext,
    PeerConnection: PC,
    SessionDescription: SessionDescription,
    IceCandidate: IceCandidate,
    MediaStream: MediaStream,
    getUserMedia: getUserMedia
};

},{}],22:[function(require,module,exports){
/*
WildEmitter.js is a slim little event emitter by @henrikjoreteg largely based
on @visionmedia's Emitter from UI Kit.

Why? I wanted it standalone.

I also wanted support for wildcard emitters like this:

emitter.on('*', function (eventName, other, event, payloads) {

});

emitter.on('somenamespace*', function (eventName, payloads) {

});

Please note that callbacks triggered by wildcard registered events also get
the event name as the first argument.
*/

module.exports = WildEmitter;

function WildEmitter() { }

WildEmitter.mixin = function (constructor) {
    var prototype = constructor.prototype || constructor;

    prototype.isWildEmitter= true;

    // Listen on the given `event` with `fn`. Store a group name if present.
    prototype.on = function (event, groupName, fn) {
        this.callbacks = this.callbacks || {};
        var hasGroup = (arguments.length === 3),
            group = hasGroup ? arguments[1] : undefined,
            func = hasGroup ? arguments[2] : arguments[1];
        func._groupName = group;
        (this.callbacks[event] = this.callbacks[event] || []).push(func);
        return this;
    };

    // Adds an `event` listener that will be invoked a single
    // time then automatically removed.
    prototype.once = function (event, groupName, fn) {
        var self = this,
            hasGroup = (arguments.length === 3),
            group = hasGroup ? arguments[1] : undefined,
            func = hasGroup ? arguments[2] : arguments[1];
        function on() {
            self.off(event, on);
            func.apply(this, arguments);
        }
        this.on(event, group, on);
        return this;
    };

    // Unbinds an entire group
    prototype.releaseGroup = function (groupName) {
        this.callbacks = this.callbacks || {};
        var item, i, len, handlers;
        for (item in this.callbacks) {
            handlers = this.callbacks[item];
            for (i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i]._groupName === groupName) {
                    //console.log('removing');
                    // remove it and shorten the array we're looping through
                    handlers.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
        return this;
    };

    // Remove the given callback for `event` or all
    // registered callbacks.
    prototype.off = function (event, fn) {
        this.callbacks = this.callbacks || {};
        var callbacks = this.callbacks[event],
            i;

        if (!callbacks) return this;

        // remove all handlers
        if (arguments.length === 1) {
            delete this.callbacks[event];
            return this;
        }

        // remove specific handler
        i = callbacks.indexOf(fn);
        callbacks.splice(i, 1);
        if (callbacks.length === 0) {
            delete this.callbacks[event];
        }
        return this;
    };

    /// Emit `event` with the given args.
    // also calls any `*` handlers
    prototype.emit = function (event) {
        this.callbacks = this.callbacks || {};
        var args = [].slice.call(arguments, 1),
            callbacks = this.callbacks[event],
            specialCallbacks = this.getWildcardCallbacks(event),
            i,
            len,
            item,
            listeners;

        if (callbacks) {
            listeners = callbacks.slice();
            for (i = 0, len = listeners.length; i < len; ++i) {
                if (!listeners[i]) {
                    break;
                }
                listeners[i].apply(this, args);
            }
        }

        if (specialCallbacks) {
            len = specialCallbacks.length;
            listeners = specialCallbacks.slice();
            for (i = 0, len = listeners.length; i < len; ++i) {
                if (!listeners[i]) {
                    break;
                }
                listeners[i].apply(this, [event].concat(args));
            }
        }

        return this;
    };

    // Helper for for finding special wildcard event handlers that match the event
    prototype.getWildcardCallbacks = function (eventName) {
        this.callbacks = this.callbacks || {};
        var item,
            split,
            result = [];

        for (item in this.callbacks) {
            split = item.split('*');
            if (item === '*' || (split.length === 2 && eventName.slice(0, split[0].length) === split[0])) {
                result = result.concat(this.callbacks[item]);
            }
        }
        return result;
    };

};

WildEmitter.mixin(WildEmitter);

},{}]},{},[4])(4)
});