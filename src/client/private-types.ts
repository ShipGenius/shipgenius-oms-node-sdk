/** Private type definitions, not exposed in main module */

import { JsonObject } from "../typescript-utils.js";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface GraphqlErrorResponse {
    message: string;
    locations?: {
        line: number;
        column: number;
    }[];
    path?: (string | number)[];
    extensions?: JsonObject;
}

export interface ShipgeniusGraphqlErrorExtension extends JsonObject {
    http_status: number;
    additional_details: JsonObject;
    code: string;
}

export type GraphqlResponse = (
    | {
          data: JsonObject | null;
          errors?: undefined | [GraphqlErrorResponse, ...GraphqlErrorResponse[]];
      }
    | {
          data?: undefined;
          errors: [GraphqlErrorResponse, ...GraphqlErrorResponse[]];
      }
) & {
    extensions?: JsonObject;
};
