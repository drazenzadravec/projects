"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockconsole = require("mockconsole");
const wildemitter = require("wildemitter");
const ApiBase_1 = require("../ApiBase");
const agentphone_1 = require("./agentphone");
const chatrequests_agent_1 = require("./chatrequests-agent");
const emails_1 = require("./emails");
const personalcon_1 = require("./personalcon");
const phonecalls_1 = require("./phonecalls");
const scheduledcallbacks_agent_1 = require("./scheduledcallbacks-agent");
const sessions_1 = require("./sessions");
const supervisor_1 = require("./supervisor");
const voicemails_1 = require("./voicemails");
const workitems_1 = require("./workitems");
/**
 * Agent client implementation.
 */
class AgentClient {
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
    constructor(agentOptions) {
        this.agentOptions = agentOptions;
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
        this.apirequest = new ApiBase_1.ApiRequest(this.config);
        this.agentphone = new agentphone_1.AgentPhone(this.config);
        this.chatrequests = new chatrequests_agent_1.ChatRequestsAgent(this.config);
        this.emails = new emails_1.Emails(this.config);
        this.personalcon = new personalcon_1.PersonalCon(this.config);
        this.phonecalls = new phonecalls_1.PhoneCalls(this.config);
        this.scheduledcallbacks = new scheduledcallbacks_agent_1.ScheduledCallbacksAgent(this.config);
        this.sessions = new sessions_1.Sessions(this.config);
        this.supervisor = new supervisor_1.Supervisor(this.config);
        this.voicemails = new voicemails_1.Voicemails(this.config);
        this.workitems = new workitems_1.WorkItems(this.config);
    }
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event function.
     */
    on(arg0, arg1) {
    }
    /**
     * Get the auth request.
     *
     * @return {IApiRequest}		The api request.
    */
    getApiRequest() {
        return this.apirequest;
    }
    /**
     * get the AgentPhone interface.
     * @return {IAgentPhone}    The AgentPhone.
    */
    getAgentPhone() {
        return this.agentphone;
    }
    /**
     * get the ChatRequests interface.
     * @return {IChatRequestsAgent}    The ChatRequests.
    */
    getChatRequestsAgent() {
        return this.chatrequests;
    }
    /**
     * get the Emails interface.
     * @return {IEmails}    The Emails.
    */
    getEmails() {
        return this.emails;
    }
    /**
     * get the PersonalCon interface.
     * @return {IPersonalCon}    The PersonalCon.
    */
    getPersonalCon() {
        return this.personalcon;
    }
    /**
     * get the PhoneCalls interface.
     * @return {IPhoneCalls}    The PhoneCalls.
    */
    getPhoneCalls() {
        return this.phonecalls;
    }
    /**
     * get the ScheduledCallbacks interface.
     * @return {IScheduledCallbacksAgent}    The IScheduledCallbacks.
    */
    getScheduledCallbacksAgent() {
        return this.scheduledcallbacks;
    }
    /**
     * get the Sessions interface.
     * @return {ISessions}    The Sessions.
    */
    getSessions() {
        return this.sessions;
    }
    /**
     * get the Supervisor interface.
     * @return {ISupervisor}    The Supervisor.
    */
    getSupervisor() {
        return this.supervisor;
    }
    /**
     * get the Voicemails interface.
     * @return {IVoicemails}    The Voicemails.
    */
    getVoicemails() {
        return this.voicemails;
    }
    /**
     * get the WorkItems interface.
     * @return {IWorkItems}    The WorkItems.
    */
    getWorkItems() {
        return this.workitems;
    }
}
exports.AgentClient = AgentClient;
