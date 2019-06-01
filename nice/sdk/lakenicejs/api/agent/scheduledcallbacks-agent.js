"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildemitter = require("wildemitter");
const ApiBase_1 = require("../ApiBase");
/**
 * ScheduledCallbacks api implementation.
 */
class ScheduledCallbacksAgent {
    /**
     * ScheduledCallbacks api implementation.
     *
     * @param {Object}   scheduledCallbacksOptions  A collection of options.
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
    constructor(scheduledCallbacksOptions) {
        this.scheduledCallbacksOptions = scheduledCallbacksOptions;
        // local.
        let self = this;
        let parent = scheduledCallbacksOptions.parent;
        let uniqueID = "Agent.ScheduledCallbacks.";
        let item;
        let options = scheduledCallbacksOptions || {};
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
        wildemitter.mixin(ScheduledCallbacksAgent);
        // Create the request instance.
        this.apirequest = new ApiBase_1.ApiRequest(this.config);
    }
    /**
    * Dial.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   callbackId		The callback id.
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
    dialAsync(sessionId, callbackId, requestOptions) {
        // Create local refs.
        let localExecute = 'Dial a scheduled callback';
        let localUniqueID = this.uniqueID + "dialAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + callbackId.toString() + '/dial';
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
    * Reschedule.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   callbackId		The callback id.
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
    rescheduleAsync(sessionId, callbackId, requestOptions) {
        // Create local refs.
        let localExecute = 'Reschedule a scheduled callback';
        let localUniqueID = this.uniqueID + "rescheduleAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + callbackId.toString() + '/reschedule';
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
    * Cancel.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   callbackId		The callback id.
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
    cancelAsync(sessionId, callbackId, requestOptions) {
        // Create local refs.
        let localExecute = 'Cancels a presented scheduled callback';
        let localUniqueID = this.uniqueID + "cancelAsync";
        let localUrl = 'agent-sessions/' + sessionId + '/interactions/' + callbackId.toString() + '/cancel';
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
exports.ScheduledCallbacksAgent = ScheduledCallbacksAgent;
