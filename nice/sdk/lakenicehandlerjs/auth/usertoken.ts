// Require packages.
import * as util from 'util';
import * as jwt from 'jsonwebtoken';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { ILakeNiceAuthClient } from '../../../lakenicejs/base/lakenice-auth-client';
import * as modelUserRefreshTokenRequest from '../../../json/Auth/TSUserRefreshTokenRequest';
import * as modelUserRefreshTokenResponse from '../../../json/Auth/TSUserRefreshTokenResponse';
import * as modelUserCreateAccessKeyRequest from '../../../json/Auth/TSUserCreateAccessKeyRequest';
import * as modelUserCreateAccessKeyResponse from '../../../json/Auth/TSUserCreateAccessKeyResponse';
import * as modelUserGenerateTokenRequest from '../../../json/Auth/TSUserGenerateTokenRequest';
import * as modelUserGenerateTokenResponse from '../../../json/Auth/TSUserGenerateTokenResponse';

/**
* UserToken handler interface.
*/
export interface IHUserToken {

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
     * Get the access token from the user refresh token.
	 * 
	 * @param {string}   refreshToken  The user refresh token.
	 * @param {Object}   requestOptions  A collection of request options.
	 * 
	 * @example
     *  options = {
     *      domainURIPath: "https://au1.nice-incontact.com",
	 *      refreshBaseURIPath: "/public/user/refresh",
	 *      accesskeyBaseURIPath: "/access-key-management/v1/access-keys",
	 *      generateBaseURIPath: "/authentication/v1/token/access-key"
     *  }
    */
	getAccessTokenAsync(refreshToken: string, requestOptions?: any): void;
}

/**
 * UserToken handler implementation.
 */
export class HUserToken implements IHUserToken {

	// global
	config: any;
	logger: any;
	parent: any;

	/**
     * UserToken handler implementation.
     * 
	 * @param {ILakeNiceAuthClient}	lakeNiceAuthClient			Lake Nice Auth client interface.
     * @param {Object}				userTokenHandlerOptions		A collection of options.
     *        
     * @example                          
     *  options = {
	 *		debug: true
     *  }
     */
	constructor(public lakeNiceAuthClient: ILakeNiceAuthClient, public userTokenHandlerOptions: any) {

		// local.
		let self = this;
		let parent = userTokenHandlerOptions.parent;
		let item;

		let options = userTokenHandlerOptions || {};
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
		wildemitter.mixin(HUserToken);
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
			case "getRefreshTokenAsync": {
				this.getRefreshTokenAsync(argOptions);
				break;
			}
			case "getCreateAccessKeyAsync": {
				this.getCreateAccessKeyAsync(argOptions);
				break;
			}
			case "getGenerateTokenAsync": {
				this.getGenerateTokenAsync(argOptions);
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
				case "getRefreshTokenAsync": {
					options.data = requestData;
					return options;
				}
				case "getCreateAccessKeyAsync": {
					options.data = requestData;
					return options;
				}
				case "getGenerateTokenAsync": {
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
     * Get the access token from the user refresh token.
	 * 
	 * @param {string}   refreshToken  The user refresh token.
	 * @param {Object}   requestOptions  A collection of request options.
	 * 
	 * @example
     *  options = {
     *      domainURIPath: "https://au1.nice-incontact.com",
	 *      refreshBaseURIPath: "/public/user/refresh",
	 *      accesskeyBaseURIPath: "/access-key-management/v1/access-keys",
	 *      generateBaseURIPath: "/authentication/v1/token/access-key"
     *  }
    */
	getAccessTokenAsync(refreshToken: string, requestOptions?: any): void {

		// local
		let localThis = this;

		// create the request.
		let requestData = modelUserRefreshTokenRequest.UserRefreshTokenRequest_Auth;
		requestData.token = refreshToken;

		// base URLs.
		let baseURIPathOptions = {
			refreshBaseURIPath: "/public/user/refresh",
			accesskeyBaseURIPath: "/access-key-management/v1/access-keys",
			generateBaseURIPath: "/authentication/v1/token/access-key"
		}

		// combine options.
		this.lakeNiceAuthClient.getAuthClient().getAuthRequest().assignOptions(baseURIPathOptions, requestOptions);

		// config.
		let requestConfig = {
			domainURIPath: "https://au1.nice-incontact.com",
			baseURIPath: baseURIPathOptions.refreshBaseURIPath,
			data: requestData,
			headers: {
				'Authorization': ''
			}
		};

		// combine options.
		this.lakeNiceAuthClient.getAuthClient().getAuthRequest().assignOptions(requestConfig, requestOptions);
		
		// make the request.
		this.lakeNiceAuthClient.getAuthClient().getUserToken().getRefreshTokenAsyncOv(requestConfig, function (id, response) {

			// get the response.
			let responseData = modelUserRefreshTokenResponse.UserRefreshTokenResponse_Auth;
			let data = response.data;

			// assign data.
			responseData = data;

			// get the user create access key.
			localThis.getUserCreateAccessKey(responseData, requestConfig, baseURIPathOptions);
		});
	}

	/**
     * Handle the user create access key.
	 * 
	 * @param {Object}   refreshTokenData  A collection of refresh token data.
	 * @param {Object}   requestConfig  A collection of request options.
	 * @param {Object}   baseURIPathOptions  A collection of request base URL path options.
    */
	private getUserCreateAccessKey(refreshTokenData: any, requestConfig: any, baseURIPathOptions: any): void {

		// local
		let localThis = this;

		// get the response.
		let responseTokenData = modelUserRefreshTokenResponse.UserRefreshTokenResponse_Auth;
		let refreshData = refreshTokenData;
		responseTokenData = refreshData;

		// Extract JWT data.
		// get the decoded payload and header
		let decoded: any = jwt.decode(responseTokenData.token, { complete: true });

		// Copy request.
		let requestData = modelUserCreateAccessKeyRequest.UserCreateAccessKeyRequest_Auth;
		requestData.tenantId = decoded.payload.tenantId;
		requestData.userId = decoded.payload.sub.replace('user:', '');

		// config.
		let requestOptions = {
			baseURIPath: baseURIPathOptions.accesskeyBaseURIPath,
			data: requestData,
			headers: {
				'Authorization': 'Bearer ' + responseTokenData.token
			}
		};

		// combine options.
		this.lakeNiceAuthClient.getAuthClient().getAuthRequest().assignOptions(requestConfig, requestOptions);

		// make the request.
		this.lakeNiceAuthClient.getAuthClient().getUserToken().getCreateAccessKeyAsyncOv(requestConfig, function (id, response) {

			// get the response.
			let responseData = modelUserCreateAccessKeyResponse.UserCreateAccessKeyResponse_Auth;
			let data = response.data;

			// assign data.
			responseData = data;

			// get the user generate token.
			localThis.getUserGenerateToken(responseData, requestConfig, baseURIPathOptions);
		});
	}

	/**
     * Handle the user generate token.
	 * 
	 * @param {Object}   createAccessKeyData  A collection of create access key data.
	 * @param {Object}   requestConfig  A collection of request options.
	 * @param {Object}   baseURIPathOptions  A collection of request base URL path options.
    */
	private getUserGenerateToken(createAccessKeyData: any, requestConfig: any, baseURIPathOptions: any): void {

		// local
		let localThis = this;
		let localParent = this.parent;

		// get the response.
		let responseAccessKeyData = modelUserCreateAccessKeyResponse.UserCreateAccessKeyResponse_Auth;
		let refreshData = createAccessKeyData;
		responseAccessKeyData = refreshData;

		// Copy request.
		let requestData = modelUserGenerateTokenRequest.UserGenerateTokenRequest_Auth;
		requestData.accessKeyId = responseAccessKeyData.accessKey.accessKeyId;
		requestData.accessKeySecret = responseAccessKeyData.accessKey.accessKeySecret;

		// config.
		let requestOptions = {
			baseURIPath: baseURIPathOptions.generateBaseURIPath,
			data: requestData,
			headers: {
				'Authorization': ''
			}
		};

		// make the request.
		this.lakeNiceAuthClient.getAuthClient().getUserToken().getGenerateTokenAsyncOv(requestConfig, function (id, response) {

			// get the response.
			let responseData = modelUserGenerateTokenResponse.UserGenerateTokenResponse_Auth;
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
			localParent.emit('getUserAccessTokenHandler', id, argum);
		});
	}

	/**
     * Handle the action.
	 * 
	 * @param {Object}   argOptions  A collection of argument options.
    */
	private getRefreshTokenAsync(argOptions?: any): void {

		let localParent = this.parent;

		// send the event.
		localParent.emit('getUserRefreshTokenHandler', argOptions.uniqueID, argOptions);
	}

	/**
     * Handle the action.
	 * 
	 * @param {Object}   argOptions  A collection of argument options.
    */
	private getCreateAccessKeyAsync(argOptions?: any): void {

		let localParent = this.parent;

		// send the event.
		localParent.emit('getUserCreateAccessKeyHandler', argOptions.uniqueID, argOptions);
	}

	/**
     * Handle the action.
	 * 
	 * @param {Object}   argOptions  A collection of argument options.
    */
	private getGenerateTokenAsync(argOptions?: any): void {

		let localParent = this.parent;

		// send the event.
		localParent.emit('getUserGenerateTokenHandler', argOptions.uniqueID, argOptions);
	}
}