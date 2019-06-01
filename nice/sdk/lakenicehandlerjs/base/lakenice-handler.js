"use strict";
/* Lake Nice inContact Handler. */
Object.defineProperty(exports, "__esModule", { value: true });
const mockconsole = require("mockconsole");
const wildemitter = require("wildemitter");
const generalhandler_1 = require("../handlers/generalhandler");
const requesthandler_1 = require("../handlers/requesthandler");
const responsehandler_1 = require("../handlers/responsehandler");
/**
 * Lake Nice handler implementation.
 */
class LakeNiceHandler {
    /**
    * Lake Nice handler api implementation.
    *
    * Lake Nice handler controls the interaction between the
    * web service and client-side.
    *
    * @param {ILakeNiceClient}		 lakeNiceClient		Lake Nice client interface.
    * @param {ILakeNiceAuthClient}   lakeNiceAuthClient	Lake Nice Auth client interface.
    * @param {Object}				 handlerOptions		A collection of options.
    *
    * @example
    *  options = {
    *		debug: true
    *  }
    */
    constructor(lakeNiceClient, lakeNiceAuthClient, handlerOptions) {
        this.lakeNiceClient = lakeNiceClient;
        this.lakeNiceAuthClient = lakeNiceAuthClient;
        this.handlerOptions = handlerOptions;
        // local.
        let self = this;
        let item;
        let options = handlerOptions || {};
        let config = this.config = {
            debug: false,
            parent: self
        };
        // Log nothing by default, following "the rule of silence":
        // http://www.linfo.org/rule_of_silence.html
        let logger = function () {
            // Assume that if you're in debug mode and you didn't
            // pass in a logger, you actually want to log as much as
            // possible.
            if (handlerOptions.debug) {
                return handlerOptions.logger || console;
            }
            else {
                // Use your logger which should have its own logic
                // for output. Return the no-op.
                return handlerOptions.logger || mockconsole;
            }
        }();
        this.logger = logger;
        // set our config from options
        for (item in options) {
            if (options.hasOwnProperty(item)) {
                this.config[item] = options[item];
            }
        }
        // Call WildEmitter constructor.
        wildemitter.mixin(LakeNiceHandler);
        // log all events in debug mode
        if (this.config.debug) {
            this.on('*', this.logger.log.bind(this.logger, 'Lake Nice Handler Event:'));
        }
        this.generalhandler = new generalhandler_1.GeneralHandler(this.lakeNiceClient, this.lakeNiceAuthClient, this.config);
        this.requesthandler = new requesthandler_1.RequestHandler(this.lakeNiceClient, this.lakeNiceAuthClient, this.config);
        this.responsehandler = new responsehandler_1.ResponseHandler(this.lakeNiceClient, this.lakeNiceAuthClient, this.config);
        // Proxy events from handler
        this.generalhandler.on('*', function () {
            this.emit.apply(self, arguments);
        });
        // Proxy events from handler
        this.requesthandler.on('*', function () {
            this.emit.apply(self, arguments);
        });
        // Proxy events from handler
        this.responsehandler.on('*', function () {
            this.emit.apply(self, arguments);
        });
        // general handle all defaults.
        this.generalhandler.on('handleDefault', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('defaultData', argum);
        });
        // request handle all defaults.
        this.requesthandler.on('handleDefault', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('defaultData', argum);
        });
        // response handle all defaults.
        this.responsehandler.on('handleDefault', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('defaultData', argum);
        });
        // general handle all response data.
        this.generalhandler.on('responseDataHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('responseData', argum);
        });
        // request handle all response data.
        this.requesthandler.on('responseDataHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('responseData', argum);
        });
        // response handle all response data.
        this.responsehandler.on('responseDataHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('responseData', argum);
        });
        // general handle all request data.
        this.generalhandler.on('requestDataHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('requestData', argum);
        });
        // request handle all request data.
        this.requesthandler.on('requestDataHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('requestData', argum);
        });
        // response handle all request data.
        this.responsehandler.on('requestDataHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('requestData', argum);
        });
        // general handle all general data.
        this.generalhandler.on('generalDataHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('generalData', argum);
        });
        // request handle all general data.
        this.requesthandler.on('generalDataHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('generalData', argum);
        });
        // response handle all general data.
        this.responsehandler.on('generalDataHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('generalData', argum);
        });
        // general handle all data.
        this.generalhandler.on('getClientTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('clientToken', argum);
        });
        // request handle all data.
        this.requesthandler.on('getClientTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('clientToken', argum);
        });
        // response handle all data.
        this.responsehandler.on('getClientTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('clientToken', argum);
        });
        // general handle all data.
        this.generalhandler.on('getImplicitTokenRequestHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('implicitTokenRequest', argum);
        });
        // request handle all data.
        this.requesthandler.on('getImplicitTokenRequestHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('implicitTokenRequest', argum);
        });
        // response handle all data.
        this.responsehandler.on('getImplicitTokenRequestHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('implicitTokenRequest', argum);
        });
        // general handle all data.
        this.generalhandler.on('getPasswordTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('passwordToken', argum);
        });
        // request handle all data.
        this.requesthandler.on('getPasswordTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('passwordToken', argum);
        });
        // response handle all data.
        this.responsehandler.on('getPasswordTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('passwordToken', argum);
        });
        // general handle all data.
        this.generalhandler.on('getRefreshTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('refreshToken', argum);
        });
        // request handle all data.
        this.requesthandler.on('getRefreshTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('refreshToken', argum);
        });
        // response handle all data.
        this.responsehandler.on('getRefreshTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('refreshToken', argum);
        });
        // general handle all data.
        this.generalhandler.on('getUserRefreshTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('userRefreshToken', argum);
        });
        // request handle all data.
        this.requesthandler.on('getUserRefreshTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('userRefreshToken', argum);
        });
        // response handle all data.
        this.responsehandler.on('getUserRefreshTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('userRefreshToken', argum);
        });
        // general handle all data.
        this.generalhandler.on('getUserCreateAccessKeyHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('userCreateAccessKey', argum);
        });
        // request handle all data.
        this.requesthandler.on('getUserCreateAccessKeyHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('userCreateAccessKey', argum);
        });
        // response handle all data.
        this.responsehandler.on('getUserCreateAccessKeyHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('userCreateAccessKey', argum);
        });
        // general handle all data.
        this.generalhandler.on('getUserGenerateTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('userGenerateToken', argum);
        });
        // request handle all data.
        this.requesthandler.on('getUserGenerateTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('userGenerateToken', argum);
        });
        // response handle all data.
        this.responsehandler.on('getUserGenerateTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg
            };
            this.emit('userGenerateToken', argum);
        });
        // general handle all data.
        this.generalhandler.on('getUserAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('userAccessToken', argum);
        });
        // request handle all data.
        this.requesthandler.on('getUserAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('userAccessToken', argum);
        });
        // response handle all data.
        this.responsehandler.on('getUserAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('userAccessToken', argum);
        });
        // general handle all data.
        this.generalhandler.on('getRefreshAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('refreshAccessToken', argum);
        });
        // request handle all data.
        this.requesthandler.on('getRefreshAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('refreshAccessToken', argum);
        });
        // response handle all data.
        this.responsehandler.on('getRefreshAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('refreshAccessToken', argum);
        });
        // general handle all data.
        this.generalhandler.on('getPasswordAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('passwordAccessToken', argum);
        });
        // request handle all data.
        this.requesthandler.on('getPasswordAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('passwordAccessToken', argum);
        });
        // response handle all data.
        this.responsehandler.on('getPasswordAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('passwordAccessToken', argum);
        });
        // general handle all data.
        this.generalhandler.on('getClientAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('clientAccessToken', argum);
        });
        // request handle all data.
        this.requesthandler.on('getClientAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('clientAccessToken', argum);
        });
        // response handle all data.
        this.responsehandler.on('getClientAccessTokenHandler', function (uniqueID, arg) {
            // Common aguments
            var argum = {
                error: arg.error,
                type: arg.type,
                uniqueID: uniqueID,
                details: arg.details
            };
            this.emit('clientAccessToken', argum);
        });
    }
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event arguments.
     */
    on(arg0, arg1) {
    }
    /**
     * On request handler.
     * @param {Object} args Event arguments.
     */
    request(args) {
        this.requesthandler.handleRequest(args);
    }
    /**
     * On response handler.
     * @param {Object} args Event arguments.
     */
    response(args) {
        this.responsehandler.handleResponse(args);
    }
    /**
     * On general handler.
     * @param {Object} args Event arguments.
     */
    general(args) {
        this.generalhandler.handleGeneral(args);
    }
}
exports.LakeNiceHandler = LakeNiceHandler;
