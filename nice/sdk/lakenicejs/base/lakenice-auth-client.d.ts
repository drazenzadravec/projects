import { IAuthClient } from '../auth/authclient';
/**
 * Lake Nice auth client interface.
 */
export interface ILakeNiceAuthClient {
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event arguments.
     */
    on(arg0: string, arg1: any): any;
    /**
     * get the AuthClient interface.
     * @return {IAuthClient}    The AuthClient.
    */
    getAuthClient(): IAuthClient;
}
/**
 * Lake Nice auth client implementation.
 */
export declare class LakeNiceAuthClient implements ILakeNiceAuthClient {
    authClientOptions: any;
    authclient: IAuthClient;
    config: any;
    logger: any;
    /**
    * Lake Nice auth client api implementation.
    *
    * Lake Nice auth client controls the interaction between the
    * web service and client-side.
    *
    * @param {Object}   authClientOptions  A collection of options.
    *
    * @example
    *  options = {
    *		debug: true,
    *		domainURIPath: "https://au1.nice-incontact.com",
    *       timeout: 10000, // default is '0' (0 seconds timeout)
    *  }
    */
    constructor(authClientOptions: any);
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event arguments.
     */
    on(arg0: string, arg1: any): any;
    /**
     * get the AuthClient interface.
     * @return {IAuthClient}    The AuthClient.
    */
    getAuthClient(): IAuthClient;
}
