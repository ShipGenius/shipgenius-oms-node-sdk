import { GraphqlList, JsonObject } from "../typescript-utils.js";
import ExtraService from "./extra-service.js";
import FullDomesticAddressInput from "./full-domestic-address-input.js";
import HazmatInfo from "./hazmat-info.js";
import Packaging from "./packaging.js";
import WeightInput from "./weight-input.js";

/**
 * Information about the package being shipped
 */
export default interface DomesticPackageLabelInput extends JsonObject {
    /** The packaging for the item being shipped */
    packaging: Packaging;
    /** The total weight of the package */
    weight: WeightInput;
    /** The contents of the package */
    content_description: string;
    /** Information about hazardous materials being shipped, if applicable */
    hazmat?: HazmatInfo | null;
    /** Extra services to request from the carrier */
    extra_services?: GraphqlList<ExtraService> | null;
    /** The recipient of the package */
    ship_to: FullDomesticAddressInput;
    /** The sender of the package */
    ship_from: FullDomesticAddressInput;
    /**
     * The address to return the package to
     * if necessary or requested
     *
     * Defaults to the ship_from address
     */
    return_address?: FullDomesticAddressInput | null;
}
