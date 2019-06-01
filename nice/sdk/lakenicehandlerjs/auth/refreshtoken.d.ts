import { ILakeNiceAuthClient } from '../../../lakenicejs/base/lakenice-auth-client';
/**
* RefreshToken handler interface.
*/
export interface IHRefreshToken {
    /**
     * Handle the action.
     *
     * @param {Object}   argOptions  A collection of argument options.
    */
    handleAction(argOptions?: any): void;
    /**
     * Assign the request options for the specified unique id.
     *
     * @param {string} uniqueID The unique id.
     * @param {Object} requestData The request data.
     *
     * @return {Object}	The request options, either or the 'params' and 'data'.
     *
     * @example
     *  returned data = {
     *		// 'params' are the URL parameters to be sent with the request
     *		// Must be a plain object or a URLSearchParams object
     *		params: { ID: 12345 },
     *
     *		// 'data' is the data to be sent as the request body.
     *		data: { ID: 'Unique' },
     *	}
     */
    assignRequestOptions(uniqueID: string, requestData?: any): any;
    /**
     * Get the access token for the refresh token server uri.
     *
     * @param {string}   authorizationKey  The base64 encoded authorization key.
     * @param {Object}   requestOptions  A collection of request options.
     *
     * @example
     *  options = {
     *      refresh_token_server_uri: "https://api-{cluster}.incontact.com/InContactAuthorizationServer/Token",
     *      refresh_token: "[Token]",
     *  }
    */
    getAccessTokenAsync(authorizationKey: string, requestOptions?: any): void;
}
/**
 * RefreshToken handler implementation.
 */
export declare class HRefreshToken implements IHRefreshToken {
    lakeNiceAuthClient: ILakeNiceAuthClient;
    refreshTokenHandlerOptions: any;
    config: any;
    logger: any;
    parent: any;
    /**
     * RefreshToken handler implementation.
     *
     * @param {ILakeNiceAuthClient}	lakeNiceAuthClient			Lake Nice Auth client interface.
     * @param {Object}				refreshTokenHandlerOptions	A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *  }
     */
    constructor(lakeNiceAuthClient: ILakeNiceAuthClient, refreshTokenHandlerOptions: any);
    /**
     * Handle the action.
     *
     * @param {Object}   argOptions  A collection of argument options.
    */
    handleAction(argOptions?: any): void;
    /**
     * Assign the request options for the specified unique id.
     *
     * @param {string} uniqueID The unique id.
     * @param {Object} requestData The request data.
     *
     * @return {Object}	The request options, either or the 'params' and 'data'.
     *
     * @example
     *  returned data = {
     *		// 'params' are the URL parameters to be sent with the request
     *		// Must be a plain object or a URLSearchParams object
     *		params: { ID: 12345 },
     *
     *		// 'data' is the data to be sent as the request body.
     *		data: { ID: 'Unique' },
     *	}
     */
    assignRequestOptions(uniqueID: string, requestData?: any): any;
    /**
     * Handle the default action.
     *
     * @param {Object}   argOptions  A collection of argument options.
    */
    handleDefaultAction(argOptions?: any): void;
    /**
     * Get the access token for the refresh token server uri.
     *
     * @param {string}   authorizationKey  The base64 encoded authorization key.
     * @param {Object}   requestOptions  A collection of request options.
     *
     * @example
     *  options = {
     *      refresh_token_server_uri: "https://api-{cluster}.incontact.com/InContactAuthorizationServer/Token",
     *      refresh_token: "[Token]",
     *  }
    */
    getAccessTokenAsync(authorizationKey: string, requestOptions?: any): void;
    /**
     * Handle the action.
     *
     * @param {Object}   argOptions  A collection of argument options.
    */
    private getTokenAsync;
}
