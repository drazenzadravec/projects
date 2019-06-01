// Require packages.
import axios from 'axios';
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IApiRequest, ApiRequest } from '../ApiBase';

/**
 * WorkItem api interface.
 */
export interface IWorkItem {

	/**
     * Create a new work item.
	 * 
	 * @param {Object}   requestOptions  A collection of request options.
	 * 
	 * @example
     *  options = {
	 *		timeout: 10000, // default is '0' (0 seconds timeout),
	 *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
     *		
	 *		// 'params' are the URL parameters to be sent with the request
	 *		// Must be a plain object or a URLSearchParams object
	 *		params: { ID: 12345 },
	 *
	 *		// 'data' is the data to be sent as the request body.
	 *		data: { ID: 'Unique' },
	 *  }
    */
	createWorkItemAsync(requestOptions?: any): void;
}

/**
 * WorkItem api implementation.
 */
export class WorkItem implements IWorkItem {

	// global
	apirequest: IApiRequest;

	// global
	config: any;
	logger: any;
	parent: any;
	uniqueID: string;

	/**
     * WorkItem api implementation.
     * 
     * @param {Object}   workItemOptions  A collection of options.
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
	constructor(public workItemOptions: any) {

		// local.
		let self = this;
		let parent = workItemOptions.parent;
		let uniqueID = "Patron.WorkItem.";
		let item;

		let options = workItemOptions || {};
		let config = this.config = {
			debug: false,
			domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
			baseURIPath: "/services/v15.0/",
			authorization: "Bearer [Token Value]",
			timeout: 0
		};

		// Assign global.
		this.parent = parent;
		this.logger = parent.logger;
		this.uniqueID = uniqueID;

		// set our config from options
		for (item in options) {
			if (options.hasOwnProperty(item)) {
				this.config[item] = options[item];
			}
		}

		// Call WildEmitter constructor.
		wildemitter.mixin(WorkItem);

		// Create the request instance.
		this.apirequest = new ApiRequest(this.config);
	}

	/**
     * Create a new work item.
	 * 
	 * @param {Object}   requestOptions  A collection of request options.
	 * 
	 * @example
     *  options = {
	 *		timeout: 10000, // default is '0' (0 seconds timeout),
	 *		cancelToken: new CancelToken(function (cancel) {}) // 'cancelToken' specifies a cancel token that can be used to cancel the request (see Cancellation section below for details)
     *		
	 *		// 'params' are the URL parameters to be sent with the request
	 *		// Must be a plain object or a URLSearchParams object
	 *		params: { ID: 12345 },
	 *
	 *		// 'data' is the data to be sent as the request body.
	 *		data: { ID: 'Unique' },
	 *  }
    */
	createWorkItemAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Create a new work item';
		let localUniqueID = this.uniqueID + "createWorkItemAsync";
		let localUrl = 'interactions/work-items';
		let localTimeout = this.config.timeout;

		// Assign the request options.
		let options = requestOptions || {};
		let requestConfig = {
			url: localUrl,
			method: 'POST',
			baseURL: this.config.domainURIPath + this.config.baseURIPath,
			headers: {
				'Authorization': this.config.authorization,
				'Content-Type': 'application/json'
			},
			timeout: localTimeout
		};

		// Execute the request.
		this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
	}
}