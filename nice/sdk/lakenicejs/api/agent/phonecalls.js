"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildemitter = require("wildemitter");
const ApiBase_1 = require("../ApiBase");
/**
 * PhoneCalls api implementation.
 */
class PhoneCalls {
    /**
     * PhoneCalls api implementation.
     *
     * @param {Object}   phoneCallsOptions  A collection of options.
     *
     * @example
     *  options = {
     *		debug: true,
     *      domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
     *      baseURIPath: "/services/v15.0/",
     *      authorization: "Bearer [Token Value]",
     *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
     */
    constructor(phoneCallsOptions) {
        this.phoneCallsOptions = phoneCallsOptions;
        // local.
        let self = this;
        let parent = phoneCallsOptions.parent;
        let uniqueID = "Agent.PhoneCalls.";
        let item;
        let options = phoneCallsOptions || {};
        let config = this.config = {
            debug: false,
            domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
            baseURIPath: "/services/v15.0/",
            authorization: "Bearer [Token Value]",
            timeout: 0
        };
        // Assign global.
        this.parent = parent;
        this.logger = parent.logger;
        this.uniqueID = uniqueID;
        // set our config from options
        for (item in options) {
            if (options.hasOwnProperty(item)) {
                this.config[item] = options[item];
            }
        }
        // Call WildEmitter constructor.
        wildemitter.mixin(PhoneCalls);
        // Create the request instance.
        this.apirequest = new ApiBase_1.ApiRequest(this.config);
    }
    /**
    * Dial agent personal queue.
    *
    * @param {string}   sessionId		The session id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    dialAgentPersonalQueueAsync(sessionId, requestOptions) {
        // Create local refs.
        let localExecute = 'Dial agent personal queue';
        let localUniqueID = this.uniqueID + "dialAgentPersonalQueueAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/dial-agent';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Dial outbound call.
    *
    * @param {string}   sessionId		The session id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    dialOutboundCallAsync(sessionId, requestOptions) {
        // Create local refs.
        let localExecute = 'Dial outbound call';
        let localUniqueID = this.uniqueID + "dialOutboundCallAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/dial-phone';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Dial skill.
    *
    * @param {string}   sessionId		The session id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    dialSkillAsync(sessionId, requestOptions) {
        // Create local refs.
        let localExecute = 'Dial skill';
        let localUniqueID = this.uniqueID + "dialSkillAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/dial-skill';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Send DTMF tones.
    *
    * @param {string}   sessionId		The session id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    sendDtmfTonesAsync(sessionId, requestOptions) {
        // Create local refs.
        let localExecute = 'Send DTMF tones';
        let localUniqueID = this.uniqueID + "sendDtmfTonesAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/send-dtmf';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Dial agent consult.
    *
    * @param {string}   sessionId		The session id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    dialAgentConsultAsync(sessionId, requestOptions) {
        // Create local refs.
        let localExecute = 'Dial agent consult';
        let localUniqueID = this.uniqueID + "dialAgentConsultAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/consult-agent';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Transfer call.
    *
    * @param {string}   sessionId		The session id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    transferCallAsync(sessionId, requestOptions) {
        // Create local refs.
        let localExecute = 'Transfer call';
        let localUniqueID = this.uniqueID + "transferCallAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/transfer-calls';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Conference call.
    *
    * @param {string}   sessionId		The session id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    conferenceCallAsync(sessionId, requestOptions) {
        // Create local refs.
        let localExecute = 'Conference call';
        let localUniqueID = this.uniqueID + "conferenceCallAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/conference-calls';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Accept consult.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    acceptConsultAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'Accept consult';
        let localUniqueID = this.uniqueID + "acceptConsultAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/accept-consult';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Override AMD call.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    overrideAmdCallAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'Override AMD call';
        let localUniqueID = this.uniqueID + "overrideAmdCallAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/amd-override';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Record call.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    recordCallAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'Record call';
        let localUniqueID = this.uniqueID + "recordCallAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/record';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Mask recording.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    maskRecordingAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'Record call';
        let localUniqueID = this.uniqueID + "maskRecordingAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/mask';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Stop masking recording.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    stopMaskingRecordingAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'Stop masking recording';
        let localUniqueID = this.uniqueID + "stopMaskingRecordingAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/unmask';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Dial independent call.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    dialIndependentCallAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'Dial independent call';
        let localUniqueID = this.uniqueID + "dialIndependentCallAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/independent-dial';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Disposition independent call.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    dispositionIndependentCallAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'Disposition independent call';
        let localUniqueID = this.uniqueID + "dispositionIndependentCallAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/independent-dial-outcome';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Place contact on hold.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    placeContactOnHoldAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'Place contact on hold';
        let localUniqueID = this.uniqueID + "placeContactOnHoldAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/hold';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * Resume call.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    resumeCallAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'Resume call';
        let localUniqueID = this.uniqueID + "resumeCallAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/resume';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
    /**
    * End call.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
    * @param {Object}   requestOptions  A collection of request options.
    *
    * @example
    *  options = {
    *		timeout: 10000, // default is '0' (0 seconds timeout),
    *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
    *
    *		// 'params' are the URL parameters to be sent with the request
    *		// Must be a plain object or a URLSearchParams object
    *		params: { ID: 12345 },
    *
    *		// 'data' is the data to be sent as the request body.
    *		data: { ID: 'Unique' },
    *  }
    */
    endCallAsync(sessionId, contactId, requestOptions) {
        // Create local refs.
        let localExecute = 'End call';
        let localUniqueID = this.uniqueID + "endCallAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + contactId.toString() + '/end';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'POST',
            baseURL: this.config.domainURIPath + this.config.baseURIPath,
            headers: {
                'Authorization': this.config.authorization,
                'Content-Type': 'application/json'
            },
            timeout: localTimeout
        };
        // Execute the request.
        this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
    }
}
exports.PhoneCalls = PhoneCalls;
