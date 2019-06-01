import { IAuthBase, IAuthRequest } from './AuthBase';
import { IPasswordToken } from './passwordtoken';
import { IClientToken } from './clienttoken';
import { IUserToken } from './usertoken';
import { IRefreshToken } from './refreshtoken';
import { IImplicitToken } from './implicittoken';
/**
 * AuthClient client interface.
 */
export interface IAuthClient extends IAuthBase {
    /**
    * get the PasswordToken interface.
    * @return {IPasswordToken}    The PasswordToken.
    */
    getPasswordToken(): IPasswordToken;
    /**
    * get the ClientToken interface.
    * @return {IClientToken}    The ClientToken.
    */
    getClientToken(): IClientToken;
    /**
    * get the UserToken interface.
    * @return {IUserToken}    The UserToken.
    */
    getUserToken(): IUserToken;
    /**
    * get the RefreshToken interface.
    * @return {IRefreshToken}    The RefreshToken.
    */
    getRefreshToken(): IRefreshToken;
    /**
    * get the ImplicitToken interface.
    * @return {IImplicitToken}    The ImplicitToken.
    */
    getImplicitToken(): IImplicitToken;
    /**
     * Create the base64 encoded authorization key.
     *
     * @param {string}		appName				The application name.
     * @param {string}		vendorName			The vendor name.
     * @param {string}		businessUnitNumber	The business unit number.
     * @return {string}		The base64 encoded authorization key.
    */
    createAuthorizationKey(appName: string, vendorName: string, businessUnitNumber?: string): string;
    /**
     * Get the base64 decoded authorization key.
     *
     * @param {string}		authKey		The base64 encoded authorization key.
     * @return {string}		The base64 decoded authorization key.
    */
    getAuthorizationKey(authKey: string): string;
    /**
     * Create the base64 encoded authorization key.
     *
     * @param {string}		appName			The application name.
     * @param {string}		vendorName		The vendor name.
     * @param {string}		applicationId	The application id.
     * @return {string}		The base64 encoded authorization key.
    */
    createAuthorizationAppIdKey(appName: string, vendorName: string, applicationId: string): string;
}
/**
 * AuthClient client implementation.
 */
export declare class AuthClient implements IAuthClient {
    authClientOptions: any;
    authrequest: IAuthRequest;
    passwordtoken: IPasswordToken;
    clienttoken: IClientToken;
    usertoken: IUserToken;
    refreshtoken: IRefreshToken;
    implicittoken: IImplicitToken;
    config: any;
    logger: any;
    parent: any;
    /**
     * AuthClient api implementation.
     *
     * @param {Object}   authClientOptions  A collection of options.
     *
     * @example
     *  options = {
     *		debug: true,
     *      domainURIPath: "https://au1.nice-incontact.com",
     *      timeout: 10000, // default is '0' (0 seconds timeout)
     *  }
     */
    constructor(authClientOptions: any);
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
    /**
    * get the PasswordToken interface.
    * @return {IPasswordToken}    The PasswordToken.
    */
    getPasswordToken(): IPasswordToken;
    /**
    * get the ClientToken interface.
    * @return {IClientToken}    The ClientToken.
    */
    getClientToken(): IClientToken;
    /**
    * get the UserToken interface.
    * @return {IUserToken}    The UserToken.
    */
    getUserToken(): IUserToken;
    /**
    * get the RefreshToken interface.
    * @return {IRefreshToken}    The RefreshToken.
    */
    getRefreshToken(): IRefreshToken;
    /**
    * get the ImplicitToken interface.
    * @return {IImplicitToken}    The ImplicitToken.
    */
    getImplicitToken(): IImplicitToken;
    /**
     * Create the base64 encoded authorization key.
     *
     * @param {string}		appName				The application name.
     * @param {string}		vendorName			The vendor name.
     * @param {string}		businessUnitNumber	The business unit number.
     * @return {string}		The base64 encoded authorization key.
    */
    createAuthorizationKey(appName: string, vendorName: string, businessUnitNumber?: string): string;
    /**
     * Get the base64 decoded authorization key.
     *
     * @param {string}		authKey		The base64 encoded authorization key.
     * @return {string}		The base64 decoded authorization key.
    */
    getAuthorizationKey(authKey: string): string;
    /**
     * Create the base64 encoded authorization key.
     *
     * @param {string}		appName			The application name.
     * @param {string}		vendorName		The vendor name.
     * @param {string}		applicationId	The application id.
     * @return {string}		The base64 encoded authorization key.
    */
    createAuthorizationAppIdKey(appName: string, vendorName: string, applicationId: string): string;
}
