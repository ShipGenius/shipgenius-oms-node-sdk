import { ServerEnvironment } from "./client-types";

export function getServerUrl(environment: ServerEnvironment): string {
    if (environment === "PRODUCTION") {
        return "https://lite.shipgeni.us";
    } else if (environment === "SANDBOX") {
        throw new Error("Sandbox environment is not yet supported");
    } else if (environment === "DEVELOPMENT") {
        throw new Error("Development environment is not yet supported");
    }

    // environment is of type `never`, which is why this is an error in the first place
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Unknown environment: \`${environment}\``);
}
