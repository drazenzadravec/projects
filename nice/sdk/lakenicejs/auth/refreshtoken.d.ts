import { IAuthRequest } from './AuthBase';
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
export declare class RefreshToken implements IRefreshToken {
    refreshTokenOptions: any;
    authrequest: IAuthRequest;
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
    constructor(refreshTokenOptions: any);
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
