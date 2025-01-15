import { CarrierName } from "./carrier.js";
import { DatetimeInformation } from "./date-time.js";
import TrackingAddressAndContact, { TrackingAddressAndContactInterface } from "./tracking-address-and-contact.js";

/**
 * Interface version of {@link TrackingShipment}
 *
 * @internal
 */
export interface TrackingShipmentInterface {
    /** The tracking number of the shipment */
    readonly tracking_number: string;
    /** The unique tracking number for the shipment, if available */
    readonly unique_tracking_number: string | null;
    /** The carrier taking the shipment */
    readonly carrier: CarrierName;
    /** The time the package was shipped */
    readonly ship_time: string | null;
    /** Where the package was shipped from */
    readonly origin: TrackingAddressAndContactInterface;
    /** Where the package is being shipped to */
    readonly destination: TrackingAddressAndContactInterface;
}

/** Information the shipment itself */
export default class TrackingShipment implements TrackingShipmentInterface {
    public readonly tracking_number: string;
    public readonly unique_tracking_number: string | null;
    public readonly carrier: CarrierName;
    public readonly ship_time: string | null;
    public readonly origin: TrackingAddressAndContact;
    public readonly destination: TrackingAddressAndContact;

    /** @hidden */
    constructor(data: TrackingShipmentInterface) {
        this.tracking_number = data.tracking_number;
        this.unique_tracking_number = data.unique_tracking_number;
        this.carrier = data.carrier;
        this.ship_time = data.ship_time;
        this.origin = new TrackingAddressAndContact(data.origin);
        this.destination = new TrackingAddressAndContact(data.destination);
    }

    /**
     * {@link ship_time} in different representations
     */
    public get ship_time_datetime(): DatetimeInformation | null {
        if (this.ship_time === null) {
            return null;
        }
        return new DatetimeInformation(this.ship_time);
    }
}
