import Address, { AddressInterface } from "./address.js";
import StateCode from "./state-code.js";

/** Interface version of {@link DomesticAddress} */
export interface DomesticAddressInterface extends AddressInterface {
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
export default class DomesticAddress extends Address implements DomesticAddressInterface {
    public state: StateCode;
    public zip_code: string;
    public urbanization_code: string | null;

    constructor(data: DomesticAddressInterface) {
        super(data);

        this.state = data.state;
        this.zip_code = data.zip_code;
        this.urbanization_code = data.urbanization_code;
    }
}
