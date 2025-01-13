import { GraphqlList, JsonObject } from "../typescript-utils.js";
import DomesticAddressInput from "./domestic-address-input.js";
import ExtraService from "./extra-service.js";
import HazmatInfo from "./hazmat-info.js";
import Packaging from "./packaging.js";
import WeightInput from "./weight-input.js";

/** Description of a package to be rated */
export default interface DomesticPackageRateInput extends JsonObject {
    /** The packaging used */
    packaging: Packaging;
    /** The weight of the package */
    weight: WeightInput;
    /** Information needed to ship hazardous materials */
    hazmat?: HazmatInfo | null;
    /** A list of extra services selected to rate the package with */
    extra_services?: GraphqlList<ExtraService> | null;
    /** The full domestic address to ship to */
    ship_to: DomesticAddressInput;
    /** The full domestic address to ship from */
    ship_from: DomesticAddressInput;
    /** The full domestic address to return to */
    return_address?: DomesticAddressInput | null;
}
