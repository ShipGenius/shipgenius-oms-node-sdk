/**
 * Interface version of {@link Address}
 *
 * @internal
 */
export interface AddressInterface {
    /** The street address */
    street: readonly string[];
    /** The city the address is in */
    city: string;
}

/** An address returned by the API */
export default class Address implements AddressInterface {
    public street: readonly string[];
    public city: string;

    /** @hidden */
    constructor(data: AddressInterface) {
        this.street = data.street;
        this.city = data.city;
    }
}
