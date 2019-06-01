import { IApiBase, IApiRequest } from '../ApiBase';
import { IAddressBook } from './addressbook';
import { IAgents } from './agents';
import { IContacts } from './contacts';
import { IGeneral } from './general';
import { IGroups } from './groups';
import { ILists } from './lists';
import { IScheduledCallbacksAdmin } from './scheduledcallbacks-admin';
import { ISkills } from './skills';
/**
 * Admin client interface.
 */
export interface IAdminClient extends IApiBase {
    /**
     * get the addressbook interface.
     * @return {IAddressBook}    The address book.
    */
    getAddressbook(): IAddressBook;
    /**
     * get the agents interface.
     * @return {IAgents}    The agents.
    */
    getAgents(): IAgents;
    /**
     * get the contacts interface.
     * @return {IContacts}    The contacts.
    */
    getContacts(): IContacts;
    /**
     * get the general interface.
     * @return {IGeneral}    The general.
    */
    getGeneral(): IGeneral;
    /**
     * get the groups interface.
     * @return {IGroups}    The groups.
    */
    getGroups(): IGroups;
    /**
     * get the lists interface.
     * @return {ILists}    The lists.
    */
    getLists(): ILists;
    /**
     * get the scheduled callbacks interface.
     * @return {IScheduledCallbacks}    The scheduled callbacks.
    */
    getScheduledCallbacks(): IScheduledCallbacksAdmin;
    /**
     * get the skills interface.
     * @return {ISkills}    The skills.
    */
    getSkills(): ISkills;
}
/**
 * Admin client implementation.
 */
export declare class AdminClient implements IAdminClient {
    adminOptions: any;
    apirequest: IApiRequest;
    addressbook: IAddressBook;
    agents: IAgents;
    contacts: IContacts;
    general: IGeneral;
    groups: IGroups;
    lists: ILists;
    scheduledcallbacks: IScheduledCallbacksAdmin;
    skills: ISkills;
    config: any;
    logger: any;
    parent: any;
    /**
     * Admin api implementation.
     *
     * @param {Object}   adminOptions  A collection of options.
     *
     * @example
     *  options = {
     *		debug: true,
     *      domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
     *      baseURIPath: "/services/v15.0/",
     *      authorization: "Bearer [Token Value]",
     *      timeout: 10000, // default is '0' (0 seconds timeout)
     *
     *  }
     */
    constructor(adminOptions: any);
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
     * get the addressbook interface.
     * @return {IAddressBook}    The address book.
    */
    getAddressbook(): IAddressBook;
    /**
     * get the agents interface.
     * @return {IAgents}    The agents.
    */
    getAgents(): IAgents;
    /**
     * get the agents interface.
     * @return {IContacts}    The contacts.
    */
    getContacts(): IContacts;
    /**
     * get the general interface.
     * @return {IGeneral}    The general.
    */
    getGeneral(): IGeneral;
    /**
     * get the groups interface.
     * @return {IGroups}    The groups.
    */
    getGroups(): IGroups;
    /**
     * get the lists interface.
     * @return {ILists}    The lists.
    */
    getLists(): ILists;
    /**
     * get the scheduled callbacks interface.
     * @return {IScheduledCallbacksAdmin}    The scheduled callbacks.
    */
    getScheduledCallbacks(): IScheduledCallbacksAdmin;
    /**
     * get the skills interface.
     * @return {ISkills}    The skills.
    */
    getSkills(): ISkills;
}
