import { IApiBase, IApiRequest } from '../ApiBase';
import { IAuthenticate } from './authenticate';
/**
 * Authentication client interface.
 */
export interface IAuthenticationClient extends IApiBase {
    /**
     * get the Authenticate interface.
     * @return {IAuthenticate}    The Authenticate.
    */
    getAuthenticate(): IAuthenticate;
}
/**
 * Authentication client implementation.
 */
export declare class AuthenticationClient implements IAuthenticationClient {
    authenticationOptions: any;
    apirequest: IApiRequest;
    authenticate: IAuthenticate;
    config: any;
    logger: any;
    parent: any;
    /**
     * Authentication api implementation.
     *
     * @param {Object}   authenticationOptions  A collection of options.
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
    constructor(authenticationOptions: any);
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event function.
     */
    on(arg0: string, arg1: (event: any, val1: any, val2: any, val3: any) => void): any;
    /**
     * Get the auth request.
     *
     * @return {IApiRequest}		The api request.
    */
    getApiRequest(): IApiRequest;
    /**
     * get the Authenticate interface.
     * @return {IAuthenticate}    The Authenticate.
    */
    getAuthenticate(): IAuthenticate;
}
