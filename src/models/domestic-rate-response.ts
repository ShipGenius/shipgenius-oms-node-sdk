import { CarrierName } from "./carrier.js";
import RateClass from "./rate-class.js";

/**
 * Interface version of {@link DomesticRateResponse}
 *
 * @internal
 */
export interface DomesticRateResponseInterface {
    /** Typename that can be used as an alternative to `instanceof` for type guards */
    readonly __typename: "DomesticRateError" | "DomesticRate";
    /** The carrier requests */
    readonly carrier: CarrierName;
    /** The class of rates requests */
    readonly requested_rate_class: RateClass;
    /** The service code requested. */
    readonly service_code: string;
    /** The account number used for the request */
    readonly account_number: string | null;
}

/** Base class for returned rates */
export default class DomesticRateResponse implements DomesticRateResponseInterface {
    public readonly __typename: "DomesticRateError" | "DomesticRate";
    public readonly carrier: CarrierName;
    public readonly requested_rate_class: RateClass;
    public readonly service_code: string;
    public readonly account_number: string | null;

    /** @hidden */
    constructor(data: DomesticRateResponseInterface) {
        this.__typename = data.__typename;
        this.carrier = data.carrier;
        this.requested_rate_class = data.requested_rate_class;
        this.service_code = data.service_code;
        this.account_number = data.account_number;
    }
}
