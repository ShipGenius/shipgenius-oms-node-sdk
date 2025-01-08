import { GraphqlList, JsonObject, JsonValue } from "../typescript-utils.js";
import { GraphqlError, HttpError, ServerConnectionSpecification, ShipGeniusOmsClientConstructorOptions } from "./client-types.js";
import { getServerUrl } from "./client-utils.js";
import CarrierList, { CarrierListData } from "../models/carrier-list.js";
import CarrierServiceList, { CarrierServiceListData } from "../models/carrier-service-list.js";
import { GraphqlResponse, HttpMethod } from "./private-types.js";
import DomesticAddressInput from "../models/domestic-address-input.js";
import { AddressValidationQueryResponse } from "../models/address-validation-response.js";
import AddressValidationInfo from "../models/address-validation-info.js";
import AddressValidationError from "../models/address-validation-error.js";

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
    private processUrl(path: string, no_version: boolean, query?: { [key: string]: string | string[] | null } | URLSearchParams) {
        const full_path = no_version ? `${this.url}${path}` : `${this.url}/${this._version}${path}`;

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
        no_version?: boolean;
        method: HttpMethod;
        body?: JsonValue;
        extra_headers?: { [key: string]: string };
        query?: { [key: string]: string | string[] | null } | URLSearchParams;
    }) {
        const { path, method, body, extra_headers, query } = args;

        const fetch_url = this.processUrl(path, args.no_version ?? false, query);

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
     * Make a GraphQL request to the connected server,
     * returning the JSON response
     *
     * @throws {HttpError} if the response is not `ok`
     * @throws {GraphqlError} if the response contains an `errors` key
     */
    private async makeGqlRequest(
        request:
            | {
                  document: string;
                  query?: undefined;
              }
            | {
                  document?: undefined;
                  query: string;
              },
        variables?: JsonObject,
    ): Promise<unknown> {
        const response = (await this.makeRestRequest({
            path: "/graphql",
            method: "POST",
            no_version: true,
            body: {
                documentId: request.document,
                query: request.query,
                variables,
            },
            extra_headers: {
                Accept: "application/graphql-response+json",
            },
        })) as GraphqlResponse;

        if (response.errors !== undefined) {
            throw new GraphqlError(response.errors);
        } else if (response.data !== undefined) {
            return response.data;
        } else {
            throw new GraphqlError([
                {
                    message: "Server responded with an incomprehensible JSON response",
                },
            ]);
        }
    }

    /// ^^^ PRIVATE HELPERS ABOVE ^^^ ///
    /// ***************************** ///
    /// vvv PUBLIC  METHODS BELOW vvv ///

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

    /**
     * Run an arbitrary GraphQL query
     * 
     * @param query - The GraphQL query (or mutation) to run
     * @param variables - The variables to pass into the query
     * @returns The `data` field of the query response
     * 
     * @throws {HttpError} if the response is not `ok`
     * @throws {GraphqlError} if the response contains an `errors` key
     */
    async runGraphql(query: string, variables?: JsonObject): Promise<JsonObject | null> {
        return (await this.makeGqlRequest({ query }, variables)) as JsonObject | null;
    }

    /**
     * Validate and correct address(es) against the USPS database
     * 
     * @param address - The address(es) to validate
     * @param options {Object} - Additional options to control the response
     * @param options.zip_plus_four - Whether to include ZIP+4 extensions on returned ZIP Codes as opposed to the plain 5-digit ZIP Code
     * @returns A list of validated address and/or errors in the same order as the input
     * 
     * @throws {HttpError} if the response is not `ok`
     * @throws {GraphqlError} if the response contains an `errors` key
     */
    async validateAddress(
        address: GraphqlList<DomesticAddressInput>,
        options?: {
            /** Whether to include ZIP+4 extensions on returned ZIP Codes as opposed to the plain 5-digit ZIP Code */
            zip_plus_four?: boolean;
        },
    ): Promise<(AddressValidationInfo | AddressValidationError)[]> {
        const { address_validation } = (await this.makeGqlRequest(
            { document: "ValidateAddress" },
            { address, zip_plus_four: options?.zip_plus_four },
        )) as AddressValidationQueryResponse;

        return address_validation.map((address) => {
            if (address.__typename === "AddressValidationInfo") {
                return new AddressValidationInfo(address);
            } else {
                return new AddressValidationError(address);
            }
        });
    }
}
