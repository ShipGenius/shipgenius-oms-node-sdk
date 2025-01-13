import { GraphqlList, JsonObject } from "../typescript-utils.js";
import AdditionalDomesticInfoInput from "./additional-domestic-info-input.js";
import CarrierServiceRateInput from "./carrier-service-rate-input.js";
import DomesticPackageRateInput from "./domestic-package-rate-input.js";
import LabelCarrierInput from "./label-carrier-input.js";

/**
 * Information about a shipment to be rated
 */
export default interface DomesticRateInput extends JsonObject {
    /**
     * Optional id that will be echoed in
     * {@link "@shipgenius/oms/models".BulkDomesticRateResponse.request_id | BulkDomesticRateResponse.request_id}
     * to help matching rates to requests
     */
    request_id?: string | null;
    /** The package to be rated */
    package: DomesticPackageRateInput;
    /**
     * A list of services you want to rate the shipment with,
     * overriding the services passed to {@link "@shipgenius/oms/client".client.getDomesticRate | getDomesticRate's `services` parameter}.
     */
    override_services?: GraphqlList<CarrierServiceRateInput> | null;
    /** Information required by the specified carrier */
    carrier_specific?: LabelCarrierInput | null;
    /**
     * Additional information about the shipment.
     *
     * Values here are usually optional, but may be required depending on the carrier, service, and extras.
     */
    additional?: AdditionalDomesticInfoInput | null;
}
