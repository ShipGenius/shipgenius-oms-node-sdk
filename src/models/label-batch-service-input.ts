import { JsonObject } from "../typescript-utils.js";
import { CarrierName } from "./carrier.js";

/**
 * The service to ship the bulk shipment with by default
 */
export default interface LabelBatchServiceInput extends JsonObject {
    /** The carrier to send shipments with */
    carrier: CarrierName;
    /**
     * The carrier service to send shipments with.
     *
     * See {@link "@shipgenius/oms".ShipGeniusOmsClient.getSupportedServices}
     * for a list of supported services for each carrier.
     */
    service_code: string;
    /**
     * The carrier account to purchase the label with.
     *
     * If left `null`, a Shipgenius-provided account will be
     * used, if available.
     */
    account_number?: string | null;
}
