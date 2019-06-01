"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildemitter = require("wildemitter");
/**
 * WFMData handler implementation.
 */
class HWFMData {
    /**
     * WFMData handler implementation.
     *
     * @param {ILakeNiceClient}		lakeNiceClient			Lake Nice client interface.
     * @param {Object}				wfmDataHandlerOptions	A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *  }
     */
    constructor(lakeNiceClient, wfmDataHandlerOptions) {
        this.lakeNiceClient = lakeNiceClient;
        this.wfmDataHandlerOptions = wfmDataHandlerOptions;
        // local.
        let self = this;
        let parent = wfmDataHandlerOptions.parent;
        let item;
        let options = wfmDataHandlerOptions || {};
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
        wildemitter.mixin(HWFMData);
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
                case "contactStatisticsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "agentMetadataAsync": {
                    options.params = requestData;
                    return options;
                }
                case "dailerContactStatisticsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "adherenceStatisticsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "scorecardStatisticsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "agentPerformanceAsync": {
                    options.params = requestData;
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
exports.HWFMData = HWFMData;
