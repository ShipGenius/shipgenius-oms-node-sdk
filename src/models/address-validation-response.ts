import { AddressValidationErrorData } from "./address-validation-error.js";
import { AddressValidationInfoData } from "./address-validation-info.js";

/** A possible response to an individual address validation */
export type AddressValidationResponseData = AddressValidationInfoData | AddressValidationErrorData;

/** The response to an address validation request */
export interface AddressValidationQueryResponse {
    address_validation: AddressValidationResponseData[];
}

export default class AddressValidationResponse {
    public __typename: "AddressValidationInfo" | "AddressValidationError";

    constructor(typename: "AddressValidationInfo" | "AddressValidationError") {
        this.__typename = typename;
    }
}
