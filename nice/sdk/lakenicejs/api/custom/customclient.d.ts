import { IApiBase, IApiRequest } from '../ApiBase';
import { ISample } from './sample';
/**
 * Custom client interface.
 */
export interface ICustomClient extends IApiBase {
    /**
     * get the Sample interface.
     * @return {ISample}    The Sample.
    */
    getSample(): ISample;
}
/**
 * Custom client implementation.
 */
export declare class CustomClient implements ICustomClient {
    customOptions: any;
    apirequest: IApiRequest;
    sample: ISample;
    config: any;
    logger: any;
    parent: any;
    /**
     * Custom api implementation.
     *
     * @param {Object}   customOptions  A collection of options.
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
    constructor(customOptions: any);
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
     * get the Sample interface.
     * @return {ISample}    The Sample.
    */
    getSample(): ISample;
}
