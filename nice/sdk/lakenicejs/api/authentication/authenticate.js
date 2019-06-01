"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildemitter = require("wildemitter");
const ApiBase_1 = require("../ApiBase");
/**
 * Authenticate api implementation.
 */
class Authenticate {
    /**
     * Authenticate api implementation.
     *
     * @param {Object}   authenticateOptions  A collection of options.
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
    constructor(authenticateOptions) {
        this.authenticateOptions = authenticateOptions;
        // local.
        let self = this;
        let parent = authenticateOptions.parent;
        let uniqueID = "Authentication.Authenticate.";
        let item;
        let options = authenticateOptions || {};
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
        wildemitter.mixin(Authenticate);
        // Create the request instance.
        this.apirequest = new ApiBase_1.ApiRequest(this.config);
    }
    /**
    * Resets an agent's password.
    *
    * @param {number}   agentId		 The agent id.
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
    resetAgentPasswordAsync(agentId, requestOptions) {
        // Create local refs.
        let localExecute = 'Resets an agents password';
        let localUniqueID = this.uniqueID + "resetAgentPasswordAsync";
        let localUrl = 'agents/' + agentId.toString() + '/reset-password';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'PUT',
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
     * Changes an Agent's Password.
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
    changeAgentPasswordAsync(requestOptions) {
        // Create local refs.
        let localExecute = 'Changes an agents password';
        let localUniqueID = this.uniqueID + "changeAgentPasswordAsync";
        let localUrl = 'agents/change-password';
        let localTimeout = this.config.timeout;
        // Assign the request options.
        let options = requestOptions || {};
        let requestConfig = {
            url: localUrl,
            method: 'PUT',
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
exports.Authenticate = Authenticate;
