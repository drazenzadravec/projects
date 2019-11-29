'use strict';

/**
 * Integrates with Amazon Connect by loading the pre-built CCP located at ccpUrl into an iframe and placing 
 * it into the containerDiv provided. API requests are funneled through this CCP and agent and contact updates 
 * are published through it and made available to your JS client code.
 * 
 * ccpUrl:					The URL of the CCP. This is the page you would normally navigate to in order to use the CCP in a 
 *							standalone page, it is different for each instance.
 * loginPopup:				Optional, defaults to true. Set to false to disable the login popup which is shown when the 
 *							user's authentication expires.
 * loginUrl:				Optional. Allows custom URL to be used to initiate the ccp, as in the case of SAML authentication.
 * softphone:				This object is optional and allows you to specify some settings surrounding the softphone feature of Connect.
 * allowFramedSoftphone:	Normally, the softphone microphone and speaker components are not allowed to be hosted in an iframe. 
 *							This is because the softphone must be hosted in a single window or tab. The window hosting the softphone 
 *							session must not be closed during the course of a softphone call or the call will be disconnected. 
 *							If allowFramedSoftphone is true, the softphone components will be allowed to be hosted in this window or tab.
 * disableRingtone:			This option allows you to completely disable the built-in ringtone audio that is played when a call is incoming.
 * ringtoneUrl:				If the ringtone is not disabled, this allows for overriding the ringtone with any browser-supported audio file 
 *							accessible by the user.
 */
var contactControlPanelConfig =
{
	ccpUrl: null,
	loginPopup: true,
	loginUrl: null,
	region: null,
	allowFramedSoftphone: true,
	disableRingtone: true,
	ringtoneUrl: null
};

/**
 * Creates an Endpoint object for the given phone number, useful for agent.connect() and contact.addConnection() calls.
 *
 * @param {string}	phoneNumber   the phone number.
 * @return {object} endpoint object.
 */
function endpointByPhoneNumber(phoneNumber) {

	return Endpoint.byPhoneNumber(phoneNumber);
}

/**
 * Trigger the logs to be downloaded to the agent's machine in JSON form.
 */
function connectGetLogDownload() {
	connect.getLog().download();
}

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
function connectGetLogDebug(message, param, exception, object) {

	connect.getLog().debug(message, param).withException(exception).withObject(object);
}

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
function connectGetLogInfo(message, param, exception, object) {

	connect.getLog().info(message, param).withException(exception).withObject(object);
}

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
function connectGetLogWarn(message, param, exception, object) {

	connect.getLog().warn(message, param).withException(exception).withObject(object);
}

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
function connectGetLogError(message, param, exception, object) {

	connect.getLog().error(message, param).withException(exception).withObject(object);
}

/**
 * Init the Amazom Connect CCP (Contact Control Panel).
 * Initialising the Streams API is the first step to verify that you have everything 
 * set up correctly and that you are able to listen for events.
 */
function initCCPAmazonConnect() {

	// init the CCP	(Contact Control Panel).
	connect.core.initCCP(containerDiv, {
		ccpUrl: contactControlPanelConfig.ccpUrl,
		loginPopup: contactControlPanelConfig.loginPopup,
		loginUrl: contactControlPanelConfig.loginUrl,
		region: contactControlPanelConfig.region,
		softphone: {
			allowFramedSoftphone: contactControlPanelConfig.allowFramedSoftphone,
			disableRingtone: contactControlPanelConfig.disableRingtone,
			ringtoneUrl: contactControlPanelConfig.ringtoneUrl
		}
	});

	/*
	* Contact connection handler.
	* @param {Object}   function handler.
	*/
	connect.contact(function (contact) {

		// Subscribe a method to be invoked whenever the contact is updated.
		contact.onRefresh(function (env) {

			try {
				// on refresh.
				onRefreshContact(contact, env);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be invoked when the contact is incoming. In this state, 
		// the contact is waiting to be accepted if it is a softphone call or is waiting 
		// for the agent to answer if it is not a softphone call.
		contact.onIncoming(function (env) {

			try {
				// on incoming.
				onIncomingContact(contact, env);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be invoked whenever the contact is accepted. This is an 
		// event which is fired in response to an API call when it succeeds, and this is 
		// usually triggered by a UI interaction such as clicking an accept button.The proper 
		// response to this API is to stop playing ringtones and remove any Accept UI buttons 
		// or actions, and potentially show an "Accepting..." UI to the customer.
		contact.onAccepted(function (env) {

			try {
				// on accepted.
				onAcceptedContact(contact, env);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be invoked whenever the contact is ended or destroyed. This 
		// could be due to the conversation being ended by the agent, or due to the contact 
		// being missed. Call contact.getState() to determine the state of the contact and take 
		// appropriate action.
		contact.onEnded(function () {

			try {
				// on ended.
				onEndedContact(contact);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be invoked when the contact is connected.
		contact.onConnected(function () {

			try {
				// on connected.
				onConnectedContact(contact);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be invoked when the contact is connecting.
		contact.onConnecting(function (env) {

			// get the customer number.
			var activeConnection = env.getActiveInitialConnection();
			var contactId = activeConnection['contactId'];
			var connectionId = activeConnection['connectionId'];

			try {
				// on connecting.
				onConnectingContact(contact, contactId, connectionId, env);
			} catch (e) { var error = e; }
		});
	});

	/*
	 * Agent connection handler.
	 * @param {Object}   function handler.
	*/
	connect.agent(function (agent) {

		// Subscribe a method to be called whenever new agent data is available.
		agent.onRefresh(function (env) {

			try {
				// on refresh.
				onRefreshAgent(agent, env);
			} catch (e) { var error = e; }
		});

		/*
		 * Subscribe a method to be called when the agent's state changes. 
		 * The agentStateChange object contains the following properties:
		 *		agent:		The Agent object.
		 *		newState:	The name of the agent's new state.
		 *		oldState:	The name of the agent's previous state.
		 */
		agent.onStateChange(function (env) {

			try {
				// on state change.
				onStateChangeAgent(agent, env);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be called when the agent becomes routable, 
		// meaning that they can be routed incoming contacts.
		agent.onRoutable(function (env) {

			try {
				// on routable.
				onRoutableAgent(agent, env);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be called when the agent becomes not-routable, 
		// meaning that they are online but cannot be routed incoming contacts.
		agent.onNotRoutable(function (env) {

			try {
				// on not routable.
				onNotRoutableAgent(agent, env);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be called when the agent goes offline.
		agent.onOffline(function (env) {

			try {
				// on offline.
				onOfflineAgent(agent, env);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be called when the agent is put into an error state. 
		// This can occur if Streams is unable to get new agent data, or if the agent 
		// fails to accept an incoming contact, or in other error cases.It means that 
		// the agent is not routable, and may require that the agent switch to a routable 
		// state before being able to be routed contacts again.
		agent.onError(function (env) {

			try {
				// on error.
				onErrorAgent(agent, env);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be called when the agent enters the "After Call Work" (ACW) state. 
		// This is a non - routable state which exists to allow agents some time to wrap up after 
		// handling a contact before they are routed additional contacts.
		agent.onAfterCallWork(function (env) {

			try {
				// on after call work.
				onAfterCallWorkAgent(agent, env);
			} catch (e) { var error = e; }
		});

		// Subscribe a method to be called when the agent updates the mute status, meaning 
		// that agents mute or unmute APIs are called and the local media stream is succesfully 
		// updated with the new status.
		agent.onMuteToggle(function (env) {

			try {
				// on mute toggle.
				onMuteToggleAgent(agent, env);
			} catch (e) { var error = e; }
		});
	});
}