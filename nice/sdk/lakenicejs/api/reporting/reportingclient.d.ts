import { IApiBase, IApiRequest } from '../ApiBase';
import { IReporting } from './reporting';
import { IWFMData } from './wfmdata';
/**
 * ReportingClient client interface.
 */
export interface IReportingClient extends IApiBase {
    /**
     * get the Reporting interface.
     * @return {IReporting}    The Reporting.
    */
    getReporting(): IReporting;
    /**
     * get the WFMData interface.
     * @return {IWFMData}    The WFMData.
    */
    getWFMData(): IWFMData;
}
/**
 * ReportingClient client implementation.
 */
export declare class ReportingClient implements IReportingClient {
    reportingClientOptions: any;
    apirequest: IApiRequest;
    reporting: IReporting;
    wfmdata: IWFMData;
    config: any;
    logger: any;
    parent: any;
    /**
     * ReportingClient api implementation.
     *
     * @param {Object}   reportingClientOptions  A collection of options.
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
    constructor(reportingClientOptions: any);
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
     * get the Reporting interface.
     * @return {IReporting}    The Reporting.
    */
    getReporting(): IReporting;
    /**
     * get the WFMData interface.
     * @return {IWFMData}    The WFMData.
    */
    getWFMData(): IWFMData;
}
