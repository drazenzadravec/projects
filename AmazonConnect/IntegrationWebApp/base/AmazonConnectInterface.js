"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Lake Amazon Connect interface client implementation.
 */
class AmazonConnectInterface {
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
    constructor(ccpOptions, acConnect) {
        this.ccpOptions = ccpOptions;
        this.acConnect = acConnect;
        let itemApi;
        // ac api client options.
        let optionsApi = ccpOptions || {};
        let apiConfig = this.ccpConfig = {
            debug: true
        };
        // set our config from options
        for (itemApi in optionsApi) {
            if (optionsApi.hasOwnProperty(itemApi)) {
                this.ccpConfig[itemApi] = optionsApi[itemApi];
            }
        }
        // assign the amazon connect object.
        this.awsConnect = acConnect;
    }
    /**
    * Trigger the logs to be downloaded to the agent's machine in JSON form.
    */
    getLogDownload() {
        this.awsConnect.getLog().download();
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
    getLogDebug(message, param, exception, object) {
        this.awsConnect.getLog().debug(message, param).withException(exception).withObject(object);
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
    getLogInfo(message, param, exception, object) {
        this.awsConnect.getLog().info(message, param).withException(exception).withObject(object);
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
    getLogWarn(message, param, exception, object) {
        this.awsConnect.getLog().warn(message, param).withException(exception).withObject(object);
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
    getLogError(message, param, exception, object) {
        this.awsConnect.getLog().error(message, param).withException(exception).withObject(object);
    }
    /**
    * Subscribe a method to be invoked whenever the contact is updated.
    * @param {function}	event callback(contact, data).
    */
    onRefreshContact(event) {
        // assign the event.
        this.eventRefreshContact = event;
    }
    /**
    * Subscribe a method to be invoked when the contact is incoming. In this state.
    * the contact is waiting to be accepted if it is a softphone call or is waiting
    * for the agent to answer if it is not a softphone call.
    *
    * @param {function}	event callback(contact, data).
    */
    onIncomingContact(event) {
        // assign the event.
        this.eventIncomingContact = event;
    }
    /**
     * Subscribe a method to be invoked whenever the contact is accepted. This is an
     * event which is fired in response to an API call when it succeeds, and this is
     * usually triggered by a UI interaction such as clicking an accept button.The proper
     * response to this API is to stop playing ringtones and remove any Accept UI buttons
     * or actions, and potentially show an "Accepting..." UI to the customer.
     * @param {function}	event callback(contact, data).
    */
    onAcceptedContact(event) {
        // assign the event.
        this.eventAcceptedContact = event;
    }
    /**
     * Subscribe a method to be invoked whenever the contact is ended or destroyed. This
     * could be due to the conversation being ended by the agent, or due to the contact
     * being missed. Call contact.getState() to determine the state of the contact and take
     * appropriate action.
     * @param {function}	event callback(contact).
    */
    onEndedContact(event) {
        // assign the event.
        this.eventEndedContact = event;
    }
    /**
     * Subscribe a method to be invoked when the contact is connected.
     * @param {function}	event callback(contact).
    */
    onConnectedContact(event) {
        // assign the event.
        this.eventConnectedContact = event;
    }
    /**
     * Subscribe a method to be invoked when the contact is connecting.
     * @param {function}	event callback(contact, connection, contactId, connectionId, phoneNumber, data).
    */
    onConnectingContact(event) {
        // assign the event.
        this.eventConnectingContact = event;
    }
    /**
    * Subscribe a method to be called whenever new agent data is available.
    * @param {function}	event callback(agent, data).
    */
    onRefreshAgent(event) {
        // assign the event.
        this.eventRefreshAgent = event;
    }
    /**
    * Subscribe a method to be called when the agent's state changes.
    * The agentStateChange object contains the following properties:
    *		agent:		The Agent object.
    *		newState:	The name of the agent's new state.
    *		oldState:	The name of the agent's previous state.
    * @param {function}	event callback(agent, data).
    */
    onStateChangeAgent(event) {
        // assign the event.
        this.eventStateChangeAgent = event;
    }
    /**
    * Subscribe a method to be called when the agent becomes routable,
    * meaning that they can be routed incoming contacts.
    * @param {function}	event callback(agent, data).
    */
    onRoutableAgent(event) {
        // assign the event.
        this.eventRoutableAgent = event;
    }
    /**
    * Subscribe a method to be called when the agent becomes not-routable,
    * meaning that they are online but cannot be routed incoming contacts.
    * @param {function}	event callback(agent, data).
    */
    onNotRoutableAgent(event) {
        // assign the event.
        this.eventNotRoutableAgent = event;
    }
    /**
    * Subscribe a method to be called when the agent goes offline.
    * @param {function}	event callback(agent, data).
    */
    onOfflineAgent(event) {
        // assign the event.
        this.eventOfflineAgent = event;
    }
    /**
    * Subscribe a method to be called when the agent is put into an error state.
    * This can occur if Streams is unable to get new agent data, or if the agent
    * fails to accept an incoming contact, or in other error cases.It means that
    * the agent is not routable, and may require that the agent switch to a routable
    * state before being able to be routed contacts again.
    * @param {function}	event callback(agent, data).
    */
    onErrorAgent(event) {
        // assign the event.
        this.eventErrorAgent = event;
    }
    /**
    * Subscribe a method to be called when the agent enters the "After Call Work" (ACW) state.
    * This is a non - routable state which exists to allow agents some time to wrap up after
    * handling a contact before they are routed additional contacts.
    * @param {function}	event callback(agent, data).
    */
    onAfterCallWorkAgent(event) {
        // assign the event.
        this.eventAfterCallWorkAgent = event;
    }
    /**
    * Subscribe a method to be called when the agent updates the mute status, meaning
    * that agents mute or unmute APIs are called and the local media stream is succesfully updated with the new status.
    * @param {function}	event callback(agent, data).
    */
    onMuteToggleAgent(event) {
        // assign the event.
        this.eventMuteToggleAgent = event;
    }
    /**
     * Init the Amazom Connect CCP (Contact Control Panel).
     * Initialising the Streams API is the first step to verify that you have everything
     * set up correctly and that you are able to listen for events.
     *
     * @param {Element}	containerDiv   the div element to add the CCP to.
     */
    initCCPAmazonConnect(containerDiv) {
        let localThis = this;
        // init the CCP	(Contact Control Panel).
        this.awsConnect.core.initCCP(containerDiv, {
            ccpUrl: this.ccpConfig.ccpUrl,
            loginPopup: this.ccpConfig.loginPopup,
            loginUrl: this.ccpConfig.loginUrl,
            region: this.ccpConfig.region,
            softphone: {
                allowFramedSoftphone: this.ccpConfig.allowFramedSoftphone,
                disableRingtone: this.ccpConfig.disableRingtone,
                ringtoneUrl: this.ccpConfig.ringtoneUrl
            }
        });
        /*
        * Contact connection handler.
        * @param {Object}   function handler.
        */
        this.awsConnect.contact(function (contact) {
            // Subscribe a method to be invoked whenever the contact is updated.
            contact.onRefresh(function (env) {
                try {
                    // on refresh.
                    localThis.eventRefreshContact(contact, env);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be invoked when the contact is incoming. In this state, 
            // the contact is waiting to be accepted if it is a softphone call or is waiting 
            // for the agent to answer if it is not a softphone call.
            contact.onIncoming(function (env) {
                try {
                    // on incoming.
                    localThis.eventIncomingContact(contact, env);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be invoked whenever the contact is accepted. This is an 
            // event which is fired in response to an API call when it succeeds, and this is 
            // usually triggered by a UI interaction such as clicking an accept button.The proper 
            // response to this API is to stop playing ringtones and remove any Accept UI buttons 
            // or actions, and potentially show an "Accepting..." UI to the customer.
            contact.onAccepted(function (env) {
                try {
                    // on accepted.
                    localThis.eventAcceptedContact(contact, env);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be invoked whenever the contact is ended or destroyed. This 
            // could be due to the conversation being ended by the agent, or due to the contact 
            // being missed. Call contact.getState() to determine the state of the contact and take 
            // appropriate action.
            contact.onEnded(function () {
                try {
                    // on ended.
                    localThis.eventEndedContact(contact);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be invoked when the contact is connected.
            contact.onConnected(function () {
                try {
                    // on connected.
                    localThis.eventConnectedContact(contact);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be invoked when the contact is connecting.
            contact.onConnecting(function (env) {
                // get the customer number.
                var activeConnection = env.getActiveInitialConnection();
                var contactId = activeConnection['contactId'];
                var connectionId = activeConnection['connectionId'];
                try {
                    // on connecting.
                    localThis.eventConnectingContact(contact, contactId, connectionId, env);
                }
                catch (e) {
                    var error = e;
                }
            });
        });
        /*
         * Agent connection handler.
         * @param {Object}   function handler.
        */
        this.awsConnect.agent(function (agent) {
            // Subscribe a method to be called whenever new agent data is available.
            agent.onRefresh(function (env) {
                try {
                    // on refresh.
                    localThis.eventRefreshAgent(agent, env);
                }
                catch (e) {
                    var error = e;
                }
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
                    localThis.eventStateChangeAgent(agent, env);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be called when the agent becomes routable, 
            // meaning that they can be routed incoming contacts.
            agent.onRoutable(function (env) {
                try {
                    // on routable.
                    localThis.eventRoutableAgent(agent, env);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be called when the agent becomes not-routable, 
            // meaning that they are online but cannot be routed incoming contacts.
            agent.onNotRoutable(function (env) {
                try {
                    // on not routable.
                    localThis.eventNotRoutableAgent(agent, env);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be called when the agent goes offline.
            agent.onOffline(function (env) {
                try {
                    // on offline.
                    localThis.eventOfflineAgent(agent, env);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be called when the agent is put into an error state. 
            // This can occur if Streams is unable to get new agent data, or if the agent 
            // fails to accept an incoming contact, or in other error cases.It means that 
            // the agent is not routable, and may require that the agent switch to a routable 
            // state before being able to be routed contacts again.
            agent.onError(function (env) {
                try {
                    // on error.
                    localThis.eventErrorAgent(agent, env);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be called when the agent enters the "After Call Work" (ACW) state. 
            // This is a non - routable state which exists to allow agents some time to wrap up after 
            // handling a contact before they are routed additional contacts.
            agent.onAfterCallWork(function (env) {
                try {
                    // on after call work.
                    localThis.eventAfterCallWorkAgent(agent, env);
                }
                catch (e) {
                    var error = e;
                }
            });
            // Subscribe a method to be called when the agent updates the mute status, meaning 
            // that agents mute or unmute APIs are called and the local media stream is succesfully 
            // updated with the new status.
            agent.onMuteToggle(function (env) {
                try {
                    // on mute toggle.
                    localThis.eventMuteToggleAgent(agent, env);
                }
                catch (e) {
                    var error = e;
                }
            });
        });
    }
}
exports.AmazonConnectInterface = AmazonConnectInterface;
//# sourceMappingURL=AmazonConnectInterface.js.map