import Address, { AddressInterface } from "./address.js";
import StateCode from "./state-code.js";

/**
 * Interface version of {@link DomesticAddress}
 *
 * @internal
 */
export interface DomesticAddressInterface extends AddressInterface {
    /** The two-letter state code */
    readonly state: StateCode;
    /**
     * The ZIP Code.
     *
     * Conditionally includes the ZIP+4
     */
    readonly zip_code: string;
    /**
     * The urbanization code, if applicable.
     *
     * Only relevant for Puerto Rico addresses.
     */
    readonly urbanization_code: string | null;
}

/** A domestic US address returned by the API */
export default class DomesticAddress extends Address implements DomesticAddressInterface {
    public readonly state: StateCode;
    public readonly zip_code: string;
    public readonly urbanization_code: string | null;

    /** @hidden */
    constructor(data: DomesticAddressInterface) {
        super(data);

        this.state = data.state;
        this.zip_code = data.zip_code;
        this.urbanization_code = data.urbanization_code;
    }
}
