/* This file is not exported in module */

import { ServerEnvironment } from "./client-types.js";

/** Resolve the server URL from the environment */
export function getServerUrl(environment: ServerEnvironment): string {
    if (environment === "PRODUCTION") {
        return "https://api.lite.shipgeni.us";
    } else if (environment === "SANDBOX") {
        throw new Error("Sandbox environment is not yet supported");
    } else if (environment === "DEVELOPMENT") {
        throw new Error("Development environment is not yet supported");
    }

    // environment is of type `never`, which is why this is an error in the first place
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Unknown environment: \`${environment}\``);
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
