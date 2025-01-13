import { JsonObject } from "../typescript-utils.js";
import FullDomesticAddressInput from "./full-domestic-address-input.js";

/**
 * The processing category for USPS
 *
 * https://faq.usps.com/s/article/What-is-the-Non-Machinable-Surcharge-for-First-Class-Mail
 */
export enum UspsProcessingCategory {
    /**
     * Letter packaging
     *
     * https://pe.usps.com/BusinessMail101?ViewName=Letters
     */
    LETTERS = "LETTERS",
    /**
     * Large envelopes, newsletters, and magazines
     *
     * https://pe.usps.com/BusinessMail101?ViewName=Flats
     */
    FLATS = "FLATS",
    /**
     * A mailpiece that can be sorted within of the standard, automated mail process
     *
     * https://pe.usps.com/text/qsg300/q201.htm
     */
    MACHINABLE = "MACHINABLE",
    /**
     * A mailpiece that must be sorted outside of the standard, automated mail process
     *
     * https://pe.usps.com/text/qsg300/q201.htm
     */
    NON_MACHINABLE = "NON_MACHINABLE",
}

/** Extra information for printing USPS labels */
export interface UspsLabelInput extends JsonObject {
    /**
     * Whether to ignore bad addresses when printing the label
     *
     * @default false
     */
    ignore_bad_addresses?: boolean;
    /**
     * The processing category for the USPS label
     *
     * @default - {@link UspsProcessingCategory.MACHINABLE}
     */
    processing_category?: UspsProcessingCategory;
    /**
     * The address of the entity responsible for sending the package.
     *
     * Defaults to the {@link DomesticPackageRateInput.ship_from | ship_from} address.
     */
    sender_address?: FullDomesticAddressInput | null;
}

/** How FedEx will pick up the package */
export enum FedexPickupType {
    /** Shipper will contact FedEx and schedule a pickup */
    CONTACT_FEDEX_TO_SCHEDULE = "CONTACT_FEDEX_TO_SCHEDULE",
    /** Shipper will drop the package off at a FedEx location */
    DROPOFF_AT_FEDEX_LOCATION = "DROPOFF_AT_FEDEX_LOCATION",
    /** Shipper has a scheduled pickup with FedEx */
    USE_SCHEDULED_PICKUP = "USE_SCHEDULED_PICKUP",
}

/** Extra information for printing FedEx labels */
export interface FedExLabelInput extends JsonObject {
    /** The type of pickup FedEx is expecting for the package */
    pickup_type: FedexPickupType;
}

/** Extra carrier-specific information for rating and/or creating shipments */
export default interface LabelCarrierInput extends JsonObject {
    /** USPS-specific label input options */
    usps?: UspsLabelInput | null;
    /** FedEx-specific label input options */
    fedex?: FedExLabelInput | null;
}
