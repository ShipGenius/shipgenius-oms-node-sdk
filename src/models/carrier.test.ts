import Carrier, { CarrierInterface, CarrierName } from "./carrier";

describe("Carrier", () => {
    it("constructs from the server response", () => {
        const data: CarrierInterface = {
            id: "1",
            name: CarrierName.UPS,
            description: "This is UPS",
        };

        const obj = new Carrier(data);

        expect(obj).toBeInstanceOf(Carrier);
        expect(obj).toEqual(data);
    });
});
