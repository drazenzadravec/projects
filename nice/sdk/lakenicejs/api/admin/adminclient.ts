// Require packages.
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IApiBase, IApiRequest, ApiRequest } from '../ApiBase';
import { IAddressBook, AddressBook } from './addressbook';
import { IAgents, Agents } from './agents';
import { IContacts, Contacts } from './contacts';
import { IGeneral, General } from './general';
import { IGroups, Groups } from './groups';
import { ILists, Lists } from './lists';
import { IScheduledCallbacksAdmin, ScheduledCallbacksAdmin } from './scheduledcallbacks-admin';
import { ISkills, Skills } from './skills';

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
export class AdminClient implements IAdminClient {

	// global
	apirequest: IApiRequest;

	// global
	addressbook: IAddressBook;
	agents: IAgents;
	contacts: IContacts;
	general: IGeneral;
	groups: IGroups;
	lists: ILists;
	scheduledcallbacks: IScheduledCallbacksAdmin;
	skills: ISkills;

	// global
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
	constructor(public adminOptions: any) {

		// local.
		let self = this;
		let parent = adminOptions.parent;
		let item;

		let options = adminOptions || {};
		let config = this.config = {
			debug: false,
			domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
			baseURIPath: "/services/v15.0/",
			authorization: "Bearer [Token Value]",
			timeout: 0
		};

		// Call WildEmitter constructor.
		wildemitter.mixin(AdminClient);

		// Log nothing by default, following "the rule of silence":
		// http://www.linfo.org/rule_of_silence.html
		let logger = function () {

			// Assume that if you're in debug mode and you didn't
			// pass in a logger, you actually want to log as much as
			// possible.
			if (adminOptions.debug) {
				return adminOptions.logger || console;
			}
			else {
				// Use your logger which should have its own logic
				// for output. Return the no-op.
				return adminOptions.logger || mockconsole;
			}
		}();

		this.logger = logger;
		this.parent = parent;

		// Set options, override existing.
		for (item in options) {
			if (options.hasOwnProperty(item)) {
				this.config[item] = options[item];
			}
		}

		// Assign parent.
		this.config.parent = self;

		// log events in debug mode
		if (this.config.debug) {

			// Capture all events.
			this.on('*', function (event, val1, val2, val3) {

				var logger;

				// if you didn't pass in a logger and you explicitly turning on debug
				// we're just going to assume you're wanting log output with console.
				if (self.config.logger === mockconsole) {
					logger = console;
				}
				else {
					logger = self.logger;
				}

				// Log the event.
				logger.log('Admin Event:', event, val1, val2);
			});
		}

		// Create the request instance.
		this.apirequest = new ApiRequest(this.config);

		this.addressbook = new AddressBook(this.config);
		this.agents = new Agents(this.config);
		this.contacts = new Contacts(this.config);
		this.general = new General(this.config);
		this.groups = new Groups(this.config);
		this.lists = new Lists(this.config);
		this.scheduledcallbacks = new ScheduledCallbacksAdmin(this.config);
		this.skills = new Skills(this.config);
	}

	/**
	 * On event.
	 * @param {string} arg0 Event name.
	 * @param {Object} arg1 Event function.
	 */
	on(arg0: string, arg1: (event: any, val1: any, val2: any, val3: any) => void): any {

	}

	/**
	 * Get the auth request.
	 * 
	 * @return {IApiRequest}		The api request.
	*/
	getApiRequest(): IApiRequest {
		return this.apirequest;
	}

	/**
     * get the addressbook interface.
	 * @return {IAddressBook}    The address book.
    */
	getAddressbook(): IAddressBook {
		return this.addressbook;
	}

	/**
     * get the agents interface.
	 * @return {IAgents}    The agents.
    */
	getAgents(): IAgents {
		return this.agents;
	}

	/**
     * get the agents interface.
	 * @return {IContacts}    The contacts.
    */
	getContacts(): IContacts {
		return this.contacts;
	}

	/**
     * get the general interface.
	 * @return {IGeneral}    The general.
    */
	getGeneral(): IGeneral {
		return this.general;
	}

	/**
     * get the groups interface.
	 * @return {IGroups}    The groups.
    */
	getGroups(): IGroups {
		return this.groups;
	}

	/**
     * get the lists interface.
	 * @return {ILists}    The lists.
    */
	getLists(): ILists {
		return this.lists;
	}

	/**
     * get the scheduled callbacks interface.
	 * @return {IScheduledCallbacksAdmin}    The scheduled callbacks.
    */
	getScheduledCallbacks(): IScheduledCallbacksAdmin {
		return this.scheduledcallbacks;
	}

	/**
     * get the skills interface.
	 * @return {ISkills}    The skills.
    */
	getSkills(): ISkills {
		return this.skills;
	}
}