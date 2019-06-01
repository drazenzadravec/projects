import { IApiBase, IApiRequest } from '../ApiBase';
import { IRealTime } from './realtime';
/**
 * RealTimeDataClient client interface.
 */
export interface IRealTimeDataClient extends IApiBase {
    /**
     * get the RealTime interface.
     * @return {IRealTime}    The RealTime.
    */
    getRealTime(): IRealTime;
}
/**
 * RealTimeDataClient client implementation.
 */
export declare class RealTimeDataClient implements IRealTimeDataClient {
    realTimeDataClientOptions: any;
    apirequest: IApiRequest;
    realtime: IRealTime;
    config: any;
    logger: any;
    parent: any;
    /**
     * RealTimeDataClient api implementation.
     *
     * @param {Object}   realTimeDataClientOptions  A collection of options.
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
    constructor(realTimeDataClientOptions: any);
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
     * get the RealTime interface.
     * @return {IRealTime}    The RealTime.
    */
    getRealTime(): IRealTime;
}
