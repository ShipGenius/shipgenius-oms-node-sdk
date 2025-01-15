import { JsonObject } from "../typescript-utils.js";
import { CarrierName } from "./carrier.js";
import ShipmentIdentifier from "./shipment-identifier.js";

/**
 * Shipment identifier including carrier and account
 */
export default interface FullShipmentIdentifier extends JsonObject {
    /** The carrier who is taking the shipment */
    carrier: CarrierName;
    /** The account number used to make the shipment */
    account_number?: string | null;
    /** An ID for shipment */
    shipment: ShipmentIdentifier;
}
