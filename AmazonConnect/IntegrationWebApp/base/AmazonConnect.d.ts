/**
 * Lake Amazon Connect client implementation.
 */
export declare class AmazonConnect {
    apiOptions: any;
    apiConfig: any;
    agentAPI: any;
    uniqueClassName: string;
    useWebSessionStorage: boolean;
    acContacts: Array<AmazonConnectContact>;
    /**
     * Lake Amazon Connect client implementation.
     *
     * @param {Object}   apiOptions  A collection of options.
     *
     * @example
     *  apiOptions = {
     *		debug: true
     *	};
     */
    constructor(apiOptions: any);
    /**
    * initialise the global connect clients.
    */
    initConnectClients(): void;
    /**
     * is there a contact session stored.
     * @return {boolean}   true if list is exists; else false.
    */
    hasContactSession(): boolean;
    /**
     * add a new contact to the list.
     *
     * @param {object}	contact   the contact API object.
     * @param {object}	connection   the connection object.
     * @param {string}	contactId   the contact unique id.
     * @param {string}	connectionId   the connection unique id.
     * @return {boolean}   True if the contact was added; else false.
    */
    addContact(contact: any, connection: any, contactId: string, connectionId: string): boolean;
    /**
     * add a new contact to the list.
     *
     * @param {string}	contactId   the contact unique id.
     * @param {string}	connectionId   the connection unique id.
     * @return {boolean}   True if the contact was added; else false.
    */
    addContactId(contactId: string, connectionId: string): boolean;
    /**
     * remove a new contact from the list.
     *
     * @param {string}   contactId  The contact id to remove.
     * @return {boolean}   True if the contact was removed; else false.
    */
    removeContact(contactId: string): boolean;
    /**
     * get the contact from the list.
     *
     * @param {string}   contactId  The contact id to return.
     * @return {object}   The contact object.
    */
    getContact(contactId: string): AmazonConnectContact | null;
    /**
     * get the contact id list.
     * @return {array}   The contact id list.
    */
    getContactIdList(): string[];
    /**
     * get the contact list.
     * @return {array}   The contact list.
    */
    getContactList(): AmazonConnectContact[];
    /**
     * clear the contact list.
     * @return {boolean}   true if list is cleared; else false.
    */
    clearContactList(): boolean;
    /**
     * ArrayBuffer response from a fetch API request.
     *
     * @param {Response}	response   the fetch API response.
     * @return {Promise}	the promise interface.
     */
    arrayResponse(response: Response): Promise<ArrayBuffer>;
    /**
     * Blob response from a fetch API request.
     *
     * @param {Response}	response   the fetch API response.
     * @return {Promise}	the promise interface.
     */
    blobResponse(response: Response): Promise<Blob>;
    /**
     * form data response from a fetch API request.
     *
     * @param {Response}	response   the fetch API response.
     * @return {Promise}	the promise interface.
     */
    formResponse(response: Response): Promise<FormData>;
    /**
     * text response from a fetch API request.
     *
     * @param {Response}	response   the fetch API response.
     * @return {Promise}	the promise interface.
     */
    textResponse(response: Response): Promise<string>;
    /**
     * json response from a fetch API request.
     *
     * @param {Response}	response   the fetch API response.
     * @return {Promise}	the promise interface.
     */
    jsonResponse(response: Response): Promise<any>;
    /**
     * Response action from a fetch API request.
     *
     * @param {Response}	response   the fetch API response.
     * @return {Promise}	the promise interface; either the response or the error message.
     */
    responseAction(response: Response): Promise<any>;
    /**
     * Make a request with a general response from a fetch API request.
     *
     * @param {string}	url   the url.
     * @param {object}	config   the configuration object.
     * @param {Function}	resultAction   the result function.
     * @param {Function}	errorAction   the error function.
     *
     * @example
     *	generalRequest(
     *		'https://domain/api/1',
     *		{
     *			mode: 'cors',					// no-cors, *cors, same-origin
     *			method: 'post',					// *GET, POST, PUT, DELETE, etc..
     *			cache: 'no-cache',				// *default, no-cache, reload, force-cache, only-if-cached
     *			redirect: 'follow',				// manual, *follow, error
     *			referrer: 'no-referrer',		// no-referrer, *client
     *			body: 'foo=bar&lorem=ipsum',	// JSON.stringify(data), body data type must match "Content-Type" header
     *			credentials: 'include',			// include, same-origin, omit
     *			headers: {
     *				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
     *			}
     *		},
     *		function(data) { ... },
     *		function(error) { ... }
     *  );
     */
    generalRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void;
    /**
     * Make a request with a json response from a fetch API request.
     *
     * @param {string}	url   the url.
     * @param {object}	config   the configuration object.
     * @param {Function}	resultAction   the result function.
     * @param {Function}	errorAction   the error function.
     *
     * @example
     *	jsonRequest(
     *		'https://domain/api/1',
     *		{
     *			mode: 'cors',					// no-cors, *cors, same-origin
     *			method: 'post',					// *GET, POST, PUT, DELETE, etc..
     *			cache: 'no-cache',				// *default, no-cache, reload, force-cache, only-if-cached
     *			redirect: 'follow',				// manual, *follow, error
     *			referrer: 'no-referrer',		// no-referrer, *client
     *			body: 'foo=bar&lorem=ipsum',	// JSON.stringify(data), body data type must match "Content-Type" header
     *			credentials: 'include',			// include, same-origin, omit
     *			headers: {
     *				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
     *			}
     *		},
     *		function(data) { ... },
     *		function(error) { ... }
     *  );
     */
    jsonRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void;
    /**
     * Make a request with a form data response from a fetch API request.
     *
     * @param {string}	url   the url.
     * @param {object}	config   the configuration object.
     * @param {Function}	resultAction   the result function.
     * @param {Function}	errorAction   the error function.
     *
     * @example
     *	formRequest(
     *		'https://domain/api/1',
     *		{
     *			mode: 'cors',					// no-cors, *cors, same-origin
     *			method: 'post',					// *GET, POST, PUT, DELETE, etc..
     *			cache: 'no-cache',				// *default, no-cache, reload, force-cache, only-if-cached
     *			redirect: 'follow',				// manual, *follow, error
     *			referrer: 'no-referrer',		// no-referrer, *client
     *			body: 'foo=bar&lorem=ipsum',	// JSON.stringify(data), body data type must match "Content-Type" header
     *			credentials: 'include',			// include, same-origin, omit
     *			headers: {
     *				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
     *			}
     *		},
     *		function(data) { ... },
     *		function(error) { ... }
     *  );
     */
    formRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void;
    /**
     * Make a request with a blob response from a fetch API request.
     *
     * @param {string}	url   the url.
     * @param {object}	config   the configuration object.
     * @param {Function}	resultAction   the result function.
     * @param {Function}	errorAction   the error function.
     *
     * @example
     *	blobRequest(
     *		'https://domain/api/1',
     *		{
     *			mode: 'cors',					// no-cors, *cors, same-origin
     *			method: 'post',					// *GET, POST, PUT, DELETE, etc..
     *			cache: 'no-cache',				// *default, no-cache, reload, force-cache, only-if-cached
     *			redirect: 'follow',				// manual, *follow, error
     *			referrer: 'no-referrer',		// no-referrer, *client
     *			body: 'foo=bar&lorem=ipsum',	// JSON.stringify(data), body data type must match "Content-Type" header
     *			credentials: 'include',			// include, same-origin, omit
     *			headers: {
     *				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
     *			}
     *		},
     *		function(data) { ... },
     *		function(error) { ... }
     *  );
     */
    blobRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void;
    /**
     * Make a request with a array response from a fetch API request.
     *
     * @param {string}	url   the url.
     * @param {object}	config   the configuration object.
     * @param {Function}	resultAction   the result function.
     * @param {Function}	errorAction   the error function.
     *
     * @example
     *	arrayRequest(
     *		'https://domain/api/1',
     *		{
     *			mode: 'cors',					// no-cors, *cors, same-origin
     *			method: 'post',					// *GET, POST, PUT, DELETE, etc..
     *			cache: 'no-cache',				// *default, no-cache, reload, force-cache, only-if-cached
     *			redirect: 'follow',				// manual, *follow, error
     *			referrer: 'no-referrer',		// no-referrer, *client
     *			body: 'foo=bar&lorem=ipsum',	// JSON.stringify(data), body data type must match "Content-Type" header
     *			credentials: 'include',			// include, same-origin, omit
     *			headers: {
     *				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
     *			}
     *		},
     *		function(data) { ... },
     *		function(error) { ... }
     *  );
     */
    arrayRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void;
    /**
     * Make a request with a text response from a fetch API request.
     *
     * @param {string}	url   the url.
     * @param {object}	config   the configuration object.
     * @param {Function}	resultAction   the result function.
     * @param {Function}	errorAction   the error function.
     *
     * @example
     *	textRequest(
     *		'https://domain/api/1',
     *		{
     *			mode: 'cors',					// no-cors, *cors, same-origin
     *			method: 'post',					// *GET, POST, PUT, DELETE, etc..
     *			cache: 'no-cache',				// *default, no-cache, reload, force-cache, only-if-cached
     *			redirect: 'follow',				// manual, *follow, error
     *			referrer: 'no-referrer',		// no-referrer, *client
     *			body: 'foo=bar&lorem=ipsum',	// JSON.stringify(data), body data type must match "Content-Type" header
     *			credentials: 'include',			// include, same-origin, omit
     *			headers: {
     *				"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
     *			}
     *		},
     *		function(data) { ... },
     *		function(error) { ... }
     *  );
     */
    textRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void;
    /**
     * assign the agent details.
     *
     * @param {object}	agent   the agent API object.
     */
    assignAgent(agent: any): void;
    /**
     * get the agent's current AgentState object indicating their availability state type.
     *
     * @return {object}	null if agent API is null; else an object:
     * name: The name of the agent's current availability state.
     * type: The agent's current availability state type, as per the AgentStateType enumeration.
     * duration: A relative local state duration. To get the actual duration of the state relative to
     *			the current time, use agent.getStateDuration().
     */
    agentGetState(): any;
    /**
     * get the duration of the agent's state in milliseconds relative to local time.
     * This takes into account time skew between the JS client and the Amazon Connect service.
     *
     * @return {object}	null if agent API is null; else the duration:
     */
    agentGetStateDuration(): any;
    /**
     * gets strings which indicates actions that the agent can take in the CCP.
     *
     * @return {object}	null if agent API is null; else an object
     */
    agentGetPermissions(): any;
    /**
     * gets a list of Contact API objects for each of the agent's current contacts.
     *
     * @param {object}	contactTypeFilter   Optional. If provided, only contacts of the given type are returned.
     * @return {object}	null if agent API is null; else an object.
     */
    agentGetContacts(contactTypeFilter?: any): any;
    /**
     * gets the full AgentConfiguration object for the agent.
     *
     * @return {object}	null if agent API is null; else an object:
     * name: The agent's user friendly display name.
     * softphoneEnabled: Indicates whether the agent's phone calls should route to the agent's browser-based softphone or the telephone number configured as the agent's extension.
     * extension: Indicates the phone number that should be dialed to connect the agent to their inbound or outbound calls when softphone is not enabled.
     * routingProfile: Describes the agent's current routing profile and list of queues therein. See agent.getRoutingProfile() for more info.
     * username: The username for the agent as entered in their Amazon Connect user account.
     */
    agentGetConfiguration(): any;
    /**
     * gets the list of selectable AgentState API objects. These are the agent states
     * that can be selected when the agent is not handling a live contact.
     *
     * @return {object}	null if agent API is null; else an object:
     * Each AgentState object contains the following fields:
     * type: The AgentStateType associated with this agent state.
     * name: The name of the agent state to be displayed in the UI.
     */
    agentGetAgentStates(): any;
    /**
     * gets the agent's routing profile.
     *
     * @return {object}	null if agent API is null; else an object:
     * The routing profile contains the following fields:
     * name: The name of the routing profile.
     * queues: The queues contained in the routing profile.
     * defaultOutboundQueue: The default queue which should be associated with outbound contacts.
     */
    agentGetRoutingProfile(): any;
    /**
     * gets the agent's user friendly display name from the AgentConfiguration object for the agent.
     *
     * @return {object}	null if agent API is null; else an object.
     */
    agentGetName(): any;
    /**
     * gets the agent's phone number from the AgentConfiguration object for the agent.
     * This is the phone number that is dialed by Amazon Connect to connect calls to
     * the agent for incoming and outgoing calls if softphone is not enabled.
     *
     * @return {object}	null if agent API is null; else an object.
     */
    agentGetExtension(): any;
    /**
     * determine if softphone is enabled for the agent.
     *
     * @return {object}	null if agent API is null; else an object.
     */
    agentIsSoftphoneEnabled(): any;
    /**
     * updates the agents configuration with the given AgentConfiguration object.
     * The phone number specified must be in E.164 format or the update fails.
     *
     * @param {object}	config   the configuration details:
     * name: The agent's user friendly display name.
     * softphoneEnabled: Indicates whether the agent's phone calls should route to the agent's browser-based softphone or the telephone number configured as the agent's extension.
     * extension: Indicates the phone number that should be dialed to connect the agent to their inbound or outbound calls when softphone is not enabled.
     * routingProfile: Describes the agent's current routing profile and list of queues therein. See agent.getRoutingProfile() for more info.
     * username: The username for the agent as entered in their Amazon Connect user account.
     *
     * @param {object}	callbackConfig   the configuration callback:
     * Optional success and failure callbacks can be provided to determine if the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if agent API is null; else true.
     *
     * @example
     *	var config = agent.getConfiguration();
     *	config.extension = "+12061231234";
     *	config.softphoneEnabled = false;
     *	agent.setConfiguration(config, {
     *		success: function() { ... },
     *		failure: function() { ... }
     * });
     */
    agentSetConfiguration(config: any, callbackConfig: any): boolean;
    /**
     * Set the agent's current availability state. Can only be performed if the agent is not handling a live contact.
     *
     * @param {object}	routableState   the state details:
     * type: The AgentStateType associated with this agent state.
     * name: The name of the agent state to be displayed in the UI.
     *
     * @param {object}	callbackConfig   the state callback:
     * Optionally provide success and failure callbacks to determine whether the operation succeeded.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if agent API is null; else true.
     *
     * @example
     *	var routableState = agent.getAgentStates().filter(function(state) {
     *		return state.type === AgentStateType.ROUTABLE;
     *	})[0];
     *	agent.setState(routableState, {
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    agentSetState(routableState: any, callbackConfig: any): boolean;
    /**
     * creates an outbound contact to the given endpoint. You can optionally
     * provide a queueARN to associate the contact with a queue.
     *
     * @param {object}	endpoint   the endpoint details:
     *
     * @param {object}	callbackConfig   the state callback:
     * Optionally provide success and failure callbacks to determine whether the operation succeeded.
     * queueARN: QUEUE_ARN,
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if agent API is null; else true.
     *
     * @example
     *	agent.connect(endpoint, {
     *		queueARN: QUEUE_ARN,
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    agentConnect(endpoint: any, callbackConfig: any): boolean;
    /**
     * the data behind the Agent API object is ephemeral and changes whenever new
     * data is provided. This method provides an opportunity to create a snapshot
     * version of the Agent API object and save it for future use, such as adding
     * to a log file or posting elsewhere.
     *
     * @return {object}	null if agent API is null; else an object.
     */
    agentToSnapshot(): any;
    /**
     * sets the agent local media to mute mode.
     *
     * @return {boolean}	false if agent API is null; else true.
     */
    agentMute(): boolean;
    /**
     * sets the agent local media to unmute mode.
     *
     * @return {boolean}	false if agent API is null; else true.
     */
    agentUnMute(): boolean;
}
/**
 * Lake Amazon Connect contact implementation.
 */
export declare class AmazonConnectContact {
    acClient: AmazonConnect;
    contactType: number;
    contactName: string;
    description: string;
    contactData: any;
    contactAPI: any;
    connectionAPI: any;
    contactId: string;
    connectionId: string;
    /**
     * Lake Amazon Connect contact implementation.
     * .
     * @param {AmazonConnect}   acClient  The client that owns the contact.
     */
    constructor(acClient: AmazonConnect);
    /**
     * assign the contact api details.
     *
     * @param {object}	contact   the contact API object.
     * @param {object}	connection   the connection API object.
     */
    assignContactApi(contact: any, connection: any): void;
    /**
     * get the unique contactId of this contact.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetContactId(): any;
    /**
     * get the original contact id from which this contact was transferred,
     * or none if this is not an internal Connect transfer. This is typically a
     * contact owned by another agent, thus this agent will not be able to
     * manipulate it. It is for reference and association purposes only, and
     * can be used to share data between transferred contacts externally if it
     * is linked by originalContactId.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetOriginalContactId(): any;
    /**
     * get the type of the contact. This indicates what type of media is carried over the connections of the contact.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetType(): any;
    /**
     * get a ContactState object representing the state of the contact.
     *
     * @return {object}	null if contact API is null; else an object.
     * This object has the following fields:
     * type: The contact state type, as per the ContactStateType enumeration.
     * duration: A relative local state duration. To get the actual duration of the state relative to the current time, use contact.getStateDuration().
     */
    contactGetState(): any;
    /**
     * get the duration of the contact state in milliseconds relative to local time.
     * This takes into account time skew between the JS client and the Amazon Connect backend servers.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetStateDuration(): any;
    /**
     * get the queue associated with the contact.
     *
     * @return {object}	null if contact API is null; else an object.
     * This object has the following fields:
     * queueARN: The ARN of the queue to associate with the contact.
     * name: The name of the queue.
     */
    contactGetQueue(): any;
    /**
     * get a list containing Connection API objects for each connection in the contact.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetConnections(): any;
    /**
     * get the initial connection of the contact.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetInitialConnection(): any;
    /**
     * get the inital connection of the contact, or null if the initial connection is no longer active.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetActiveInitialConnection(): any;
    /**
     * get a list of all of the third-party connections, i.e. the list of all
     * connections except for the initial connection, or an empty list if there
     * are no third-party connections.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetThirdPartyConnections(): any;
    /**
     * In Voice contacts, there can only be one active third-party connection.
     * This method returns the single active third-party connection, or null if
     * there are no currently active third-party connections.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetSingleActiveThirdPartyConnection(): any;
    /**
     * gets the agent connection. This is the connection that represents the agent's participation in the contact.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetAgentConnection(): any;
    /**
     * get a map from attribute name to value for each attribute associated with the contact.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactGetAttributes(): any;
    /**
     * determine whether this contact is a softphone call.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactIsSoftphoneCall(): any;
    /**
     * determine whether this is an inbound or outbound contact.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactIsInbound(): any;
    /**
     * determine whether the contact is in a connected state.
     * Note that contacts no longer exist once they have been removed.
     * To detect these instances, subscribe to the contact.onEnded() event for the contact.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    contactIsConnected(): any;
    /**
     * accept an incoming contact.
     *
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine whether the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	contact.accept({
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    contactAccept(callbackConfig: any): boolean;
    /**
     * close the contact and all of its associated connections. If the contact
     * is a voice contact, and there is a third-party, the customer remains bridged
     * with the third party and will not be disconnected from the call. Otherwise,
     * the agent and customer are disconnected.
     *
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine whether the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	contact.destroy({
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    contactDestroy(callbackConfig: any): boolean;
    /**
     * Provide diagnostic information for the contact in the case something exceptional
     * happens on the front end. The Streams logs will be published along with the issue
     * code and description provided here.
     *
     * @param {object}	issueCode   An arbitrary issue code to associate with the diagnostic report.
     * @param {object}	description   A description to associate with the diagnostic report.
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine if the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	contact.notifyIssue(issueCode, description, {
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    contactNotifyIssue(issueCode: any, description: any, callbackConfig: any): boolean;
    /**
     * Add a new outbound third-party connection to this contact and connect it to the specified endpoint.
     *
     * @param {object}	endpoint   the contact endpoint.
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine whether the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	contact.addConnection(endpoint, {
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    contactAddConnection(endpoint: any, callbackConfig: any): boolean;
    /**
     * Rotate through the connected and on hold connections of the contact. This operation
     * is only valid if there is at least one third-party connection and the initial
     * connection is still connected.
     *
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine whether the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	contact.toggleActiveConnections({
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    contactToggleActiveConnections(callbackConfig: any): boolean;
    /**
     * Conference together the active connections of the conversation. This operation
     * is only valid if there is at least one third-party connection and the initial
     * connection is still connected.
     *
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine whether the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	contact.conferenceConnections({
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    contactConferenceConnections(callbackConfig: any): boolean;
    /**
     * Gets the unique contactId of the contact to which this connection belongs.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionGetContactId(): any;
    /**
     * Gets the unique connectionId for this connection.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionGetConnectionId(): any;
    /**
     * Gets the endpoint to which this connection is connected.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionGetEndpoint(): any;
    /**
     * Gets the ConnectionState object for this connection.
     *
     * @return {object}	null if contact API is null; else an object.
     * This object has the following fields:
     * type: The connection state type, as per the ConnectionStateType enumeration.
     * duration: A relative local state duration. To get the actual duration of the state relative to the current time, use connection.getStateDuration().
     */
    connectionGetState(): any;
    /**
     * Get the duration of the connection state, in milliseconds, relative
     * to local time. This takes into account time skew between the JS client
     * and the Amazon Connect service.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionGetStateDuration(): any;
    /**
     * Get the type of connection. This value is either "inbound", "outbound", or "monitoring".
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionGetType(): any;
    /**
     * Determine if the connection is the contact's initial connection.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionIsInitialConnection(): any;
    /**
     * Determine if the contact is active. The connection is active it is incoming, connecting, connected, or on hold.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionIsActive(): any;
    /**
     * Determine if the connection is connected, meaning that the agent is live in a conversation through this connection.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionIsConnected(): any;
    /**
     * Determine whether the connection is in the process of connecting.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionIsConnecting(): any;
    /**
     * Determine whether the connection is on hold.
     *
     * @return {object}	null if contact API is null; else an object.
     */
    connectionIsOnHold(): any;
    /**
     * Ends the connection.
     *
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine whether the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	connection.destroy({
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    connectionDestroy(callbackConfig: any): boolean;
    /**
     * Send a digit or string of digits through this connection. This is only valid for contact types
     * that can accept digits, currently this is limited to softphone-enabled voice contacts.
     *
     * @param {object}	digits   a digit or string of digits.
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine whether the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	connection.sendDigits(digits, {
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    connectionSendDigits(digits: any, callbackConfig: any): boolean;
    /**
     * Put this connection on hold.
     *
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine whether the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	connection.hold({
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    connectionHold(callbackConfig: any): boolean;
    /**
     * Resume this connection if it was on hold.
     *
     * @param {object}	callbackConfig   the state callback:
     * Optional success and failure callbacks can be provided to determine whether the operation was successful.
     * success: function() { ... },
     * failure: function() { ... }
     *
     * @return {boolean}	false if contact API is null; else true.
     *
     * @example
     *	connection.resume({
     *		success: function() { ... },
     *		failure: function() { ... }
     *	});
     */
    connectionResume(callbackConfig: any): boolean;
}
