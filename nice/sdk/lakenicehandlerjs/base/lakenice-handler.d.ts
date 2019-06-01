import { ILakeNiceClient } from '../../lakenicejs/base/lakenice-client';
import { ILakeNiceAuthClient } from '../../lakenicejs/base/lakenice-auth-client';
import { IGeneralHandler } from '../handlers/generalhandler';
import { IRequestHandler } from '../handlers/requesthandler';
import { IResponseHandler } from '../handlers/responsehandler';
/**
 * Lake Nice handler interface.
 */
export interface ILakeNiceHandler {
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event arguments.
     */
    on(arg0: string, arg1: any): any;
    /**
     * On request handler.
     * @param {Object} args Event arguments.
     */
    request(args: any): void;
    /**
     * On response handler.
     * @param {Object} args Event arguments.
     */
    response(args: any): void;
    /**
     * On general handler.
     * @param {Object} args Event arguments.
     */
    general(args: any): void;
}
/**
 * Lake Nice handler implementation.
 */
export declare class LakeNiceHandler implements ILakeNiceHandler {
    lakeNiceClient: ILakeNiceClient;
    lakeNiceAuthClient: ILakeNiceAuthClient;
    handlerOptions: any;
    generalhandler: IGeneralHandler;
    requesthandler: IRequestHandler;
    responsehandler: IResponseHandler;
    config: any;
    logger: any;
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
    constructor(lakeNiceClient: ILakeNiceClient, lakeNiceAuthClient: ILakeNiceAuthClient, handlerOptions: any);
    /**
     * On event.
     * @param {string} arg0 Event name.
     * @param {Object} arg1 Event arguments.
     */
    on(arg0: string, arg1: any): any;
    /**
     * On request handler.
     * @param {Object} args Event arguments.
     */
    request(args: any): void;
    /**
     * On response handler.
     * @param {Object} args Event arguments.
     */
    response(args: any): void;
    /**
     * On general handler.
     * @param {Object} args Event arguments.
     */
    general(args: any): void;
}
