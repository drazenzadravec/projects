// Require packages.
import axios from 'axios';
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IAuthRequest, AuthRequest } from './AuthBase';

/**
 * RefreshToken api interface.
 */
export interface IRefreshToken {

	/**
     * Get the refresh token.
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
	getTokenAsync(requestOptions?: any): void;

	/**
     * Get the refresh token.
	 * 
	 * @param {Object}   requestOptions  A collection of request options.
	 * @param {function}	responseAction	A function that is call containing the response.
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
	getTokenAsyncOv(requestOptions: any, responseAction: (id: string, response: any) => void): void;
}

/**
 * RefreshToken api implementation.
 */
export class RefreshToken implements IRefreshToken {

	// global
	authrequest: IAuthRequest;

	// global
	config: any;
	logger: any;
	parent: any;
	uniqueID: string;

	/**
     * RefreshToken api implementation.
     * 
     * @param {Object}   refreshTokenOptions  A collection of options.
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
	constructor(public refreshTokenOptions: any) {

		// local.
		let self = this;
		let parent = refreshTokenOptions.parent;
		let uniqueID = "Auth.RefreshToken.";
		let item;

		let options = refreshTokenOptions || {};
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
		wildemitter.mixin(RefreshToken);

		// Create the request instance.
		this.authrequest = new AuthRequest(this.config);
	}

	/**
     * Get the refresh token.
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
	getTokenAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Get the refresh token';
		let localUniqueID = this.uniqueID + "getTokenAsync";
		let localUrl = ''
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
		this.authrequest.request(localExecute, localUniqueID, requestConfig, options);
	}

	/**
     * Get the refresh token.
	 * 
	 * @param {Object}   requestOptions  A collection of request options.
	 * @param {function}	responseAction	A function that is call containing the response.
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
	getTokenAsyncOv(requestOptions: any, responseAction: (id: string, response: any) => void): void {

		// Create local refs.
		let localExecute = 'Get the refresh token';
		let localUniqueID = this.uniqueID + "getTokenAsync";
		let localUrl = ''
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
		this.authrequest.requestAction(localExecute, localUniqueID, requestConfig, options, responseAction);
	}
}