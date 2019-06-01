import { ILakeNiceClient } from '../../../../lakenicejs/base/lakenice-client';
/**
* Lists handler interface.
*/
export interface IHLists {
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
}
/**
 * Lists handler implementation.
 */
export declare class HLists implements IHLists {
    lakeNiceClient: ILakeNiceClient;
    listsHandlerOptions: any;
    config: any;
    logger: any;
    parent: any;
    /**
     * Lists handler implementation.
     *
     * @param {ILakeNiceClient}		lakeNiceClient			Lake Nice client interface.
     * @param {Object}				listsHandlerOptions		A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *  }
     */
    constructor(lakeNiceClient: ILakeNiceClient, listsHandlerOptions: any);
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
}
