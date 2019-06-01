import { ILakeNiceAuthClient } from '../../../lakenicejs/base/lakenice-auth-client';
/**
* UserToken handler interface.
*/
export interface IHUserToken {
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
     * Get the access token from the user refresh token.
     *
     * @param {string}   refreshToken  The user refresh token.
     * @param {Object}   requestOptions  A collection of request options.
     *
     * @example
     *  options = {
     *      domainURIPath: "https://au1.nice-incontact.com",
     *      refreshBaseURIPath: "/public/user/refresh",
     *      accesskeyBaseURIPath: "/access-key-management/v1/access-keys",
     *      generateBaseURIPath: "/authentication/v1/token/access-key"
     *  }
    */
    getAccessTokenAsync(refreshToken: string, requestOptions?: any): void;
}
/**
 * UserToken handler implementation.
 */
export declare class HUserToken implements IHUserToken {
    lakeNiceAuthClient: ILakeNiceAuthClient;
    userTokenHandlerOptions: any;
    config: any;
    logger: any;
    parent: any;
    /**
     * UserToken handler implementation.
     *
     * @param {ILakeNiceAuthClient}	lakeNiceAuthClient			Lake Nice Auth client interface.
     * @param {Object}				userTokenHandlerOptions		A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *  }
     */
    constructor(lakeNiceAuthClient: ILakeNiceAuthClient, userTokenHandlerOptions: any);
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
     * Get the access token from the user refresh token.
     *
     * @param {string}   refreshToken  The user refresh token.
     * @param {Object}   requestOptions  A collection of request options.
     *
     * @example
     *  options = {
     *      domainURIPath: "https://au1.nice-incontact.com",
     *      refreshBaseURIPath: "/public/user/refresh",
     *      accesskeyBaseURIPath: "/access-key-management/v1/access-keys",
     *      generateBaseURIPath: "/authentication/v1/token/access-key"
     *  }
    */
    getAccessTokenAsync(refreshToken: string, requestOptions?: any): void;
    /**
     * Handle the user create access key.
     *
     * @param {Object}   refreshTokenData  A collection of refresh token data.
     * @param {Object}   requestConfig  A collection of request options.
     * @param {Object}   baseURIPathOptions  A collection of request base URL path options.
    */
    private getUserCreateAccessKey;
    /**
     * Handle the user generate token.
     *
     * @param {Object}   createAccessKeyData  A collection of create access key data.
     * @param {Object}   requestConfig  A collection of request options.
     * @param {Object}   baseURIPathOptions  A collection of request base URL path options.
    */
    private getUserGenerateToken;
    /**
     * Handle the action.
     *
     * @param {Object}   argOptions  A collection of argument options.
    */
    private getRefreshTokenAsync;
    /**
     * Handle the action.
     *
     * @param {Object}   argOptions  A collection of argument options.
    */
    private getCreateAccessKeyAsync;
    /**
     * Handle the action.
     *
     * @param {Object}   argOptions  A collection of argument options.
    */
    private getGenerateTokenAsync;
}
