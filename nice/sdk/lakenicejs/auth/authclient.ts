// Require packages.
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';
import * as buffer from 'buffer';

import { IAuthBase, IAuthRequest, AuthRequest } from './AuthBase';
import { IPasswordToken, PasswordToken } from './passwordtoken';
import { IClientToken, ClientToken } from './clienttoken';
import { IUserToken, UserToken } from './usertoken';
import { IRefreshToken, RefreshToken } from './refreshtoken';
import { IImplicitToken, ImplicitToken } from './implicittoken';

/**
 * AuthClient client interface.
 */
export interface IAuthClient extends IAuthBase {

	/**
	* get the PasswordToken interface.
	* @return {IPasswordToken}    The PasswordToken.
    */
	getPasswordToken(): IPasswordToken;

	/**
	* get the ClientToken interface.
	* @return {IClientToken}    The ClientToken.
    */
	getClientToken(): IClientToken;

	/**
	* get the UserToken interface.
	* @return {IUserToken}    The UserToken.
    */
	getUserToken(): IUserToken;

	/**
	* get the RefreshToken interface.
	* @return {IRefreshToken}    The RefreshToken.
    */
	getRefreshToken(): IRefreshToken;

	/**
	* get the ImplicitToken interface.
	* @return {IImplicitToken}    The ImplicitToken.
    */
	getImplicitToken(): IImplicitToken;

	/**
     * Create the base64 encoded authorization key.
	 * 
	 * @param {string}		appName				The application name.
	 * @param {string}		vendorName			The vendor name.
	 * @param {string}		businessUnitNumber	The business unit number.
	 * @return {string}		The base64 encoded authorization key.
    */
	createAuthorizationKey(appName: string, vendorName: string, businessUnitNumber?: string): string;

	/**
     * Get the base64 decoded authorization key.
	 * 
	 * @param {string}		authKey		The base64 encoded authorization key.
	 * @return {string}		The base64 decoded authorization key.
    */
	getAuthorizationKey(authKey: string): string;

	/**
     * Create the base64 encoded authorization key.
	 * 
	 * @param {string}		appName			The application name.
	 * @param {string}		vendorName		The vendor name.
	 * @param {string}		applicationId	The application id.
	 * @return {string}		The base64 encoded authorization key.
    */
	createAuthorizationAppIdKey(appName: string, vendorName: string, applicationId: string): string;
}

/**
 * AuthClient client implementation.
 */
export class AuthClient implements IAuthClient {

	// global
	authrequest: IAuthRequest;

	// global
	passwordtoken: IPasswordToken;
	clienttoken: IClientToken;
	usertoken: IUserToken;
	refreshtoken: IRefreshToken;
	implicittoken: IImplicitToken;

	// global
	config: any;
	logger: any;
	parent: any;

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
	constructor(public authClientOptions: any) {

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
		this.authrequest = new AuthRequest(this.config);

		this.passwordtoken = new PasswordToken(this.config);
		this.clienttoken = new ClientToken(this.config);
		this.usertoken = new UserToken(this.config);
		this.refreshtoken = new RefreshToken(this.config);
		this.implicittoken = new ImplicitToken(this.config);
	}

	/**
	 * On event.
	 * @param {string} arg0 Event name.
	 * @param {Object} arg1 Event function.
	 */
	on(arg0: string, arg1: (event: any, val1: any, val2: any, val3: any) => void): any {

	}

	/**
	 * Get the auth request.
	 * 
	 * @return {IAuthRequest}		The auth request.
	*/
	getAuthRequest(): IAuthRequest {
		return this.authrequest;
	}

	/**
	* get the PasswordToken interface.
	* @return {IPasswordToken}    The PasswordToken.
    */
	getPasswordToken(): IPasswordToken {
		return this.passwordtoken;
	}

	/**
	* get the ClientToken interface.
	* @return {IClientToken}    The ClientToken.
    */
	getClientToken(): IClientToken {
		return this.clienttoken;
	}

	/**
	* get the UserToken interface.
	* @return {IUserToken}    The UserToken.
    */
	getUserToken(): IUserToken {
		return this.usertoken;
	}

	/**
	* get the RefreshToken interface.
	* @return {IRefreshToken}    The RefreshToken.
    */
	getRefreshToken(): IRefreshToken {
		return this.refreshtoken;
	}

	/**
	* get the ImplicitToken interface.
	* @return {IImplicitToken}    The ImplicitToken.
    */
	getImplicitToken(): IImplicitToken {
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
	createAuthorizationKey(appName: string, vendorName: string, businessUnitNumber?: string): string {

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
	getAuthorizationKey(authKey: string): string {

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
	createAuthorizationAppIdKey(appName: string, vendorName: string, applicationId: string): string {

		// Get the auth key.
		let authKey = appName + "@" + vendorName + ":" + applicationId;
		return buffer.Buffer.from(authKey).toString('base64');
	}
}