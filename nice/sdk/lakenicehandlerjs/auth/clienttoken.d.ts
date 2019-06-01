import { ILakeNiceAuthClient } from '../../../lakenicejs/base/lakenice-auth-client';
/**
* ClientToken handler interface.
*/
export interface IHClientToken {
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
     * Get the access token for the default.
     *
     * @param {string}   authorizationKey  The base64 encoded authorization key.
     * @param {Object}   requestOptions  A collection of request options.
     *
     * @example
     *  options = {
     *      domainURIPath: "https://au1.nice-incontact.com",
     *      baseURIPath: "/InContactAuthorizationServer/Token",
     *      scope: "[AdminAPI AgentAPI]"
     *  }
    */
    getAccessTokenAsync(authorizationKey: string, requestOptions?: any): void;
}
/**
 * ClientToken handler implementation.
 */
export declare class HClientToken implements IHClientToken {
    lakeNiceAuthClient: ILakeNiceAuthClient;
    clientTokenHandlerOptions: any;
    config: any;
    logger: any;
    parent: any;
    /**
     * ClientToken handler implementation.
     *
     * @param {ILakeNiceAuthClient}	lakeNiceAuthClient			Lake Nice Auth client interface.
     * @param {Object}				clientTokenHandlerOptions	A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *  }
     */
    constructor(lakeNiceAuthClient: ILakeNiceAuthClient, clientTokenHandlerOptions: any);
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
     * Get the access token for the default.
     *
     * @param {string}   authorizationKey  The base64 encoded authorization key.
     * @param {Object}   requestOptions  A collection of request options.
     *
     * @example
     *  options = {
     *      domainURIPath: "https://au1.nice-incontact.com",
     *      baseURIPath: "/InContactAuthorizationServer/Token",
     *      scope: "[AdminAPI AgentAPI]"
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
