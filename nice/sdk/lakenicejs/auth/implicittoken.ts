// Require packages.
import axios from 'axios';
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IAuthRequest, AuthRequest } from './AuthBase';

/**
 * ImplicitToken api interface.
 */
export interface IImplicitToken {

	/**
     * Get the implicit token request URI.
	 * 
	 * @param {Object}		tokenImplicitRequest  The token request.
	 * @return {string}		The Uri implicit token request.
    */
	getTokenRequest(tokenImplicitRequest: any): string;
}

/**
 * ImplicitToken api implementation.
 */
export class ImplicitToken implements IImplicitToken {

	// global
	authrequest: IAuthRequest;

	// global
	config: any;
	logger: any;
	parent: any;
	uniqueID: string;

	/**
     * ImplicitToken api implementation.
     * 
     * @param {Object}   implicitTokenOptions  A collection of options.
     *        
     * @example                          
     *  options = {
	 *		debug: true,
     *      domainURIPath: "https://au1.nice-incontact.com",
	 *      baseURIPath: "/token/",
	 *      authorization: "Bearer [Token Value]",
	 *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
     */
	constructor(public implicitTokenOptions: any) {

		// local.
		let self = this;
		let parent = implicitTokenOptions.parent;
		let uniqueID = "Auth.ImplicitToken.";
		let item;
		
		let options = implicitTokenOptions || {};
		let config = this.config = {
			debug: false,
			domainURIPath: "https://au1.nice-incontact.com",
			baseURIPath: "/token/",
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
		wildemitter.mixin(ImplicitToken);

		// Create the request instance.
		this.authrequest = new AuthRequest(this.config);
	}

	/**
     * Get the implicit token request URI.
	 * 
	 * @param {Object}		tokenImplicitRequest  The token request.
	 * @return {string}		The Uri implicit token request.
    */
	getTokenRequest(tokenImplicitRequest: any): string {

		let localTimeout = this.config.timeout;

		// Assign the request options.
		let options = tokenImplicitRequest || {};
		let requestConfig = {
			"state": "myState",
			"response_type": "token",
			"client_id": "SuperWidget@WidgetsInc.com",
			"redirect_uri": "http://localhost:8000/auth/",
			"scope": "PatronApi AgentAPI"
		};

		// Assign options.
		this.authrequest.assignOptions(requestConfig, options);

		// Return the Uri.
		return this.config.domainURIPath + this.config.baseURIPath +
			"?state=" + requestConfig.state +
			"&response_type=" + requestConfig.response_type +
			"&client_id=" + requestConfig.client_id +
			"&redirect_uri=" + requestConfig.redirect_uri +
			"&scope=" + requestConfig.scope;
	}
}