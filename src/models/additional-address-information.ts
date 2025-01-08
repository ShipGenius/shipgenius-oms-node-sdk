export interface AdditionalAddressInformationData {
    /** Whether USPS indicated that this is not a commercial address */
    residential: boolean;
    /** Whether USPS indicated that this address is occupied */
    occupied: boolean;
    /** Whether USPS was able to confirm that this address exists */
    known_address: boolean;
    /**
     * Whether USPS was able to confirm that this secondary address exists
     * (i.e., Apartment or similar division of an address),
     * or no secondary address was specified.
     */
    known_secondary_address: boolean;
}

/** Additional information about the address, mostly concerning its validity */
export default class AdditionalAddressInformation implements AdditionalAddressInformationData {
    public residential: boolean;
    public occupied: boolean;
    public known_address: boolean;
    public known_secondary_address: boolean;

    constructor(data: AdditionalAddressInformationData) {
        this.residential = data.residential;
        this.occupied = data.occupied;
        this.known_address = data.known_address;
        this.known_secondary_address = data.known_secondary_address;
    }
}
