"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require packages.
const axios_1 = require("axios");
const wildemitter = require("wildemitter");
/**
 * Auth request implementation.
 */
class AuthRequest {
    /**
     * API request implementation.
     *
     * @param {Object}   authRequestOptions  A collection of options.
     *
     * @example
     *  options = {
     *		parent: this
     *  }
     */
    constructor(authRequestOptions) {
        this.authRequestOptions = authRequestOptions;
        // local.
        let self = this;
        let parent = authRequestOptions.parent;
        // Assign global.
        this.parent = parent;
        this.logger = parent.logger;
        // Call WildEmitter constructor.
        wildemitter.mixin(AuthRequest);
    }
    /**
     * Assign the request options.
     *
     * @param {Object}   requestConfig   A collection of request configuration.
     * @param {Object}   requestOptions  A collection of request options.
    */
    assignOptions(requestConfig, requestOptions) {
        let item;
        // set our config from options
        for (item in requestOptions) {
            if (requestOptions.hasOwnProperty(item)) {
                // If headers
                if ('headers' === item) {
                    // Re-seed.
                    this.assignOptions(requestConfig[item], requestOptions[item]);
                }
                else {
                    // All others.
                    requestConfig[item] = requestOptions[item];
                }
            }
        }
    }
    /**
     * Execute the async promise request.
     *
     * @param {string} executeText		The execution text to appear on final event.
     * @param {string} uniqueID			The unique ID of the current request.
     * @param {Object} requestConfig	A collection of request configuration.
     * @param {Object} requestOptions	A collection of request options.
     *
     * @example
     *  requestOptions = {
     *		timeout: 10000, // default is '0' (0 seconds timeout),
     *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
     *
     *		// 'params' are the URL parameters to be sent with the request
     *		// Must be a plain object or a URLSearchParams object
     *		params: { ID: 12345 },
     *
     *		// 'data' is the data to be sent as the request body.
     *		data: { firstName: 'Fred' },
     *	}
     *
     *  requestConfig = {
     *		debug: true,
     *      domainURIPath: ""https://au1.nice-incontact.com",
     *      baseURIPath: "/token/",
     *      authorization: "Bearer [Token Value]",
     *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
    */
    request(executeText, uniqueID, requestConfig, requestOptions) {
        let localLogger = this.logger;
        let localParent = this.parent;
        // Assign the options.
        this.assignOptions(requestConfig, requestOptions);
        try {
            // create new instance.
            const requestInstance = axios_1.default.create();
            // make the request.
            requestInstance.request(requestConfig)
                .then(function (response) {
                // handle success
                localParent.emit('responseAction', uniqueID, response);
            })
                .catch(function (error) {
                // handle error
                if (error.response) {
                    // The request was made and the server responded
                    localParent.emit('responseError', uniqueID, error.response);
                }
                else if (error.request) {
                    // The request was made but no response was received
                    localParent.emit('requestError', uniqueID, error.request);
                }
                else {
                    // Something happened in setting up the request that triggered an Error
                    localParent.emit('error', uniqueID, error.message);
                }
            })
                .then(function () {
                // always executed
                localParent.emit('executed', uniqueID, 'Executed Request: ' + executeText);
            });
        }
        catch (e) {
            localLogger.error(uniqueID, e);
        }
    }
    /**
     * Execute the async promise request.
     *
     * @param {string} executeText		The execution text to appear on final event.
     * @param {string} uniqueID			The unique ID of the current request.
     * @param {Object} requestConfig	A collection of request configuration.
     * @param {Object} requestOptions	A collection of request options.
     * @param {function} responseAction(id: string, response: any)	A function that is call containing the response.
     *						{id} the unique id of the action.
     *						{response} the complete response.
     *
     * @example
     *  requestOptions = {
     *		timeout: 10000, // default is '0' (0 seconds timeout),
     *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
     *
     *		// 'params' are the URL parameters to be sent with the request
     *		// Must be a plain object or a URLSearchParams object
     *		params: { ID: 12345 },
     *
     *		// 'data' is the data to be sent as the request body.
     *		data: { ID: 'Unique' },
     *	}
     *
     *  requestConfig = {
     *		debug: true,
     *      domainURIPath: "https://au1.nice-incontact.com",
     *      baseURIPath: "/token/",
     *      authorization: "Bearer [Token Value]",
     *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
    */
    requestAction(executeText, uniqueID, requestConfig, requestOptions, responseAction) {
        let localLogger = this.logger;
        let localParent = this.parent;
        // Assign the options.
        this.assignOptions(requestConfig, requestOptions);
        try {
            // create new instance.
            const requestInstance = axios_1.default.create();
            // make the request.
            requestInstance.request(requestConfig)
                .then(function (response) {
                // handle success
                responseAction(uniqueID, response);
            })
                .catch(function (error) {
                // handle error
                if (error.response) {
                    // The request was made and the server responded
                    localParent.emit('responseError', uniqueID, error.response);
                }
                else if (error.request) {
                    // The request was made but no response was received
                    localParent.emit('requestError', uniqueID, error.request);
                }
                else {
                    // Something happened in setting up the request that triggered an Error
                    localParent.emit('error', uniqueID, error.message);
                }
            })
                .then(function () {
                // always executed
                localParent.emit('executed', uniqueID, 'Executed Request: ' + executeText);
            });
        }
        catch (e) {
            localLogger.error(uniqueID, e);
        }
    }
    /**
     * Execute the promise request.
     *
     * @param {string} executeText		The execution text to appear on final event.
     * @param {string} uniqueID			The unique ID of the current request.
     * @param {Object} requestConfig	A collection of request configuration.
     * @param {Object} requestOptions	A collection of request options.
     *
     * @return {AxiosPromise<any>}		The async promise.
     *
     * @example
     *  requestOptions = {
     *		timeout: 10000, // default is '0' (0 seconds timeout),
     *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
     *
     *		// 'params' are the URL parameters to be sent with the request
     *		// Must be a plain object or a URLSearchParams object
     *		params: { ID: 12345 },
     *
     *		// 'data' is the data to be sent as the request body.
     *		data: { firstName: 'Fred' },
     *	}
     *
     *  requestConfig = {
     *		debug: true,
     *      domainURIPath: ""https://au1.nice-incontact.com",
     *      baseURIPath: "/token/",
     *      authorization: "Bearer [Token Value]",
     *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
    */
    requestPromise(executeText, uniqueID, requestConfig, requestOptions) {
        let localLogger = this.logger;
        // Assign the options.
        this.assignOptions(requestConfig, requestOptions);
        try {
            // create new instance.
            const requestInstance = axios_1.default.create();
            // make the request.
            return requestInstance.request(requestConfig);
        }
        catch (e) {
            localLogger.error(uniqueID, e);
            return null;
        }
    }
}
exports.AuthRequest = AuthRequest;
