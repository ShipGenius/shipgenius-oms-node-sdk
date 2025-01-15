/**
 * Interface version of {@link AdditionalAddressInformation}
 *
 * @internal
 */
export interface AdditionalAddressInformationInterface {
    /** Whether USPS indicated that this is not a commercial address */
    readonly residential: boolean;
    /** Whether USPS indicated that this address is occupied */
    readonly occupied: boolean;
    /** Whether USPS was able to confirm that this address exists */
    readonly known_address: boolean;
    /**
     * Whether USPS was able to confirm that this secondary address exists
     * (i.e., Apartment or similar division of an address),
     * or no secondary address was specified.
     */
    readonly known_secondary_address: boolean;
}

/** Additional information about the address, mostly concerning its validity */
export default class AdditionalAddressInformation implements AdditionalAddressInformationInterface {
    public readonly residential: boolean;
    public readonly occupied: boolean;
    public readonly known_address: boolean;
    public readonly known_secondary_address: boolean;

    /** @hidden */
    constructor(data: AdditionalAddressInformationInterface) {
        this.residential = data.residential;
        this.occupied = data.occupied;
        this.known_address = data.known_address;
        this.known_secondary_address = data.known_secondary_address;
    }
}
