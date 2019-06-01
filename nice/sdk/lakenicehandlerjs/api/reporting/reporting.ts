// Require packages.
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { ILakeNiceClient } from '../../../../lakenicejs/base/lakenice-client';

/**
* Reporting handler interface.
*/
export interface IHReporting {

	/**
     * Handle the action.
	 * 
	 * @param {Object}   argOptions  A collection of argument options.
    */
	handleAction(argOptions?: any): void;

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
	assignRequestOptions(uniqueID: string, requestData?: any): any;
}

/**
 * Reporting handler implementation.
 */
export class HReporting implements IHReporting {

	// global
	config: any;
	logger: any;
	parent: any;

	/**
     * Reporting handler implementation.
     * 
	 * @param {ILakeNiceClient}		lakeNiceClient			Lake Nice client interface.
     * @param {Object}				reportingHandlerOptions	A collection of options.
     *        
     * @example                          
     *  options = {
	 *		debug: true
     *  }
     */
	constructor(public lakeNiceClient: ILakeNiceClient, public reportingHandlerOptions: any) {

		// local.
		let self = this;
		let parent = reportingHandlerOptions.parent;
		let item;

		let options = reportingHandlerOptions || {};
		let config = this.config = {
			debug: false
		};

		// Assign global.
		this.parent = parent;
		this.logger = parent.logger;

		// set our config from options
		for (item in options) {
			if (options.hasOwnProperty(item)) {
				this.config[item] = options[item];
			}
		}

		// Call WildEmitter constructor.
		wildemitter.mixin(HReporting);
	}

	/**
     * Handle the action.
	 * 
	 * @param {Object}   argOptions  A collection of argument options.
    */
	handleAction(argOptions?: any): void {

		// Get the unique ID of the action.
		let id: string = argOptions.uniqueID.toString();
		let ids: string[] = id.split('.');
		let requestMethod = ids[2];

		// Select the request method.
		switch (requestMethod) {
			default: {
				this.handleDefaultAction(argOptions);
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
			let requestMethod = ids[2];

			// nothing to set.
			let options = {
				params: {},
				data: {}
			};

			// Select the request method.
			switch (requestMethod) {
				case "contactHistoryAsync": {
					options.params = requestData;
					return options;
				}
				case "recentContactsAsync": {
					options.params = requestData;
					return options;
				}
				case "agentLoginHistoryAsync": {
					options.params = requestData;
					return options;
				}
				case "stateDurationAsync": {
					options.params = requestData;
					return options;
				}
				case "performanceSummaryAllAsync": {
					options.params = requestData;
					return options;
				}
				case "performanceSummaryAsync": {
					options.params = requestData;
					return options;
				}
				case "contactDetailsAsync": {
					options.params = requestData;
					return options;
				}
				case "smsTranscriptsAsync": {
					options.params = requestData;
					return options;
				}
				case "smsContactTranscriptsAsync": {
					options.params = requestData;
					return options;
				}
				case "completedContactsAsync": {
					options.params = requestData;
					return options;
				}
				case "statisticsForAllSkillsAsync": {
					options.params = requestData;
					return options;
				}
				case "statisticsForASkillAsync": {
					options.params = requestData;
					return options;
				}
				case "slaSummaryForAllSkillsAsync": {
					options.params = requestData;
					return options;
				}
				case "slaSummaryForASkillAsync": {
					options.params = requestData;
					return options;
				}
				case "performanceSummaryOfAllTeamsAsync": {
					options.params = requestData;
					return options;
				}
				case "performanceSummaryOfATeamAsync": {
					options.params = requestData;
					return options;
				}
				case "listReportingJobsAsync": {
					options.params = requestData;
					return options;
				}
				case "reportingJobAsync": {
					options.params = requestData;
					return options;
				}
				case "startCustomReportingJobAsync": {
					options.data = requestData;
					return options;
				}
				case "generatesLinkToDatadownloadReportAsync": {
					options.data = requestData;
					return options;
				}
				default: {
					// return options.
					return options;
				}
			}
		}
	}

	/**
     * Handle the default action.
	 * 
	 * @param {Object}   argOptions  A collection of argument options.
    */
	handleDefaultAction(argOptions?: any): void {

		let localParent = this.parent;

		// If type is not general.
		if (argOptions.type !== 'general') {

			// If type is response.
			if (argOptions.type === 'response') {

				// send the event.
				localParent.emit('responseDataHandler', argOptions.uniqueID, argOptions);
			}

			// If type is request.
			if (argOptions.type === 'request') {

				// send the event.
				localParent.emit('requestDataHandler', argOptions.uniqueID, argOptions);
			}
		}
		else {

			// Is general.
			// send the event.
			localParent.emit('generalDataHandler', argOptions.uniqueID, argOptions);
		}
	}
}