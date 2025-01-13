import AddressValidationError, { AddressValidationErrorInterface } from "./address-validation-error";
import AddressValidationResponse from "./address-validation-response";
import CarrierErrorCode from "./carrier-error-code";

describe("AddressValidationError", () => {
    it("constructs from server response", () => {
        const data: AddressValidationErrorInterface = {
            __typename: "AddressValidationError",
            error_code: CarrierErrorCode.COULD_NOT_CONNECT,
            error_message: "Could not connect to carrier API",
        };

        const obj = new AddressValidationError(data);

        expect(obj).toBeInstanceOf(AddressValidationError);
        expect(obj).toBeInstanceOf(AddressValidationResponse);

        expect(obj).toEqual(data);
    });
});
