import { JsonObject } from "../typescript-utils.js";
import LengthUnit from "./length-unit.js";

/** A length with units */
export default interface LengthInput extends JsonObject {
    /** The length in the specified units */
    measure: number;
    /** The unit the measurement was taken in */
    unit: LengthUnit;
}
