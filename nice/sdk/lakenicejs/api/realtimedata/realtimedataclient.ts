﻿// Require packages.
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IApiBase, IApiRequest, ApiRequest } from '../ApiBase';
import { IRealTime, RealTime } from './realtime';

/**
 * RealTimeDataClient client interface.
 */
export interface IRealTimeDataClient extends IApiBase {

	/**
     * get the RealTime interface.
	 * @return {IRealTime}    The RealTime.
    */
	getRealTime(): IRealTime;
}

/**
 * RealTimeDataClient client implementation.
 */
export class RealTimeDataClient implements IRealTimeDataClient {

	// global
	apirequest: IApiRequest;

	// global
	realtime: IRealTime;

	// global
	config: any;
	logger: any;
	parent: any;

	/**
     * RealTimeDataClient api implementation.
     * 
     * @param {Object}   realTimeDataClientOptions  A collection of options.
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
	constructor(public realTimeDataClientOptions: any) {

		// local.
		let self = this;
		let parent = realTimeDataClientOptions.parent;
		let item;

		let options = realTimeDataClientOptions || {};
		let config = this.config = {
			debug: false,
			domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
			baseURIPath: "/services/v15.0/",
			authorization: "Bearer [Token Value]",
			timeout: 0
		};

		// Call WildEmitter constructor.
		wildemitter.mixin(RealTimeDataClient);

		// Log nothing by default, following "the rule of silence":
		// http://www.linfo.org/rule_of_silence.html
		let logger = function () {

			// Assume that if you're in debug mode and you didn't
			// pass in a logger, you actually want to log as much as
			// possible.
			if (realTimeDataClientOptions.debug) {
				return realTimeDataClientOptions.logger || console;
			}
			else {
				// Use your logger which should have its own logic
				// for output. Return the no-op.
				return realTimeDataClientOptions.logger || mockconsole;
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
				logger.log('RealTimeData Event:', event, val1, val2);
			});
		}

		// Create the request instance.
		this.apirequest = new ApiRequest(this.config);

		this.realtime = new RealTime(this.config);
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
     * get the RealTime interface.
	 * @return {IRealTime}    The RealTime.
    */
	getRealTime(): IRealTime {
		return this.realtime;
	}
}