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
import FullShipmentIdentifier from "../models/full-shipment-identifier.js";
import TrackingInformation, { GetTrackingQueryResponse } from "../models/tracking-information.js";
import { VoidLabelQueryResponse } from "../models/void-label-response.js";
import { Trackingsubscription } from "../models/tracking-subscription.js";
import LabelFormat from "../models/label-format.js";
import DomesticLabel, { DomesticLabelInterface } from "../models/domestic-label.js";

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

    /**
     * Get tracking information for a shipped package
     *
     * @param label_info The label to get tracking information for
     *
     * @returns Information about the shipment of the package
     *
     * @throws {@link client.HttpError} if the response is not `ok`
     * @throws {@link client.GraphqlError} if the response contains an `errors` key
     */
    public async getTrackingInformation(label_info: FullShipmentIdentifier) {
        const { get_tracking } = (await this.makeGqlRequest(
            { document: "GetTracking" },
            {
                label_info,
            },
        )) as GetTrackingQueryResponse;

        return new TrackingInformation(get_tracking);
    }

    /**
     * Recover a lost label using the transaction if provided when the label was initially created.
     *
     * > [!NOTE]
     * >
     * > This mutation is designed for rare scenarios, such as a lost connection or unexpected crash during the label creation process.
     * >
     * > For further assistance, contact us at info@shipgeni.us
     * >
     * > - Recovery should only be used if there was a failure to receive a label calling from {@link createLabel} or {@link rateAndShip}
     * > - This recovery process is only valid within **24 hours** of generating the label.
     *
     * @param transaction_id
     * The {@link LabelCreationInput.transaction_id} or {@link DomesticRateAndShipInput.transaction_id}
     * used when creating the label you want to recover
     * @param options Additional options for configuring the recovery and the returned label
     *
     * @returns the recovered label
     */
    public async recoverLabel<Format extends LabelFormat = LabelFormat.NONE>(
        transaction_id: string,
        options?: {
            /**
             * The payment ID to use to pay for the label if payment was not successful initially.
             *
             * The payment method will not be charged if the label was already paid for.
             *
             * If something goes wrong and you get double-charged for a label,
             * contact info@shipgeni.us as soon as possible to resolve the issue.
             */
            payment_id?: string | null;
            /**
             * The format to return label images in.
             *
             * Only one format can be specified, as converting image formats
             * is a larger-than-typical workload.
             *
             * If you need the image in
             * multiple formats, you can run a custom query via {@link runGraphql}.
             *
             * @default
             * {@link LabelFormat.NONE}
             */
            format?: Format;
            /**
             * The unit of measure to return weights in
             *
             * @default
             * {@link WeightUnit.LBS | LBS}
             */
            weight_unit?: WeightUnit;
            /**
             * Whether to return the image as a base64 `data:` uri (`true`),
             * or a base64 encoded bytes string (`false`)
             *
             * @default false
             */
            as_data_uri?: boolean;
        },
    ): Promise<DomesticLabel<Format>> {
        const { recover_label } = (await this.makeGqlRequest(
            {
                document:
                    options?.format === LabelFormat.PNG
                        ? "RecoverLabelPng"
                        : options?.format === LabelFormat.ZPL
                        ? "RecoverLabelZpl"
                        : "RecoverLabel",
            },
            {
                transaction_id,
                payment_id: options?.payment_id,
                weight_unit: options?.weight_unit,
                as_data_uri: options?.as_data_uri,
            }
    )) as { recover_label: DomesticLabelInterface<Format> };

        return new DomesticLabel(recover_label);
    }

    /**
     * Void the specified label and request a refund if applicable
     *
     * @param label_info The label to void
     *
     * @returns The success status of the void
     *
     * @throws {@link client.HttpError} if the response is not `ok`
     * @throws {@link client.GraphqlError} if the response contains an `errors` key
     */
    public async voidLabel(label_info: FullShipmentIdentifier) {
        const { void_label } = (await this.makeGqlRequest({ document: "VoidLabel" }, { label_info })) as VoidLabelQueryResponse;

        return void_label;
    }

    /**
     * Request that the list of subscribers recieve notifications
     * about tracking updates for the specified shipment
     *
     * @param label_info The shipment to subscribe to updates for
     * @param subscribers A list of people to notify about updates
     *
     * @returns a list of boolean values indicating whether the
     * subscriptions were successful, in the same order as the input.
     *
     * @throws {@link client.HttpError} if the response is not `ok`
     * @throws {@link client.GraphqlError} if the response contains an `errors` key
     */
    public async subscribeToTrackingUpdates(label_info: FullShipmentIdentifier, subscribers: GraphqlList<Trackingsubscription>) {
        const { subscribe_to_tracking_updates } = (await this.makeGqlRequest(
            { document: "SubscribeToTrackingUpdates" },
            {
                label_info,
                subscribers,
            },
        )) as { subscribe_to_tracking_updates: boolean[] };

        return subscribe_to_tracking_updates;
    }
}
