import { DatetimeInformation } from "./date-time.js";
import DeliveryWindow, { DeliveryWindowInterface } from "./delivery-window.js";

/**
 * Interface version of {@link DeliverySchedule}
 */
export interface DeliveryScheduleInterface {
    /** When the package is expected to be delivered */
    readonly expected_delivery: string | null;
    /** The window of time within which the package is expected to be delivered */
    readonly delivery_window: DeliveryWindowInterface | null;
    /**
     * Whether the package is on schedule to be delivered on time (`true`),
     * behind schdule for being delivered on time (`false`),
     * or has an unknown on-time status (`null`).
     */
    readonly on_time: boolean | null;
}

/** Information about the expected delivery times for the shipment */
export default class DeliverySchedule implements DeliveryScheduleInterface {
    public readonly expected_delivery: string | null;
    public readonly delivery_window: DeliveryWindow | null;
    public readonly on_time: boolean | null;

    /** @hidden */
    constructor(data: DeliveryScheduleInterface) {
        this.expected_delivery = data.expected_delivery;
        this.delivery_window = data.delivery_window === null ? null : new DeliveryWindow(data.delivery_window);
        this.on_time = data.on_time;
    }

    /** {@link expected_delivery} in different representations */
    public getExpectedDeliveryDatetime(): DatetimeInformation | null {
        if (this.expected_delivery === null) {
            return null;
        }
        return new DatetimeInformation(this.expected_delivery);
    }
}
