import AddressInput from "./address-input.js";
import StateCode from "./state-code.js";

/** A US domestic address, as entered as input to the API */
export default interface DomesticAddressInput extends AddressInput {
    /** The ZIP Code, as assigned by the US Postal Service */
    zip_code: string;
    /** The two-letter state code */
    state: StateCode;
    /** The urbanization code, if applicable. Only relevant for Puerto Rico addresses. */
    urbanization_code?: string | null;
}
