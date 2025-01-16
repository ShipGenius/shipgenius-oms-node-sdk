import { GraphqlList, JsonObject } from "../typescript-utils.js";
import CarrierDependentOrderInfo from "./carrier-dependent-order-info.js";
import CarrierSpecificOrderInfo from "./carrier-specific-order-info.js";
import ReferenceNumber from "./reference-number.js";
import { Trackingsubscription } from "./tracking-subscription.js";

/**
 * Extra information and requests for the shipment
 */
export default interface OrderInfo extends JsonObject {
    /** Requests to send notifications about tracking updates */
    tracking_subscriptions?: GraphqlList<Trackingsubscription> | null;
    /**
     * Reference numbers for identifying the shipment with other external ids
     *
     * > [!WARNING]
     * >
     * > Some carriers limit the number of reference number
     * > that can be associated with a shipment.
     * >
     * > If the carrier has this limit,
     * > numbers specified first receive priority.
     * > The same goes for reference numbers printed on the label.
     */
    reference_numbers?: GraphqlList<ReferenceNumber> | null;
    /** Information that only specific carriers use */
    carrier_specific?: CarrierSpecificOrderInfo | null;
    /**
     * Information that carriers may or may not ignore,
     * but which aren't specific to any one carrier.
     */
    carrier_dependent?: CarrierDependentOrderInfo | null;
}
