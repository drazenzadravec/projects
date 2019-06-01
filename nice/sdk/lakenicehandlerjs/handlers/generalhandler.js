"use strict";
/* Lake Nice inContact Handler. */
Object.defineProperty(exports, "__esModule", { value: true });
const mockconsole = require("mockconsole");
const wildemitter = require("wildemitter");
const clienttoken_1 = require("./auth/clienttoken");
const implicittoken_1 = require("./auth/implicittoken");
const passwordtoken_1 = require("./auth/passwordtoken");
const refreshtoken_1 = require("./auth/refreshtoken");
const usertoken_1 = require("./auth/usertoken");
const addressbook_1 = require("./api/admin/addressbook");
const agents_1 = require("./api/admin/agents");
const contacts_1 = require("./api/admin/contacts");
const general_1 = require("./api/admin/general");
const groups_1 = require("./api/admin/groups");
const lists_1 = require("./api/admin/lists");
const scheduledcallbacks_admin_1 = require("./api/admin/scheduledcallbacks-admin");
const skills_1 = require("./api/admin/skills");
const agentphone_1 = require("./api/agent/agentphone");
const chatrequests_agent_1 = require("./api/agent/chatrequests-agent");
const emails_1 = require("./api/agent/emails");
const personalcon_1 = require("./api/agent/personalcon");
const phonecalls_1 = require("./api/agent/phonecalls");
const scheduledcallbacks_agent_1 = require("./api/agent/scheduledcallbacks-agent");
const sessions_1 = require("./api/agent/sessions");
const supervisor_1 = require("./api/agent/supervisor");
const voicemails_1 = require("./api/agent/voicemails");
const workitems_1 = require("./api/agent/workitems");
const authenticate_1 = require("./api/authentication/authenticate");
const sample_1 = require("./api/custom/sample");
const callback_1 = require("./api/patron/callback");
const chatrequests_patron_1 = require("./api/patron/chatrequests-patron");
const workitem_1 = require("./api/patron/workitem");
const realtime_1 = require("./api/realtimedata/realtime");
const reporting_1 = require("./api/reporting/reporting");
const wfmdata_1 = require("./api/reporting/wfmdata");
/**
 * General handler implementation.
 */
class GeneralHandler {
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
    constructor(lakeNiceClient, lakeNiceAuthClient, generalHandlerOptions) {
        this.lakeNiceClient = lakeNiceClient;
        this.lakeNiceAuthClient = lakeNiceAuthClient;
        this.generalHandlerOptions = generalHandlerOptions;
        // local.
        let self = this;
        let parent = generalHandlerOptions.parent;
        let item;
        let options = generalHandlerOptions || {};
        let config = this.config = {
            debug: false
        };
        // Call WildEmitter constructor.
        wildemitter.mixin(GeneralHandler);
        // Log nothing by default, following "the rule of silence":
        // http://www.linfo.org/rule_of_silence.html
        let logger = function () {
            // Assume that if you're in debug mode and you didn't
            // pass in a logger, you actually want to log as much as
            // possible.
            if (generalHandlerOptions.debug) {
                return generalHandlerOptions.logger || console;
            }
            else {
                // Use your logger which should have its own logic
                // for output. Return the no-op.
                return generalHandlerOptions.logger || mockconsole;
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
                logger.log('General Handler Event:', event, val1, val2);
            });
        }
        this.clienttoken = new clienttoken_1.HClientToken(this.lakeNiceAuthClient, this.config);
        this.implicittoken = new implicittoken_1.HImplicitToken(this.lakeNiceAuthClient, this.config);
        this.passwordtoken = new passwordtoken_1.HPasswordToken(this.lakeNiceAuthClient, this.config);
        this.refreshtoken = new refreshtoken_1.HRefreshToken(this.lakeNiceAuthClient, this.config);
        this.usertoken = new usertoken_1.HUserToken(this.lakeNiceAuthClient, this.config);
        this.addressbook = new addressbook_1.HAddressBook(this.lakeNiceClient, this.config);
        this.agents = new agents_1.HAgents(this.lakeNiceClient, this.config);
        this.contacts = new contacts_1.HContacts(this.lakeNiceClient, this.config);
        this.general = new general_1.HGeneral(this.lakeNiceClient, this.config);
        this.groups = new groups_1.HGroups(this.lakeNiceClient, this.config);
        this.lists = new lists_1.HLists(this.lakeNiceClient, this.config);
        this.scheduledcallbacksadmin = new scheduledcallbacks_admin_1.HScheduledCallbacksAdmin(this.lakeNiceClient, this.config);
        this.skills = new skills_1.HSkills(this.lakeNiceClient, this.config);
        this.agentphone = new agentphone_1.HAgentPhone(this.lakeNiceClient, this.config);
        this.chatrequestsagent = new chatrequests_agent_1.HChatRequestsAgent(this.lakeNiceClient, this.config);
        this.emails = new emails_1.HEmails(this.lakeNiceClient, this.config);
        this.personalcon = new personalcon_1.HPersonalCon(this.lakeNiceClient, this.config);
        this.phonecalls = new phonecalls_1.HPhoneCalls(this.lakeNiceClient, this.config);
        this.scheduledcallbacksagent = new scheduledcallbacks_agent_1.HScheduledCallbacksAgent(this.lakeNiceClient, this.config);
        this.sessions = new sessions_1.HSessions(this.lakeNiceClient, this.config);
        this.supervisor = new supervisor_1.HSupervisor(this.lakeNiceClient, this.config);
        this.voicemails = new voicemails_1.HVoicemails(this.lakeNiceClient, this.config);
        this.workitems = new workitems_1.HWorkItems(this.lakeNiceClient, this.config);
        this.authenticate = new authenticate_1.HAuthenticate(this.lakeNiceClient, this.config);
        this.sample = new sample_1.HSample(this.lakeNiceClient, this.config);
        this.callback = new callback_1.HCallback(this.lakeNiceClient, this.config);
        this.chatrequestspatron = new chatrequests_patron_1.HChatRequestsPatron(this.lakeNiceClient, this.config);
        this.workitem = new workitem_1.HWorkItem(this.lakeNiceClient, this.config);
        this.realtime = new realtime_1.HRealTime(this.lakeNiceClient, this.config);
        this.reporting = new reporting_1.HReporting(this.lakeNiceClient, this.config);
        this.wfmdata = new wfmdata_1.HWFMData(this.lakeNiceClient, this.config);
    }
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event function.
    */
    on(arg0, arg1) {
    }
    /**
     * get the ClientToken interface.
     * @return {IHClientToken}    The ClientToken.
    */
    getClientToken() {
        return this.clienttoken;
    }
    /**
     * get the ImplicitToken interface.
     * @return {IHImplicitToken}    The ImplicitToken.
    */
    getImplicitToken() {
        return this.implicittoken;
    }
    /**
     * get the PasswordToken interface.
     * @return {IHPasswordToken}    The PasswordToken.
    */
    getPasswordToken() {
        return this.passwordtoken;
    }
    /**
     * get the RefreshToken interface.
     * @return {IHRefreshToken}    The RefreshToken.
    */
    getRefreshToken() {
        return this.refreshtoken;
    }
    /**
     * get the UserToken interface.
     * @return {IHUserToken}    The UserToken.
    */
    getUserToken() {
        return this.usertoken;
    }
    /**
     * handle general.
     * @param {Object} args Event arguments.
    */
    handleGeneral(args) {
        let localParent = this.parent;
        // Get the unique ID of the action.
        let id = args.uniqueID.toString();
        let ids = id.split('.');
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
    assignRequestOptions(uniqueID, requestData) {
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
            let id = uniqueID.toString();
            let ids = id.split('.');
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
                    return this.refreshtoken.assignRequestOptions(uniqueID, requestData);
                    ;
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
exports.GeneralHandler = GeneralHandler;
