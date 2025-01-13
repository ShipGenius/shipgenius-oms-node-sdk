import { JsonObject } from "../typescript-utils.js";

/**
 * Additional information about shipments
 *
 * Values here are usually optional, but may be required depending on the carrier, service, and extras.
 */
export default interface AdditionalDomesticInfoInput extends JsonObject {
    /** The date[time] that you expect to ship the package, in ISO format */
    ship_date?: string | null;
    /**
     * The declared value of the items in the package.
     *
     * Rarely changes the rated cost unless insuring the package.
     */
    declared_value?: `${number}` | null;
}
