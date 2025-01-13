import { GraphqlList, JsonObject, JsonValue } from "../typescript-utils.js";
import { GraphqlError, HttpError, ServerConnectionSpecification, ShipGeniusOmsClientConstructorOptions } from "./client-types.js";
import { getServerUrl } from "./client-utils.js";
import CarrierList, { CarrierListInterface } from "../models/carrier-list.js";
import CarrierServiceList, { CarrierServiceListInterface } from "../models/carrier-service-list.js";
import { GraphqlResponse, HttpMethod } from "./gql-types.js";
import DomesticAddressInput from "../models/domestic-address-input.js";
import { AddressValidationQueryResponse } from "../models/address-validation-response.js";
import AddressValidationInfo, { AddressValidationInfoInterface } from "../models/address-validation-info.js";
import AddressValidationError, { AddressValidationErrorInterface } from "../models/address-validation-error.js";
import BulkDomesticRateResponse, { DomesticRateQueryResponse } from "../models/bulk-domestic-rate-response.js";
import WeightUnit from "../models/weight-unit.js";
import CarrierServiceRateInput from "../models/carrier-service-rate-input.js";
import DomesticRateInput from "../models/domestic-rate-input.js";

/**
 * A client for connecting to the ShipGenius OMS API
 * and running API requests.
 */
export default class ShipGeniusOmsClient {
    /** The user's App API Token */
    protected api_key: string;

    /**
     * The base URL requests are being sent to
     *
     * @internal
     */
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

    /**
     *
     * @param api_key
     * The API Key used to authenticate with the ShipGenius OMS server.
     *
     * You can create one through the [Connected Apps portal](https://lite.shipgeni.us/connected-apps).
     * @param server
     * The server to connect to.
     *
     * ##### **Connecting via `environment` (recommended)**
     *
     * Specify the {@link client.ServerEnvironmentConnection.environment | `environment`} key with a {@link client.ServerEnvironment | ServerEnvironment} value to connect to a standard ShipGenius server
     *
     * Options are:
     * - {@link client.ServerEnvironment.PRODUCTION | `PRODUCTION`} = Actual server to purchase real labels
     * - {@link client.ServerEnvironment.SANDBOX | `SANDBOX`} = Simple testing server with mock responses
     * - {@link client.ServerEnvironment.DEVELOPMENT | `DEVELOPMENT`} = More complex testing environment with semi-persistent data, but still no real money or labels
     *
     * Example
     * ```typescript
     * { environment: ServerEnvironment.SANDBOX }
     * ```
     *
     * ##### **Connecting via `url` (not recommended)**
     *
     * Specify the {@link client.ServerUrlConnection.url | `url`} key with a URL
     * to connect to a server at a custom URL.
     *
     * Useful if you need to connect indirectly, or to a staging server.
     *
     * > [!NOTE]
     * > URL should _not_ contain a trailing slash or version number.
     * >
     * > URL should contain a protocol (i.e. `http://` or `https://`).
     *
     * Example
     * ```typescript
     * { url: "http://localhost:8000" }
     * ```
     *
     * @param options
     *
     * Optional extra options
     *
     * @example
     * ```typescript
     * import ShipGeniusOmsClient, { ServerEnvironment } from "@shipgenius/oms/client";
     *
     * const client = new ShipGeniusOmsClient(
     *     "f7f4d30c26ac2537e1db50da3dbd990a0261617f857c093d3a261b6b2d27685e",
     *     { environment: ServerEnvironment.SANDBOX },
     *     { version: "latest" }, // not necessary since "latest" is the default
     * );
     * ```
     */
    constructor(api_key: string, server: ServerConnectionSpecification, options?: ShipGeniusOmsClientConstructorOptions) {
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
     * @throws {@link client.HttpError} if response is not `ok`
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
     * @throws {@link client.HttpError} if the response is not `ok`
     * @throws {@link client.GraphqlError} if the response contains an `errors` key
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
     * @throws {@link client.HttpError}
     * if response is not `ok`
     */
    public async getSupportedCarriers(): Promise<CarrierList> {
        const data = (await this.makeRestRequest({
            path: "/carrier/list",
            method: "GET",
        })) as CarrierListInterface;

        return new CarrierList(data);
    }

    /**
     * Fetch a list of carrier services supported by the API
     *
     * @throws {@link client.HttpError} if response is not `ok`
     */
    public async getSupportedServices(): Promise<CarrierServiceList> {
        const data = (await this.makeRestRequest({
            path: "/carrier/service/list",
            method: "GET",
        })) as CarrierServiceListInterface;

        return new CarrierServiceList(data);
    }

    /**
     * Run an arbitrary GraphQL query on the connected API server.
     *
     * @param query - The GraphQL query (or mutation) to run
     * @param variables - The variables to pass into the query
     * @returns The `data` field of the query response
     *
     * @throws {@link client.HttpError} if the response is not `ok`
     * @throws {@link client.GraphqlError} if the response contains an `errors` key
     */
    public async runGraphql(query: string, variables?: JsonObject): Promise<JsonObject | null> {
        return (await this.makeGqlRequest({ query }, variables)) as JsonObject | null;
    }

    /**
     * Validate and correct address(es) against the USPS database
     *
     * @param address - The address(es) to validate
     * @param options - Additional options to control the response
     * @returns A list of validated address and/or errors in the same order as the input
     *
     * @throws {@link client.HttpError} if the response is not `ok`
     * @throws {@link client.GraphqlError} if the response contains an `errors` key
     */
    public async validateAddress(
        address: GraphqlList<DomesticAddressInput>,
        options?: {
            /**
             * Whether to include ZIP+4 extensions on returned ZIP Codes as opposed to the plain 5-digit ZIP Code
             *
             * @default false
             */
            zip_plus_four?: boolean;
        },
    ): Promise<(AddressValidationInfo | AddressValidationError)[]> {
        const { address_validation } = (await this.makeGqlRequest(
            { document: "ValidateAddress" },
            { address, zip_plus_four: options?.zip_plus_four },
        )) as AddressValidationQueryResponse;

        return address_validation.map((address) => {
            if (address.__typename === "AddressValidationInfo") {
                return new AddressValidationInfo(address as AddressValidationInfoInterface);
            } else {
                return new AddressValidationError(address as AddressValidationErrorInterface);
            }
        });
    }

    /**
     * Get cost and transit estimates for a domestic (USA to USA) shipment
     *
     * @param request - The package(s) to rate
     * @param services - The carrier service(s) to get rates for
     * @param options - Additional options for the request
     *
     * @returns A list of rate information for each package, in the order they were input
     *
     * > [!NOTE]
     * >
     * > The return is a list of rated **packages**, each of which has a `rates` list containing the actual rates
     *
     * @throws {@link client.HttpError} if the response is not `ok`
     * @throws {@link client.GraphqlError} if the response contains an `errors` key
     */
    public async getDomesticRate(
        request: GraphqlList<DomesticRateInput>,
        services: GraphqlList<CarrierServiceRateInput>,
        options?: {
            /**
             * If set to `true`, the returned rates will have have the {@link "@shipgenius/oms/models".DomesticRate.rate_id | `rate_id`} set.
             *
             * You can use this returned id to purchase a label at the rated price for the rated service
             *
             * @default true
             */
            save_rates?: boolean;
            /**
             * The unit to return weights in
             *
             * @default - {@link WeightUnit.LBS}
             */
            weight_unit: WeightUnit;
        },
    ) {
        const { domestic_rate } = (await this.makeGqlRequest(
            { document: "DomesticRate" },
            {
                request,
                services,
                save_rates: options?.save_rates,
                weight_unit: options?.weight_unit,
            },
        )) as DomesticRateQueryResponse;

        return domestic_rate.map((shipment) => new BulkDomesticRateResponse(shipment));
    }
}
