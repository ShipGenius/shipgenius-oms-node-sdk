import CarrierErrorCode from "./carrier-error-code.js";
import DomesticRateResponse, { DomesticRateResponseInterface } from "./domestic-rate-response.js";

/**
 * Interface version of {@link DomesticRateError}
 *
 * @internal
 */
export interface DomesticRateErrorInterface extends DomesticRateResponseInterface {
    __typename: "DomesticRateError";
    /** The code associated with the error. Can be used to direct error-handling logic. */
    code: CarrierErrorCode;
    /** The human-readable error message, if applicable. */
    message: string | null;
}

export default class DomesticRateError extends DomesticRateResponse implements DomesticRateErrorInterface {
    public __typename = "DomesticRateError" as const;
    public code: CarrierErrorCode;
    public message: string | null;

    /** @hidden */
    constructor(data: DomesticRateErrorInterface) {
        super(data);
        this.code = data.code;
        this.message = data.message;
    }
}
