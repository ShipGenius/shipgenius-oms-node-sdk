import { CarrierName } from "./carrier.js";
import RateClass from "./rate-class.js";

/**
 * Interface version of {@link DomesticRateResponse}
 *
 * @internal
 */
export interface DomesticRateResponseInterface {
    /** Typename that can be used as an alternative to `instanceof` for type guards */
    __typename: "DomesticRateError" | "DomesticRate";
    /** The carrier requests */
    carrier: CarrierName;
    /** The class of rates requests */
    requested_rate_class: RateClass;
    /** The service code requested. */
    service_code: string;
    /** The account number used for the request */
    account_number: string | null;
}

/** Base class for returned rates */
export default class DomesticRateResponse implements DomesticRateResponseInterface {
    public __typename: "DomesticRateError" | "DomesticRate";
    public carrier: CarrierName;
    public requested_rate_class: RateClass;
    public service_code: string;
    public account_number: string | null;

    /** @hidden */
    constructor(data: DomesticRateResponseInterface) {
        this.__typename = data.__typename;
        this.carrier = data.carrier;
        this.requested_rate_class = data.requested_rate_class;
        this.service_code = data.service_code;
        this.account_number = data.account_number;
    }
}
