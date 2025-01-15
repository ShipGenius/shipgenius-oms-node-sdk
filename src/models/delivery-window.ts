import { DatetimeInformation } from "./date-time.js";

/**
 * Interface version of {@link DeliveryWindow}
 *
 * @internal
 */
export interface DeliveryWindowInterface {
    /** The earliest time delivery is expected */
    readonly start: string | null;
    /** The latest time delivery is expected */
    readonly end: string | null;
}

/** The window of time during which the delivery is expected */
export default class DeliveryWindow implements DeliveryWindowInterface {
    public readonly start: string | null;
    public readonly end: string | null;

    /** @hidden */
    constructor(data: DeliveryWindowInterface) {
        this.start = data.start;
        this.end = data.end;
    }

    /** {@link start} in different representations */
    public getStartDatetime(): DatetimeInformation | null {
        if (this.start === null) {
            return null;
        }
        return new DatetimeInformation(this.start);
    }

    /** {@link end} in different representations */
    public getEndDatetime(): DatetimeInformation | null {
        if (this.end === null) {
            return null;
        }
        return new DatetimeInformation(this.end);
    }
}
