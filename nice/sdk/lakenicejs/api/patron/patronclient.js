"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockconsole = require("mockconsole");
const wildemitter = require("wildemitter");
const ApiBase_1 = require("../ApiBase");
const callback_1 = require("./callback");
const chatrequests_patron_1 = require("./chatrequests-patron");
const workitem_1 = require("./workitem");
/**
 * Patron client implementation.
 */
class PatronClient {
    /**
     * Patron api implementation.
     *
     * @param {Object}   patronOptions  A collection of options.
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
    constructor(patronOptions) {
        this.patronOptions = patronOptions;
        // local.
        let self = this;
        let parent = patronOptions.parent;
        let item;
        let options = patronOptions || {};
        let config = this.config = {
            debug: false,
            domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
            baseURIPath: "/services/v15.0/",
            authorization: "Bearer [Token Value]",
            timeout: 0
        };
        // Call WildEmitter constructor.
        wildemitter.mixin(PatronClient);
        // Log nothing by default, following "the rule of silence":
        // http://www.linfo.org/rule_of_silence.html
        let logger = function () {
            // Assume that if you're in debug mode and you didn't
            // pass in a logger, you actually want to log as much as
            // possible.
            if (patronOptions.debug) {
                return patronOptions.logger || console;
            }
            else {
                // Use your logger which should have its own logic
                // for output. Return the no-op.
                return patronOptions.logger || mockconsole;
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
                logger.log('Patron Event:', event, val1, val2);
            });
        }
        // Create the request instance.
        this.apirequest = new ApiBase_1.ApiRequest(this.config);
        this.callback = new callback_1.Callback(this.config);
        this.chatrequests = new chatrequests_patron_1.ChatRequestsPatron(this.config);
        this.workitem = new workitem_1.WorkItem(this.config);
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
     * get the Callback interface.
     * @return {ICallback}    The Callback.
    */
    getCallback() {
        return this.callback;
    }
    /**
     * get the ChatRequests interface.
     * @return {IChatRequestsPatron}    The ChatRequests.
    */
    getChatRequests() {
        return this.chatrequests;
    }
    /**
     * get the WorkItem interface.
     * @return {IWorkItem}    The WorkItem.
    */
    getWorkItem() {
        return this.workitem;
    }
}
exports.PatronClient = PatronClient;
