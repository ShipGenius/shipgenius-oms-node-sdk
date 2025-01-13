import Address, { AddressInterface } from "./address";

describe("Address", () => {
    it("constructs from server response", () => {
        const data: AddressInterface = {
            street: ["123 Sesame Street", "#101"],
            city: "New York City",
        };

        const obj = new Address(data);

        expect(obj).toBeInstanceOf(Address);
        expect(obj).toEqual(data);
    });
});
