import { JsonObject } from "../typescript-utils.js";
import TrackingStatusCode from "./tracking-status-code.js";

/**
 * Interface vetrsion of {@link TrackingStatus}
 */
export interface TrackingStatusInterface {
    /** The type of tracking event this is */
    readonly status_code: TrackingStatusCode;
    /** Human-facing message explaining the event */
    readonly status_details: string;
    /** Carrier-specific information about the tracking status */
    readonly carrier_specific: JsonObject;
}

/** The details of a shipment's status */
export default class TrackingStatus implements TrackingStatusInterface {
    public readonly status_code: TrackingStatusCode;
    public readonly status_details: string;
    public readonly carrier_specific: JsonObject;

    /** @hidden */
    constructor(data: TrackingStatusInterface) {
        this.status_code = data.status_code;
        this.status_details = data.status_details;
        this.carrier_specific = data.carrier_specific;
    }
}
