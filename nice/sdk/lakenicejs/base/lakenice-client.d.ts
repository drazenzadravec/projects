import { IAdminClient } from '../api/admin/adminclient';
import { IAgentClient } from '../api/agent/agentclient';
import { IAuthenticationClient } from '../api/authentication/authenticationclient';
import { ICustomClient } from '../api/custom/customclient';
import { IPatronClient } from '../api/patron/patronclient';
import { IRealTimeDataClient } from '../api/realtimedata/realtimedataclient';
import { IReportingClient } from '../api/reporting/reportingclient';
/**
 * Lake Nice client interface.
 */
export interface ILakeNiceClient {
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event arguments.
     */
    on(arg0: string, arg1: any): any;
    /**
     * get the AdminClient interface.
     * @return {IAdminClient}    The AdminClient.
    */
    getAdminClient(): IAdminClient;
    /**
     * get the AgentClient interface.
     * @return {IAgentClient}    The AgentClient.
    */
    getAgentClient(): IAgentClient;
    /**
     * get the AuthenticationClient interface.
     * @return {IAuthenticationClient}    The AuthenticationClient.
    */
    getAuthenticationClient(): IAuthenticationClient;
    /**
     * get the CustomClient interface.
     * @return {ICustomClient}    The CustomClient.
    */
    getCustomClient(): ICustomClient;
    /**
     * get the PatronClient interface.
     * @return {IPatronClient}    The PatronClient.
    */
    getPatronClient(): IPatronClient;
    /**
     * get the RealTimeDataClient interface.
     * @return {IRealTimeDataClient}    The RealTimeDataClient.
    */
    getRealTimeDataClient(): IRealTimeDataClient;
    /**
     * get the ReportingClient interface.
     * @return {IReportingClient}    The ReportingClient.
    */
    getReportingClient(): IReportingClient;
}
/**
 * Lake Nice client implementation.
 */
export declare class LakeNiceClient implements ILakeNiceClient {
    clientOptions: any;
    adminclient: IAdminClient;
    agentclient: IAgentClient;
    authenticationclient: IAuthenticationClient;
    customclient: ICustomClient;
    patronclient: IPatronClient;
    realtimedataclient: IRealTimeDataClient;
    reportingclient: IReportingClient;
    config: any;
    logger: any;
    /**
    * Lake Nice client api implementation.
    *
    * Lake Nice client controls the interaction between the
    * web service and client-side.
    *
    * @param {Object}   clientOptions  A collection of options.
    *
    * @example
    *  options = {
    *		debug: true,
    *		domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
    *		baseURIPath: "/services/v15.0/",
    *		authorization: "Bearer [Token Value]",
    *       timeout: 10000, // default is '0' (0 seconds timeout)
    *  }
    */
    constructor(clientOptions: any);
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event arguments.
     */
    on(arg0: string, arg1: any): any;
    /**
     * get the AdminClient interface.
     * @return {IAdminClient}    The AdminClient.
    */
    getAdminClient(): IAdminClient;
    /**
     * get the AgentClient interface.
     * @return {IAgentClient}    The AgentClient.
    */
    getAgentClient(): IAgentClient;
    /**
     * get the AuthenticationClient interface.
     * @return {IAuthenticationClient}    The AuthenticationClient.
    */
    getAuthenticationClient(): IAuthenticationClient;
    /**
     * get the CustomClient interface.
     * @return {ICustomClient}    The CustomClient.
    */
    getCustomClient(): ICustomClient;
    /**
     * get the PatronClient interface.
     * @return {IPatronClient}    The PatronClient.
    */
    getPatronClient(): IPatronClient;
    /**
     * get the RealTimeDataClient interface.
     * @return {IRealTimeDataClient}    The RealTimeDataClient.
    */
    getRealTimeDataClient(): IRealTimeDataClient;
    /**
     * get the ReportingClient interface.
     * @return {IReportingClient}    The ReportingClient.
    */
    getReportingClient(): IReportingClient;
}
