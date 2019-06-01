import { IApiBase, IApiRequest } from '../ApiBase';
import { ICallback } from './callback';
import { IChatRequestsPatron } from './chatrequests-patron';
import { IWorkItem } from './workitem';
/**
 * Patron client interface.
 */
export interface IPatronClient extends IApiBase {
    /**
     * get the Callback interface.
     * @return {ICallback}    The Callback.
    */
    getCallback(): ICallback;
    /**
     * get the ChatRequests interface.
     * @return {IChatRequestsPatron}    The ChatRequests.
    */
    getChatRequests(): IChatRequestsPatron;
    /**
     * get the WorkItem interface.
     * @return {IWorkItem}    The WorkItem.
    */
    getWorkItem(): IWorkItem;
}
/**
 * Patron client implementation.
 */
export declare class PatronClient implements IPatronClient {
    patronOptions: any;
    apirequest: IApiRequest;
    callback: ICallback;
    chatrequests: IChatRequestsPatron;
    workitem: IWorkItem;
    config: any;
    logger: any;
    parent: any;
    /**
     * Patron api implementation.
     *
     * @param {Object}   patronOptions  A collection of options.
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
    constructor(patronOptions: any);
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
     * get the Callback interface.
     * @return {ICallback}    The Callback.
    */
    getCallback(): ICallback;
    /**
     * get the ChatRequests interface.
     * @return {IChatRequestsPatron}    The ChatRequests.
    */
    getChatRequests(): IChatRequestsPatron;
    /**
     * get the WorkItem interface.
     * @return {IWorkItem}    The WorkItem.
    */
    getWorkItem(): IWorkItem;
}
