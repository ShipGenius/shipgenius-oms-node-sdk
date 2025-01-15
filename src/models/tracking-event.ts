import { DatetimeInformation } from "./date-time.js";
import TrackingAddressAndContact, { TrackingAddressAndContactInterface } from "./tracking-address-and-contact.js";
import TrackingStatus, { TrackingStatusInterface } from "./tracking-status.js";

/**
 * Interface version of {@link TrackingEvent}
 *
 * @internal
 */
export interface TrackingEventInterface {
    /** The time the event occurred */
    readonly event_time: string | null;
    /**
     * Where the event occurred,
     * and people at who can be contacted at that location
     */
    readonly location: TrackingAddressAndContactInterface | null;
    /** Details about the tracking event */
    readonly status: TrackingStatusInterface;
}

/** An event in the shipment's tracking history */
export default class TrackingEvent implements TrackingEventInterface {
    public readonly event_time: string | null;
    public readonly location: TrackingAddressAndContact | null;
    public readonly status: TrackingStatus;

    /** @hidden */
    constructor(data: TrackingEventInterface) {
        this.event_time = data.event_time;
        this.location = data.location === null ? null : new TrackingAddressAndContact(data.location);
        this.status = new TrackingStatus(data.status);
    }

    /** {@link event_time} in other representations */
    public getEventDatetime(): DatetimeInformation | null {
        if (this.event_time === null) {
            return null;
        }
        return new DatetimeInformation(this.event_time);
    }
}
