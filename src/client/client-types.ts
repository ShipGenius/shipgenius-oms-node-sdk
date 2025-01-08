import { JsonValue } from "../typescript-utils.js";

/**
 * The type of ShipGenius OMS API server connected to
 *
 * - PRODUCTION = Actual server to purchase real labels
 * - SANDBOX = Simple testing server with mock responses
 * - DEVELOPMENT = More complex testing environment with semi-persistent data, but still no real money or labels
 */
export type ServerEnvironment = "PRODUCTION" | "SANDBOX" | "DEVELOPMENT";

/**
 * The server to connect to
 *
 * Can be specified either using `environment` (recommended) or `url` (not recommended)
 */
export type ServerConnectionSpecification =
    | {
          /**
           * The standard Shipgenius-run server
           *
           * - PRODUCTION = Actual server to purchase real labels
           * - SANDBOX = Simple testing server with mock responses
           * - DEVELOPMENT = More complex testing environment with semi-persistent data, but still no real money or labels
           */
          environment: ServerEnvironment;
          /**
           * A custom url pointing to the Shipgenius OMS server
           *
           * Useful if you need to connect indirectly or to a development server
           */
          url?: undefined | null;
      }
    | {
          /**
           * A custom url pointing to the Shipgenius OMS server
           *
           * Useful if you need to connect indirectly or to a development server
           */
          url: string;
          /**
           * The standard Shipgenius-run server
           *
           * - PRODUCTION = Actual server to purchase real labels
           * - SANDBOX = Simple testing server with mock responses
           * - DEVELOPMENT = More complex testing environment with semi-persistent data, but still no real money or labels
           */
          environment?: undefined | null;
      };

/**
 * Additional settings for the connection
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

export class HttpError extends Error {
    private _response: StrippedResponse;
    private _parsed_json: JsonValue | undefined = undefined;
    private _parsed_text: string | undefined = undefined;

    constructor(response: StrippedResponse) {
        super("HTTP Error: " + response.status);

        this._response = response;
    }

    get response(): StrippedResponse {
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

    async getMessage() {
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

        return "An unexpected error occurred.";
    }
}
