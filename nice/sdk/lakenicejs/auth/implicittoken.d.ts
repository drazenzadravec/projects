import { IAuthRequest } from './AuthBase';
/**
 * ImplicitToken api interface.
 */
export interface IImplicitToken {
    /**
     * Get the implicit token request URI.
     *
     * @param {Object}		tokenImplicitRequest  The token request.
     * @return {string}		The Uri implicit token request.
    */
    getTokenRequest(tokenImplicitRequest: any): string;
}
/**
 * ImplicitToken api implementation.
 */
export declare class ImplicitToken implements IImplicitToken {
    implicitTokenOptions: any;
    authrequest: IAuthRequest;
    config: any;
    logger: any;
    parent: any;
    uniqueID: string;
    /**
     * ImplicitToken api implementation.
     *
     * @param {Object}   implicitTokenOptions  A collection of options.
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
    constructor(implicitTokenOptions: any);
    /**
     * Get the implicit token request URI.
     *
     * @param {Object}		tokenImplicitRequest  The token request.
     * @return {string}		The Uri implicit token request.
    */
    getTokenRequest(tokenImplicitRequest: any): string;
}
