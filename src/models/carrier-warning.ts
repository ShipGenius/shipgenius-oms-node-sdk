/**
 * Interface version of {@link CarrierWarning}
 *
 * @internal
 */
export interface CarrierWarningInterface {
    /** The code associated with the warning, from the carrier's API */
    code: string;
    /** The human-readable warning message, if applicable */
    message: string | null;
}

/** A warning issued by a carrier */
export default class CarrierWarning implements CarrierWarningInterface {
    public code: string;
    public message: string | null;

    /** @hidden */
    constructor(data: CarrierWarningInterface) {
        this.code = data.code;
        this.message = data.message;
    }
}
