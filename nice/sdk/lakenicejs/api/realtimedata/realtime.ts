// Require packages.
import axios from 'axios';
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IApiRequest, ApiRequest } from '../ApiBase';

/**
 * RealTime api interface.
 */
export interface IRealTime {

	/**
     * Returns the current state for all agents.
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
	stateAllAgentsAsync(requestOptions?: any): void;

	/**
     * Returns the current state for an agent.
	 * 
	 * @param {number}   agentId		 The agent id.
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
	stateAgentAsync(agentId: number, requestOptions?: any): void;

	/**
     * Returns active contacts.
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
	activeContactsAsync(requestOptions?: any): void;

	/**
     * Returns parked contacts.
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
	parkedContactsAsync(requestOptions?: any): void;

	/**
     * Returns active Contact states.
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
	activeContactStatesAsync(requestOptions?: any): void;

	/**
     * Returns activity for all skills.
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
	activityAllSkillsAsync(requestOptions?: any): void;

	/**
     * Returns activity for a skill.
	 * 
	 * @param {number}   skillId		 The skill id.
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
	activitySkillAsync(skillId: number, requestOptions?: any): void;
}

/**
 * RealTime api implementation.
 */
export class RealTime implements IRealTime {

	// global
	apirequest: IApiRequest;

	// global
	config: any;
	logger: any;
	parent: any;
	uniqueID: string;

	/**
     * RealTime api implementation.
     * 
     * @param {Object}   realTimeOptions  A collection of options.
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
	constructor(public realTimeOptions: any) {

		// local.
		let self = this;
		let parent = realTimeOptions.parent;
		let uniqueID = "RealTimeData.RealTime.";
		let item;

		let options = realTimeOptions || {};
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
		wildemitter.mixin(RealTime);

		// Create the request instance.
		this.apirequest = new ApiRequest(this.config);
	}

	/**
	* Returns the current state for all agents.
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
	stateAllAgentsAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Gets the current state for all agents';
		let localUniqueID = this.uniqueID + "stateAllAgentsAsync";
		let localUrl = 'agents/states';
		let localTimeout = this.config.timeout;

		// Assign the request options.
		let options = requestOptions || {};
		let requestConfig = {
			url: localUrl,
			method: 'GET',
			baseURL: this.config.domainURIPath + this.config.baseURIPath,
			headers: {
				'Authorization': this.config.authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			timeout: localTimeout
		};

		// Execute the request.
		this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
	}

	/**
     * Returns the current state for an agent.
	 * 
	 * @param {number}   agentId		 The agent id.
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
	stateAgentAsync(agentId: number, requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Gets the current state for an agent';
		let localUniqueID = this.uniqueID + "stateAgentAsync";
		let localUrl = 'agents/' + agentId.toString() + '/states';
		let localTimeout = this.config.timeout;

		// Assign the request options.
		let options = requestOptions || {};
		let requestConfig = {
			url: localUrl,
			method: 'GET',
			baseURL: this.config.domainURIPath + this.config.baseURIPath,
			headers: {
				'Authorization': this.config.authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			timeout: localTimeout
		};

		// Execute the request.
		this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
	}

	/**
     * Returns active contacts.
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
	activeContactsAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Gets active contacts';
		let localUniqueID = this.uniqueID + "activeContactsAsync";
		let localUrl = 'contacts/active';
		let localTimeout = this.config.timeout;

		// Assign the request options.
		let options = requestOptions || {};
		let requestConfig = {
			url: localUrl,
			method: 'GET',
			baseURL: this.config.domainURIPath + this.config.baseURIPath,
			headers: {
				'Authorization': this.config.authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			timeout: localTimeout
		};

		// Execute the request.
		this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
	}

	/**
     * Returns parked contacts.
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
	parkedContactsAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Gets parked contacts';
		let localUniqueID = this.uniqueID + "parkedContactsAsync";
		let localUrl = 'contacts/parked';
		let localTimeout = this.config.timeout;

		// Assign the request options.
		let options = requestOptions || {};
		let requestConfig = {
			url: localUrl,
			method: 'GET',
			baseURL: this.config.domainURIPath + this.config.baseURIPath,
			headers: {
				'Authorization': this.config.authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			timeout: localTimeout
		};

		// Execute the request.
		this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
	}

	/**
     * Returns active Contact states.
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
	activeContactStatesAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Gets active Contact states';
		let localUniqueID = this.uniqueID + "activeContactStatesAsync";
		let localUrl = 'contacts/states';
		let localTimeout = this.config.timeout;

		// Assign the request options.
		let options = requestOptions || {};
		let requestConfig = {
			url: localUrl,
			method: 'GET',
			baseURL: this.config.domainURIPath + this.config.baseURIPath,
			headers: {
				'Authorization': this.config.authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			timeout: localTimeout
		};

		// Execute the request.
		this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
	}

	/**
     * Returns activity for all skills.
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
	activityAllSkillsAsync(requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Gets activity for all skills';
		let localUniqueID = this.uniqueID + "activityAllSkillsAsync";
		let localUrl = 'skills/activity';
		let localTimeout = this.config.timeout;

		// Assign the request options.
		let options = requestOptions || {};
		let requestConfig = {
			url: localUrl,
			method: 'GET',
			baseURL: this.config.domainURIPath + this.config.baseURIPath,
			headers: {
				'Authorization': this.config.authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			timeout: localTimeout
		};

		// Execute the request.
		this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
	}

	/**
     * Returns activity for a skill.
	 * 
	 * @param {number}   skillId		 The skill id.
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
	activitySkillAsync(skillId: number, requestOptions?: any): void {

		// Create local refs.
		let localExecute = 'Gets activity for a skill';
		let localUniqueID = this.uniqueID + "activitySkillAsync";
		let localUrl = 'skills/' + skillId.toString() + '/activity';
		let localTimeout = this.config.timeout;

		// Assign the request options.
		let options = requestOptions || {};
		let requestConfig = {
			url: localUrl,
			method: 'GET',
			baseURL: this.config.domainURIPath + this.config.baseURIPath,
			headers: {
				'Authorization': this.config.authorization,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			timeout: localTimeout
		};

		// Execute the request.
		this.apirequest.request(localExecute, localUniqueID, requestConfig, options);
	}
}