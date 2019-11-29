

/**
 * Lake Amazon Connect client implementation.
 */
export class AmazonConnect {

	apiConfig: any;

	// global.
	agentAPI: any;
	uniqueClassName: string;
	useWebSessionStorage: boolean;

	// collection of contacts.
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
	constructor(public apiOptions: any) {

		let itemApi;

		// ac api client options.
		let optionsApi = apiOptions || {};
		let apiConfig = this.apiConfig = {
			debug: true
		};

		// set our config from options
		for (itemApi in optionsApi) {
			if (optionsApi.hasOwnProperty(itemApi)) {
				this.apiConfig[itemApi] = optionsApi[itemApi];
			}
		}

		this.agentAPI = null;

		// stores all contacts.
		this.acContacts = [];
		this.uniqueClassName = "one";
		this.useWebSessionStorage = true;
	}

	/**
	* initialise the global connect clients.
	*/
	initConnectClients(): void {

		// define local.
		let thisLocal = this;

		// if the web session storage should be used.
		if (this.useWebSessionStorage) {

			// if contact id list has been set.
			if (sessionStorage.getItem('lake.awsconnect' + this.uniqueClassName + '.agentSessionContactList')) {

				// get session auth details.
				let contactIdList: any = JSON.parse(sessionStorage.getItem('lake.awsconnect' + this.uniqueClassName + '.agentSessionContactList'));
				if (contactIdList !== null) {

					// local parent object.
					let localThis = this;

					// for each contact id
					contactIdList.forEach(function (id) {

						// each id is an object for contact parms.
						// add the contact to the list.
						let result: boolean = localThis.addContactId(id.contactId, id.connectionId);
						if (result) {
							let contact: AmazonConnectContact = localThis.getContact(id.contactId);
							if (contact !== null) {

								// assign the contact details.
								contact.contactType = id.contactType;
								contact.contactName = id.contactName;
								contact.description = id.description;
								contact.contactData = id.contactData;
								contact.acClient = localThis;
							}
						}
					});
				}
			}
		}
	}

	/**
     * is there a contact session stored.
	 * @return {boolean}   true if list is exists; else false.
    */
	hasContactSession(): boolean {

		// if contact id list has been set.
		if (sessionStorage.getItem('lake.awsconnect' + this.uniqueClassName + '.agentSessionContactList')) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
     * add a new contact to the list.
	 * 
	 * @param {object}	contact   the contact API object.
	 * @param {object}	connection   the connection object.
	 * @param {string}	contactId   the contact unique id.
	 * @param {string}	connectionId   the connection unique id.
	 * @return {boolean}   True if the contact was added; else false.
    */
	addContact(contact: any, connection: any, contactId: string, connectionId: string): boolean {

		// create a new contact instance.
		let newContact: AmazonConnectContact = new AmazonConnectContact(this);
		newContact.contactAPI = contact;
		newContact.connectionAPI = connection;
		newContact.contactId = contactId;
		newContact.connectionId = connectionId;

		// add the new contact, return the length of the array.
		let length = this.acContacts.push(newContact);

		// if length is more than zero.
		if (length > 0) {

			// store the list.
			this.getContactList();
			return true;
		}
		else {
			return false;
		}
	}

	/**
     * add a new contact to the list.
	 * 
	 * @param {string}	contactId   the contact unique id.
	 * @param {string}	connectionId   the connection unique id.
	 * @return {boolean}   True if the contact was added; else false.
    */
	addContactId(contactId: string, connectionId: string): boolean {

		// create a new contact instance.
		let newContact: AmazonConnectContact = new AmazonConnectContact(this);
		newContact.contactId = contactId;
		newContact.connectionId = connectionId;

		// add the new contact, return the length of the array.
		let length = this.acContacts.push(newContact);

		// if length is more than zero.
		if (length > 0) {

			// store the list.
			this.getContactList();
			return true;
		}
		else {
			return false;
		}
	}

	/**
     * remove a new contact from the list.
	 * 
	 * @param {string}   contactId  The contact id to remove.
	 * @return {boolean}   True if the contact was removed; else false.
    */
	removeContact(contactId: string): boolean {

		let currentContact: AmazonConnectContact | null = null;

		// find the contact from the contactId.
		this.acContacts.forEach(function (contact) {
			if (contact.contactId === contactId) {

				// assign the contact.
				currentContact = contact;
			}
		});

		// if the contact has been found.
		if (currentContact !== null) {

			// get the index of the contact to delete.
			let currentIndex: number = this.acContacts.indexOf(currentContact);

			// remove the contact from the list.
			let deleteList: AmazonConnectContact[] = this.acContacts.splice(currentIndex, 1);

			// if something was deleted.
			if (deleteList.length > 0) {

				// store the list.
				this.getContactList();
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}

	/**
     * get the contact from the list.
	 * 
	 * @param {string}   contactId  The contact id to return.
	 * @return {object}   The contact object.
    */
	getContact(contactId: string): AmazonConnectContact | null {

		return this.acContacts.find(function (contact) {

			// Return the contact.
			return contact.contactId === contactId;
		});
	}

	/**
     * get the contact id list.
	 * @return {array}   The contact id list.
    */
	getContactIdList(): string[] {

		// assign the array.
		let contactIdList: string[] = [];

		// find the contact from the contactId.
		this.acContacts.forEach(function (contact) {

			// add the contact id.
			contactIdList.push(contact.contactId);
		});

		// return the array.
		return contactIdList;
	}

	/**
     * get the contact list.
	 * @return {array}   The contact list.
    */
	getContactList(): AmazonConnectContact[] {

		// assign the array.
		let contactList: any[] = [];

		// find the contact from the contactId.
		this.acContacts.forEach(function (contact) {

			// add the contact id.
			contactList.push(
				{
					contactId: contact.contactId,
					connectionId: contact.connectionId,
					contactType: contact.contactType,
					contactName: contact.contactName,
					description: contact.description,
					contactData: contact.contactData
				});
		});

		// if the web session storage should be used.
		if (this.useWebSessionStorage) {
			// store the list.
			sessionStorage.setItem('lake.awsconnect' + this.uniqueClassName + '.agentSessionContactList', JSON.stringify(contactList));
		}

		// return the array.
		return contactList;
	}

	/**
     * clear the contact list.
	 * @return {boolean}   true if list is cleared; else false.
    */
	clearContactList(): boolean {

		let cleared: boolean = false;

		// get the list count.
		let count: number = this.acContacts.length

		// if contacts exist.
		if (count > 0) {
			try {
				// remove all contacts.
				this.acContacts.splice(0, count);
				cleared = true;

			} catch (e) {
				// log the error.
				console.error(e);
			}
		}

		// return the result.
		return cleared;
	}

	/**
	 * ArrayBuffer response from a fetch API request.
	 *
	 * @param {Response}	response   the fetch API response.
	 * @return {Promise}	the promise interface.
	 */
	arrayResponse(response: Response): Promise<ArrayBuffer> {

		// return the promise.
		return response.arrayBuffer();
	}

	/**
	 * Blob response from a fetch API request.
	 *
	 * @param {Response}	response   the fetch API response.
	 * @return {Promise}	the promise interface.
	 */
	blobResponse(response: Response): Promise<Blob> {

		// return the promise.
		return response.blob();
	}

	/**
	 * form data response from a fetch API request.
	 *
	 * @param {Response}	response   the fetch API response.
	 * @return {Promise}	the promise interface.
	 */
	formResponse(response: Response): Promise<FormData> {

		// return the promise.
		return response.formData();
	}

	/**
	 * text response from a fetch API request.
	 *
	 * @param {Response}	response   the fetch API response.
	 * @return {Promise}	the promise interface.
	 */
	textResponse(response: Response): Promise<string> {

		// return the promise.
		return response.text();
	}

	/**
	 * json response from a fetch API request.
	 *
	 * @param {Response}	response   the fetch API response.
	 * @return {Promise}	the promise interface.
	 */
	jsonResponse(response: Response): Promise<any> {

		// return the promise.
		return response.json();
	}

	/**
	 * Response action from a fetch API request.
	 *
	 * @param {Response}	response   the fetch API response.
	 * @return {Promise}	the promise interface; either the response or the error message.
	 */
	responseAction(response: Response): Promise<any> {

		// if successful request.
		if (response.status >= 200 && response.status < 300) {

			// return the promise response.
			return Promise.resolve(response)
		} else {

			// return the promise with error.
			return Promise.reject(new Error(response.statusText))
		}
	}

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
	generalRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void {

		// make the request.
		fetch(url, config)
			.then(this.responseAction)
			.then(resultAction)
			.catch(errorAction);
	}

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
	jsonRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void {

		// make the request.
		fetch(url, config)
			.then(this.responseAction)
			.then(this.jsonResponse)
			.then(resultAction)
			.catch(errorAction);
	}

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
	formRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void {

		// make the request.
		fetch(url, config)
			.then(this.responseAction)
			.then(this.formResponse)
			.then(resultAction)
			.catch(errorAction);
	}

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
	blobRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void {

		// make the request.
		fetch(url, config)
			.then(this.responseAction)
			.then(this.blobResponse)
			.then(resultAction)
			.catch(errorAction);
	}

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
	arrayRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void {

		// make the request.
		fetch(url, config)
			.then(this.responseAction)
			.then(this.arrayResponse)
			.then(resultAction)
			.catch(errorAction);
	}

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
	textRequest(url: string, config: any, resultAction: (data: any) => void, errorAction: (error: any) => void): void {

		// make the request.
		fetch(url, config)
			.then(this.responseAction)
			.then(this.textResponse)
			.then(resultAction)
			.catch(errorAction);
	}

	/**
	 * assign the agent details.
	 *
	 * @param {object}	agent   the agent API object.
	 */
	assignAgent(agent: any): void {

		// assign each value.
		this.agentAPI = agent;
	}

	/**
	 * get the agent's current AgentState object indicating their availability state type.
	 *
	 * @return {object}	null if agent API is null; else an object:	
	 * name: The name of the agent's current availability state.
	 * type: The agent's current availability state type, as per the AgentStateType enumeration.
	 * duration: A relative local state duration. To get the actual duration of the state relative to 
	 *			the current time, use agent.getStateDuration().
	 */
	agentGetState(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.getState();
		}
		else {
			return null;
		}
	}

	/**
	 * get the duration of the agent's state in milliseconds relative to local time. 
	 * This takes into account time skew between the JS client and the Amazon Connect service.
	 *
	 * @return {object}	null if agent API is null; else the duration:
	 */
	agentGetStateDuration(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.getStateDuration();
		}
		else {
			return null;
		}
	}

	/**
	 * gets strings which indicates actions that the agent can take in the CCP.
	 *
	 * @return {object}	null if agent API is null; else an object
	 */
	agentGetPermissions(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.getPermissions();
		}
		else {
			return null;
		}
	}

	/**
	 * gets a list of Contact API objects for each of the agent's current contacts.
	 *
	 * @param {object}	contactTypeFilter   Optional. If provided, only contacts of the given type are returned.
	 * @return {object}	null if agent API is null; else an object.
	 */
	agentGetContacts(contactTypeFilter: any = null): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.getContacts(contactTypeFilter);
		}
		else {
			return null;
		}
	}

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
	agentGetConfiguration(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.getConfiguration();
		}
		else {
			return null;
		}
	}

	/**
	 * gets the list of selectable AgentState API objects. These are the agent states 
	 * that can be selected when the agent is not handling a live contact.
	 *
	 * @return {object}	null if agent API is null; else an object:
	 * Each AgentState object contains the following fields:
	 * type: The AgentStateType associated with this agent state.
	 * name: The name of the agent state to be displayed in the UI.
	 */
	agentGetAgentStates(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.getAgentStates();
		}
		else {
			return null;
		}
	}

	/**
	 * gets the agent's routing profile.
	 *
	 * @return {object}	null if agent API is null; else an object:
	 * The routing profile contains the following fields:
	 * name: The name of the routing profile.
	 * queues: The queues contained in the routing profile.
	 * defaultOutboundQueue: The default queue which should be associated with outbound contacts.
	 */
	agentGetRoutingProfile(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.getRoutingProfile();
		}
		else {
			return null;
		}
	}

	/**
	 * gets the agent's user friendly display name from the AgentConfiguration object for the agent.
	 *
	 * @return {object}	null if agent API is null; else an object.
	 */
	agentGetName(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.getName();
		}
		else {
			return null;
		}
	}

	/**
	 * gets the agent's phone number from the AgentConfiguration object for the agent. 
	 * This is the phone number that is dialed by Amazon Connect to connect calls to 
	 * the agent for incoming and outgoing calls if softphone is not enabled.
	 *
	 * @return {object}	null if agent API is null; else an object.
	 */
	agentGetExtension(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.getExtension();
		}
		else {
			return null;
		}
	}

	/**
	 * determine if softphone is enabled for the agent.
	 *
	 * @return {object}	null if agent API is null; else an object.
	 */
	agentIsSoftphoneEnabled(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.isSoftphoneEnabled();
		}
		else {
			return null;
		}
	}

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
	agentSetConfiguration(config: any, callbackConfig: any): boolean {

		if (this.agentAPI !== null) {
			this.agentAPI.setConfiguration(config, callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	agentSetState(routableState: any, callbackConfig: any): boolean {

		if (this.agentAPI !== null) {
			this.agentAPI.setState(routableState, callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	agentConnect(endpoint: any, callbackConfig: any): boolean {

		if (this.agentAPI !== null) {
			this.agentAPI.connect(endpoint, callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * the data behind the Agent API object is ephemeral and changes whenever new 
	 * data is provided. This method provides an opportunity to create a snapshot 
	 * version of the Agent API object and save it for future use, such as adding 
	 * to a log file or posting elsewhere.
	 *
	 * @return {object}	null if agent API is null; else an object.
	 */
	agentToSnapshot(): any {

		if (this.agentAPI !== null) {
			return this.agentAPI.toSnapshot();
		}
		else {
			return null;
		}
	}

	/**
	 * sets the agent local media to mute mode.
	 *
	 * @return {boolean}	false if agent API is null; else true.
	 */
	agentMute(): boolean {

		if (this.agentAPI !== null) {
			this.agentAPI.mute();
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * sets the agent local media to unmute mode.
	 *
	 * @return {boolean}	false if agent API is null; else true.
	 */
	agentUnMute(): boolean {

		if (this.agentAPI !== null) {
			this.agentAPI.unmute();
			return true;
		}
		else {
			return false;
		}
	}
}

/**
 * Lake Amazon Connect contact implementation.
 */
export class AmazonConnectContact {

	// global.
	contactType: number;
	contactName: string;
	description: string;
	contactData: any;

	// global.
	contactAPI: any;
	connectionAPI: any;

	contactId: string;
	connectionId: string;

	/**
     * Lake Amazon Connect contact implementation.
	 * .
	 * @param {AmazonConnect}   acClient  The client that owns the contact.
     */
	constructor(public acClient: AmazonConnect) {

		this.contactType = 0;
		this.contactName = "";
		this.description = "";
		this.contactData = null;

		this.contactAPI = null;
		this.connectionAPI = null;

		this.contactId = "";
		this.connectionId = "";
	}

	/**
	 * assign the contact api details.
	 *
	 * @param {object}	contact   the contact API object.
	 * @param {object}	connection   the connection API object.
	 */
	assignContactApi(contact: any, connection: any): void {

		// assign each value.
		this.contactAPI = contact;
		this.connectionAPI = connection;
	}

	/**
	 * get the unique contactId of this contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetContactId(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getContactId();
		}
		else {
			return null;
		}
	}

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
	contactGetOriginalContactId(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getOriginalContactId();
		}
		else {
			return null;
		}
	}

	/**
	 * get the type of the contact. This indicates what type of media is carried over the connections of the contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetType(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getType();
		}
		else {
			return null;
		}
	}

	/**
	 * get a ContactState object representing the state of the contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 * This object has the following fields:
	 * type: The contact state type, as per the ContactStateType enumeration.
	 * duration: A relative local state duration. To get the actual duration of the state relative to the current time, use contact.getStateDuration().
	 */
	contactGetState(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getState();
		}
		else {
			return null;
		}
	}

	/**
	 * get the duration of the contact state in milliseconds relative to local time. 
	 * This takes into account time skew between the JS client and the Amazon Connect backend servers.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetStateDuration(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getStateDuration();
		}
		else {
			return null;
		}
	}

	/**
	 * get the queue associated with the contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 * This object has the following fields:
	 * queueARN: The ARN of the queue to associate with the contact.
	 * name: The name of the queue.
	 */
	contactGetQueue(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getQueue();
		}
		else {
			return null;
		}
	}

	/**
	 * get a list containing Connection API objects for each connection in the contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetConnections(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getConnections();
		}
		else {
			return null;
		}
	}

	/**
	 * get the initial connection of the contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetInitialConnection(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getInitialConnection();
		}
		else {
			return null;
		}
	}

	/**
	 * get the inital connection of the contact, or null if the initial connection is no longer active.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetActiveInitialConnection(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getActiveInitialConnection();
		}
		else {
			return null;
		}
	}

	/**
	 * get a list of all of the third-party connections, i.e. the list of all 
	 * connections except for the initial connection, or an empty list if there 
	 * are no third-party connections.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetThirdPartyConnections(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getThirdPartyConnections();
		}
		else {
			return null;
		}
	}

	/**
	 * In Voice contacts, there can only be one active third-party connection. 
	 * This method returns the single active third-party connection, or null if 
	 * there are no currently active third-party connections.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetSingleActiveThirdPartyConnection(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getSingleActiveThirdPartyConnection();
		}
		else {
			return null;
		}
	}

	/**
	 * gets the agent connection. This is the connection that represents the agent's participation in the contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetAgentConnection(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getAgentConnection();
		}
		else {
			return null;
		}
	}

	/**
	 * get a map from attribute name to value for each attribute associated with the contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactGetAttributes(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.getAttributes();
		}
		else {
			return null;
		}
	}

	/**
	 * determine whether this contact is a softphone call.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactIsSoftphoneCall(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.isSoftphoneCall();
		}
		else {
			return null;
		}
	}

	/**
	 * determine whether this is an inbound or outbound contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactIsInbound(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.isInbound();
		}
		else {
			return null;
		}
	}

	/**
	 * determine whether the contact is in a connected state.
	 * Note that contacts no longer exist once they have been removed. 
	 * To detect these instances, subscribe to the contact.onEnded() event for the contact.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	contactIsConnected(): any {

		if (this.contactAPI !== null) {
			return this.contactAPI.isConnected();
		}
		else {
			return null;
		}
	}

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
	contactAccept(callbackConfig: any): boolean {

		if (this.contactAPI !== null) {
			this.contactAPI.accept(callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	contactDestroy(callbackConfig: any): boolean {

		if (this.contactAPI !== null) {
			this.contactAPI.destroy(callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	contactNotifyIssue(issueCode: any, description: any, callbackConfig: any): boolean {

		if (this.contactAPI !== null) {
			this.contactAPI.notifyIssue(issueCode, description, callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	contactAddConnection(endpoint: any, callbackConfig: any): boolean {

		if (this.contactAPI !== null) {
			this.contactAPI.addConnection(endpoint, callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	contactToggleActiveConnections(callbackConfig: any): boolean {

		if (this.contactAPI !== null) {
			this.contactAPI.toggleActiveConnections(callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	contactConferenceConnections(callbackConfig: any): boolean {

		if (this.contactAPI !== null) {
			this.contactAPI.conferenceConnections(callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * Gets the unique contactId of the contact to which this connection belongs.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionGetContactId(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.getContactId();
		}
		else {
			return null;
		}
	}

	/**
	 * Gets the unique connectionId for this connection.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionGetConnectionId(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.getConnectionId();
		}
		else {
			return null;
		}
	}

	/**
	 * Gets the endpoint to which this connection is connected.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionGetEndpoint(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.getEndpoint();
		}
		else {
			return null;
		}
	}

	/**
	 * Gets the ConnectionState object for this connection.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 * This object has the following fields:
	 * type: The connection state type, as per the ConnectionStateType enumeration.
	 * duration: A relative local state duration. To get the actual duration of the state relative to the current time, use connection.getStateDuration().
	 */
	connectionGetState(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.getState();
		}
		else {
			return null;
		}
	}

	/**
	 * Get the duration of the connection state, in milliseconds, relative 
	 * to local time. This takes into account time skew between the JS client 
	 * and the Amazon Connect service.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionGetStateDuration(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.getStateDuration();
		}
		else {
			return null;
		}
	}

	/**
	 * Get the type of connection. This value is either "inbound", "outbound", or "monitoring".
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionGetType(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.getType();
		}
		else {
			return null;
		}
	}

	/**
	 * Determine if the connection is the contact's initial connection.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionIsInitialConnection(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.isInitialConnection();
		}
		else {
			return null;
		}
	}

	/**
	 * Determine if the contact is active. The connection is active it is incoming, connecting, connected, or on hold.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionIsActive(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.isActive();
		}
		else {
			return null;
		}
	}

	/**
	 * Determine if the connection is connected, meaning that the agent is live in a conversation through this connection.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionIsConnected(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.isConnected();
		}
		else {
			return null;
		}
	}

	/**
	 * Determine whether the connection is in the process of connecting.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionIsConnecting(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.isConnecting();
		}
		else {
			return null;
		}
	}

	/**
	 * Determine whether the connection is on hold.
	 *
	 * @return {object}	null if contact API is null; else an object.
	 */
	connectionIsOnHold(): any {

		if (this.connectionAPI !== null) {
			return this.connectionAPI.isOnHold();
		}
		else {
			return null;
		}
	}

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
	connectionDestroy(callbackConfig: any): boolean {

		if (this.connectionAPI !== null) {
			this.connectionAPI.destroy(callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	connectionSendDigits(digits: any, callbackConfig: any): boolean {

		if (this.connectionAPI !== null) {
			this.connectionAPI.sendDigits(digits, callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	connectionHold(callbackConfig: any): boolean {

		if (this.connectionAPI !== null) {
			this.connectionAPI.hold(callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}

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
	connectionResume(callbackConfig: any): boolean {

		if (this.connectionAPI !== null) {
			this.connectionAPI.resume(callbackConfig);
			return true;
		}
		else {
			return false;
		}
	}
}