import DomesticRateError, { DomesticRateErrorInterface } from "./domestic-rate-error.js";
import DomesticRateResponse, { DomesticRateResponseInterface } from "./domestic-rate-response.js";
import DomesticRate, { DomesticRateInterface } from "./domestic-rate.js";

export interface DomesticRateQueryResponse {
    domestic_rate: BulkDomesticRateResponseInterface[];
}

/**
 * Interface version of {@link BulkDomesticRateResponse}
 *
 * @internal
 */
export interface BulkDomesticRateResponseInterface {
    /** Echoed back from {@link DomesticRateInput.request_id} */
    readonly request_id: string | null;
    /** The rates for this package */
    readonly rates: readonly DomesticRateResponseInterface[];
}

/**
 * Rate information returned for a rated package
 */
export default class BulkDomesticRateResponse implements BulkDomesticRateResponseInterface {
    public readonly request_id: string | null;
    public readonly rates: readonly DomesticRateResponse[];

    /** @hidden */
    constructor(data: BulkDomesticRateResponseInterface) {
        this.request_id = data.request_id;
        this.rates = data.rates.map((rate) => {
            if (rate.__typename == "DomesticRate") {
                return new DomesticRate(rate as DomesticRateInterface);
            } else {
                return new DomesticRateError(rate as DomesticRateErrorInterface);
            }
        });
    }
}
