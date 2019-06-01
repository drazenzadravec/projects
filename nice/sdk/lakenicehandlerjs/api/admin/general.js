"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wildemitter = require("wildemitter");
/**
 * General handler implementation.
 */
class HGeneral {
    /**
     * General handler implementation.
     *
     * @param {ILakeNiceClient}		lakeNiceClient				Lake Nice client interface.
     * @param {Object}				generalHandlerOptions		A collection of options.
     *
     * @example
     *  options = {
     *		debug: true
     *  }
     */
    constructor(lakeNiceClient, generalHandlerOptions) {
        this.lakeNiceClient = lakeNiceClient;
        this.generalHandlerOptions = generalHandlerOptions;
        // local.
        let self = this;
        let parent = generalHandlerOptions.parent;
        let item;
        let options = generalHandlerOptions || {};
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
        wildemitter.mixin(HGeneral);
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
                case "getBrandingProfileAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getBusinessUnitConfigAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getDispositionsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "removeFileAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getFileAsync": {
                    options.params = requestData;
                    return options;
                }
                case "uploadFileAsync": {
                    options.data = requestData;
                    return options;
                }
                case "moveRenameFileAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getUnprocessedFilesAsync": {
                    options.params = requestData;
                    return options;
                }
                case "markFileForProcessingAsync": {
                    options.data = requestData;
                    return options;
                }
                case "markFileAsProcessedAsync": {
                    options.data = requestData;
                    return options;
                }
                case "deleteFolderAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getDirectoriesAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createHiringSourceAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getHoursOperationProfilesAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getHourOperationProfileAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getLocationsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createMessageTemplateAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updateMessageTemplateAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getSecurityProfilesAsync": {
                    options.params = requestData;
                    return options;
                }
                case "getScriptsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "startScriptAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getTagsAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createTagAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updateTagAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getOutStatesForBusinessUnitAsync": {
                    options.params = requestData;
                    return options;
                }
                case "createHoursOperationProfileAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updateHoursOperationProfileAsync": {
                    options.data = requestData;
                    return options;
                }
                case "createPointOfContactAsync": {
                    options.data = requestData;
                    return options;
                }
                case "updatePointOfContactAsync": {
                    options.data = requestData;
                    return options;
                }
                case "createUnavailableCodeAsync": {
                    options.data = requestData;
                    return options;
                }
                case "getConfigurablePhoneNumbersAsync": {
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
exports.HGeneral = HGeneral;
