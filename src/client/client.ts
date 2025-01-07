import { ShipGeniusOmsClientConstructorArguments } from "./client-types";
import { getServerUrl } from "./client-utils";

/**
 * A client for connecting to the ShipGenius OMS API
 * and running API requests.
 */
export default class ShipGeniusOmsClient {
    protected api_key: string;

    protected _url: string;
    public get url(): string {
        return this._url;
    }

    /**
     *
     * @param args The settings for the connection.\
     *      Must specify `api_key` and `server`
     */
    constructor(args: ShipGeniusOmsClientConstructorArguments) {
        this.api_key = args.api_key;
        this._url = args.server.url ?? getServerUrl(args.server.environment);
    }
}
