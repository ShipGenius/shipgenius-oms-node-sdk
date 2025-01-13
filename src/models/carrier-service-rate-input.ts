import { JsonObject } from "../typescript-utils.js";
import { CarrierName } from "./carrier.js";
import RateClass from "./rate-class.js";

/** A specification of a carrier service to rate with */
export default interface CarrierServiceRateInput extends JsonObject {
    /** The carrier to ship the package through */
    carrier: CarrierName;
    /**
     * The carrier service to ship the package with
     *
     * See {@link "@shipgenius/oms/client".client.getSupportedServices | `getSupportedServices`}
     * and {@link "@shipgenius/oms/models".CarrierService.code | `CarrierService.code`}
     * for a list of available options.
     */
    service_code: string;
    /**
     * The account number for the account to use for rating.
     *
     * Must be an account you set up in the {@link https://lite.shipgeni.us/carrier | Shipgenius Carrier Portal}.
     *
     * Leave off or set to `null` to use the default shipgenius-provided account, if avalable.
     */
    account_number?: string | null;
    /**
     * Which rates to retrieve
     */
    rate_class: RateClass;
}
