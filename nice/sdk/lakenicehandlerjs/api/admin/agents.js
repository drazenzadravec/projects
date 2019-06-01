"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildemitter = require("wildemitter");
/**
 * Agents handler implementation.
 */
class HAgents {
    /**
     * Agents handler implementation.
     *
     * @param {ILakeNiceClient}		lakeNiceClient				Lake Nice client interface.
     * @param {Object}				agentsHandlerOptions		A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *  }
     */
    constructor(lakeNiceClient, agentsHandlerOptions) {
        this.lakeNiceClient = lakeNiceClient;
        this.agentsHandlerOptions = agentsHandlerOptions;
        // local.
        let self = this;
        let parent = agentsHandlerOptions.parent;
        let item;
        let options = agentsHandlerOptions || {};
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
        wildemitter.mixin(HAgents);
    }
    /**
     * Handle the action.
     *
     * @param {Object}   argOptions  A collection of argument options.
    */
    handleAction(argOptions) {
        // Get the unique ID of the action.
        let id = argOptions.uniqueID.toString();
        let ids = id.split('.');
        let requestMethod = ids[2];
        // Select the request method.
        switch (requestMethod) {
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
    assignRequestOptions(uniqueID, requestData) {
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
            let id = uniqueID.toString();
            let ids = id.split('.');
            let requestMethod = ids[2];
            // nothing to set.
            let options = {
                params: {},
                data: {}
            };
            // Select the request method.
            switch (requestMethod) {
                case "getAgentsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createAgentAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getAgentAsync": {
                    options.params = requestData;
                    return options;
                }
                case "updateAgentAsync": {
                    options.data = requestData;
                    return options;
                }
                case "setAgentStateAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getSkillsAssignedToAgentsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getGroupsAgentAssignedAsync": {
                    options.params = requestData;
                    return options;
                }
                case "removeSkillAssignedToAgentAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getSkillsAssignedToAgentAsync": {
                    options.params = requestData;
                    return options;
                }
                case "setSkillsToAgentAsync": {
                    options.data = requestData;
                    return options;
                }
                case "changeSkillForAgentAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getSkillsNotAssignedToAgentAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getAgentsContactsBySkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getAgentContactsBySkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createCustomAgentEventAsync": {
                    options.data = requestData;
                    return options;
                }
                case "createAgentMessageAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getTeamsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createTeamAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getTeamAsync": {
                    options.params = requestData;
                    return options;
                }
                case "updateTeamAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getTeamsAgentsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "removeAgentsFromTeamAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getTeamAgentsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "setTeamAgentsAsync": {
                    options.data = requestData;
                    return options;
                }
                case "removeUnavailableCodesFromTeamAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getOutstatesValidForTeamAsync": {
                    options.params = requestData;
                    return options;
                }
                case "setUnavailableCodesToTeamAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updateUnavailableCodesForTeamAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updateUnavailableCodeAsync": {
                    options.data = requestData;
                    return options;
                }
                case "setUnavailableCodeToTeamsAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getAccessKeysAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createAccessKeyAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updateAccessKeyAsync": {
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
    handleDefaultAction(argOptions) {
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
}
exports.HAgents = HAgents;
