import { JsonObject } from "../typescript-utils.js";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/** An error returned by GraphQL */
export interface GraphqlErrorResponse {
    /** The error message */
    message: string;
    /** Where the error occurred */
    locations?: {
        line: number;
        column: number;
    }[];
    /** The path of keys to where the error occurred */
    path?: (string | number)[];
    /**
     * Extra information about the error.
     * 
     * Will likely be {@link ShipgeniusGraphqlErrorExtension}
     */
    extensions?: JsonObject;
}

/** Extra information about the error */
export interface ShipgeniusGraphqlErrorExtension extends JsonObject {
    /** An equivalent HTTP status */
    http_status: number;
    /** Further free-form details about the error */
    additional_details: JsonObject;
    /** An error code identifying the type of error */
    code: string;
}

/** A response from the GraphQL API */
export type GraphqlResponse = (
    | {
          /** The requested data */
          data: JsonObject | null;
          /** Information about errors that occurred */
          errors?: undefined | [GraphqlErrorResponse, ...GraphqlErrorResponse[]];
      }
    | {
          /** The requested data */
          data?: undefined;
          /** Information about errors that occurred */
          errors: [GraphqlErrorResponse, ...GraphqlErrorResponse[]];
      }
) & {
    /** Extra information about the request */
    extensions?: JsonObject;
};
