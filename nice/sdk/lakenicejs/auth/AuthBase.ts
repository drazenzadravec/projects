// Require packages.
import axios from 'axios';
import * as axiosInt from 'axios';
import * as util from 'util';
import * as wildemitter from 'wildemitter';

/**
 * Auth base interface.
 */
export interface IAuthBase {

	/**
	 * On event.
	 * @param {string} arg0 Event name.
	 * @param {Object} arg1 Event function.
	 */
	on(arg0: string, arg1: (event: any, val1: any, val2: any, val3: any) => void): any;

	/**
	 * Get the auth request.
	 * 
	 * @return {IAuthRequest}		The auth request.
	*/
	getAuthRequest(): IAuthRequest;
}

/**
 * Auth request interface.
 */
export interface IAuthRequest {

	/**
     * Assign the request options.
	 * 
	 * @param {Object}   requestConfig   A collection of request configuration.
	 * @param {Object}   requestOptions  A collection of request options.
    */
	assignOptions(requestConfig: any, requestOptions?: any): void;

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
	request(executeText: string, uniqueID: string, requestConfig: any, requestOptions?: any): void;

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
	requestAction(executeText: string, uniqueID: string, requestConfig: any, requestOptions: any, responseAction: (id: string, response: any) => void): void;

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
	requestPromise(executeText: string, uniqueID: string, requestConfig: any, requestOptions?: any): axiosInt.AxiosPromise<any>;
}

/**
 * Auth request implementation.
 */
export class AuthRequest implements IAuthRequest {

	logger: any;
	parent: any;

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
	constructor(public authRequestOptions: any) {

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
	assignOptions(requestConfig: any, requestOptions?: any): void {

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
	request(executeText: string, uniqueID: string, requestConfig: any, requestOptions?: any): void {

		let localLogger = this.logger;
		let localParent = this.parent;

		// Assign the options.
		this.assignOptions(requestConfig, requestOptions);

		try {
			// create new instance.
			const requestInstance = axios.create();

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

					} else if (error.request) {

						// The request was made but no response was received
						localParent.emit('requestError', uniqueID, error.request);

					} else {

						// Something happened in setting up the request that triggered an Error
						localParent.emit('error', uniqueID, error.message);
					}
				})
				.then(function () {
					// always executed
					localParent.emit('executed', uniqueID, 'Executed Request: ' + executeText);
				});
		} catch (e) {
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
	requestAction(executeText: string, uniqueID: string, requestConfig: any, requestOptions: any, responseAction: (id: string, response: any) => void): void {

		let localLogger = this.logger;
		let localParent = this.parent;

		// Assign the options.
		this.assignOptions(requestConfig, requestOptions);

		try {
			// create new instance.
			const requestInstance = axios.create();

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

					} else if (error.request) {

						// The request was made but no response was received
						localParent.emit('requestError', uniqueID, error.request);

					} else {

						// Something happened in setting up the request that triggered an Error
						localParent.emit('error', uniqueID, error.message);
					}
				})
				.then(function () {
					// always executed
					localParent.emit('executed', uniqueID, 'Executed Request: ' + executeText);
				});
		} catch (e) {
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
	requestPromise(executeText: string, uniqueID: string, requestConfig: any, requestOptions?: any): axiosInt.AxiosPromise<any> {

		let localLogger = this.logger;

		// Assign the options.
		this.assignOptions(requestConfig, requestOptions);

		try {
			// create new instance.
			const requestInstance = axios.create();

			// make the request.
			return requestInstance.request(requestConfig);

		} catch (e) {
			localLogger.error(uniqueID, e);
			return null;
		}
	}
}