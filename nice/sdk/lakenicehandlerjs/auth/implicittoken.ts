﻿// Require packages.
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { ILakeNiceAuthClient } from '../../../lakenicejs/base/lakenice-auth-client';

/**
* ImplicitToken handler interface.
*/
export interface IHImplicitToken {

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
 * ImplicitToken handler implementation.
 */
export class HImplicitToken implements IHImplicitToken {

	// global
	config: any;
	logger: any;
	parent: any;

	/**
     * ImplicitToken handler implementation.
     * 
	 * @param {ILakeNiceAuthClient}	lakeNiceAuthClient			Lake Nice Auth client interface.
     * @param {Object}				implicitTokenHandlerOptions	A collection of options.
     *        
     * @example                          
     *  options = {
	 *		debug: true
     *  }
     */
	constructor(public lakeNiceAuthClient: ILakeNiceAuthClient, public implicitTokenHandlerOptions: any) {

		// local.
		let self = this;
		let parent = implicitTokenHandlerOptions.parent;
		let item;

		let options = implicitTokenHandlerOptions || {};
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
		wildemitter.mixin(HImplicitToken);
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
			case "getTokenRequest": {
				this.getTokenRequest(argOptions);
				break;
			}
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
				case "getTokenRequest": {
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

	/**
     * Handle the action.
	 * 
	 * @param {Object}   argOptions  A collection of argument options.
    */
	private getTokenRequest(argOptions?: any): void {

		let localParent = this.parent;

		// send the event.
		localParent.emit('getImplicitTokenRequestHandler', argOptions.uniqueID, argOptions);
	}
}