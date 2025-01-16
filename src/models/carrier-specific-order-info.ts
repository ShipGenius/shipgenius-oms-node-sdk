import { JsonObject } from "../typescript-utils.js";
import DomesticAddressInput from "./domestic-address-input.js";

/** The types of USPS destinations entry facilities */
export enum UspsDestinationEntryFacilityType {
    /** A USPS Network Distribution Center */
    DESTINATION_NETWORK_DISTRIBUTION_CENTER = "DESTINATION_NETWORK_DISTRIBUTION_CENTER",
    /** A USPS Sectional Center Facility */
    DESTINATION_SECTIONAL_CENTER_FACILITY = "DESTINATION_SECTIONAL_CENTER_FACILITY",
    /** A USPS Delivery Unit */
    DESTINATION_DELIVERY_UNIT = "DESTINATION_DELIVERY_UNIT",
    /** A USPS Service Hub */
    DESTINATION_SERVICE_HUB = "DESTINATION_SERVICE_HUB",
}

/** Information about the USPS destination entry facility */
export interface UspsDestinationEntryFacility extends JsonObject {
    /** The type of facility at the address */
    facility_type: UspsDestinationEntryFacilityType;
    /** The address of the USPS facility */
    address: DomesticAddressInput;
}

/** Extra requests and information only USPS supports */
export interface UspsSpecificOrderInfo extends JsonObject {
    /** The facility the USPS shipment should enter */
    destination_entry_facility?: UspsDestinationEntryFacility | null;
}

/** Extra requests and information only specific carriers support */
export default interface CarrierSpecificOrderInfo extends JsonObject {
    /** Extra requests and information only USPS supports */
    usps?: UspsSpecificOrderInfo | null;
}
