// Require packages.
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IApiBase, IApiRequest, ApiRequest } from '../ApiBase';
import { IAgentPhone, AgentPhone } from './agentphone';
import { IChatRequestsAgent, ChatRequestsAgent } from './chatrequests-agent';
import { IEmails, Emails } from './emails';
import { IPersonalCon, PersonalCon } from './personalcon';
import { IPhoneCalls, PhoneCalls } from './phonecalls';
import { IScheduledCallbacksAgent, ScheduledCallbacksAgent } from './scheduledcallbacks-agent';
import { ISessions, Sessions } from './sessions';
import { ISupervisor, Supervisor } from './supervisor';
import { IVoicemails, Voicemails } from './voicemails';
import { IWorkItems, WorkItems } from './workitems';

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
export class AgentClient implements IAgentClient {

	// global
	apirequest: IApiRequest;

	// global
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

	// global
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
	constructor(public agentOptions: any) {

		// local.
		let self = this;
		let parent = agentOptions.parent;
		let item;

		let options = agentOptions || {};
		let config = this.config = {
			debug: false,
			domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
			baseURIPath: "/services/v15.0/",
			authorization: "Bearer [Token Value]",
			timeout: 0
		};

		// Call WildEmitter constructor.
		wildemitter.mixin(AgentClient);

		// Log nothing by default, following "the rule of silence":
		// http://www.linfo.org/rule_of_silence.html
		let logger = function () {

			// Assume that if you're in debug mode and you didn't
			// pass in a logger, you actually want to log as much as
			// possible.
			if (agentOptions.debug) {
				return agentOptions.logger || console;
			}
			else {
				// Use your logger which should have its own logic
				// for output. Return the no-op.
				return agentOptions.logger || mockconsole;
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
				logger.log('Agent Event:', event, val1, val2);
			});
		}

		// Create the request instance.
		this.apirequest = new ApiRequest(this.config);

		this.agentphone = new AgentPhone(this.config);
		this.chatrequests = new ChatRequestsAgent(this.config);
		this.emails = new Emails(this.config);
		this.personalcon = new PersonalCon(this.config);
		this.phonecalls = new PhoneCalls(this.config);
		this.scheduledcallbacks = new ScheduledCallbacksAgent(this.config);
		this.sessions = new Sessions(this.config);
		this.supervisor = new Supervisor(this.config);
		this.voicemails = new Voicemails(this.config);
		this.workitems = new WorkItems(this.config);
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
     * get the AgentPhone interface.
	 * @return {IAgentPhone}    The AgentPhone.
    */
	getAgentPhone(): IAgentPhone {
		return this.agentphone;
	}

	/**
     * get the ChatRequests interface.
	 * @return {IChatRequestsAgent}    The ChatRequests.
    */
	getChatRequestsAgent(): IChatRequestsAgent {
		return this.chatrequests;
	}

	/**
     * get the Emails interface.
	 * @return {IEmails}    The Emails.
    */
	getEmails(): IEmails {
		return this.emails;
	}

	/**
     * get the PersonalCon interface.
	 * @return {IPersonalCon}    The PersonalCon.
    */
	getPersonalCon(): IPersonalCon {
		return this.personalcon;
	}

	/**
     * get the PhoneCalls interface.
	 * @return {IPhoneCalls}    The PhoneCalls.
    */
	getPhoneCalls(): IPhoneCalls {
		return this.phonecalls;
	}

	/**
     * get the ScheduledCallbacks interface.
	 * @return {IScheduledCallbacksAgent}    The IScheduledCallbacks.
    */
	getScheduledCallbacksAgent(): IScheduledCallbacksAgent {
		return this.scheduledcallbacks;
	}

	/**
     * get the Sessions interface.
	 * @return {ISessions}    The Sessions.
    */
	getSessions(): ISessions {
		return this.sessions;
	}

	/**
     * get the Supervisor interface.
	 * @return {ISupervisor}    The Supervisor.
    */
	getSupervisor(): ISupervisor {
		return this.supervisor;
	}

	/**
     * get the Voicemails interface.
	 * @return {IVoicemails}    The Voicemails.
    */
	getVoicemails(): IVoicemails {
		return this.voicemails;
	}

	/**
     * get the WorkItems interface.
	 * @return {IWorkItems}    The WorkItems.
    */
	getWorkItems(): IWorkItems {
		return this.workitems;
	}
}