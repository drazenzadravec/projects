"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockconsole = require("mockconsole");
const wildemitter = require("wildemitter");
const ApiBase_1 = require("../ApiBase");
const addressbook_1 = require("./addressbook");
const agents_1 = require("./agents");
const contacts_1 = require("./contacts");
const general_1 = require("./general");
const groups_1 = require("./groups");
const lists_1 = require("./lists");
const scheduledcallbacks_admin_1 = require("./scheduledcallbacks-admin");
const skills_1 = require("./skills");
/**
 * Admin client implementation.
 */
class AdminClient {
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
    constructor(adminOptions) {
        this.adminOptions = adminOptions;
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
        this.apirequest = new ApiBase_1.ApiRequest(this.config);
        this.addressbook = new addressbook_1.AddressBook(this.config);
        this.agents = new agents_1.Agents(this.config);
        this.contacts = new contacts_1.Contacts(this.config);
        this.general = new general_1.General(this.config);
        this.groups = new groups_1.Groups(this.config);
        this.lists = new lists_1.Lists(this.config);
        this.scheduledcallbacks = new scheduledcallbacks_admin_1.ScheduledCallbacksAdmin(this.config);
        this.skills = new skills_1.Skills(this.config);
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
     * get the addressbook interface.
     * @return {IAddressBook}    The address book.
    */
    getAddressbook() {
        return this.addressbook;
    }
    /**
     * get the agents interface.
     * @return {IAgents}    The agents.
    */
    getAgents() {
        return this.agents;
    }
    /**
     * get the agents interface.
     * @return {IContacts}    The contacts.
    */
    getContacts() {
        return this.contacts;
    }
    /**
     * get the general interface.
     * @return {IGeneral}    The general.
    */
    getGeneral() {
        return this.general;
    }
    /**
     * get the groups interface.
     * @return {IGroups}    The groups.
    */
    getGroups() {
        return this.groups;
    }
    /**
     * get the lists interface.
     * @return {ILists}    The lists.
    */
    getLists() {
        return this.lists;
    }
    /**
     * get the scheduled callbacks interface.
     * @return {IScheduledCallbacksAdmin}    The scheduled callbacks.
    */
    getScheduledCallbacks() {
        return this.scheduledcallbacks;
    }
    /**
     * get the skills interface.
     * @return {ISkills}    The skills.
    */
    getSkills() {
        return this.skills;
    }
}
exports.AdminClient = AdminClient;
