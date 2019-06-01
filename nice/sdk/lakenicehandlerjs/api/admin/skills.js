"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildemitter = require("wildemitter");
/**
 * Skills handler implementation.
 */
class HSkills {
    /**
     * Skills handler implementation.
     *
     * @param {ILakeNiceClient}		lakeNiceClient						Lake Nice client interface.
     * @param {Object}				skillsHandlerOptions	A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *  }
     */
    constructor(lakeNiceClient, skillsHandlerOptions) {
        this.lakeNiceClient = lakeNiceClient;
        this.skillsHandlerOptions = skillsHandlerOptions;
        // local.
        let self = this;
        let parent = skillsHandlerOptions.parent;
        let item;
        let options = skillsHandlerOptions || {};
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
        wildemitter.mixin(HSkills);
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
                case "createAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createDispositionAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getDispositionAsync": {
                    options.params = requestData;
                    return options;
                }
                case "changeDispositionAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getDispositionClassificationsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getSkillsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getSkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "updateSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "stopPersonalConnectionSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getSkillAssignmentsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "removeSkillAssignmentAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getAgentsAssignedToSkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "assignAgentsToSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updateAgentAssignedSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getAgentsNotAssignedSkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getSummaryContactsAllSkillsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getSummaryContactsAllSkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getSkillDispositionsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getUnassignedDispositionsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "removeTagsAsync": {
                    options.data = requestData;
                    return options;
                }
                case "assignTagAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getOutboundSkillGeneralSettingsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "updateOutboundSkillGeneralSettingsAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getCPAManagementConfigurationSkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "updateCPAManagementConfigurationSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getXSConfigurationSkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "updateXSConfigurationSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getDeliveryPreferencesConfigurationSkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "updateDeliveryPreferencesConfigurationSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getRetrySettingsSkillAsync": {
                    options.params = requestData;
                    return options;
                }
                case "updateRetrySettingsSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updateScheduleSettingsSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "createCampaignAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updateCampaignAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getDispositionsSkillAssignmentAsync": {
                    options.params = requestData;
                    return options;
                }
                case "deleteCampaignSkillAsync": {
                    options.data = requestData;
                    return options;
                }
                case "setCampaignSkillsAsync": {
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
exports.HSkills = HSkills;
