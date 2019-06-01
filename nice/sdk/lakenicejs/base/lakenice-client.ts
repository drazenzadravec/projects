/* Lake Nice inContact Client. */

import * as util from 'util';
import * as mockconsole from 'mockconsole';
import * as wildemitter from 'wildemitter';

import { IAdminClient, AdminClient } from '../api/admin/adminclient';
import { IAgentClient, AgentClient } from '../api/agent/agentclient';
import { IAuthenticationClient, AuthenticationClient } from '../api/authentication/authenticationclient';
import { ICustomClient, CustomClient } from '../api/custom/customclient';
import { IPatronClient, PatronClient } from '../api/patron/patronclient';
import { IRealTimeDataClient, RealTimeDataClient } from '../api/realtimedata/realtimedataclient';
import { IReportingClient, ReportingClient } from '../api/reporting/reportingclient';

/**
 * Lake Nice client interface.
 */
export interface ILakeNiceClient {

	/**
	 * On event.
	 * @param {string} arg0 Event name.
	 * @param {Object} arg1 Event arguments.
	 */
	on(arg0: string, arg1: any): any;

	/**
     * get the AdminClient interface.
	 * @return {IAdminClient}    The AdminClient.
    */
	getAdminClient(): IAdminClient;

	/**
     * get the AgentClient interface.
	 * @return {IAgentClient}    The AgentClient.
    */
	getAgentClient(): IAgentClient;

	/**
     * get the AuthenticationClient interface.
	 * @return {IAuthenticationClient}    The AuthenticationClient.
    */
	getAuthenticationClient(): IAuthenticationClient;

	/**
     * get the CustomClient interface.
	 * @return {ICustomClient}    The CustomClient.
    */
	getCustomClient(): ICustomClient;

	/**
     * get the PatronClient interface.
	 * @return {IPatronClient}    The PatronClient.
    */
	getPatronClient(): IPatronClient;

	/**
     * get the RealTimeDataClient interface.
	 * @return {IRealTimeDataClient}    The RealTimeDataClient.
    */
	getRealTimeDataClient(): IRealTimeDataClient;

	/**
     * get the ReportingClient interface.
	 * @return {IReportingClient}    The ReportingClient.
    */
	getReportingClient(): IReportingClient;
}

/**
 * Lake Nice client implementation.
 */
export class LakeNiceClient implements ILakeNiceClient {
    
	// global
	adminclient: IAdminClient;
	agentclient: IAgentClient;
	authenticationclient: IAuthenticationClient;
	customclient: ICustomClient;
	patronclient: IPatronClient;
	realtimedataclient: IRealTimeDataClient;
	reportingclient: IReportingClient;

	// global
	config: any;
	logger: any;

	/**
	* Lake Nice client api implementation.
	* 
	* Lake Nice client controls the interaction between the
	* web service and client-side.
	* 
	* @param {Object}   clientOptions  A collection of options.
	*         
	* @example
    *  options = {
	*		debug: true,
    *		domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
	*		baseURIPath: "/services/v15.0/",
	*		authorization: "Bearer [Token Value]",
	*       timeout: 10000, // default is '0' (0 seconds timeout)
    *  }
    */
	constructor(public clientOptions: any) {

		// local.
		let self = this;
		let item;

		let options = clientOptions || {};
		let config = this.config = {
			debug: false,
			domainURIPath: "https://api-a32.nice-incontact.com/inContactAPI",
			baseURIPath: "/services/v15.0/",
			authorization: "Bearer [Token Value]",
			timeout: 0,
			parent: self
		};

		// Log nothing by default, following "the rule of silence":
		// http://www.linfo.org/rule_of_silence.html
		let logger = function () {

			// Assume that if you're in debug mode and you didn't
			// pass in a logger, you actually want to log as much as
			// possible.
			if (clientOptions.debug) {
				return clientOptions.logger || console;
			}
			else {
				// Use your logger which should have its own logic
				// for output. Return the no-op.
				return clientOptions.logger || mockconsole;
			}
		}();

		this.logger = logger;

		// set our config from options
		for (item in options) {
			if (options.hasOwnProperty(item)) {
				this.config[item] = options[item];
			}
		}

		// Call WildEmitter constructor.
		wildemitter.mixin(LakeNiceClient);

		// log all events in debug mode
		if (this.config.debug) {
			this.on('*', this.logger.log.bind(this.logger, 'Lake Nice Client Event:'));
		}

		// Create the clients.
		this.adminclient = new AdminClient(this.config);
		this.agentclient = new AgentClient(this.config);
		this.authenticationclient = new AuthenticationClient(this.config);
		this.customclient = new CustomClient(this.config);
		this.patronclient = new PatronClient(this.config);
		this.realtimedataclient = new RealTimeDataClient(this.config);
		this.reportingclient = new ReportingClient(this.config);

		// Proxy events from client APIs
		this.adminclient.on('*', function () {
			this.emit.apply(self, arguments);
		});

		// Request error.
		this.adminclient.on('error', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Request error.
		this.adminclient.on('requestError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'request',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				baseURL: arg.baseURL,
				url: arg.url,
				data: arg.data,
				method: arg.method,
				params: arg.params,
				headers: arg.headers
			};
			this.emit('request', argum);
		});

		// Response error.
		this.adminclient.on('responseError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Response.
		this.adminclient.on('responseAction', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				headers: arg.headers,
				config: arg.config,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Executed.
		this.adminclient.on('executed', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Proxy events from client APIs
		this.agentclient.on('*', function () {
			this.emit.apply(self, arguments);
		});

		// Request error.
		this.agentclient.on('error', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Request error.
		this.agentclient.on('requestError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'request',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				baseURL: arg.baseURL,
				url: arg.url,
				data: arg.data,
				method: arg.method,
				params: arg.params,
				headers: arg.headers
			};
			this.emit('request', argum);
		});

		// Response error.
		this.agentclient.on('responseError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Response.
		this.agentclient.on('responseAction', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				headers: arg.headers,
				config: arg.config,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Executed.
		this.agentclient.on('executed', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Proxy events from client APIs
		this.authenticationclient.on('*', function () {
			this.emit.apply(self, arguments);
		});

		// Request error.
		this.authenticationclient.on('error', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Request error.
		this.authenticationclient.on('requestError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'request',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				baseURL: arg.baseURL,
				url: arg.url,
				data: arg.data,
				method: arg.method,
				params: arg.params,
				headers: arg.headers
			};
			this.emit('request', argum);
		});

		// Response error.
		this.authenticationclient.on('responseError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Response.
		this.authenticationclient.on('responseAction', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				headers: arg.headers,
				config: arg.config,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Executed.
		this.authenticationclient.on('executed', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Proxy events from client APIs
		this.customclient.on('*', function () {
			this.emit.apply(self, arguments);
		});

		// Request error.
		this.customclient.on('error', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Request error.
		this.customclient.on('requestError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'request',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				baseURL: arg.baseURL,
				url: arg.url,
				data: arg.data,
				method: arg.method,
				params: arg.params,
				headers: arg.headers
			};
			this.emit('request', argum);
		});

		// Response error.
		this.customclient.on('responseError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Response.
		this.customclient.on('responseAction', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				headers: arg.headers,
				config: arg.config,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Executed.
		this.customclient.on('executed', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Proxy events from client APIs
		this.patronclient.on('*', function () {
			this.emit.apply(self, arguments);
		});

		// Request error.
		this.patronclient.on('error', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Request error.
		this.patronclient.on('requestError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'request',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				baseURL: arg.baseURL,
				url: arg.url,
				data: arg.data,
				method: arg.method,
				params: arg.params,
				headers: arg.headers
			};
			this.emit('request', argum);
		});

		// Response error.
		this.patronclient.on('responseError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Response.
		this.patronclient.on('responseAction', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				headers: arg.headers,
				config: arg.config,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Executed.
		this.patronclient.on('executed', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Proxy events from client APIs
		this.realtimedataclient.on('*', function () {
			this.emit.apply(self, arguments);
		});

		// Request error.
		this.realtimedataclient.on('error', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Request error.
		this.realtimedataclient.on('requestError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'request',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				baseURL: arg.baseURL,
				url: arg.url,
				data: arg.data,
				method: arg.method,
				params: arg.params,
				headers: arg.headers
			};
			this.emit('request', argum);
		});

		// Response error.
		this.realtimedataclient.on('responseError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Response.
		this.realtimedataclient.on('responseAction', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				headers: arg.headers,
				config: arg.config,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Executed.
		this.realtimedataclient.on('executed', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Proxy events from client APIs
		this.reportingclient.on('*', function () {
			this.emit.apply(self, arguments);
		});

		// Request error.
		this.reportingclient.on('error', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});

		// Request error.
		this.reportingclient.on('requestError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'request',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				baseURL: arg.baseURL,
				url: arg.url,
				data: arg.data,
				method: arg.method,
				params: arg.params,
				headers: arg.headers
			};
			this.emit('request', argum);
		});

		// Response error.
		this.reportingclient.on('responseError', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: true,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Response.
		this.reportingclient.on('responseAction', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'response',
				uniqueID: uniqueID,
				data: arg.data,
				status: arg.status,
				statusText: arg.statusText,
				headers: arg.headers,
				config: arg.config,
				request: arg.request
			};
			this.emit('response', argum);
		});

		// Executed.
		this.reportingclient.on('executed', function (uniqueID, arg) {

			// Common aguments
			var argum = {
				error: false,
				type: 'general',
				uniqueID: uniqueID,
				status: 500,
				statusText: 'Internal Server Error',
				message: arg
			};
			this.emit('general', argum);
		});
	}

	/**
	 * On event.
	 * @param {string} arg0 Event name.
	 * @param {Object} arg1 Event arguments.
	 */
	on(arg0: string, arg1: any): any {
		
	}

	/**
     * get the AdminClient interface.
	 * @return {IAdminClient}    The AdminClient.
    */
	getAdminClient(): IAdminClient {
		return this.adminclient;
	}

	/**
     * get the AgentClient interface.
	 * @return {IAgentClient}    The AgentClient.
    */
	getAgentClient(): IAgentClient {
		return this.agentclient;
	}

	/**
     * get the AuthenticationClient interface.
	 * @return {IAuthenticationClient}    The AuthenticationClient.
    */
	getAuthenticationClient(): IAuthenticationClient {
		return this.authenticationclient;
	}

	/**
     * get the CustomClient interface.
	 * @return {ICustomClient}    The CustomClient.
    */
	getCustomClient(): ICustomClient {
		return this.customclient;
	}

	/**
     * get the PatronClient interface.
	 * @return {IPatronClient}    The PatronClient.
    */
	getPatronClient(): IPatronClient {
		return this.patronclient;
	}

	/**
     * get the RealTimeDataClient interface.
	 * @return {IRealTimeDataClient}    The RealTimeDataClient.
    */
	getRealTimeDataClient(): IRealTimeDataClient {
		return this.realtimedataclient;
	}

	/**
     * get the ReportingClient interface.
	 * @return {IReportingClient}    The ReportingClient.
    */
	getReportingClient(): IReportingClient {
		return this.reportingclient;
	}
}