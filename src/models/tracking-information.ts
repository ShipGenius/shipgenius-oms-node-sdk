import { JsonObject } from "../typescript-utils.js";
import { DatetimeInformation } from "./date-time.js";
import DeliverySchedule, { DeliveryScheduleInterface } from "./delivery-schedule.js";
import TrackingAddress, { TrackingAddressInterface } from "./tracking-address.js";
import TrackingDeliveryInformation, { TrackingDeliveryInformationInterface } from "./tracking-delivery-information.js";
import TrackingEvent, { TrackingEventInterface } from "./tracking-event.js";
import TrackingShipment, { TrackingShipmentInterface } from "./tracking-shipment.js";

export interface GetTrackingQueryResponse {
    readonly get_tracking: TrackingInformationInterface;
}

/**
 * Interface version of {@link TrackingInformation}
 *
 * @internal
 */
export interface TrackingInformationInterface {
    /** Information about the shipment as a whole */
    readonly shipment_info: TrackingShipmentInterface;
    /**
     * Information about the delivery of the package
     *
     * All fields should be null until a delivery attempt is made
     */
    readonly delivery: TrackingDeliveryInformationInterface;
    /**
     * Information about the schedule for making a delivery
     */
    readonly schedule: DeliveryScheduleInterface;
    /**
     * High-level notices applied to the shipment
     */
    readonly notices: string[];
    /**
     * The datetime of the most recent tracking event.
     *
     * Value is an ISO datetime string.
     * To get this value in other representations,
     * see {@link TrackingInformation.last_updated_datetime | `last_updated_datetime`}.
     */
    readonly last_updated: string | null;
    /**
     * The last location the package was known to be at
     */
    readonly last_known_location: TrackingAddressInterface | null;
    /**
     * A list of tracking events and updates
     */
    readonly event_history: TrackingEventInterface[];
    /**
     * Extra information returned by the carrier
     */
    readonly carrier_specific: JsonObject;
}

/** Information about the shipping status and history of a package */
export default class TrackingInformation implements TrackingInformationInterface {
    public readonly shipment_info: TrackingShipment;
    public readonly delivery: TrackingDeliveryInformation;
    public readonly schedule: DeliverySchedule;
    public readonly notices: string[];
    public readonly last_updated: string | null;
    public readonly last_known_location: TrackingAddress | null;
    public readonly event_history: TrackingEvent[];
    public readonly carrier_specific: JsonObject;

    /** @hidden */
    constructor(data: TrackingInformationInterface) {
        this.shipment_info = new TrackingShipment(data.shipment_info);
        this.delivery = new TrackingDeliveryInformation(data.delivery);
        this.schedule = new DeliverySchedule(data.schedule);
        this.notices = data.notices;
        this.last_updated = data.last_updated;
        this.last_known_location = data.last_known_location === null ? null : new TrackingAddress(data.last_known_location);
        this.event_history = data.event_history.map((event) => new TrackingEvent(event));
        this.carrier_specific = data.carrier_specific;
    }

    /**
     * {@link last_updated} in different representations
     */
    public get last_updated_datetime(): DatetimeInformation | null {
        if (this.last_updated === null) {
            return null;
        }
        return new DatetimeInformation(this.last_updated);
    }
}
