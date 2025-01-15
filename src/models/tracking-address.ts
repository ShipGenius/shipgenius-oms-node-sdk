/**
 * Interface version of {@link TrackingAddress}
 *
 * @internal
 */
export interface TrackingAddressInterface {
    /** The street address */
    readonly street: readonly string[] | null;
    /** The city the address is in */
    readonly city: string | null;
    /**
     * The code (two-letter for US and most other countries)
     * for the state of province the address is in
     */
    readonly state_or_province_code: string | null;
    /** The postal/zip code for the address */
    readonly postal_code: string | null;
    /** The two-letter code for the country the address is in */
    readonly country_code: string | null;
    /**
     * The urbanization code for the address
     *
     * Only relevant for PR addresses
     */
    readonly urbanization_code: string | null;
    /** Whether the address is a residential address */
    readonly residential: boolean | null;
}

/** An address relevant to the tracking of a shipment */
export default class TrackingAddress implements TrackingAddressInterface {
    public readonly street: readonly string[] | null;
    public readonly city: string | null;
    public readonly state_or_province_code: string | null;
    public readonly postal_code: string | null;
    public readonly country_code: string | null;
    public readonly urbanization_code: string | null;
    public readonly residential: boolean | null;

    constructor(data: TrackingAddressInterface) {
        this.street = data.street;
        this.city = data.city;
        this.state_or_province_code = data.state_or_province_code;
        this.postal_code = data.postal_code;
        this.country_code = data.country_code;
        this.urbanization_code = data.urbanization_code;
        this.residential = data.residential;
    }
}
