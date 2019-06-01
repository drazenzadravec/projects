import { IApiRequest } from '../ApiBase';
/**
 * ScheduledCallbacks api interface.
 */
export interface IScheduledCallbacksAdmin {
    /**
     * Get scheduled callbacks for an agent.
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
    getAsync(agentId: number, requestOptions?: any): void;
    /**
     * Creates a scheduled callback.
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
    createAsync(requestOptions?: any): void;
    /**
     * Deletes a scheduled callback.
     *
     * @param {number}   callbackId		 The callback id.
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
    deleteAsync(callbackId: number, requestOptions?: any): void;
    /**
     * Updates a scheduled callback.
     *
     * @param {number}   callbackId		 The callback id.
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
    updateAsync(callbackId: number, requestOptions?: any): void;
    /**
     * Gets scheduled callbacks for a skill.
     *
     * @param {number}   skillId		 The skill id.
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
    getSkillCallbackAsync(skillId: number, requestOptions?: any): void;
}
/**
 * ScheduledCallbacks api implementation.
 */
export declare class ScheduledCallbacksAdmin implements IScheduledCallbacksAdmin {
    scheduledCallbacksOptions: any;
    apirequest: IApiRequest;
    config: any;
    logger: any;
    parent: any;
    uniqueID: string;
    /**
     * ScheduledCallbacks api implementation.
     *
     * @param {Object}   scheduledCallbacksOptions  A collection of options.
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
    constructor(scheduledCallbacksOptions: any);
    /**
    * Get scheduled callbacks for an agent.
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
    getAsync(agentId: number, requestOptions?: any): void;
    /**
     * Creates a scheduled callback.
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
    createAsync(requestOptions?: any): void;
    /**
     * Deletes a scheduled callback.
     *
     * @param {number}   callbackId		 The callback id.
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
    deleteAsync(callbackId: number, requestOptions?: any): void;
    /**
     * Updates a scheduled callback.
     *
     * @param {number}   callbackId		 The callback id.
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
    updateAsync(callbackId: number, requestOptions?: any): void;
    /**
     * Gets scheduled callbacks for a skill.
     *
     * @param {number}   skillId		 The skill id.
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
    getSkillCallbackAsync(skillId: number, requestOptions?: any): void;
}
