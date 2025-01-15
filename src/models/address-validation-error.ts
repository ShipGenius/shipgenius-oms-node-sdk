import AddressValidationResponse, { AddressValidationResponseInterface } from "./address-validation-response.js";
import CarrierErrorCode from "./carrier-error-code.js";

/**
 * Interface version of {@link AddressValidationError}
 *
 * @internal
 */
export interface AddressValidationErrorInterface extends AddressValidationResponseInterface {
    readonly __typename: "AddressValidationError";
    /** The error code for the error */
    readonly error_code: CarrierErrorCode;
    /** The human-readable error message, if available */
    readonly error_message: string | null;
}

/** Information about why an address validation failed to run */
export default class AddressValidationError extends AddressValidationResponse implements AddressValidationErrorInterface {
    public readonly __typename = "AddressValidationError" as const;
    public readonly error_code: CarrierErrorCode;
    public readonly error_message: string | null;

    /** @hidden */
    constructor(data: AddressValidationErrorInterface) {
        super(data.__typename);

        this.error_code = data.error_code;
        this.error_message = data.error_message;
    }
}
