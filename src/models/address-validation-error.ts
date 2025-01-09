import AddressValidationResponse from "./address-validation-response.js";
import CarrierErrorCode from "./carrier-error-code.js";

/** Interface version of {@link AddressValidationError} */
export interface AddressValidationErrorInterface {
    /** Typename that can be used for type guards instead of `instanceof` */
    __typename: "AddressValidationError";
    /** The error code for the error */
    error_code: CarrierErrorCode;
    /** The human-readable error message, if available */
    error_message: string | null;
}

/** Information about why an address validation failed to run */
export default class AddressValidationError extends AddressValidationResponse implements AddressValidationErrorInterface {
    public __typename = "AddressValidationError" as const;
    public error_code: CarrierErrorCode;
    public error_message: string | null;

    constructor(data: AddressValidationErrorInterface) {
        super(data.__typename);

        this.error_code = data.error_code;
        this.error_message = data.error_message;
    }
}
