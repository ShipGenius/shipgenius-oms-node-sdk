import Address, { AddressData } from "./address.js";
import StateCode from "./state-code.js";

export interface DomesticAddressData extends AddressData {
    /** The two-letter state code */
    state: StateCode;
    /**
     * The ZIP Code.
     *
     * Conditionally includes the ZIP+4
     */
    zip_code: string;
    /**
     * The urbanization code, if applicable.
     *
     * Only relevant for Puerto Rico addresses.
     */
    urbanization_code: string | null;
}

/** A domestic US address returned by the API */
export default class DomesticAddress extends Address implements DomesticAddressData {
    public state: StateCode;
    public zip_code: string;
    public urbanization_code: string | null;

    constructor(data: DomesticAddressData) {
        super(data);

        this.state = data.state;
        this.zip_code = data.zip_code;
        this.urbanization_code = data.urbanization_code;
    }
}
