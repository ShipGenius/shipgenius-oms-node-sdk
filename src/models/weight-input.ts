import { JsonObject } from "../typescript-utils.js";
import WeightUnit from "./weight-unit.js";

/** A length with units */
export default interface WeightInput extends JsonObject {
    /** The length in the specified units */
    measure: number;
    /** The unit the measurement was taken in */
    unit: WeightUnit;
}
