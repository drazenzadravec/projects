/**
 * Lake Amazon Connect interface client implementation.
 */
export declare class AmazonConnectInterface {
    ccpOptions: any;
    acConnect: any;
    ccpConfig: any;
    awsConnect: any;
    private eventRefreshContact;
    private eventIncomingContact;
    private eventAcceptedContact;
    private eventEndedContact;
    private eventConnectedContact;
    private eventConnectingContact;
    private eventRefreshAgent;
    private eventStateChangeAgent;
    private eventRoutableAgent;
    private eventNotRoutableAgent;
    private eventOfflineAgent;
    private eventErrorAgent;
    private eventAfterCallWorkAgent;
    private eventMuteToggleAgent;
    /**
     * Lake Amazon Connect interface client implementation.
     *
     * @param {Object}   ccpOptions  A collection of options, CCP (Contact Control Panel) options.
     * @param {Object}   acConnect  The Amazon Connect base library object.
     *
     * @example
     *  ccpOptions = {
     *		debug: true,
     *		ccpUrl: null,
     *		loginPopup: true,
     *		loginUrl: null,
     *		region: null,
     *		allowFramedSoftphone: true,
     *		disableRingtone: true,
     *		ringtoneUrl: null
     *	};
     */
    constructor(ccpOptions: any, acConnect: any);
    /**
    * Trigger the logs to be downloaded to the agent's machine in JSON form.
    */
    getLogDownload(): void;
    /**
     * Use connect.getLog() to get the global logger instance. You can then call one of the
     * debug, info, warn or error methods to create a new log entry. The logger accepts printf-style
     * parameter interpolation for strings and number forms. Each of these functions returns a
     * LogEntry object, onto which additional information can be added. You can call .withException(e)
     * and pass an exception (e) to add stack trace and additional info to the logs, and you can
     * call .withObject(o) to add an arbitrary object (o) to the logs.
     *
     * @param {string}	message   the message.
     * @param {string}	param   the message parameter.
     * @param {object}	exception   the exception if any.
     * @param {object}	object   the object value if any.
     *
     * @example
     *	connect.getLog().debug("The %s broke!", "widget")
     *		.withException(e)
     *		.withObject({a: 1, b: 2});
     */
    getLogDebug(message: string, param: string, exception: any, object: any): void;
    /**
     * Use connect.getLog() to get the global logger instance. You can then call one of the
     * debug, info, warn or error methods to create a new log entry. The logger accepts printf-style
     * parameter interpolation for strings and number forms. Each of these functions returns a
     * LogEntry object, onto which additional information can be added. You can call .withException(e)
     * and pass an exception (e) to add stack trace and additional info to the logs, and you can
     * call .withObject(o) to add an arbitrary object (o) to the logs.
     *
     * @param {string}	message   the message.
     * @param {string}	param   the message parameter.
     * @param {object}	exception   the exception if any.
     * @param {object}	object   the object value if any.
     *
     * @example
     *	connect.getLog().info("The %s broke!", "widget")
     *		.withException(e)
     *		.withObject({a: 1, b: 2});
     */
    getLogInfo(message: string, param: string, exception: any, object: any): void;
    /**
     * Use connect.getLog() to get the global logger instance. You can then call one of the
     * debug, info, warn or error methods to create a new log entry. The logger accepts printf-style
     * parameter interpolation for strings and number forms. Each of these functions returns a
     * LogEntry object, onto which additional information can be added. You can call .withException(e)
     * and pass an exception (e) to add stack trace and additional info to the logs, and you can
     * call .withObject(o) to add an arbitrary object (o) to the logs.
     *
     * @param {string}	message   the message.
     * @param {string}	param   the message parameter.
     * @param {object}	exception   the exception if any.
     * @param {object}	object   the object value if any.
     *
     * @example
     *	connect.getLog().warn("The %s broke!", "widget")
     *		.withException(e)
     *		.withObject({a: 1, b: 2});
     */
    getLogWarn(message: string, param: string, exception: any, object: any): void;
    /**
     * Use connect.getLog() to get the global logger instance. You can then call one of the
     * debug, info, warn or error methods to create a new log entry. The logger accepts printf-style
     * parameter interpolation for strings and number forms. Each of these functions returns a
     * LogEntry object, onto which additional information can be added. You can call .withException(e)
     * and pass an exception (e) to add stack trace and additional info to the logs, and you can
     * call .withObject(o) to add an arbitrary object (o) to the logs.
     *
     * @param {string}	message   the message.
     * @param {string}	param   the message parameter.
     * @param {object}	exception   the exception if any.
     * @param {object}	object   the object value if any.
     *
     * @example
     *	connect.getLog().error("The %s broke!", "widget")
     *		.withException(e)
     *		.withObject({a: 1, b: 2});
     */
    getLogError(message: string, param: string, exception: any, object: any): void;
    /**
    * Subscribe a method to be invoked whenever the contact is updated.
    * @param {function}	event callback(contact, data).
    */
    onRefreshContact(event: (contact: any, env: any) => void): void;
    /**
    * Subscribe a method to be invoked when the contact is incoming. In this state.
    * the contact is waiting to be accepted if it is a softphone call or is waiting
    * for the agent to answer if it is not a softphone call.
    *
    * @param {function}	event callback(contact, data).
    */
    onIncomingContact(event: (contact: any, env: any) => void): void;
    /**
     * Subscribe a method to be invoked whenever the contact is accepted. This is an
     * event which is fired in response to an API call when it succeeds, and this is
     * usually triggered by a UI interaction such as clicking an accept button.The proper
     * response to this API is to stop playing ringtones and remove any Accept UI buttons
     * or actions, and potentially show an "Accepting..." UI to the customer.
     * @param {function}	event callback(contact, data).
    */
    onAcceptedContact(event: (contact: any, env: any) => void): void;
    /**
     * Subscribe a method to be invoked whenever the contact is ended or destroyed. This
     * could be due to the conversation being ended by the agent, or due to the contact
     * being missed. Call contact.getState() to determine the state of the contact and take
     * appropriate action.
     * @param {function}	event callback(contact).
    */
    onEndedContact(event: (contact: any) => void): void;
    /**
     * Subscribe a method to be invoked when the contact is connected.
     * @param {function}	event callback(contact).
    */
    onConnectedContact(event: (contact: any) => void): void;
    /**
     * Subscribe a method to be invoked when the contact is connecting.
     * @param {function}	event callback(contact, connection, contactId, connectionId, phoneNumber, data).
    */
    onConnectingContact(event: (contact: any, contactId: string, connectionId: string, env: any) => void): void;
    /**
    * Subscribe a method to be called whenever new agent data is available.
    * @param {function}	event callback(agent, data).
    */
    onRefreshAgent(event: (agent: any, env: any) => void): void;
    /**
    * Subscribe a method to be called when the agent's state changes.
    * The agentStateChange object contains the following properties:
    *		agent:		The Agent object.
    *		newState:	The name of the agent's new state.
    *		oldState:	The name of the agent's previous state.
    * @param {function}	event callback(agent, data).
    */
    onStateChangeAgent(event: (agent: any, env: any) => void): void;
    /**
    * Subscribe a method to be called when the agent becomes routable,
    * meaning that they can be routed incoming contacts.
    * @param {function}	event callback(agent, data).
    */
    onRoutableAgent(event: (agent: any, env: any) => void): void;
    /**
    * Subscribe a method to be called when the agent becomes not-routable,
    * meaning that they are online but cannot be routed incoming contacts.
    * @param {function}	event callback(agent, data).
    */
    onNotRoutableAgent(event: (agent: any, env: any) => void): void;
    /**
    * Subscribe a method to be called when the agent goes offline.
    * @param {function}	event callback(agent, data).
    */
    onOfflineAgent(event: (agent: any, env: any) => void): void;
    /**
    * Subscribe a method to be called when the agent is put into an error state.
    * This can occur if Streams is unable to get new agent data, or if the agent
    * fails to accept an incoming contact, or in other error cases.It means that
    * the agent is not routable, and may require that the agent switch to a routable
    * state before being able to be routed contacts again.
    * @param {function}	event callback(agent, data).
    */
    onErrorAgent(event: (agent: any, env: any) => void): void;
    /**
    * Subscribe a method to be called when the agent enters the "After Call Work" (ACW) state.
    * This is a non - routable state which exists to allow agents some time to wrap up after
    * handling a contact before they are routed additional contacts.
    * @param {function}	event callback(agent, data).
    */
    onAfterCallWorkAgent(event: (agent: any, env: any) => void): void;
    /**
    * Subscribe a method to be called when the agent updates the mute status, meaning
    * that agents mute or unmute APIs are called and the local media stream is succesfully updated with the new status.
    * @param {function}	event callback(agent, data).
    */
    onMuteToggleAgent(event: (agent: any, env: any) => void): void;
    /**
     * Init the Amazom Connect CCP (Contact Control Panel).
     * Initialising the Streams API is the first step to verify that you have everything
     * set up correctly and that you are able to listen for events.
     *
     * @param {Element}	containerDiv   the div element to add the CCP to.
     */
    initCCPAmazonConnect(containerDiv: Element): void;
}
