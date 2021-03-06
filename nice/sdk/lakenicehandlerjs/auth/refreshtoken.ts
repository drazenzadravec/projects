﻿// Require packages.
import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { ILakeNiceAuthClient } from '../../../lakenicejs/base/lakenice-auth-client';
import * as modelRefreshTokenRequest from '../../../json/Auth/TSRefreshTokenRequest';
import * as modelRefreshTokenResponse from '../../../json/Auth/TSRefreshTokenResponse';

/**
* RefreshToken handler interface.
*/
export interface IHRefreshToken {

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

	/**
     * Get the access token for the refresh token server uri.
	 * 
	 * @param {string}   authorizationKey  The base64 encoded authorization key.
	 * @param {Object}   requestOptions  A collection of request options.
	 * 
	 * @example
     *  options = {
     *      refresh_token_server_uri: "https://api-{cluster}.incontact.com/InContactAuthorizationServer/Token",
	 *      refresh_token: "[Token]",
     *  }
    */
	getAccessTokenAsync(authorizationKey: string, requestOptions?: any): void;
}

/**
 * RefreshToken handler implementation.
 */
export class HRefreshToken implements IHRefreshToken {

	// global
	config: any;
	logger: any;
	parent: any;

	/**
     * RefreshToken handler implementation.
     * 
	 * @param {ILakeNiceAuthClient}	lakeNiceAuthClient			Lake Nice Auth client interface.
     * @param {Object}				refreshTokenHandlerOptions	A collection of options.
     *        
     * @example                          
     *  options = {
	 *		debug: true
     *  }
     */
	constructor(public lakeNiceAuthClient: ILakeNiceAuthClient, public refreshTokenHandlerOptions: any) {

		// local.
		let self = this;
		let parent = refreshTokenHandlerOptions.parent;
		let item;

		let options = refreshTokenHandlerOptions || {};
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
		wildemitter.mixin(HRefreshToken);
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
			case "getTokenAsync": {
				this.getTokenAsync(argOptions);
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
				case "getTokenAsync": {
					options.data = requestData;
					return options;
				}
				case "getTokenAsyncOv": {
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
     * Get the access token for the refresh token server uri.
	 * 
	 * @param {string}   authorizationKey  The base64 encoded authorization key.
	 * @param {Object}   requestOptions  A collection of request options.
	 * 
	 * @example
     *  options = {
     *      refresh_token_server_uri: "https://api-{cluster}.incontact.com/InContactAuthorizationServer/Token",
	 *      refresh_token: "[Token]",
     *  }
    */
	getAccessTokenAsync(authorizationKey: string, requestOptions?: any): void {

		let localParent = this.parent;

		// create the request.
		let requestData = modelRefreshTokenRequest.RefreshTokenRequest_Auth;
		requestData.grant_type = "refresh_token";

		// combine options.
		this.lakeNiceAuthClient.getAuthClient().getAuthRequest().assignOptions(requestData, requestOptions);

		// config.
		let requestConfig = {
			domainURIPath: requestData.refresh_token_server_uri,
			baseURIPath: '',
			data: requestData,
			headers: {
				'Authorization': 'Basic ' + authorizationKey
			}
		};

		// combine options.
		this.lakeNiceAuthClient.getAuthClient().getAuthRequest().assignOptions(requestConfig, requestOptions);

		// make the request.
		this.lakeNiceAuthClient.getAuthClient().getRefreshToken().getTokenAsyncOv(requestConfig, function (id, response) {

			// get the response.
			let responseData = modelRefreshTokenResponse.RefreshTokenResponse_Auth;
			let data = response.data;

			// assign data.
			responseData = data;

			// Common aguments
			var argum = {
				error: false,
				type: 'response',
				details: response
			};

			// send the event.
			localParent.emit('getRefreshAccessTokenHandler', id, argum);
		});
	}

	/**
     * Handle the action.
	 * 
	 * @param {Object}   argOptions  A collection of argument options.
    */
	private getTokenAsync(argOptions?: any): void {

		let localParent = this.parent;

		// send the event.
		localParent.emit('getRefreshTokenHandler', argOptions.uniqueID, argOptions);
	}
}