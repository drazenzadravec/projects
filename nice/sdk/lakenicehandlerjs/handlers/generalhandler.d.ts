import { ILakeNiceClient } from '../../lakenicejs/base/lakenice-client';
import { ILakeNiceAuthClient } from '../../lakenicejs/base/lakenice-auth-client';
import { IHandlerBase } from './HandlerBase';
import { IHClientToken } from './auth/clienttoken';
import { IHImplicitToken } from './auth/implicittoken';
import { IHPasswordToken } from './auth/passwordtoken';
import { IHRefreshToken } from './auth/refreshtoken';
import { IHUserToken } from './auth/usertoken';
import { IHAddressBook } from './api/admin/addressbook';
import { IHAgents } from './api/admin/agents';
import { IHContacts } from './api/admin/contacts';
import { IHGeneral } from './api/admin/general';
import { IHGroups } from './api/admin/groups';
import { IHLists } from './api/admin/lists';
import { IHScheduledCallbacksAdmin } from './api/admin/scheduledcallbacks-admin';
import { IHSkills } from './api/admin/skills';
import { IHAgentPhone } from './api/agent/agentphone';
import { IHChatRequestsAgent } from './api/agent/chatrequests-agent';
import { IHEmails } from './api/agent/emails';
import { IHPersonalCon } from './api/agent/personalcon';
import { IHPhoneCalls } from './api/agent/phonecalls';
import { IHScheduledCallbacksAgent } from './api/agent/scheduledcallbacks-agent';
import { IHSessions } from './api/agent/sessions';
import { IHSupervisor } from './api/agent/supervisor';
import { IHVoicemails } from './api/agent/voicemails';
import { IHWorkItems } from './api/agent/workitems';
import { IHAuthenticate } from './api/authentication/authenticate';
import { IHSample } from './api/custom/sample';
import { IHCallback } from './api/patron/callback';
import { IHChatRequestsPatron } from './api/patron/chatrequests-patron';
import { IHWorkItem } from './api/patron/workitem';
import { IHRealTime } from './api/realtimedata/realtime';
import { IHReporting } from './api/reporting/reporting';
import { IHWFMData } from './api/reporting/wfmdata';
/**
 * General handler interface.
 */
export interface IGeneralHandler extends IHandlerBase {
    /**
     * handle general.
     * @param {Object} args Event arguments.
     */
    handleGeneral(args: any): void;
    /**
     * get the ClientToken interface.
     * @return {IHClientToken}    The ClientToken.
    */
    getClientToken(): IHClientToken;
    /**
     * get the ImplicitToken interface.
     * @return {IHImplicitToken}    The ImplicitToken.
    */
    getImplicitToken(): IHImplicitToken;
    /**
     * get the PasswordToken interface.
     * @return {IHPasswordToken}    The PasswordToken.
    */
    getPasswordToken(): IHPasswordToken;
    /**
     * get the RefreshToken interface.
     * @return {IHRefreshToken}    The RefreshToken.
    */
    getRefreshToken(): IHRefreshToken;
    /**
     * get the UserToken interface.
     * @return {IHUserToken}    The UserToken.
    */
    getUserToken(): IHUserToken;
}
/**
 * General handler implementation.
 */
export declare class GeneralHandler implements IGeneralHandler {
    lakeNiceClient: ILakeNiceClient;
    lakeNiceAuthClient: ILakeNiceAuthClient;
    generalHandlerOptions: any;
    clienttoken: IHClientToken;
    implicittoken: IHImplicitToken;
    passwordtoken: IHPasswordToken;
    refreshtoken: IHRefreshToken;
    usertoken: IHUserToken;
    addressbook: IHAddressBook;
    agents: IHAgents;
    contacts: IHContacts;
    general: IHGeneral;
    groups: IHGroups;
    lists: IHLists;
    scheduledcallbacksadmin: IHScheduledCallbacksAdmin;
    skills: IHSkills;
    agentphone: IHAgentPhone;
    chatrequestsagent: IHChatRequestsAgent;
    emails: IHEmails;
    personalcon: IHPersonalCon;
    phonecalls: IHPhoneCalls;
    scheduledcallbacksagent: IHScheduledCallbacksAgent;
    sessions: IHSessions;
    supervisor: IHSupervisor;
    voicemails: IHVoicemails;
    workitems: IHWorkItems;
    authenticate: IHAuthenticate;
    sample: IHSample;
    callback: IHCallback;
    chatrequestspatron: IHChatRequestsPatron;
    workitem: IHWorkItem;
    realtime: IHRealTime;
    reporting: IHReporting;
    wfmdata: IHWFMData;
    config: any;
    logger: any;
    parent: any;
    /**
     * General handler api implementation.
     *
     * @param {ILakeNiceClient}		lakeNiceClient			Lake Nice client interface.
     * @param {ILakeNiceAuthClient}	lakeNiceAuthClient		Lake Nice Auth client interface.
     * @param {Object}				generalHandlerOptions	A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *
     *  }
    */
    constructor(lakeNiceClient: ILakeNiceClient, lakeNiceAuthClient: ILakeNiceAuthClient, generalHandlerOptions: any);
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event function.
    */
    on(arg0: string, arg1: (event: any, val1: any, val2: any, val3: any) => void): any;
    /**
     * get the ClientToken interface.
     * @return {IHClientToken}    The ClientToken.
    */
    getClientToken(): IHClientToken;
    /**
     * get the ImplicitToken interface.
     * @return {IHImplicitToken}    The ImplicitToken.
    */
    getImplicitToken(): IHImplicitToken;
    /**
     * get the PasswordToken interface.
     * @return {IHPasswordToken}    The PasswordToken.
    */
    getPasswordToken(): IHPasswordToken;
    /**
     * get the RefreshToken interface.
     * @return {IHRefreshToken}    The RefreshToken.
    */
    getRefreshToken(): IHRefreshToken;
    /**
     * get the UserToken interface.
     * @return {IHUserToken}    The UserToken.
    */
    getUserToken(): IHUserToken;
    /**
     * handle general.
     * @param {Object} args Event arguments.
    */
    handleGeneral(args: any): void;
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
