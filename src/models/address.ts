/** Base information about an address */
export interface AddressData {
    /** The street address */
    street: readonly string[];
    /** The city the address is in */
    city: string;
}

/** An address returned by the API */
export default class Address implements AddressData {
    public street: readonly string[];
    public city: string;

    constructor(data: AddressData) {
        this.street = data.street;
        this.city = data.city;
    }
}
