import { ILakeNiceAuthClient } from '../../../lakenicejs/base/lakenice-auth-client';
/**
* PasswordToken handler interface.
*/
export interface IHPasswordToken {
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
     * Get the access token for the username and password.
     *
     * @param {string}   authorizationKey  The base64 encoded authorization key.
     * @param {Object}   requestOptions  A collection of request options.
     *
     * @example
     *  options = {
     *      domainURIPath: "https://au1.nice-incontact.com",
     *      baseURIPath: "/InContactAuthorizationServer/Token",
     *      username: "[username]",
     *      password: "[password]",
     *      scope: "[AdminAPI AgentAPI]"
     *  }
    */
    getAccessTokenAsync(authorizationKey: string, requestOptions?: any): void;
}
/**
 * PasswordToken handler implementation.
 */
export declare class HPasswordToken implements IHPasswordToken {
    lakeNiceAuthClient: ILakeNiceAuthClient;
    passwordTokenHandlerOptions: any;
    config: any;
    logger: any;
    parent: any;
    /**
     * PasswordToken handler implementation.
     *
     * @param {ILakeNiceAuthClient}	lakeNiceAuthClient			Lake Nice Auth client interface.
     * @param {Object}				passwordTokenHandlerOptions	A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *  }
     */
    constructor(lakeNiceAuthClient: ILakeNiceAuthClient, passwordTokenHandlerOptions: any);
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
     * Get the access token for the username and password.
     *
     * @param {string}   authorizationKey  The base64 encoded authorization key.
     * @param {Object}   requestOptions  A collection of request options.
     *
     * @example
     *  options = {
     *      domainURIPath: "https://au1.nice-incontact.com",
     *      baseURIPath: "/InContactAuthorizationServer/Token",
     *      username: "[username]",
     *      password: "[password]",
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
