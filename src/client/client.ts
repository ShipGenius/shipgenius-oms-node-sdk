import { JsonValue } from "../typescript-utils.js";
import { HttpError, ServerConnectionSpecification, ShipGeniusOmsClientConstructorOptions } from "./client-types.js";
import { getServerUrl, HttpMethod } from "./client-utils.js";
import CarrierList, { CarrierListData } from "../models/carrier-list.js";
import CarrierServiceList, { CarrierServiceListData } from "../models/carrier-service-list.js";

/**
 * A client for connecting to the ShipGenius OMS API
 * and running API requests.
 */
export default class ShipGeniusOmsClient {
    /** The user's App API Token */
    protected api_key: string;

    protected _url: string;
    /**
     * The base URL requests are being sent to
     *
     * @readonly
     */
    public get url(): string {
        return this._url;
    }

    /** The version of the API to use */
    protected _version: string;
    /**
     * The version of the API being used
     *
     * @readonly
     */
    public get version(): string {
        return this._version;
    }

    constructor(
        /**
         * The API Key used to authenticate with the ShipGenius OMS server.
         *
         * You can create one through the [Connected Apps portal](https://lite.shipgeni.us/connected-apps)
         */
        api_key: string,
        /**
         * The server to connect to.
         *
         * **Connecting via `environment` (recommended)**
         *
         * Specify the `environment` key to connect to a standard ShipGenius server
         *
         * Options are:
         * - PRODUCTION = Actual server to purchase real labels
         * - SANDBOX = Simple testing server with mock responses
         * - DEVELOPMENT = More complex testing environment with semi-persistent data, but still no real money or labels
         *
         * Example:
         * ```typescript
         * { environment: "SANDBOX" }
         * ```
         *
         * **Connecting via `url` (not recommended)**
         *
         * A custom url pointing to the Shipgenius OMS server.
         *
         * Useful if you need to connect indirectly, or to a staging server.
         *
         * Example:
         * ```typescript
         * { url: "https://localhost" }
         * ```
         */
        server: ServerConnectionSpecification,
        /**
         * Additional options for the connection, such as the api version.
         *
         * None of these arguments are required.
         */
        options?: ShipGeniusOmsClientConstructorOptions,
    ) {
        this.api_key = api_key;
        this._url = server.url ?? getServerUrl(server.environment);
        this._version = options?.version ?? "latest";
    }

    /**
     * @param path The path on the server to hit, starting with a `/`
     * @param query The query parameters to add to the path
     * @returns The full url with path and query parameters
     */
    private processUrl(path: string, query?: { [key: string]: string | string[] | null } | URLSearchParams) {
        const full_path = `${this.url}/${this._version}${path}`;

        const [url_path, ...url_params] = full_path.split("?");

        if (query === undefined) {
            query = new URLSearchParams();
        }
        if (!(query instanceof URLSearchParams)) {
            const _query = new URLSearchParams();

            for (const [key, value] of Object.entries(query)) {
                if (value instanceof Array) {
                    for (const subvalue of value) {
                        _query.append(key, subvalue);
                    }
                } else {
                    if (value != null) {
                        _query.append(key, value);
                    }
                }
            }

            query = _query;
        }

        for (const param of url_params) {
            const additional_query = new URLSearchParams(param);
            // `Type 'URLSearchParams' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.ts(2802)`
            for (const [key, value] of Array.from(additional_query)) {
                if (value != null) {
                    query.append(key, value);
                }
            }
        }

        let fetch_path = url_path;
        if (Array.from(query).length > 0) {
            fetch_path = `${fetch_path}?${query.toString()}`;
        }

        return fetch_path;
    }

    /**
     * Make a RestAPI request to the connected server,
     * returning the JSON response
     *
     * @throws {HttpError} if response is not `ok`
     */
    private async makeRestRequest(args: {
        path: string;
        method: HttpMethod;
        body?: JsonValue;
        extra_headers?: { [key: string]: string };
        query?: { [key: string]: string | string[] | null } | URLSearchParams;
    }) {
        const { path, method, body, extra_headers, query } = args;

        const fetch_url = this.processUrl(path, query);

        const headers = {
            ...(body === undefined ? {} : { "Content-Type": "application/json" }),
            ...extra_headers,
            Authorization: `Bearer ${this.api_key}`,
        };

        const response = await fetch(fetch_url, {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body),
        });

        if (!response.ok) {
            throw new HttpError(response);
        }

        return await response.json();
    }

    /**
     * Fetch a list of carriers supported by the API
     *
     * @throws {HttpError} if response is not `ok`
     */
    async getSupportedCarriers(): Promise<CarrierList> {
        const data = (await this.makeRestRequest({
            path: "/carrier/list",
            method: "GET",
        })) as CarrierListData;

        return new CarrierList(data);
    }

    /**
     * Fetch a list of carrier services supported by the API
     *
     * @throws {HttpError} if response is not `ok`
     */
    async getSupportedServices(): Promise<CarrierServiceList> {
        const data = (await this.makeRestRequest({
            path: "/carrier/service/list",
            method: "GET",
        })) as CarrierServiceListData;

        return new CarrierServiceList(data);
    }
}
