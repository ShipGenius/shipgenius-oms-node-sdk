import { DatetimeInformation } from "./date-time.js";

/**
 * Interface version of {@link TrackingDeliveryInformation}
 *
 * @internal
 */
export interface TrackingDeliveryInformationInterface {
    /** The name of the person who signed for the package */
    readonly signed_by: string | null;
    /** The name of the person who recieved the package */
    readonly received_by: string | null;
    /** The time the package was delivered */
    readonly delivery_time: string | null;
    /** The time that a delivery attempt was last made */
    readonly delivery_attempt_time: string | null;
    /** The location on the property where the package was left */
    readonly delivery_location: string | null;
}

/** Information about the delivery of a package */
export default class TrackingDeliveryInformation implements TrackingDeliveryInformationInterface {
    public readonly signed_by: string | null;
    public readonly received_by: string | null;
    public readonly delivery_time: string | null;
    public readonly delivery_attempt_time: string | null;
    public readonly delivery_location: string | null;

    /** @hidden */
    constructor(data: TrackingDeliveryInformationInterface) {
        this.signed_by = data.signed_by;
        this.received_by = data.received_by;
        this.delivery_time = data.delivery_time;
        this.delivery_attempt_time = data.delivery_attempt_time;
        this.delivery_location = data.delivery_location;
    }

    /** {@link delivery_time} in other representations */
    public get delivery_time_datetime(): DatetimeInformation | null {
        if (this.delivery_time === null) {
            return null;
        }
        return new DatetimeInformation(this.delivery_time);
    }

    /** {@link delivery_attempt_time} in other representations */
    public get delivery_attempt_time_datetime(): DatetimeInformation | null {
        if (this.delivery_attempt_time === null) {
            return null;
        }
        return new DatetimeInformation(this.delivery_attempt_time);
    }
}
