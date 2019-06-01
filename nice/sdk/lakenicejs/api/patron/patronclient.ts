// Require packages.
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IApiBase, IApiRequest, ApiRequest } from '../ApiBase';
import { ICallback, Callback } from './callback';
import { IChatRequestsPatron, ChatRequestsPatron } from './chatrequests-patron';
import { IWorkItem, WorkItem } from './workitem';

/**
 * Patron client interface.
 */
export interface IPatronClient extends IApiBase {

	/**
     * get the Callback interface.
	 * @return {ICallback}    The Callback.
    */
	getCallback(): ICallback;

	/**
     * get the ChatRequests interface.
	 * @return {IChatRequestsPatron}    The ChatRequests.
    */
	getChatRequests(): IChatRequestsPatron;

	/**
     * get the WorkItem interface.
	 * @return {IWorkItem}    The WorkItem.
    */
	getWorkItem(): IWorkItem;
}

/**
 * Patron client implementation.
 */
export class PatronClient implements IPatronClient {

	// global
	apirequest: IApiRequest;

	// global
	callback: ICallback;
	chatrequests: IChatRequestsPatron;
	workitem: IWorkItem;

	// global
	config: any;
	logger: any;
	parent: any;

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
	constructor(public patronOptions: any) {

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
		this.apirequest = new ApiRequest(this.config);

		this.callback = new Callback(this.config);
		this.chatrequests = new ChatRequestsPatron(this.config);
		this.workitem = new WorkItem(this.config);
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
     * get the Callback interface.
	 * @return {ICallback}    The Callback.
    */
	getCallback(): ICallback {
		return this.callback;
	}

	/**
     * get the ChatRequests interface.
	 * @return {IChatRequestsPatron}    The ChatRequests.
    */
	getChatRequests(): IChatRequestsPatron {
		return this.chatrequests;
	}

	/**
     * get the WorkItem interface.
	 * @return {IWorkItem}    The WorkItem.
    */
	getWorkItem(): IWorkItem {
		return this.workitem;
	}
}