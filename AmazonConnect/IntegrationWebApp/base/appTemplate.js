'use strict';

// global store.
var contactAPI = null;
var agentAPI = null;
var amazonConnect = null;

// global options.
var debugOptions = {
	debug: true
};

// amazon connect options.
var amazonConnectOptions = {
	debug: debugOptions.debug
};

/**
 * Init the Amazom Connect CCP (Contact Control Panel) as a promise.
 * Initialising the Streams API is the first step to verify
 * that you have everything set up correctly and that you
 * are able to listen for events.
 */
let initAmazonConnectPromise = new Promise((resolve, reject) => {

	initAmazonConnect();
	resolve(true);

	// if null.
	if (amazonConnect === null) {
		reject("Unable to create an instance of AmazonConnect.");
	}
});

/**
 * Init the Amazom Connect CCP (Contact Control Panel).
 * Initialising the Streams API is the first step to verify 
 * that you have everything set up correctly and that you 
 * are able to listen for events.
 */
function initAmazonConnect() {

	// create the amazon connect class.
	amazonConnect = new AmazonConnect(amazonConnectOptions);

	// assign config:
	contactControlPanelConfig.ccpUrl = "";
	contactControlPanelConfig.loginPopup = true;
	contactControlPanelConfig.region = "";
	contactControlPanelConfig.allowFramedSoftphone = true;

	// init the CCP
	initCCPAmazonConnect();
}

/**
 * callback when the contact is connecting.
 *
 * @param {object}	contact   the contact API object.
 * @param {string}	contactId   the contact unique id.
 * @param {string}	connectionId   the connection unique id.
 * @param {object}	details   the callback details API object.
 */
function onConnectingContact(contact, contactId, connectionId, details) {

	// get the connection.
	var conn = new connect.Connection(contactId, connectionId);
	var ph = conn.getEndpoint().phoneNumber;

	// assign the global contact API.
	contactAPI = contact;
	amazonConnect.addContact(contact, conn, contactId, connectionId);
}

/**
 * callback when the contact is updated.
 *
 * @param {object}	contact   the contact API object.
 * @param {object}	details   the callback details API object.
 */
function onRefreshContact(contact, details) {

}

/**
 * callback when the contact is incoming.
 *
 * @param {object}	contact   the contact API object.
 * @param {object}	details   the callback details API object.
 */
function onIncomingContact(contact, details) {

}

/**
 * callback when the contact is accepted.
 *
 * @param {object}	contact   the contact API object.
 * @param {object}	details   the callback details API object.
 */
function onAcceptedContact(contact, details) {

}

/**
 * callback when the contact is ended.
 *
 * @param {object}	contact   the contact API object.
 */
function onEndedContact(contact) {

}

/**
 * callback when the contact is connected.
 *
 * @param {object}	contact   the contact API object.
 */
function onConnectedContact(contact) {

}

/**
 * callback when the agent is updated.
 *
 * @param {object}	agent   the agent API object.
 * @param {object}	details   the callback details API object.
 */
function onRefreshAgent(agent, details) {

	// assign the global agent API.
	agentAPI = agent;
	amazonConnect.assignAgent(agentAPI);
}

/**
 * callback when the agent is state change.
 *
 * @param {object}	agent   the agent API object.
 * @param {object}	details   the callback details API object.
 */
function onStateChangeAgent(agent, details) {

}

/**
 * callback when the agent is routable.
 *
 * @param {object}	agent   the agent API object.
 * @param {object}	details   the callback details API object.
 */
function onRoutableAgent(agent, details) {

}

/**
 * callback when the agent is not routable.
 *
 * @param {object}	agent   the agent API object.
 * @param {object}	details   the callback details API object.
 */
function onNotRoutableAgent(agent, details) {

}

/**
 * callback when the agent is offline.
 *
 * @param {object}	agent   the agent API object.
 * @param {object}	details   the callback details API object.
 */
function onOfflineAgent(agent, details) {

}

/**
 * callback when the agent is error.
 *
 * @param {object}	agent   the agent API object.
 * @param {object}	details   the callback details API object.
 */
function onErrorAgent(agent, details) {

}

/**
 * callback when the agent is after call work.
 *
 * @param {object}	agent   the agent API object.
 * @param {object}	details   the callback details API object.
 */
function onAfterCallWorkAgent(agent, details) {

}

/**
 * callback when the agent is mute toggle.
 *
 * @param {object}	agent   the agent API object.
 * @param {object}	details   the callback details API object.
 */
function onMuteToggleAgent(agent, details) {

}