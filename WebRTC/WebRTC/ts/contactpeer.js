var WildEmitter = require('wildemitter');
/**
 * Contact peer container, this holds information to one contact peer.
 */
var ContactPeer = (function () {
    /**
     * Contact peer prototype.
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
        this.contactPeerOptions = contactPeerOptions;
        // local.
        var self = this;
        var closed = false;
        var parent = contactPeerOptions.parent;
        var item;
        // Call emitter constructor.
        WildEmitter.call(this);
        // Get the parent logger.
        var logger = parent.logger;
        // Get the singalling provider.
        var signalling = contactPeerOptions.signalling;
        // MediaRecorder
        var mediaRecorder = null;
        // Assign this contact details.
        var uniqueID = contactPeerOptions.uniqueID;
        var applicationID = contactPeerOptions.applicationID;
        var contactDetails = '';
        // Store all channels.
        var receiveDataChannel = null;
        var sendDataChannel = null;
        var receiveBuffer = [];
        var receivedSize = 0;
        var sentSize = 0;
        var isData = contactPeerOptions.isData;
        var fileName = "";
        var fileSize = 0;
        var fileType = "";
        var fileLastModified = 0;
        var fileToSend = null;
        var receiveMedia = contactPeerOptions.receiveOfferMedia || parent.config.receiveOfferMedia;
        var remoteStream = null;
        var remoteStreamVideoElement = null;
        try {
            // Create a new peer connection to the STUN and TURN servers
            // with the ICE configuration.
            var peerConnection = new RTCPeerConnection(parent.config.peerConnectionConfiguration);
        }
        catch (e) {
            // Log the error.
            logger.error("Error connecting to RTCPeerConnection: " + e);
        }
        // If created.
        if (this.peerConnection) {
            // Send any ice candidates to the other peers.
            this.peerConnection.onicecandidate = function (evt) {
                var config = {
                    data: evt,
                    signalling: signalling
                };
                // Send ICE candiate.
                self.onIceCandidateHandler(config);
            };
            // ICE connection state change.
            this.peerConnection.oniceconnectionstatechange = function (evt) {
                parent.emit('peerContactEventICEStateChange', "Peer ICE connection state changed.", self, evt);
            };
            // When a stream has been removed.
            this.peerConnection.onremovestream = function (evt) {
                parent.emit('peerContactEventRemoveStream', "Peer connection stream removed.", self, evt);
            };
            // Once remote stream arrives, show it in the remote video element.
            // onaddstream is deprecated.
            this.peerConnection.onaddstream = function (evt) {
                self.remoteStream = evt.stream;
                parent.emit('peerContactEventAddStream', "Peer connection stream added.", self, evt);
            };
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
                    parent.emit('peerContactEventDataChannelReceivedSize', "Peer connection data channel received size.", self, receivedSize);
                    // We are assuming that our signaling protocol told
                    // about the expected file size (and name, hash, etc).
                    if (receivedSize >= self.fileSize) {
                        parent.emit('peerContactEventDataChannelReceiveComplete', "Peer connection data channel received complete.", self, receiveBuffer);
                        receiveBuffer = [];
                        receiveDataChannel.close();
                        receiveDataChannel = null;
                    }
                };
                // Data channel open.
                receiveDataChannel.onopen = function () {
                    // If data channel is active.
                    if (receiveDataChannel) {
                        // Receive channel state.
                        var readyState = receiveDataChannel.readyState;
                        parent.emit('peerContactEventDataChannelOpen', "Peer connection data channel open.", self, readyState);
                    }
                };
                // Data channel close.
                receiveDataChannel.onclose = function () {
                    // If data channel is active.
                    if (receiveDataChannel) {
                        // Receive channel state.
                        var readyState = receiveDataChannel.readyState;
                        parent.emit('peerContactEventDataChannelClose', "Peer connection data channel close.", self, readyState);
                    }
                };
                // Data channel error.
                receiveDataChannel.onerror = function (error) {
                    parent.emit('peerContactEventDataChannelError', "Peer connection data channel error.", self, error);
                };
            };
            try {
                // Create a data channel from the peer connection.
                sendDataChannel = this.peerConnection.createDataChannel("sendReceiveDataChannel_" + this.uniqueID + "_" + this.applicationID);
                sendDataChannel.binaryType = "arraybuffer";
                // On open
                sendDataChannel.onopen = function () {
                    // Get the file.
                    var file = self.fileToSend;
                    // If file is size zero.
                    if (!file || file.size === 0) {
                        return;
                    }
                    // Set send size.
                    sentSize = 0;
                    // If data channel is active.
                    if (sendDataChannel) {
                        // Send channel state.
                        var readyState = sendDataChannel.readyState;
                        parent.emit('peerContactEventDataChannelOpen', "Peer connection data channel open.", self, readyState);
                        // Sent the file data in chunks
                        var chunkSize = 8096;
                        var sliceFile = function (offset) {
                            // Create a file reader.
                            var reader = new FileReader();
                            // When the file is opened.
                            reader.onload = (function (arg) {
                                return function (e) {
                                    // Send the file through the data channel.
                                    sendDataChannel.send(e.target.result);
                                    // Create timeout.
                                    if (file.size > offset + e.target.result.byteLength) {
                                        window.setTimeout(sliceFile, 0, offset + chunkSize);
                                    }
                                    // Set the current sent size.
                                    sentSize = offset + e.target.result.byteLength;
                                    parent.emit('peerContactEventDataChannelSentSize', "Peer connection data channel sent size.", self, sentSize);
                                    // If all the data has been sent.
                                    if (sentSize >= file.size) {
                                        // Close the data channel.
                                        parent.emit('peerContactEventDataChannelSentComplete', "Peer connection data channel sent complete.", self, null);
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
                sendDataChannel.onclose = function () {
                    // If data channel is active.
                    if (sendDataChannel) {
                        // Sen channel state.
                        var readyState = sendDataChannel.readyState;
                        parent.emit('peerContactEventDataChannelClose', "Peer connection data channel close.", self, readyState);
                    }
                };
                // On error
                sendDataChannel.onerror = function (error) {
                    parent.emit('peerContactEventDataChannelError', "Peer connection data channel error.", self, error);
                };
                // On message.
                sendDataChannel.onmessage = function (event) { };
            }
            catch (e) {
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
        this.signalling.contactAvailable(contactUniqueID, contactApplicationID);
    };
    /**
     * Send end call to this contact.
     */
    ContactPeer.prototype.sendEndCall = function () {
        // Get this contact details.
        var contactUniqueID = this.uniqueID;
        var contactApplicationID = this.applicationID;
        // Send the message through the signalling provider.
        this.signalling.sendEndCallToContact(contactUniqueID, contactApplicationID);
    };
    /**
     * Set the contact information.
     *
     * @param {string}  uniqueID        The contact unique id.
     * @param {string}  applicationID   The contact application id.
     */
    ContactPeer.prototype.setContactInfo = function (uniqueID, applicationID) {
        this.uniqueID = uniqueID;
        this.applicationID = applicationID;
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
     * @param {object}      videoElement    The remote video element.
     * @param {MediaStream}      stream     The remote video stream.
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
        if (this.closed)
            return;
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
        catch (e) { }
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
                    stream.getTracks().forEach(function (track) {
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
                    stream.getTracks().forEach(function (track) {
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
        evt.signalling.iceCandidate(contactUniqueID, contactApplicationID, evt.data.candidate, isDataChannel);
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
                this.remoteStream.getTracks().forEach(function (track) {
                    track.stop();
                });
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
            var options = { mimeType: 'video/webm' };
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
            this.peerConnection.createOffer(function (offer) {
                // Create a new RTC session.
                var request = new RTCSessionDescription(offer);
                // Set the local call offer session description.
                localPC.setLocalDescription(new RTCSessionDescription(request), function () {
                    // Set the request.
                    localSig.sendOffer(localUniqueID, localApplicationID, request);
                }, function (error) {
                    localLogger.error(error);
                });
            }, function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            }, localMedaia);
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
            this.peerConnection.createAnswer(function (answer) {
                // Create a new RTC session.
                var response = new RTCSessionDescription(answer);
                // Set the local call answer session description.
                localPC.setLocalDescription(response, function () {
                    // Set the response.
                    localSig.sendAnswer(localUniqueID, localApplicationID, response);
                }, function (error) {
                    localLogger.error(error);
                });
            }, function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            });
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
            this.peerConnection.createOffer(function (offer) {
                // Create a new RTC session.
                var request = new RTCSessionDescription(offer);
                // Set the local call offer session description.
                localPC.setLocalDescription(new RTCSessionDescription(request), function () {
                    // Set the request.
                    localSig.sendFileTransferOffer(localUniqueID, localApplicationID, request, file.name, file.size, file.type, file.lastModified);
                }, function (error) {
                    localLogger.error(error);
                });
            }, function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            });
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
            this.peerConnection.createAnswer(function (answer) {
                // Create a new RTC session.
                var response = new RTCSessionDescription(answer);
                // Set the local call answer session description.
                localPC.setLocalDescription(response, function () {
                    // Set the response.
                    localSig.sendFileTransferAnswer(localUniqueID, localApplicationID, response);
                }, function (error) {
                    localLogger.error(error);
                });
            }, function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            });
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
            this.peerConnection.createOffer(function (offer) {
                // Create a new RTC session.
                var request = new RTCSessionDescription(offer);
                // Set the local call offer session description.
                localPC.setLocalDescription(new RTCSessionDescription(request), function () {
                    // Set the request.
                    localSig.sendJoinConferenceOffer(localUniqueID, localApplicationID, request);
                }, function (error) {
                    localLogger.error(error);
                });
            }, function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            }, localMedaia);
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
            this.peerConnection.createAnswer(function (answer) {
                // Create a new RTC session.
                var response = new RTCSessionDescription(answer);
                // Set the local call answer session description.
                localPC.setLocalDescription(response, function () {
                    // Set the response.
                    localSig.sendJoinConferenceAnswer(localUniqueID, localApplicationID, response);
                }, function (error) {
                    localLogger.error(error);
                });
            }, function (error) {
                // Session error.
                localParent.emit('peerContactEventSessionError', "Failed to create session description.", self, error);
            });
        }
    };
    return ContactPeer;
})();
exports.ContactPeer = ContactPeer;
