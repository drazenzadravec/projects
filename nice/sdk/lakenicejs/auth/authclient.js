"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockconsole = require("mockconsole");
const wildemitter = require("wildemitter");
const buffer = require("buffer");
const AuthBase_1 = require("./AuthBase");
const passwordtoken_1 = require("./passwordtoken");
const clienttoken_1 = require("./clienttoken");
const usertoken_1 = require("./usertoken");
const refreshtoken_1 = require("./refreshtoken");
const implicittoken_1 = require("./implicittoken");
/**
 * AuthClient client implementation.
 */
class AuthClient {
    /**
     * AuthClient api implementation.
     *
     * @param {Object}   authClientOptions  A collection of options.
     *
     * @example
     *  options = {
     *		debug: true,
     *      domainURIPath: "https://au1.nice-incontact.com",
     *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
     */
    constructor(authClientOptions) {
        this.authClientOptions = authClientOptions;
        // local.
        let self = this;
        let parent = authClientOptions.parent;
        let item;
        let options = authClientOptions || {};
        let config = this.config = {
            debug: false,
            domainURIPath: "https://au1.nice-incontact.com",
            timeout: 0
        };
        // Call WildEmitter constructor.
        wildemitter.mixin(AuthClient);
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
        this.parent = parent;
        // Set options, override existing.
        for (item in options) {
            if (options.hasOwnProperty(item)) {
                this.config[item] = options[item];
            }
        }
        // Assign parent.
        this.config.parent = self;
        // log events in debug mode
        if (this.config.debug) {
            // Capture all events.
            this.on('*', function (event, val1, val2, val3) {
                var logger;
                // if you didn't pass in a logger and you explicitly turning on debug
                // we're just going to assume you're wanting log output with console.
                if (self.config.logger === mockconsole) {
                    logger = console;
                }
                else {
                    logger = self.logger;
                }
                // Log the event.
                logger.log('Auth Event:', event, val1, val2);
            });
        }
        // Create the request instance.
        this.authrequest = new AuthBase_1.AuthRequest(this.config);
        this.passwordtoken = new passwordtoken_1.PasswordToken(this.config);
        this.clienttoken = new clienttoken_1.ClientToken(this.config);
        this.usertoken = new usertoken_1.UserToken(this.config);
        this.refreshtoken = new refreshtoken_1.RefreshToken(this.config);
        this.implicittoken = new implicittoken_1.ImplicitToken(this.config);
    }
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event function.
     */
    on(arg0, arg1) {
    }
    /**
     * Get the auth request.
     *
     * @return {IAuthRequest}		The auth request.
    */
    getAuthRequest() {
        return this.authrequest;
    }
    /**
    * get the PasswordToken interface.
    * @return {IPasswordToken}    The PasswordToken.
    */
    getPasswordToken() {
        return this.passwordtoken;
    }
    /**
    * get the ClientToken interface.
    * @return {IClientToken}    The ClientToken.
    */
    getClientToken() {
        return this.clienttoken;
    }
    /**
    * get the UserToken interface.
    * @return {IUserToken}    The UserToken.
    */
    getUserToken() {
        return this.usertoken;
    }
    /**
    * get the RefreshToken interface.
    * @return {IRefreshToken}    The RefreshToken.
    */
    getRefreshToken() {
        return this.refreshtoken;
    }
    /**
    * get the ImplicitToken interface.
    * @return {IImplicitToken}    The ImplicitToken.
    */
    getImplicitToken() {
        return this.implicittoken;
    }
    /**
     * Create the base64 encoded authorization key.
     *
     * @param {string}		appName				The application name.
     * @param {string}		vendorName			The vendor name.
     * @param {string}		businessUnitNumber	The business unit number.
     * @return {string}		The base64 encoded authorization key.
    */
    createAuthorizationKey(appName, vendorName, businessUnitNumber) {
        // Get the auth key.
        let authKey = appName + "@" + vendorName + ((businessUnitNumber !== null && businessUnitNumber !== '') ? ":" + businessUnitNumber : "");
        return buffer.Buffer.from(authKey).toString('base64');
    }
    /**
     * Get the base64 decoded authorization key.
     *
     * @param {string}		authKey		The base64 encoded authorization key.
     * @return {string}		The base64 decoded authorization key.
    */
    getAuthorizationKey(authKey) {
        // Decode.
        return buffer.Buffer.from(authKey, 'base64').toString('ascii');
    }
    /**
     * Create the base64 encoded authorization key.
     *
     * @param {string}		appName			The application name.
     * @param {string}		vendorName		The vendor name.
     * @param {string}		applicationId	The application id.
     * @return {string}		The base64 encoded authorization key.
    */
    createAuthorizationAppIdKey(appName, vendorName, applicationId) {
        // Get the auth key.
        let authKey = appName + "@" + vendorName + ":" + applicationId;
        return buffer.Buffer.from(authKey).toString('base64');
    }
}
exports.AuthClient = AuthClient;
