import TrackingAddress, { TrackingAddressInterface } from "./tracking-address";

describe("TrackingAddress", () => {
    it("constructs from the server response", () => {
        const data: TrackingAddressInterface = {
            street: ["123 Sesame Street", "#101"],
            city: "Somewhere",
            state_or_province_code: "NY",
            postal_code: "12345",
            country_code: "US",
            urbanization_code: null,
            residential: true,
        };

        const obj = new TrackingAddress(data);

        expect(obj).toBeInstanceOf(TrackingAddress);
        expect(obj).toEqual(data);
    });
});
