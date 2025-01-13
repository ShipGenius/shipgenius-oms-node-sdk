import AddressValidationResponse, { AddressValidationResponseInterface } from "./address-validation-response";

describe("AddressValidationResponse", () => {
    it("constructs from server response", () => {
        const data: AddressValidationResponseInterface = {
            __typename: "AddressValidationInfo",
        };

        const obj = new AddressValidationResponse(data.__typename);
        expect(obj).toBeInstanceOf(AddressValidationResponse);
        expect(obj).toEqual(data);
    });
});
