import { IApiBase, IApiRequest } from '../ApiBase';
import { IAgentPhone } from './agentphone';
import { IChatRequestsAgent } from './chatrequests-agent';
import { IEmails } from './emails';
import { IPersonalCon } from './personalcon';
import { IPhoneCalls } from './phonecalls';
import { IScheduledCallbacksAgent } from './scheduledcallbacks-agent';
import { ISessions } from './sessions';
import { ISupervisor } from './supervisor';
import { IVoicemails } from './voicemails';
import { IWorkItems } from './workitems';
/**
 * Agent client interface.
 */
export interface IAgentClient extends IApiBase {
    /**
     * get the AgentPhone interface.
     * @return {IAgentPhone}    The AgentPhone.
    */
    getAgentPhone(): IAgentPhone;
    /**
     * get the ChatRequests interface.
     * @return {IChatRequestsAgent}    The ChatRequests.
    */
    getChatRequestsAgent(): IChatRequestsAgent;
    /**
     * get the Emails interface.
     * @return {IEmails}    The Emails.
    */
    getEmails(): IEmails;
    /**
     * get the PersonalCon interface.
     * @return {IPersonalCon}    The PersonalCon.
    */
    getPersonalCon(): IPersonalCon;
    /**
     * get the PhoneCalls interface.
     * @return {IPhoneCalls}    The PhoneCalls.
    */
    getPhoneCalls(): IPhoneCalls;
    /**
     * get the ScheduledCallbacks interface.
     * @return {IScheduledCallbacksAgent}    The IScheduledCallbacks.
    */
    getScheduledCallbacksAgent(): IScheduledCallbacksAgent;
    /**
     * get the Sessions interface.
     * @return {ISessions}    The Sessions.
    */
    getSessions(): ISessions;
    /**
     * get the Supervisor interface.
     * @return {ISupervisor}    The Supervisor.
    */
    getSupervisor(): ISupervisor;
    /**
     * get the Voicemails interface.
     * @return {IVoicemails}    The Voicemails.
    */
    getVoicemails(): IVoicemails;
    /**
     * get the WorkItems interface.
     * @return {IWorkItems}    The WorkItems.
    */
    getWorkItems(): IWorkItems;
}
/**
 * Agent client implementation.
 */
export declare class AgentClient implements IAgentClient {
    agentOptions: any;
    apirequest: IApiRequest;
    agentphone: IAgentPhone;
    chatrequests: IChatRequestsAgent;
    emails: IEmails;
    personalcon: IPersonalCon;
    phonecalls: IPhoneCalls;
    scheduledcallbacks: IScheduledCallbacksAgent;
    sessions: ISessions;
    supervisor: ISupervisor;
    voicemails: IVoicemails;
    workitems: IWorkItems;
    config: any;
    logger: any;
    parent: any;
    /**
     * Agent api implementation.
     *
     * @param {Object}   agentOptions  A collection of options.
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
    constructor(agentOptions: any);
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
     * get the AgentPhone interface.
     * @return {IAgentPhone}    The AgentPhone.
    */
    getAgentPhone(): IAgentPhone;
    /**
     * get the ChatRequests interface.
     * @return {IChatRequestsAgent}    The ChatRequests.
    */
    getChatRequestsAgent(): IChatRequestsAgent;
    /**
     * get the Emails interface.
     * @return {IEmails}    The Emails.
    */
    getEmails(): IEmails;
    /**
     * get the PersonalCon interface.
     * @return {IPersonalCon}    The PersonalCon.
    */
    getPersonalCon(): IPersonalCon;
    /**
     * get the PhoneCalls interface.
     * @return {IPhoneCalls}    The PhoneCalls.
    */
    getPhoneCalls(): IPhoneCalls;
    /**
     * get the ScheduledCallbacks interface.
     * @return {IScheduledCallbacksAgent}    The IScheduledCallbacks.
    */
    getScheduledCallbacksAgent(): IScheduledCallbacksAgent;
    /**
     * get the Sessions interface.
     * @return {ISessions}    The Sessions.
    */
    getSessions(): ISessions;
    /**
     * get the Supervisor interface.
     * @return {ISupervisor}    The Supervisor.
    */
    getSupervisor(): ISupervisor;
    /**
     * get the Voicemails interface.
     * @return {IVoicemails}    The Voicemails.
    */
    getVoicemails(): IVoicemails;
    /**
     * get the WorkItems interface.
     * @return {IWorkItems}    The WorkItems.
    */
    getWorkItems(): IWorkItems;
}
