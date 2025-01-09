import { AddressValidationErrorInterface } from "./address-validation-error.js";
import { AddressValidationInfoInterface } from "./address-validation-info.js";

/** A possible response to an individual address validation */
export type AddressValidationResponseInterface = AddressValidationInfoInterface | AddressValidationErrorInterface;

/** The response to an address validation request */
export interface AddressValidationQueryResponse {
    address_validation: AddressValidationResponseInterface[];
}

/** Base class for objects returned by address validation */
export default class AddressValidationResponse {
    public __typename: "AddressValidationInfo" | "AddressValidationError";

    constructor(typename: "AddressValidationInfo" | "AddressValidationError") {
        this.__typename = typename;
    }
}
