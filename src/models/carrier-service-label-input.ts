import { JsonObject } from "../typescript-utils.js";
import { CarrierName } from "./carrier.js";

/**
 * The service to use to ship the package.
 *
 * > [!TIP]
 * > If {@link rate_id} is specified, the other fields become
 * > optional and will only be used to verify that the expected
 * > rate was selected, returned an error if the selected rate
 * > does not match the specified options.
 * >
 * > If {@link rate_id} is not specified, the other fields must be specified.
 */
export default interface CarrierServiceLabelInput extends JsonObject {
    /**
     * The carrier that will ship the package.
     *
     * Required if {@link rate_id} is not specified.
     */
    carrier?: CarrierName | null;
    /**
     * The service to ship the package through.
     *
     * See {@link "@shipgenius/oms".ShipGeniusOmsClient.getSupportedServices | getSupportedServices}
     * for a list of options.
     *
     * Required if {@link rate_id} is not specified.
     */
    carrier_service?: string | null;
    /**
     * The carrier account to ship the package with.
     *
     * If left null, a Shipgenius-provided account will be used if available.
     */
    account_number?: string | null;
    /**
     * Use a value returned from {@link DomesticRate.rate_id} to use the quoted rate.
     *
     * This rate will be used for this package, assuming everything else matches.
     *
     * If for some reason, the carrier charges more for the shipment than was quoted for this rate,
     * the request will be rejected and no money will be charged.
     */
    rate_id?: string | null;
}
