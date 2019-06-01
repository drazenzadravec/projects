import { IApiRequest } from '../ApiBase';
/**
 * Emails api interface.
 */
export interface IEmails {
    /**
    * Add email contact.
    *
    * @param {string}   sessionId		The session id.
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
    addEmailContactAsync(sessionId: string, requestOptions?: any): void;
    /**
    * Creates outbound email contact.
    *
    * @param {string}   sessionId		The session id.
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
    createsOutboundEmailContactAsync(sessionId: string, requestOptions?: any): void;
    /**
    * Forwards an email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    forwardsEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Reply to email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    replyToEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Sends email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    sendsEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Transfer email to agent.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    transferEmailToAgentAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Transfer email to skill.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    transferEmailToSkillAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Parks email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    parksEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Un-Parks email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    unParksEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Preview email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    previewEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Restore email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    restoreEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * End email contact.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    endEmailContactAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Save email draft.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    saveDraftAsync(sessionId: string, contactId: number, requestOptions?: any): void;
}
/**
 * Emails api implementation.
 */
export declare class Emails implements IEmails {
    emailsOptions: any;
    apirequest: IApiRequest;
    config: any;
    logger: any;
    parent: any;
    uniqueID: string;
    /**
     * Emails api implementation.
     *
     * @param {Object}   emailsOptions  A collection of options.
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
    constructor(emailsOptions: any);
    /**
    * Add email contact.
    *
    * @param {string}   sessionId		The session id.
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
    addEmailContactAsync(sessionId: string, requestOptions?: any): void;
    /**
    * Creates outbound email contact.
    *
    * @param {string}   sessionId		The session id.
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
    createsOutboundEmailContactAsync(sessionId: string, requestOptions?: any): void;
    /**
    * Forwards an email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    forwardsEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Reply to email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    replyToEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Sends email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    sendsEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Transfer email to agent.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    transferEmailToAgentAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Transfer email to skill.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    transferEmailToSkillAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Parks email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    parksEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Un-Parks email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    unParksEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Preview email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    previewEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Restore email.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    restoreEmailAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * End email contact.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    endEmailContactAsync(sessionId: string, contactId: number, requestOptions?: any): void;
    /**
    * Save email draft.
    *
    * @param {string}   sessionId		The session id.
    * @param {number}   contactId		The contact id.
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
    saveDraftAsync(sessionId: string, contactId: number, requestOptions?: any): void;
}
