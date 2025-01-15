/**
 * Interface version of {@link Address}
 *
 * @internal
 */
export interface AddressInterface {
    /** The street address */
    readonly street: readonly string[];
    /** The city the address is in */
    readonly city: string;
}

/** An address returned by the API */
export default class Address implements AddressInterface {
    public readonly street: readonly string[];
    public readonly city: string;

    /** @hidden */
    constructor(data: AddressInterface) {
        this.street = data.street;
        this.city = data.city;
    }
}
