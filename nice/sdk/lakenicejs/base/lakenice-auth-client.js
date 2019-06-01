"use strict";
/* Lake Nice inContact Auth Client. */
Object.defineProperty(exports, "__esModule", { value: true });
const mockconsole = require("mockconsole");
const wildemitter = require("wildemitter");
const authclient_1 = require("../auth/authclient");
/**
 * Lake Nice auth client implementation.
 */
class LakeNiceAuthClient {
    /**
    * Lake Nice auth client api implementation.
    *
    * Lake Nice auth client controls the interaction between the
    * web service and client-side.
    *
    * @param {Object}   authClientOptions  A collection of options.
    *
    * @example
    *  options = {
    *		debug: true,
    *		domainURIPath: "https://au1.nice-incontact.com",
    *       timeout: 10000, // default is '0' (0 seconds timeout)
    *  }
    */
    constructor(authClientOptions) {
        this.authClientOptions = authClientOptions;
        // local.
        let self = this;
        let item;
        let options = authClientOptions || {};
        let config = this.config = {
            debug: false,
            domainURIPath: "https://au1.nice-incontact.com",
            timeout: 0,
            parent: self
        };
        // Log nothing by default, following "the rule of silence":
        // http://www.linfo.org/rule_of_silence.html
        let logger = function () {
            // Assume that if you're in debug mode and you didn't
            // pass in a logger, you actually want to log as much as
            // possible.
            if (authClientOptions.debug) {
                return authClientOptions.logger || console;
            }
            else {
                // Use your logger which should have its own logic
                // for output. Return the no-op.
                return authClientOptions.logger || mockconsole;
            }
        }();
        this.logger = logger;
        // set our config from options
        for (item in options) {
            if (options.hasOwnProperty(item)) {
                this.config[item] = options[item];
            }
        }
        // Call WildEmitter constructor.
        wildemitter.mixin(LakeNiceAuthClient);
        // log all events in debug mode
        if (this.config.debug) {
            this.on('*', this.logger.log.bind(this.logger, 'Lake Nice Auth Client Event:'));
        }
        // Create the clients.
        this.authclient = new authclient_1.AuthClient(this.config);
        // Proxy events from client APIs
        this.authclient.on('*', function () {
            this.emit.apply(self, arguments);
        });
        // Request error.
        this.authclient.on('error', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: true,
                type: 'general',
                uniqueID: uniqueID,
                status: 500,
                statusText: 'Internal Server Error',
                message: arg
            };
            this.emit('general', argum);
        });
        // Request error.
        this.authclient.on('requestError', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: true,
                type: 'request',
                uniqueID: uniqueID,
                status: 500,
                statusText: 'Internal Server Error',
                baseURL: arg.baseURL,
                url: arg.url,
                data: arg.data,
                method: arg.method,
                params: arg.params,
                headers: arg.headers
            };
            this.emit('request', argum);
        });
        // Response error.
        this.authclient.on('responseError', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: true,
                type: 'response',
                uniqueID: uniqueID,
                data: arg.data,
                status: arg.status,
                statusText: arg.statusText,
                request: arg.request
            };
            this.emit('response', argum);
        });
        // Response.
        this.authclient.on('responseAction', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: false,
                type: 'response',
                uniqueID: uniqueID,
                data: arg.data,
                status: arg.status,
                statusText: arg.statusText,
                headers: arg.headers,
                config: arg.config,
                request: arg.request
            };
            this.emit('response', argum);
        });
        // Executed.
        this.authclient.on('executed', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: false,
                type: 'general',
                uniqueID: uniqueID,
                status: 500,
                statusText: 'Internal Server Error',
                message: arg
            };
            this.emit('general', argum);
        });
    }
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event arguments.
     */
    on(arg0, arg1) {
    }
    /**
     * get the AuthClient interface.
     * @return {IAuthClient}    The AuthClient.
    */
    getAuthClient() {
        return this.authclient;
    }
}
exports.LakeNiceAuthClient = LakeNiceAuthClient;
