"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildemitter = require("wildemitter");
const ApiBase_1 = require("../ApiBase");
/**
 * Callback api implementation.
 */
class Callback {
    /**
     * Callback api implementation.
     *
     * @param {Object}   callbackOptions  A collection of options.
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
    constructor(callbackOptions) {
        this.callbackOptions = callbackOptions;
        // local.
        let self = this;
        let parent = callbackOptions.parent;
        let uniqueID = "Patron.Callback.";
        let item;
        let options = callbackOptions || {};
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
        wildemitter.mixin(Callback);
        // Create the request instance.
        this.apirequest = new ApiBase_1.ApiRequest(this.config);
    }
    /**
     * Request an immediate callback.
     *
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
    requestImmediateCallbackAsync(requestOptions) {
        // Create local refs.
        let localExecute = 'Request an immediate callback';
        let localUniqueID = this.uniqueID + "requestImmediateCallbackAsync";
        let localUrl = 'queuecallback';
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
     * Schedule a callback.
     *
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
    scheduleCallbackAsync(requestOptions) {
        // Create local refs.
        let localExecute = 'Schedule a callback';
        let localUniqueID = this.uniqueID + "scheduleCallbackAsync";
        let localUrl = 'promise';
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
exports.Callback = Callback;
