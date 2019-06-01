import * as axiosInt from 'axios';
/**
 * API base interface.
 */
export interface IApiBase {
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event function.
     */
    on(arg0: string, arg1: (event: any, val1: any, val2: any, val3: any) => void): any;
    /**
     * Get the auth request.
     *
     * @return {IAuthRequest}		The api request.
    */
    getApiRequest(): IApiRequest;
}
/**
 * API request interface.
 */
export interface IApiRequest {
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
     *      domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
     *      baseURIPath: "/services/v15.0/",
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
     *      domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
     *      baseURIPath: "/services/v15.0/",
     *      authorization: "Bearer [Token Value]",
     *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
    */
    requestPromise(executeText: string, uniqueID: string, requestConfig: any, requestOptions?: any): axiosInt.AxiosPromise<any>;
}
/**
 * API request implementation.
 */
export declare class ApiRequest implements IApiRequest {
    apiRequestOptions: any;
    logger: any;
    parent: any;
    /**
     * API request implementation.
     *
     * @param {Object}   apiRequestOptions  A collection of options.
     *
     * @example
     *  options = {
     *		parent: this
     *  }
     */
    constructor(apiRequestOptions: any);
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
     *		data: { firstName: 'Fred' },
     *	}
     *
     *  requestConfig = {
     *		debug: true,
     *      domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
     *      baseURIPath: "/services/v15.0/",
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
     *		data: { firstName: 'Fred' },
     *	}
     *
     *  requestConfig = {
     *		debug: true,
     *      domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
     *      baseURIPath: "/services/v15.0/",
     *      authorization: "Bearer [Token Value]",
     *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
    */
    requestPromise(executeText: string, uniqueID: string, requestConfig: any, requestOptions?: any): axiosInt.AxiosPromise<any>;
}
