import { IApiRequest } from '../ApiBase';
/**
 * ScheduledCallbacks api interface.
 */
export interface IScheduledCallbacksAgent {
    /**
    * Dial.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   callbackId		The callback id.
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
    dialAsync(sessionId: string, callbackId: number, requestOptions?: any): void;
    /**
    * Reschedule.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   callbackId		The callback id.
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
    rescheduleAsync(sessionId: string, callbackId: number, requestOptions?: any): void;
    /**
    * Cancel.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   callbackId		The callback id.
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
    cancelAsync(sessionId: string, callbackId: number, requestOptions?: any): void;
}
/**
 * ScheduledCallbacks api implementation.
 */
export declare class ScheduledCallbacksAgent implements IScheduledCallbacksAgent {
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
    * Dial.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   callbackId		The callback id.
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
    dialAsync(sessionId: string, callbackId: number, requestOptions?: any): void;
    /**
    * Reschedule.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   callbackId		The callback id.
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
    rescheduleAsync(sessionId: string, callbackId: number, requestOptions?: any): void;
    /**
    * Cancel.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   callbackId		The callback id.
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
    cancelAsync(sessionId: string, callbackId: number, requestOptions?: any): void;
}
