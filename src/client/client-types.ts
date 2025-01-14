import { JsonObject, JsonValue } from "../typescript-utils.js";
import { GraphqlErrorResponse, ShipgeniusGraphqlErrorExtension } from "./gql-types.js";

/**
 * The type of ShipGenius OMS API server connected to
 */
export enum ServerEnvironment {
    /** Actual server to purchase real labels */
    PRODUCTION = "PRODUCTION",
    /** Simple testing server with mock responses */
    SANDBOX = "SANDBOX",
    /** More complex testing environment with semi-persistent data, but still no real money or labels */
    DEVELOPMENT = "DEVELOPMENT",
}

/**
 * Specification of the server to connect to using server's environment
 *
 * @see {@link ServerConnectionSpecification}
 */
export interface ServerEnvironmentConnection {
    /**
     * The standard Shipgenius-run server
     */
    environment: ServerEnvironment;
    /** @hidden */
    url?: undefined | null;
}

/**
 * Specification of the server to connect to using the server's url
 *
 * @see {@link ServerConnectionSpecification}
 */
export interface ServerUrlConnection {
    /**
     * A custom url pointing to the Shipgenius OMS server
     *
     * Useful if you need to connect indirectly or to a development server
     */
    url: string;
    /** @hidden */
    environment?: undefined | null;
}

/**
 * The server to connect to
 *
 * Can be specified either using `environment` (recommended) or `url` (not recommended)
 */
export type ServerConnectionSpecification = ServerEnvironmentConnection | ServerUrlConnection;

/**
 * Additional options for the connection, such as the api version.
 *
 * None of these arguments are required.
 *
 * @expand
 */
export interface ShipGeniusOmsClientConstructorOptions {
    /**
     * The version of the API to use.
     *
     * @default "latest"
     */
    version?: "latest" | `v${number}_${number}`;
}

/** Standard fetch Response object with some fields removed  */
export type StrippedResponse = Omit<Response, "body" | "bodyUsed" | "arrayBuffer" | "blob" | "formData" | "bytes" | "clone"> & {
    clone: () => StrippedResponse;
};

/** An error occuring from a non-ok HTTP response */
export class HttpError extends Error {
    private _response: StrippedResponse;
    private _parsed_json: JsonValue | undefined = undefined;
    private _parsed_text: string | undefined = undefined;

    /** @hidden */
    constructor(response: StrippedResponse) {
        super("HTTP Error: " + response.status);

        this._response = response;
    }

    /**
     * The Response object, but with some fields missing to facilitate re-use
     * of the .json() and .text() methods
     */
    public get response(): StrippedResponse {
        return {
            headers: this._response.headers,
            type: this._response.type,
            ok: this._response.ok,
            redirected: this._response.redirected,
            status: this._response.status,
            statusText: this._response.statusText,
            url: this._response.url,
            clone: this._response.clone,

            json: async () => {
                if (this._parsed_json === undefined) {
                    if (this._parsed_text === undefined) {
                        this._parsed_text = await this._response.text();
                    }
                    this._parsed_json = JSON.parse(this._parsed_text) as JsonValue;
                }

                return this._parsed_json;
            },

            text: async () => {
                if (this._parsed_text === undefined) {
                    this._parsed_text = await this._response.text();
                }
                return this._parsed_text;
            },
        };
    }

    /** Get the error message from the response */
    public async getMessage() {
        try {
            const error_data = (await this.response.json()) as JsonValue;

            if (typeof error_data === "object" && error_data !== null && "detail" in error_data && typeof error_data.detail === "string") {
                return error_data.detail;
            }

            if (
                typeof error_data === "object" &&
                error_data !== null &&
                "detail" in error_data &&
                typeof error_data.detail === "object" &&
                error_data.detail !== null &&
                "message" in error_data.detail &&
                typeof error_data.detail.message === "string"
            ) {
                return error_data.detail.message;
            }
        } catch {
            /* fall through to default return */
        }

        return "An unexpected error occurred.";
    }
}

/** Information about errors returned by the GraphQL API */
export class GraphqlError extends Error {
    private _errors: readonly [GraphqlErrorResponse, ...GraphqlErrorResponse[]];
    /** The `errors` key from GraphQL response */
    public get errors(): readonly [GraphqlErrorResponse, ...GraphqlErrorResponse[]] {
        return this._errors;
    }

    /**
     * The `extensions` fields from the `errors` list
     *
     * The list is filtered down to just those with full extension details,
     * which *should* be all of them.
     */
    public get error_extensions(): ShipgeniusGraphqlErrorExtension[] {
        function isShipgeniusErrorExtension(ext: JsonObject | undefined | null): ext is ShipgeniusGraphqlErrorExtension {
            return (
                typeof ext == "object" &&
                ext !== null &&
                "http_status" in ext &&
                typeof ext.http_status === "number" &&
                "additional_details" in ext &&
                typeof ext.additional_details === "object" &&
                ext.additional_details !== null &&
                "code" in ext &&
                typeof ext.code === "string"
            );
        }

        return this._errors.map((err) => err.extensions).filter(isShipgeniusErrorExtension);
    }

    /** @hidden */
    constructor(errors: [GraphqlErrorResponse, ...GraphqlErrorResponse[]]) {
        super(errors[0].message);

        this._errors = errors;
    }
}
