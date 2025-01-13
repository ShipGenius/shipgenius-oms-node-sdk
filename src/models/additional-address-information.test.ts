import AdditionalAddressInformation, { AdditionalAddressInformationInterface } from "./additional-address-information";

describe("AdditionalAddressInformation", () => {
    it("constructs from server response", () => {
        const data: AdditionalAddressInformationInterface = {
            residential: false,
            occupied: true,
            known_address: true,
            known_secondary_address: false,
        };

        const obj = new AdditionalAddressInformation(data);

        expect(obj).toBeInstanceOf(AdditionalAddressInformation);
        expect(obj).toEqual(data);
    });
});
