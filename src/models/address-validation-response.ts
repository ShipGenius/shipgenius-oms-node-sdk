/**
 * Interface version of {@link AddressValidationResponse}
 *
 * @internal
 */
export interface AddressValidationResponseInterface {
    /** Typename that can be used for type guards instead of `instanceof` */
    readonly __typename: "AddressValidationInfo" | "AddressValidationError";
}

/** The response to an address validation request */
export interface AddressValidationQueryResponse {
    readonly address_validation: AddressValidationResponseInterface[];
}

/** Base class for objects returned by address validation */
export default class AddressValidationResponse implements AddressValidationResponseInterface {
    public readonly __typename: "AddressValidationInfo" | "AddressValidationError";

    /** @hidden */
    constructor(typename: "AddressValidationInfo" | "AddressValidationError") {
        this.__typename = typename;
    }
}
