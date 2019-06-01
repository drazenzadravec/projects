// Require packages.
import axios from 'axios';
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IAuthRequest, AuthRequest } from './AuthBase';

/**
 * UserToken api interface.
 */
export interface IUserToken {

	/**
     * Get the user refresh token.
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
	getRefreshTokenAsync(requestOptions?: any): void;

	/**
     * Get the user refresh token.
	 * 
	 * @param {Object}  requestOptions  A collection of request options.
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
	getRefreshTokenAsyncOv(requestOptions: any, responseAction: (id: string, response: any) => void): void;

	/**
     * Get the user create access key.
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
	getCreateAccessKeyAsync(requestOptions?: any): void;

	/**
     * Get the user create access key.
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
	getCreateAccessKeyAsyncOv(requestOptions: any, responseAction: (id: string, response: any) => void): void;

	/**
     * Get the user generate token.
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
	getGenerateTokenAsync(requestOptions?: any): void;

	/**
     * Get the user generate token.
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
	getGenerateTokenAsyncOv(requestOptions: any, responseAction: (id: string, response: any) => void): void;
}

/**
 * UserToken api implementation.
 */
export class UserToken implements IUserToken {

	// global
	authrequest: IAuthRequest;

	// global
	config: any;
	logger: any;
	parent: any;
	uniqueID: string;

	/**
     * UserToken api implementation.
     * 
     * @param {Object}   userTokenOptions  A collection of options.
     *        
     * @example                          
     *  options = {
	 *		debug: true,
     *      domainURIPath: "https://au1.nice-incontact.com",
	 *      baseURIPath: "/token/",
	 *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
     */
	constructor(public userTokenOptions: any) {

		// local.
		let self = this;
		let parent = userTokenOptions.parent;
		let uniqueID = "Auth.UserToken.";
		let item;

		let options = userTokenOptions || {};
		let config = this.config = {
			debug: false,
			domainURIPath: "https://au1.nice-incontact.com",
			baseURIPath: "/token/",
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
		wildemitter.mixin(UserToken);

		// Create the request instance.
		this.authrequest = new AuthRequest(this.config);
	}

	/**
     * Get the user refresh token.
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
	getRefreshTokenAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Get the user refresh token';
		let localUniqueID = this.uniqueID + "getRefreshTokenAsync";
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
     * Get the user refresh token.
	 * 
	 * @param {Object}  requestOptions  A collection of request options.
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
	getRefreshTokenAsyncOv(requestOptions: any, responseAction: (id: string, response: any) => void): void {

		// Create local refs.
		let localExecute = 'Get the user refresh token';
		let localUniqueID = this.uniqueID + "getRefreshTokenAsync";
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

	/**
     * Get the user create access key.
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
	getCreateAccessKeyAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Get the user create access key';
		let localUniqueID = this.uniqueID + "getCreateAccessKeyAsync";
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
     * Get the user create access key.
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
	getCreateAccessKeyAsyncOv(requestOptions: any, responseAction: (id: string, response: any) => void): void {

		// Create local refs.
		let localExecute = 'Get the user create access key';
		let localUniqueID = this.uniqueID + "getCreateAccessKeyAsync";
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

	/**
     * Get the user generate token.
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
	getGenerateTokenAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Get the user generate token';
		let localUniqueID = this.uniqueID + "getGenerateTokenAsync";
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
     * Get the user generate token.
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
	getGenerateTokenAsyncOv(requestOptions: any, responseAction: (id: string, response: any) => void): void {

		// Create local refs.
		let localExecute = 'Get the user generate token';
		let localUniqueID = this.uniqueID + "getGenerateTokenAsync";
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