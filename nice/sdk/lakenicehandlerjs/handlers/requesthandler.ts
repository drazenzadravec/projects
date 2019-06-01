/* Lake Nice inContact Handler. */

import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { ILakeNiceClient } from '../../lakenicejs/base/lakenice-client';
import { ILakeNiceAuthClient } from '../../lakenicejs/base/lakenice-auth-client';

import { IHandlerBase } from './HandlerBase';

import { IHClientToken, HClientToken } from './auth/clienttoken';
import { IHImplicitToken, HImplicitToken } from './auth/implicittoken';
import { IHPasswordToken, HPasswordToken } from './auth/passwordtoken';
import { IHRefreshToken, HRefreshToken } from './auth/refreshtoken';
import { IHUserToken, HUserToken } from './auth/usertoken';

import { IHAddressBook, HAddressBook } from './api/admin/addressbook';
import { IHAgents, HAgents } from './api/admin/agents';
import { IHContacts, HContacts } from './api/admin/contacts';
import { IHGeneral, HGeneral } from './api/admin/general';
import { IHGroups, HGroups } from './api/admin/groups';
import { IHLists, HLists } from './api/admin/lists';
import { IHScheduledCallbacksAdmin, HScheduledCallbacksAdmin } from './api/admin/scheduledcallbacks-admin';
import { IHSkills, HSkills } from './api/admin/skills';

import { IHAgentPhone, HAgentPhone } from './api/agent/agentphone';
import { IHChatRequestsAgent, HChatRequestsAgent } from './api/agent/chatrequests-agent';
import { IHEmails, HEmails } from './api/agent/emails';
import { IHPersonalCon, HPersonalCon } from './api/agent/personalcon';
import { IHPhoneCalls, HPhoneCalls } from './api/agent/phonecalls';
import { IHScheduledCallbacksAgent, HScheduledCallbacksAgent } from './api/agent/scheduledcallbacks-agent';
import { IHSessions, HSessions } from './api/agent/sessions';
import { IHSupervisor, HSupervisor } from './api/agent/supervisor';
import { IHVoicemails, HVoicemails } from './api/agent/voicemails';
import { IHWorkItems, HWorkItems } from './api/agent/workitems';

import { IHAuthenticate, HAuthenticate } from './api/authentication/authenticate';

import { IHSample, HSample } from './api/custom/sample';

import { IHCallback, HCallback } from './api/patron/callback';
import { IHChatRequestsPatron, HChatRequestsPatron } from './api/patron/chatrequests-patron';
import { IHWorkItem, HWorkItem } from './api/patron/workitem';

import { IHRealTime, HRealTime } from './api/realtimedata/realtime';

import { IHReporting, HReporting } from './api/reporting/reporting';
import { IHWFMData, HWFMData } from './api/reporting/wfmdata';

/**
 * Request handler interface.
 */
export interface IRequestHandler extends IHandlerBase {

	/**
	 * handle request.
	 * @param {Object} args Event arguments.
	 */
	handleRequest(args: any): void;

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
 * Request handler implementation.
 */
export class RequestHandler implements IRequestHandler {

	// global
	clienttoken: IHClientToken;
	implicittoken: IHImplicitToken;
	passwordtoken: IHPasswordToken;
	refreshtoken: IHRefreshToken;
	usertoken: IHUserToken;

	// global
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

	// global
	config: any;
	logger: any;
	parent: any;

	/**
     * Request handler api implementation.
     * 
	 * @param {ILakeNiceClient}		lakeNiceClient			Lake Nice client interface.
     * @param {ILakeNiceAuthClient}	lakeNiceAuthClient		Lake Nice Auth client interface.
     * @param {Object}				requestHandlerOptions	A collection of options.
     *        
     * @example
     *  options = {
	 *		debug: true
	 *      
     *  }
    */
	constructor(public lakeNiceClient: ILakeNiceClient, public lakeNiceAuthClient: ILakeNiceAuthClient, public requestHandlerOptions: any) {

		// local.
		let self = this;
		let parent = requestHandlerOptions.parent;
		let item;

		let options = requestHandlerOptions || {};
		let config = this.config = {
			debug: false
		};

		// Call WildEmitter constructor.
		wildemitter.mixin(RequestHandler);

		// Log nothing by default, following "the rule of silence":
		// http://www.linfo.org/rule_of_silence.html
		let logger = function () {

			// Assume that if you're in debug mode and you didn't
			// pass in a logger, you actually want to log as much as
			// possible.
			if (requestHandlerOptions.debug) {
				return requestHandlerOptions.logger || console;
			}
			else {
				// Use your logger which should have its own logic
				// for output. Return the no-op.
				return requestHandlerOptions.logger || mockconsole;
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
				logger.log('Request Handler Event:', event, val1, val2);
			});
		}

		this.clienttoken = new HClientToken(this.lakeNiceAuthClient, this.config);
		this.implicittoken = new HImplicitToken(this.lakeNiceAuthClient, this.config);
		this.passwordtoken = new HPasswordToken(this.lakeNiceAuthClient, this.config);
		this.refreshtoken = new HRefreshToken(this.lakeNiceAuthClient, this.config);
		this.usertoken = new HUserToken(this.lakeNiceAuthClient, this.config);

		this.addressbook = new HAddressBook(this.lakeNiceClient, this.config);
		this.agents = new HAgents(this.lakeNiceClient, this.config);
		this.contacts = new HContacts(this.lakeNiceClient, this.config);
		this.general = new HGeneral(this.lakeNiceClient, this.config);
		this.groups = new HGroups(this.lakeNiceClient, this.config);
		this.lists = new HLists(this.lakeNiceClient, this.config);
		this.scheduledcallbacksadmin = new HScheduledCallbacksAdmin(this.lakeNiceClient, this.config);
		this.skills = new HSkills(this.lakeNiceClient, this.config);
		this.agentphone = new HAgentPhone(this.lakeNiceClient, this.config);
		this.chatrequestsagent = new HChatRequestsAgent(this.lakeNiceClient, this.config);
		this.emails = new HEmails(this.lakeNiceClient, this.config);
		this.personalcon = new HPersonalCon(this.lakeNiceClient, this.config);
		this.phonecalls = new HPhoneCalls(this.lakeNiceClient, this.config);
		this.scheduledcallbacksagent = new HScheduledCallbacksAgent(this.lakeNiceClient, this.config);
		this.sessions = new HSessions(this.lakeNiceClient, this.config);
		this.supervisor = new HSupervisor(this.lakeNiceClient, this.config);
		this.voicemails = new HVoicemails(this.lakeNiceClient, this.config);
		this.workitems = new HWorkItems(this.lakeNiceClient, this.config);
		this.authenticate = new HAuthenticate(this.lakeNiceClient, this.config);
		this.sample = new HSample(this.lakeNiceClient, this.config);
		this.callback = new HCallback(this.lakeNiceClient, this.config);
		this.chatrequestspatron = new HChatRequestsPatron(this.lakeNiceClient, this.config);
		this.workitem = new HWorkItem(this.lakeNiceClient, this.config);
		this.realtime = new HRealTime(this.lakeNiceClient, this.config);
		this.reporting = new HReporting(this.lakeNiceClient, this.config);
		this.wfmdata = new HWFMData(this.lakeNiceClient, this.config);
	}

	/**
	 * On event.
	 * @param {string} arg0 Event name.
	 * @param {Object} arg1 Event function.
	*/
	on(arg0: string, arg1: (event: any, val1: any, val2: any, val3: any) => void): any {

	}

	/**
     * get the ClientToken interface.
	 * @return {IHClientToken}    The ClientToken.
    */
	getClientToken(): IHClientToken {
		return this.clienttoken;
	}

	/**
     * get the ImplicitToken interface.
	 * @return {IHImplicitToken}    The ImplicitToken.
    */
	getImplicitToken(): IHImplicitToken {
		return this.implicittoken;
	}

	/**
     * get the PasswordToken interface.
	 * @return {IHPasswordToken}    The PasswordToken.
    */
	getPasswordToken(): IHPasswordToken {
		return this.passwordtoken;
	}

	/**
     * get the RefreshToken interface.
	 * @return {IHRefreshToken}    The RefreshToken.
    */
	getRefreshToken(): IHRefreshToken {
		return this.refreshtoken;
	}

	/**
     * get the UserToken interface.
	 * @return {IHUserToken}    The UserToken.
    */
	getUserToken(): IHUserToken {
		return this.usertoken;
	}

	/**
	 * handle general.
	 * @param {Object} args Event arguments.
	*/
	handleRequest(args: any): void {

		let localParent = this.parent;

		// Get the unique ID of the action.
		let id: string = args.uniqueID.toString();
		let ids: string[] = id.split('.');
		let endPoint = ids[0] + "." + ids[1];

		// Select the request endpoint.
		switch (endPoint) {
			case "Auth.ClientToken": {
				this.clienttoken.handleAction(args);
				break;
			}
			case "Auth.ImplicitToken": {
				this.implicittoken.handleAction(args);
				break;
			}
			case "Auth.PasswordToken": {
				this.passwordtoken.handleAction(args);
				break;
			}
			case "Auth.RefreshToken": {
				this.refreshtoken.handleAction(args);
				break;
			}
			case "Auth.UserToken": {
				this.usertoken.handleAction(args);
				break;
			}
			case "Admin.AddressBook": {
				this.addressbook.handleAction(args);
				break;
			}
			case "Admin.Agents": {
				this.agents.handleAction(args);
				break;
			}
			case "Admin.Contacts": {
				this.contacts.handleAction(args);
				break;
			}
			case "Admin.General": {
				this.general.handleAction(args);
				break;
			}
			case "Admin.Groups": {
				this.groups.handleAction(args);
				break;
			}
			case "Admin.Lists": {
				this.lists.handleAction(args);
				break;
			}
			case "Admin.ScheduledCallbacks": {
				this.scheduledcallbacksadmin.handleAction(args);
				break;
			}
			case "Admin.Skills": {
				this.skills.handleAction(args);
				break;
			}
			case "Agent.AgentPhone": {
				this.agentphone.handleAction(args);
				break;
			}
			case "Agent.ChatRequests": {
				this.chatrequestsagent.handleAction(args);
				break;
			}
			case "Agent.Emails": {
				this.emails.handleAction(args);
				break;
			}
			case "Agent.PersonalCon": {
				this.personalcon.handleAction(args);
				break;
			}
			case "Agent.PhoneCalls": {
				this.phonecalls.handleAction(args);
				break;
			}
			case "Agent.ScheduledCallbacks": {
				this.scheduledcallbacksagent.handleAction(args);
				break;
			}
			case "Agent.Sessions": {
				this.sessions.handleAction(args);
				break;
			}
			case "Agent.Supervisor": {
				this.supervisor.handleAction(args);
				break;
			}
			case "Agent.Voicemails": {
				this.voicemails.handleAction(args);
				break;
			}
			case "Agent.WorkItems": {
				this.workitems.handleAction(args);
				break;
			}
			case "Authentication.Authenticate": {
				this.authenticate.handleAction(args);
				break;
			}
			case "Custom.Sample": {
				this.sample.handleAction(args);
				break;
			}
			case "Patron.Callback": {
				this.callback.handleAction(args);
				break;
			}
			case "Patron.ChatRequests": {
				this.chatrequestspatron.handleAction(args);
				break;
			}
			case "Patron.WorkItem": {
				this.workitem.handleAction(args);
				break;
			}
			case "RealTimeData.RealTime": {
				this.realtime.handleAction(args);
				break;
			}
			case "Reporting.Reporting": {
				this.reporting.handleAction(args);
				break;
			}
			case "Reporting.WFMData": {
				this.wfmdata.handleAction(args);
				break;
			}
			default: {
				localParent.emit('handleDefault', id, args);
				break;
			}
		}
	}

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
	assignRequestOptions(uniqueID: string, requestData?: any): any {

		// If no request data.
		if (requestData === null) {

			// nothing to set.
			let options = {
				params: {},
				data: {}
			};

			// return options.
			return options;
		}
		else {
			// Get the unique ID of the action.
			let id: string = uniqueID.toString();
			let ids: string[] = id.split('.');
			let endPoint = ids[0] + "." + ids[1];

			// nothing to set.
			let options = {
				params: {},
				data: {}
			};

			// Select the request endpoint.
			switch (endPoint) {
				case "Auth.ClientToken": {
					return this.clienttoken.assignRequestOptions(uniqueID, requestData);
				}
				case "Auth.ImplicitToken": {
					return this.implicittoken.assignRequestOptions(uniqueID, requestData);
				}
				case "Auth.PasswordToken": {
					return this.passwordtoken.assignRequestOptions(uniqueID, requestData);
				}
				case "Auth.RefreshToken": {
					return this.refreshtoken.assignRequestOptions(uniqueID, requestData);;
				}
				case "Auth.UserToken": {
					return this.usertoken.assignRequestOptions(uniqueID, requestData);
				}
				case "Admin.AddressBook": {
					return this.addressbook.assignRequestOptions(uniqueID, requestData);
				}
				case "Admin.Agents": {
					return this.agents.assignRequestOptions(uniqueID, requestData);
				}
				case "Admin.Contacts": {
					return this.contacts.assignRequestOptions(uniqueID, requestData);
				}
				case "Admin.General": {
					return this.general.assignRequestOptions(uniqueID, requestData);
				}
				case "Admin.Groups": {
					return this.groups.assignRequestOptions(uniqueID, requestData);
				}
				case "Admin.Lists": {
					return this.lists.assignRequestOptions(uniqueID, requestData);
				}
				case "Admin.ScheduledCallbacks": {
					return this.scheduledcallbacksadmin.assignRequestOptions(uniqueID, requestData);
				}
				case "Admin.Skills": {
					return this.skills.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.AgentPhone": {
					return this.agentphone.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.ChatRequests": {
					return this.chatrequestsagent.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.Emails": {
					return this.emails.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.PersonalCon": {
					return this.personalcon.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.PhoneCalls": {
					return this.phonecalls.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.ScheduledCallbacks": {
					return this.scheduledcallbacksagent.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.Sessions": {
					return this.sessions.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.Supervisor": {
					return this.supervisor.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.Voicemails": {
					return this.voicemails.assignRequestOptions(uniqueID, requestData);
				}
				case "Agent.WorkItems": {
					return this.workitems.assignRequestOptions(uniqueID, requestData);
				}
				case "Authentication.Authenticate": {
					return this.authenticate.assignRequestOptions(uniqueID, requestData);
				}
				case "Custom.Sample": {
					return this.sample.assignRequestOptions(uniqueID, requestData);
				}
				case "Patron.Callback": {
					return this.callback.assignRequestOptions(uniqueID, requestData);
				}
				case "Patron.ChatRequests": {
					return this.chatrequestspatron.assignRequestOptions(uniqueID, requestData);
				}
				case "Patron.WorkItem": {
					return this.workitem.assignRequestOptions(uniqueID, requestData);
				}
				case "RealTimeData.RealTime": {
					return this.realtime.assignRequestOptions(uniqueID, requestData);
				}
				case "Reporting.Reporting": {
					return this.reporting.assignRequestOptions(uniqueID, requestData);
				}
				case "Reporting.WFMData": {
					return this.wfmdata.assignRequestOptions(uniqueID, requestData);
				}
				default: {
					// return options.
					return options;
				}
			}
		}
	}
}